// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { ButtonPrimary, ButtonPrimaryInvert } from '@polkadot-cloud/react';
import { useOverlay } from '@polkadot-cloud/react/hooks';
import type { Validator } from 'contexts/Validators/types';
import { GenerateNominations } from 'library/GenerateNominations';
import { useState } from 'react';
import { Subheading } from 'pages/Nominate/Wrappers';
import { useTranslation } from 'react-i18next';
import { useApi } from 'contexts/Api';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import type { NewNominations } from './types';

export const ManageNominations = () => {
  const { t } = useTranslation('library');
  const {
    closeCanvas,
    config: { options },
  } = useOverlay().canvas;
  const { consts } = useApi();
  const { maxNominations } = consts;

  // const { activeAccount } = useActiveAccounts();
  // const { favoritesList } = useFavoriteValidators();
  // const { isReadOnlyAccount } = useImportedAccounts();
  // const { isOwner: isPoolOwner, isNominator: isPoolNominator } =
  //   useActivePools();

  // const bondFor = options?.bondFor || 'nominator';
  // const nominator = options?.nominator || null;
  // const nominated = options?.nominated || [];
  // Determine if pool or nominator.
  // const isPool = bondFor === 'pool';

  // Default nominators, from canvas options.
  // TODO: reset button to revert to default nominations.
  // eslint-disable-next-line
  const [defaultNominations, setDefaultNominations] = useState<Validator[]>(
    options?.nominated || []
  );

  // Current nominator selection, defaults to defaultNominations.
  const [newNominations, setNewNominations] = useState<NewNominations>({
    nominations: options?.nominated || [],
  });

  // Handler for updating setup.
  const handleSetupUpdate = (value: NewNominations) => {
    setNewNominations(value);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ButtonPrimaryInvert
          text="Revert Changes"
          lg
          onClick={() => {
            setNewNominations({ nominations: defaultNominations });
          }}
          disabled={newNominations.nominations === defaultNominations}
        />
        <ButtonPrimary
          text="Cancel"
          lg
          onClick={() => closeCanvas()}
          iconLeft={faTimes}
          style={{ marginLeft: '1.1rem' }}
        />
      </div>
      <h1 style={{ marginTop: '1.5rem' }}>Manage Nominations</h1>

      <Subheading>
        <h3>
          {t('chooseValidators', {
            maxNominations: maxNominations.toString(),
          })}
        </h3>
      </Subheading>

      <GenerateNominations
        displayFor="canvas"
        setters={[
          {
            current: {
              callable: true,
              fn: () => newNominations,
            },
            set: handleSetupUpdate,
          },
        ]}
        nominations={newNominations.nominations}
      />
    </>
  );
};
