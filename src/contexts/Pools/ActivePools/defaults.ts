// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function */

import type { ActivePoolsContextState } from './types';

export const nominationStatus = {};

export const defaultPoolRoles = {
  depositor: '',
  nominator: '',
  root: '',
  bouncer: '',
};

export const defaultPoolNominations = {
  targets: [],
  submittedIn: 0,
};

export const defaultActivePoolContext: ActivePoolsContextState = {
  isBonding: () => false,
  isNominator: () => false,
  isOwner: () => false,
  isMember: () => false,
  isDepositor: () => false,
  isBouncer: () => false,
  getPoolBondedAccount: () => null,
  getPoolUnlocking: () => [],
  getPoolRoles: () => defaultPoolRoles,
  getNominationsStatus: () => nominationStatus,
  setSelectedPoolId: (p) => {},
  activePool: null,
  poolNominations: null,
  selectedPoolMemberCount: 0,
};
