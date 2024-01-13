// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type { VoidFn } from '@polkadot/api/types';
import {
  addedTo,
  matchedProperties,
  removedFrom,
  rmCommas,
  setStateWithRef,
} from '@polkadot-cloud/utils';
import BigNumber from 'bignumber.js';
import type { ReactNode } from 'react';
import { createContext, useContext, useRef, useState } from 'react';
import { useApi } from 'contexts/Api';
import type { AnyApi, MaybeAddress } from 'types';
import { useEffectIgnoreInitial } from '@polkadot-cloud/react/hooks';
import { useNetwork } from 'contexts/Network';
import { useImportedAccounts } from 'contexts/Connect/ImportedAccounts';
import { useExternalAccounts } from 'contexts/Connect/ExternalAccounts';
import { useOtherAccounts } from 'contexts/Connect/OtherAccounts';
import { getLedger } from './Utils';
import * as defaults from './defaults';
import type {
  Balances,
  BalancesContextInterface,
  Ledger,
  UnlockChunkRaw,
} from './types';
import { useEventListener } from 'usehooks-ts';
import { isCustomEvent } from 'static/utils';
import { BalancesController } from 'static/BalancesController';
import { useActiveAccounts } from 'contexts/ActiveAccounts';
import type { ActiveBalancesState } from 'contexts/ActiveAccounts/types';

export const BalancesContext = createContext<BalancesContextInterface>(
  defaults.defaultBalancesContext
);

export const useBalances = () => useContext(BalancesContext);

