// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopCircle } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleUp } from '@fortawesome/free-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useBalances } from 'contexts/Balances';
import { useApi } from 'contexts/Api';
import { useModal } from 'contexts/Modal';
import { useStaking } from 'contexts/Staking';
import { useSubmitExtrinsic } from 'library/Hooks/useSubmitExtrinsic';
import { useConnect } from 'contexts/Connect';
import { Warning } from 'library/Form/Warning';
import { APIContextInterface } from 'types/api';
import { ConnectContextInterface } from 'types/connect';
import { usePoolMemberships } from 'contexts/Pools/PoolMemberships';
import {
  ActivePoolContextState,
  PoolMembershipsContextState,
} from 'types/pools';
import { useActivePool } from 'contexts/Pools/ActivePool';
import {
  HeadingWrapper,
  FooterWrapper,
  Separator,
  NotesWrapper,
  PaddingWrapper,
} from '../Wrappers';

export const ChangeNominations = () => {
  const { api } = useApi() as APIContextInterface;
  const { getControllerNotImported } = useStaking();
  const { activeAccount } = useConnect() as ConnectContextInterface;
  const { getBondedAccount, getAccountNominations }: any = useBalances();
  const { setStatus: setModalStatus, config }: any = useModal();
  const { membership } = usePoolMemberships() as PoolMembershipsContextState;
  const { poolNominations, isNominator } =
    useActivePool() as ActivePoolContextState;

  const { nominations: newNominations, provider, bondType } = config;

  const isPool = bondType === 'pool';
  const isStaking = bondType === 'stake';
  const controller = getBondedAccount(activeAccount);
  const signingAccount = isPool ? activeAccount : controller;

  const nominations =
    isPool === true
      ? poolNominations.targets
      : getAccountNominations(activeAccount);
  const removing = nominations.length - newNominations.length;
  const remaining = newNominations.length;

  // valid to submit transaction
  const [valid, setValid]: any = useState(false);

  // ensure selected key is valid
  useEffect(() => {
    setValid(nominations.length > 0);
  }, [nominations]);

  // ensure selected membership and targests are valid
  let isValid = nominations.length > 0;
  if (isPool) {
    isValid = membership && isNominator() && newNominations.length > 0;
  }
  useEffect(() => {
    setValid(isValid);
  }, [isValid]);

  // tx to submit
  const tx = () => {
    let _tx = null;
    if (!valid || !api) {
      return _tx;
    }
    const targetsToSubmit = newNominations.map((item: any) =>
      isPool
        ? item?.address
        : {
            Id: item,
          }
    );
    if (isPool && remaining !== 0) {
      _tx = api.tx.nominationPools.nominate(membership.poolId, targetsToSubmit);
    } else if (isStaking && remaining !== 0) {
      _tx = api.tx.staking.nominate(targetsToSubmit);
    } else if (isStaking && remaining === 0) {
      _tx = api.tx.staking.chill();
    }
    return _tx;
  };

  const { submitTx, estimatedFee, submitting }: any = useSubmitExtrinsic({
    tx: tx(),
    from: signingAccount,
    shouldSubmit: valid,
    callbackSubmit: () => {
      setModalStatus(0);

      // if removing a subset of nominations, reset selected list
      if (provider) {
        provider.setSelectActive(false);
        provider.resetSelected();
      }
    },
    callbackInBlock: () => {},
  });

  return (
    <PaddingWrapper verticalOnly>
      <HeadingWrapper>
        <FontAwesomeIcon transform="grow-2" icon={faStopCircle} />
        Stop Nominating
      </HeadingWrapper>
      <div
        style={{
          padding: '0 1rem',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {!nominations.length && <Warning text="You have no nominations set." />}
        {isPool && !newNominations.length && (
          <Warning text="A pool needs to have at least one nomination. If the intention is to delete the pool, the pool owner can destroy it." />
        )}
        {!isPool && getControllerNotImported(controller) && (
          <Warning text="You must have your controller account imported to stop nominating." />
        )}
        <h2>
          Stop {!remaining ? 'All Nomination' : `${removing} Nomination`}
          {remaining === 1 ? '' : 's'}
        </h2>
        <Separator />
        <NotesWrapper>
          <p>
            Once submitted, your nominations will be removed from your dashboard
            immediately, and will not be nominated from the start of the next
            era.
          </p>
          <p>
            Estimated Tx Fee:{' '}
            {estimatedFee === null ? '...' : `${estimatedFee}`}
          </p>
        </NotesWrapper>
        <FooterWrapper>
          <div>
            <button
              type="button"
              className="submit"
              onClick={() => submitTx()}
              disabled={
                !valid || submitting || getControllerNotImported(controller)
              }
            >
              <FontAwesomeIcon
                transform="grow-2"
                icon={faArrowAltCircleUp as IconProp}
              />
              Submit
            </button>
          </div>
        </FooterWrapper>
      </div>
    </PaddingWrapper>
  );
};

export default ChangeNominations;
