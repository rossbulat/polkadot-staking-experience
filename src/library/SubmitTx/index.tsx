// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { faPenToSquare, faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useApi } from 'contexts/Api';
import { useModal } from 'contexts/Modal';
import { useTxFees } from 'contexts/TxFees';
import { EstimatedTxFee } from 'library/EstimatedTxFee';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Submit } from './Submit';
import { Wrapper } from './Wrappers';
import type { SubmitTxProps } from './types';

export const SubmitTx = ({
  onSubmit,
  submitText,
  buttons = [],
  valid = false,
  noMargin = false,
  submitting = false,
  fromController = false,
}: SubmitTxProps) => {
  const { t } = useTranslation('library');
  const { unit } = useApi().network;
  const { notEnoughFunds } = useTxFees();
  const { setResize } = useModal();

  const displayNote = notEnoughFunds || fromController;

  useEffect(() => {
    setResize();
  }, [notEnoughFunds, fromController]);

  return (
    <Wrapper noMargin={noMargin}>
      <div className="inner">
        {displayNote ? (
          <p className="sign">
            {fromController ? (
              <>
                <FontAwesomeIcon icon={faPenToSquare} className="icon" />
                {t('signedByController')}
              </>
            ) : null}
            {notEnoughFunds ? (
              <>
                {fromController ? ' / ' : null}
                <FontAwesomeIcon
                  icon={faWarning}
                  className="danger"
                  transform="shrink-1"
                />{' '}
                <span className="danger">
                  {t('notEnough')} {unit}
                </span>
              </>
            ) : null}
          </p>
        ) : null}
        <section className="foot">
          <div>
            <EstimatedTxFee />
          </div>
          <div>
            {buttons}
            <Submit
              onSubmit={onSubmit}
              submitting={submitting}
              valid={valid}
              submitText={submitText}
            />
          </div>
        </section>
      </div>
    </Wrapper>
  );
};
