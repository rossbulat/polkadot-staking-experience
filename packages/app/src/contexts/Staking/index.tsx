// Copyright 2024 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { setStateWithRef } from '@w3ux/utils';
import type { ReactNode } from 'react';
import { createContext, useContext, useRef, useState } from 'react';
import { useBalances } from 'contexts/Balances';
import type { ExternalAccount } from '@w3ux/react-connect-kit/types';
import type {
  EraStakers,
  Exposure,
  StakingContextInterface,
} from 'contexts/Staking/types';
import type { AnyApi, MaybeAddress } from 'types';
import Worker from 'workers/stakers?worker';
import type { ProcessExposuresResponse } from 'workers/types';
import { useEffectIgnoreInitial } from '@w3ux/hooks';
import { useNetwork } from 'contexts/Network';
import { useActiveAccounts } from 'contexts/ActiveAccounts';
import { useImportedAccounts } from 'contexts/Connect/ImportedAccounts';
import { useApi } from '../Api';
import { useBonded } from '../Bonded';
import { defaultEraStakers, defaultStakingContext } from './defaults';
import { setLocalEraExposures, getLocalEraExposures } from './Utils';
import type { NominationStatus } from 'library/ValidatorList/ValidatorItem/types';
import { SyncController } from 'controllers/Sync';
import { ErasStakersOverview } from 'model/Query/ErasStakersOverview';
import { ApiController } from 'controllers/Api';
import type { AnyJson } from '@w3ux/types';
import { ErasStakersPaged } from 'model/ErasStakersPaged';

const worker = new Worker();

export const StakingContext = createContext<StakingContextInterface>(
  defaultStakingContext
);

export const useStaking = () => useContext(StakingContext);