export const BalancesProvider = ({ children }: { children: ReactNode }) => {
  const { network } = useNetwork();
  const { api, isReady } = useApi();
  const { accounts } = useImportedAccounts();
  const { addExternalAccount } = useExternalAccounts();
  const { addOrReplaceOtherAccount } = useOtherAccounts();
  const { activeAccount, activeProxy, activeProxyRef } = useActiveAccounts();

  // Store active account balances state. Requires Ref for use in event listener callbacks.
  const [activeBalances, setActiveBalances] = useState<ActiveBalancesState>({});
  const activeBalancesRef = useRef(activeBalances);

  // Deprecated -------------------------------------------------------------------------
  const [balances, setBalances] = useState<Balances[]>([]);
  const balancesRef = useRef(balances);

  const [ledgers, setLedgers] = useState<Ledger[]>([]);
  const ledgersRef = useRef(ledgers);

  const unsubs = useRef<Record<string, VoidFn>>({});

  // Handle the syncing of accounts on accounts change.
  const handleSyncAccounts = () => {
    // Sync removed accounts.
    const handleRemovedAccounts = () => {
      const removed = removedFrom(accounts, ledgersRef.current, [
        'address',
      ]).map(({ address }) => address);

      removed?.forEach((address) => {
        const unsub = unsubs.current[address];
        if (unsub) {
          unsub();
        }
      });
      unsubs.current = Object.fromEntries(
        Object.entries(unsubs.current).filter(([key]) => !removed.includes(key))
      );
    };
    // Sync added accounts.
    const handleAddedAccounts = () => {
      addedTo(accounts, ledgersRef.current, ['address'])?.map(({ address }) =>
        handleSubscriptions(address)
      );
    };
    // Sync existing accounts.
    const handleExistingAccounts = () => {
      setStateWithRef(
        matchedProperties(accounts, ledgersRef.current, ['address']),
        setLedgers,
        ledgersRef
      );
    };
    handleRemovedAccounts();
    handleAddedAccounts();
    handleExistingAccounts();
  };

  const handleSubscriptions = async (address: string) => {
    if (!api) {
      return undefined;
    }

    const unsub = await api.queryMulti<AnyApi>(
      [
        [api.query.staking.ledger, address],
        [api.query.system.account, address],
        [api.query.balances.locks, address],
      ],
      async ([ledger, { data: accountData, nonce }, locks]) => {
        const handleLedger = () => {
          const newLedger = ledger.unwrapOr(null);

          if (newLedger !== null) {
            const { stash, total, active, unlocking } = newLedger;

            setStateWithRef(
              Object.values([...ledgersRef.current])
                // remove stale account if it's already in list
                .filter((l) => l.stash !== stash.toString())
                // add new ledger record to list.
                .concat({
                  address,
                  stash: stash.toString(),
                  active: new BigNumber(rmCommas(active.toString())),
                  total: new BigNumber(rmCommas(total.toString())),
                  unlocking: unlocking
                    .toHuman()
                    .map(({ era, value }: UnlockChunkRaw) => ({
                      era: Number(rmCommas(era)),
                      value: new BigNumber(rmCommas(value)),
                    })),
                }),
              setLedgers,
              ledgersRef
            );
          } else {
            // no ledger: remove account if it's already in list.
            setStateWithRef(
              Object.values([...ledgersRef.current]).filter(
                (l) => l.address !== address
              ),
              setLedgers,
              ledgersRef
            );
          }
        };

        const handleAccount = () => {
          const free = new BigNumber(accountData.free.toString());
          const newBalances: Balances = {
            address,
            nonce: nonce.toNumber(),
            balance: {
              free,
              reserved: new BigNumber(accountData.reserved.toString()),
              frozen: new BigNumber(accountData.frozen.toString()),
            },
            locks: locks.toHuman().map((l: AnyApi) => ({
              ...l,
              id: l.id.trim(),
              amount: new BigNumber(rmCommas(l.amount)),
            })),
          };

          setStateWithRef(
            Object.values(balancesRef.current)
              .filter((a) => a.address !== address)
              .concat(newBalances),
            setBalances,
            balancesRef
          );
        };

        handleLedger();
        handleAccount();
      }
    );
    unsubs.current[address] = unsub;
    return unsub;
  };

  const unsubAll = () => {
    for (const unsub of Object.values(unsubs.current)) {
      unsub();
    }
    unsubs.current = {};
  };

  // fetch account balances & ledgers. Remove or add subscriptions
  useEffectIgnoreInitial(() => {
    if (isReady) {
      handleSyncAccounts();
    }
  }, [accounts, network, isReady]);

  // Unsubscribe from subscriptions on network change & unmount.
  useEffectIgnoreInitial(() => {
    unsubAll();
    return () => unsubAll();
  }, [network]);
  // ------------------------------------------------------------------------------------

  // Needs Refactor for new state items -------------------------------------------------

  // Gets a ledger for a stash address.
  const getStashLedger = (address: MaybeAddress) =>
    getLedger(ledgersRef.current, 'stash', address);

  // Gets an account's balance metadata.
  const getBalance = (address: MaybeAddress) =>
    balancesRef.current.find((a) => a.address === address)?.balance ||
    defaults.defaultBalance;

  // Gets an account's locks.
  const getLocks = (address: MaybeAddress) =>
    balancesRef.current.find((a) => a.address === address)?.locks ?? [];

  // Gets an account's nonce.
  const getNonce = (address: MaybeAddress) =>
    balancesRef.current.find((a) => a.address === address)?.nonce ?? 0;

  // ----------------------------------------------------------------------------------

  // Handle new external account event being reported from `BalancesController`.
  const newExternalAccountCallback = (e: Event) => {
    if (isCustomEvent(e)) {
      const result = addExternalAccount(e.detail.stash, 'system');
      if (result) {
        addOrReplaceOtherAccount(result.account, result.type);
      }
    }
  };

  //Handle new account balance event being reported from `BalancesController`.
  const newAccountBalancesCallback = (e: Event) => {
    if (
      isCustomEvent(e) &&
      BalancesController.isValidNewAccountBalanceEvent(e)
    ) {
      const { address, ...newBalances } = e.detail;

      // Only update state of active accounts.
      // TODO: add check for active controller (also required in UI to sign transactions).
      if (address === activeAccount || address === activeProxyRef?.address) {
        setStateWithRef(
          { ...activeBalancesRef.current, [address]: newBalances },
          setActiveBalances,
          activeBalancesRef
        );
      }
    }
  };

  const ref = useRef<Document>(document);

  // Listen for new external account events.
  useEventListener('new-external-account', newExternalAccountCallback, ref);

  // Listen for new account balance events.
  useEventListener('new-account-balance', newAccountBalancesCallback, ref);

  // Update account balances states when active account / active proxy updates.
  //
  // If `BalancesController` does not return an account balances record for an account, the balance
  // has not yet synced. In this case, and a `new-account-balance` event will be emitted when the
  // balance is ready to be sycned with the UI.
  useEffectIgnoreInitial(() => {
    // Adds an active balance record if it exists in `BalancesController`.
    const getActiveBalances = (account: MaybeAddress) => {
      if (account) {
        const accountBalances = BalancesController.getAccountBalances(account);
        if (accountBalances) {
          newActiveBalances[account] = accountBalances;
        }
      }
    };

    // Construct new active balances state.
    const newActiveBalances: ActiveBalancesState = {};
    getActiveBalances(activeAccount);
    getActiveBalances(activeProxy);

    // Commit new active balances to state.
    setActiveBalances(newActiveBalances);
  }, [activeAccount, activeProxy]);

  // Reset state when network changes.
  useEffectIgnoreInitial(() => {
    setActiveBalances({});
  }, [network]);

  return (
    <BalancesContext.Provider
      value={{
        activeBalances,
        getStashLedger,
        getBalance,
        getLocks,
        getNonce,
      }}
    >
      {children}
    </BalancesContext.Provider>
  );
};
