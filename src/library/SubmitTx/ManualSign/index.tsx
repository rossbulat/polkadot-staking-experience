// Copyright 2024 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useTxMeta } from 'contexts/TxMeta';
import { useImportedAccounts } from 'contexts/Connect/ImportedAccounts';
import type { SubmitProps } from '../types';
import { Ledger } from './Ledger';
import { Vault } from './Vault';

export const ManualSign = (props: SubmitProps & { buttons?: ReactNode[] }) => {
  const { getAccount } = useImportedAccounts();
  const { getTxSignature, sender } = useTxMeta();
  const accountMeta = getAccount(sender);
  const source = accountMeta?.source;

  const { onSubmit } = props;

  // Automatically submit transaction once it is signed.
  useEffect(() => {
    if (getTxSignature() !== null) {
      onSubmit();
    }
  }, [getTxSignature()]);

  // Determine which signing method to use. NOTE: Falls back to `ledger` on all other sources to
  // ensure submit button is displayed.
  switch (source) {
    case 'vault':
      return <Vault {...props} />;
    default:
      return <Ledger {...props} />;
  }
};