export const StakingProvider = ({ children }: { children: ReactNode }) => {
  const { getBondedAccount } = useBonded();
  const { networkData, network } = useNetwork();
  const { getLedger, getNominations } = useBalances();
  const { isReady, api, activeEra, apiStatus } = useApi();
  const { accounts: connectAccounts } = useImportedAccounts();
  const { activeAccount, getActiveAccount } = useActiveAccounts();

  // Store eras stakers in state.
  const [eraStakers, setEraStakers] = useState<EraStakers>(defaultEraStakers);
  const eraStakersRef = useRef(eraStakers);

  worker.onmessage = (message: MessageEvent) => {
    if (message) {
      const { data }: { data: ProcessExposuresResponse } = message;
      const { task, networkName, era } = data;

      // ensure task matches, & era is still the same.
      if (
        task !== 'processExposures' ||
        networkName !== network ||
        era !== activeEra.index.toString()
      ) {
        return;
      }

      const {
        stakers,
        totalActiveNominators,
        activeValidators,
        activeAccountOwnStake,
        who,
      } = data;

      // check if account hasn't changed since worker started
      if (getActiveAccount() === who) {
        // Syncing current eraStakers is now complete.
        SyncController.dispatch('era-stakers', 'complete');

        setStateWithRef(
          {
            ...eraStakersRef.current,
            stakers,
            totalActiveNominators,
            activeValidators,
            activeAccountOwnStake,
          },
          setEraStakers,
          eraStakersRef
        );
      }
    }
  };

  // Fetches erasStakers exposures for an era, and saves to `localStorage`.
  const fetchEraStakers = async (era: string) => {
    if (!isReady || activeEra.index.isZero() || !api) {
      return [];
    }

    let exposures: Exposure[] = [];
    const localExposures = getLocalEraExposures(
      network,
      era,
      activeEra.index.toString()
    );

    if (localExposures) {
      exposures = localExposures;
    } else {
      exposures = await getPagedErasStakers(era);
    }

    // For resource limitation concerns, only store the current era in local storage.
    if (era === activeEra.index.toString()) {
      setLocalEraExposures(network, era, exposures);
    }

    return exposures;
  };

  // Fetches the active nominator set and metadata around it.
  const fetchActiveEraStakers = async () => {
    if (!isReady || activeEra.index.isZero() || !api) {
      return;
    }

    SyncController.dispatch('era-stakers', 'syncing');

    const exposures = await fetchEraStakers(activeEra.index.toString());

    // worker to calculate stats
    worker.postMessage({
      era: activeEra.index.toString(),
      networkName: network,
      task: 'processExposures',
      activeAccount,
      units: networkData.units,
      exposures,
    });
  };

  // Gets the nomination statuses of passed in nominations.
  const getNominationsStatusFromTargets = (
    who: MaybeAddress,
    fromTargets: string[]
  ) => {
    const statuses: Record<string, NominationStatus> = {};

    if (!fromTargets.length) {
      return statuses;
    }

    for (const target of fromTargets) {
      const staker = eraStakersRef.current.stakers.find(
        ({ address }) => address === target
      );

      if (staker === undefined) {
        statuses[target] = 'waiting';
        continue;
      }

      if (!(staker.others ?? []).find((o) => o.who === who)) {
        statuses[target] = 'inactive';
        continue;
      }
      statuses[target] = 'active';
    }
    return statuses;
  };

  // Helper function to determine whether the controller account is the same as the stash account.
  const addressDifferentToStash = (address: MaybeAddress) => {
    // check if controller is imported.
    if (!connectAccounts.find((acc) => acc.address === address)) {
      return false;
    }
    return address !== activeAccount && activeAccount !== null;
  };

  // Helper function to determine whether the controller account has been imported.
  const getControllerNotImported = (address: MaybeAddress) => {
    if (address === null || !activeAccount) {
      return false;
    }
    // check if controller is imported
    const exists = connectAccounts.find((a) => a.address === address);
    if (exists === undefined) {
      return true;
    }
    // controller account exists. If it is a read-only account, then controller is imported.
    if (Object.prototype.hasOwnProperty.call(exists, 'addedBy')) {
      if ((exists as ExternalAccount).addedBy === 'user') {
        return false;
      }
    }
    // if the controller is a Ledger account, then it can act as a signer.
    if (exists.source === 'ledger') {
      return false;
    }
    // if a `signer` does not exist on the account, then controller is not imported.
    return !Object.prototype.hasOwnProperty.call(exists, 'signer');
  };

  // Helper function to determine whether the active account.
  const hasController = () => getBondedAccount(activeAccount) !== null;

  // Helper function to determine whether the active account is bonding, or is yet to start.
  const isBonding = () =>
    hasController() &&
    getLedger({ stash: activeAccount }).active.isGreaterThan(0);

  // Helper function to determine whether the active account.
  const isUnlocking = () =>
    hasController() && getLedger({ stash: activeAccount }).unlocking.length;

  // Helper function to determine whether the active account is nominating, or is yet to start.
  const isNominating = () => getNominations(activeAccount).length > 0;

  // Helper function to determine whether the active account is nominating, or is yet to start.
  const inSetup = () =>
    !activeAccount ||
    (!hasController() && !isBonding() && !isNominating() && !isUnlocking());

  // Fetch eras stakers from storage.
  const getPagedErasStakers = async (era: string) => {
    if (!api) {
      return [];
    }

    const { pApi } = ApiController.get(network);
    const overview = await new ErasStakersOverview(pApi).fetch(era);
    const validators: Record<string, AnyJson> = overview.reduce(
      (
        prev: Record<string, Exposure>,
        { keyArgs: [, validator], value: { own, total } }: AnyApi
      ) => ({ ...prev, [validator]: { own, total } }),
      {}
    );
    const validatorKeys = Object.keys(validators);

    const pagedResults = await Promise.all(
      validatorKeys.map((v) => new ErasStakersPaged(pApi).fetch(era, v))
    );

    const result: Exposure[] = [];
    let i = 0;
    for (const [
      {
        keyArgs,
        value: { others },
      },
    ] of pagedResults) {
      const validator = validatorKeys[i];
      const { own, total } = validators[validator];

      result.push({
        keys: [keyArgs[0].toString(), validator],
        val: {
          total: total.toString(),
          own: own.toString(),
          others: others.map(
            ({ who, value }: { who: string; value: bigint }) => ({
              who,
              value: value.toString(),
            })
          ),
        },
      });
      i++;
    }
    return result;
  };

  useEffectIgnoreInitial(() => {
    if (apiStatus === 'connecting') {
      setStateWithRef(defaultEraStakers, setEraStakers, eraStakersRef);
    }
  }, [apiStatus]);

  // handle syncing with eraStakers.
  useEffectIgnoreInitial(() => {
    if (isReady) {
      fetchActiveEraStakers();
    }
  }, [isReady, activeEra.index, activeAccount]);

  return (
    <StakingContext.Provider
      value={{
        fetchEraStakers,
        getNominationsStatusFromTargets,
        getControllerNotImported,
        addressDifferentToStash,
        isBonding,
        isNominating,
        inSetup,
        eraStakers,
        getPagedErasStakers,
      }}
    >
      {children}
    </StakingContext.Provider>
  );
};
