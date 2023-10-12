// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type { AnyJson } from '@polkadot-cloud/react/types';
import type { Validator } from 'contexts/Validators/types';
import type { AnyFunction, BondFor, DisplayFor, MaybeAddress } from 'types';

export interface ValidatorListProps {
  validators: Validator[];
  bondFor: BondFor;
  allowMoreCols?: boolean;
  nominator?: MaybeAddress;
  allowFilters?: boolean;
  toggleFavorites?: boolean;
  pagination?: boolean;
  title?: string;
  format?: 'nomination' | 'default';
  selectable?: boolean;
  onSelected?: AnyFunction;
  actions?: AnyJson[];
  showMenu?: boolean;
  displayFor?: DisplayFor;
  allowSearch?: boolean;
  allowListFormat?: boolean;
  alwaysRefetchValidators?: boolean;
  defaultFilters?: AnyJson;
  disableThrottle?: boolean;
  selectActive?: boolean;
  selectToggleable?: boolean;
  refetchOnListUpdate?: boolean;
}
