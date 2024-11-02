// Copyright 2024 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { ellipsisFn, determinePoolDisplay } from '@w3ux/utils';
import { useBondedPools } from 'contexts/Pools/BondedPools';
import { Polkicon } from '@w3ux/react-polkicon';
import { IdentityWrapper } from 'library/ListItem/Wrappers';
import type { PoolIdentityProps } from '../types';

export const PoolIdentity = ({
  pool: { addresses, id },
}: PoolIdentityProps) => {
  const { poolsMetaData } = useBondedPools();
  const metadataSynced = Object.values(poolsMetaData).length > 0 || false;

  const display = determinePoolDisplay(
    addresses.stash,
    poolsMetaData[Number(id)]
  );

  return (
    <IdentityWrapper className="identity">
      <span style={{ fontSize: '2rem' }}>
        <Polkicon address={addresses.stash} />
      </span>
      <div className="inner">
        {!metadataSynced ? (
          <h4>{ellipsisFn(addresses.stash)}</h4>
        ) : (
          <h4>{display}</h4>
        )}
      </div>
    </IdentityWrapper>
  );
};
