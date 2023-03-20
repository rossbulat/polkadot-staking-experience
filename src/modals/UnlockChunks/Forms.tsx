// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { ButtonInvert } from '@polkadotcloud/dashboard-ui';
import { planckToUnit, rmCommas } from 'Utils';
import BigNumber from 'bignumber.js';
import { useBalances } from 'contexts/Accounts/Balances';
import { useApi } from 'contexts/Api';
import { useConnect } from 'contexts/Connect';
import { useModal } from 'contexts/Modal';
import { useActivePools } from 'contexts/Pools/ActivePools';
import { useBondedPools } from 'contexts/Pools/BondedPools';
import { usePoolMembers } from 'contexts/Pools/PoolMembers';
import { usePoolMemberships } from 'contexts/Pools/PoolMemberships';
import { usePoolsConfig } from 'contexts/Pools/PoolsConfig';
import { Warning } from 'library/Form/Warning';
import { useSubmitExtrinsic } from 'library/Hooks/useSubmitExtrinsic';
import { Action } from 'library/Modal/Action';
import { SubmitTx } from 'library/SubmitTx';
import { WarningsWrapper } from 'modals/Wrappers';
import { forwardRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContentWrapper } from './Wrappers';

export const Forms = forwardRef(
  ({ setSection, unlock, task }: any, ref: any) => {
    const { t } = useTranslation('modals');
    const { api, network, consts } = useApi();
    const { activeAccount, accountHasSigner } = useConnect();
    const { removeFavorite: removeFavoritePool } = usePoolsConfig();
    const { membership } = usePoolMemberships();
    const { selectedActivePool } = useActivePools();
    const { removeFromBondedPools } = useBondedPools();
    const { removePoolMember } = usePoolMembers();
    const { setStatus: setModalStatus, config } = useModal();
    const { getBondedAccount } = useBalances();

    const { bondFor, poolClosure } = config || {};
    const { historyDepth } = consts;
    const { units } = network;
    const controller = getBondedAccount(activeAccount);

    const isStaking = bondFor === 'nominator';
    const isPooling = bondFor === 'pool';

    // valid to submit transaction
    const [valid, setValid] = useState<boolean>(
      unlock?.value?.toNumber() > 0 ?? false
    );

    // ensure unlock value is valid
    useEffect(() => {
      setValid(unlock?.value?.toNumber() > 0 ?? false);
    }, [unlock]);

    // tx to submit
    const getTx = () => {
      let tx = null;
      if (!valid || !api) {
        return tx;
      }
      // rebond is only available when staking directly.
      if (task === 'rebond' && isStaking) {
        tx = api.tx.staking.rebond(unlock.value.toNumber());
      } else if (task === 'withdraw' && isStaking) {
        tx = api.tx.staking.withdrawUnbonded(historyDepth.toString());
      } else if (task === 'withdraw' && isPooling && selectedActivePool) {
        tx = api.tx.nominationPools.withdrawUnbonded(
          activeAccount,
          historyDepth.toString()
        );
      }
      return tx;
    };
    const signingAccount = isStaking ? controller : activeAccount;
    const { submitTx, submitting } = useSubmitExtrinsic({
      tx: getTx(),
      from: signingAccount,
      shouldSubmit: valid,
      callbackSubmit: () => {
        setModalStatus(2);
      },
      callbackInBlock: () => {
        // if pool is being closed, remove from static lists
        if (poolClosure) {
          removeFavoritePool(selectedActivePool?.addresses?.stash ?? '');
          removeFromBondedPools(selectedActivePool?.id ?? 0);
        }

        // if no more bonded funds from pool, remove from poolMembers list
        if (bondFor === 'pool') {
          const points = membership?.points ? rmCommas(membership.points) : 0;
          const bonded = planckToUnit(new BigNumber(points), network.units);
          if (bonded.isZero()) {
            removePoolMember(activeAccount);
          }
        }
      },
    });

    const value = unlock?.value ?? new BigNumber(0);

    return (
      <ContentWrapper>
        <div ref={ref}>
          <div className="padding">
            {!accountHasSigner(signingAccount) ? (
              <WarningsWrapper>
                <Warning text={t('readOnly')} />
              </WarningsWrapper>
            ) : null}

            <div style={{ marginBottom: '2rem' }}>
              {task === 'rebond' && (
                <>
                  <Action
                    text={`${t('rebond')} ${planckToUnit(value, units)} ${
                      network.unit
                    }`}
                  />
                  <p>{t('rebondSubtitle')}</p>
                </>
              )}
              {task === 'withdraw' && (
                <>
                  <Action
                    text={`${t('withdraw')} ${planckToUnit(value, units)} ${
                      network.unit
                    }`}
                  />
                  <p>{t('withdrawSubtitle')}</p>
                </>
              )}
            </div>
          </div>
          <SubmitTx
            fromController={isStaking}
            onSubmit={submitTx}
            submitting={submitting}
            valid={valid}
            buttons={[
              <ButtonInvert
                key="button_back"
                text={t('back')}
                iconLeft={faChevronLeft}
                iconTransform="shrink-1"
                onClick={() => setSection(0)}
              />,
            ]}
          />
        </div>
      </ContentWrapper>
    );
  }
);
