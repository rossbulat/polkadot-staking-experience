// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type { AnyJson } from '@polkadot-cloud/react/types';
import type { ReactNode } from 'react';

export type PoolCommissionContextInterface = AnyJson;

export interface PoolCommissionProviderProps {
  children: ReactNode;
}

export type CompulsoryCommissionFeature = 'commission' | 'payee';

export type OptionalCommissionFeature = 'max_commission' | 'change_rate';

export type CommissionFeature =
  | CompulsoryCommissionFeature
  | OptionalCommissionFeature;
