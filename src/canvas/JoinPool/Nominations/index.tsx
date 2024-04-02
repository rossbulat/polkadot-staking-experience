// Copyright 2024 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { ValidatorList } from 'library/ValidatorList';
import { ListWrapper } from 'modals/PoolNominations/Wrappers';
import { useTranslation } from 'react-i18next';
import { HeadingWrapper, NominationsWrapper } from '../Wrappers';
import type { NominationsProps } from '../types';

export const Nominations = ({ stash, targets }: NominationsProps) => {
  const { t } = useTranslation('modals');

  return (
    <NominationsWrapper>
      <HeadingWrapper>
        <h3>
          {targets.length} Nomination{targets.length === 1 ? '' : 's'}
        </h3>
      </HeadingWrapper>
      <ListWrapper>
        {targets.length > 0 ? (
          <ValidatorList
            format="nomination"
            bondFor="pool"
            validators={targets}
            nominator={stash}
            showMenu={false}
            displayFor="canvas"
            allowListFormat={false}
            allowMoreCols={true}
            refetchOnListUpdate
          />
        ) : (
          <h3>{t('poolIsNotNominating')}</h3>
        )}
      </ListWrapper>
    </NominationsWrapper>
  );
};
