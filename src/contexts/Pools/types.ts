// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BigNumber from 'bignumber.js';
import type { AnyApi, AnyJson, AnyMetaBatch, MaybeAccount, Sync } from 'types';

// PoolsConfig types
export interface PoolsConfigContextState {
  addFavorite: (a: string) => void;
  removeFavorite: (a: string) => void;
  createAccounts: (p: number) => PoolAddresses;
  favorites: string[];
  stats: PoolStats;
}

export interface PoolConfigState {
  stats: PoolStats;
  unsub: AnyApi;
}

export type ClaimPermission =
  | 'Permissioned'
  | 'PermissionlessCompound'
  | 'PermissionlessWithdraw'
  | 'PermissionlessAll';

export interface PoolStats {
  counterForPoolMembers: BigNumber;
  counterForBondedPools: BigNumber;
  counterForRewardPools: BigNumber;
  lastPoolId: BigNumber;
  maxPoolMembers: BigNumber;
  maxPoolMembersPerPool: BigNumber;
  maxPools: BigNumber;
  minCreateBond: BigNumber;
  minJoinBond: BigNumber;
  globalMaxCommission: number;
}

// PoolMemberships types
export interface PoolMembershipsContextState {
  getActiveAccountPoolMembership: () => PoolMembership | null;
  getAccountPoolMembership: (a: MaybeAccount) => PoolMembership | null;
  memberships: PoolMembership[];
  claimPermissionConfig: ClaimPermissionConfig[];
}

export interface PoolMembership {
  address: string;
  poolId: number;
  points: string;
  lastRecordedRewardCounter: string;
  unbondingEras: Record<number, string>;
  claimPermission: ClaimPermission;
  unlocking: {
    era: number;
    value: BigNumber;
  }[];
}

// BondedPool types
export interface BondedPoolsContextState {
  fetchPoolsMetaBatch: (k: string, v: [], r?: boolean) => void;
  queryBondedPool: (p: number) => any;
  getBondedPool: (p: number) => BondedPool | null;
  updateBondedPools: (p: BondedPool[]) => void;
  addToBondedPools: (p: BondedPool) => void;
  removeFromBondedPools: (p: number) => void;
  getPoolNominationStatus: (n: MaybeAccount, o: MaybeAccount) => any;
  getPoolNominationStatusCode: (t: NominationStatuses | null) => string;
  getAccountRoles: (w: MaybeAccount) => any;
  getAccountPools: (w: MaybeAccount) => any;
  replacePoolRoles: (poolId: number, roleEdits: AnyJson) => void;
  poolSearchFilter: (l: any, k: string, v: string) => void;
  bondedPools: BondedPool[];
  meta: AnyMetaBatch;
}

export interface ActivePool {
  id: number;
  addresses: PoolAddresses;
  bondedPool: any;
  rewardPool: any;
  rewardAccountBalance: any;
  pendingRewards: any;
}

export interface BondedPool {
  addresses: PoolAddresses;
  id: number | string;
  memberCounter: string;
  points: string;
  roles: {
    depositor: string;
    nominator: string;
    root: string;
    bouncer: string;
  };
  state: PoolState;
  commission?: {
    current?: AnyJson | null;
    max?: AnyJson | null;
    changeRate: {
      maxIncrease: AnyJson;
      minDelay: AnyJson;
    } | null;
    throttleFrom?: AnyJson | null;
  };
}

export type NominationStatuses = Record<string, string>;

export interface ActivePoolsContextState {
  isBonding: () => boolean;
  isNominator: () => boolean;
  isOwner: () => boolean;
  isMember: () => boolean;
  isDepositor: () => boolean;
  isBouncer: () => boolean;
  getPoolBondedAccount: () => MaybeAccount;
  getPoolUnlocking: () => any;
  getPoolRoles: () => PoolRoles;
  setTargets: (t: any) => void;
  getNominationsStatus: () => NominationStatuses;
  setSelectedPoolId: (p: string) => void;
  selectedActivePool: ActivePool | null;
  targets: any;
  poolNominations: any;
  synced: Sync;
}

// PoolMembers types
export interface PoolMemberContext {
  fetchPoolMembersMetaBatch: (k: string, v: [], r: boolean) => void;
  queryPoolMember: (w: MaybeAccount) => any;
  getMembersOfPool: (p: number) => any;
  addToPoolMembers: (m: any) => void;
  getPoolMember: (w: MaybeAccount) => any | null;
  removePoolMember: (w: MaybeAccount) => void;
  poolMembers: any;
  meta: AnyMetaBatch;
}

// Misc types
export interface PoolRoles {
  depositor: string;
  nominator: string;
  root: string;
  bouncer: string;
}

export interface PoolAddresses {
  stash: string;
  reward: string;
}

export type MaybePool = number | null;

export type PoolState = 'Open' | 'Blocked' | 'Destroying';

export interface ClaimPermissionConfig {
  label: string;
  value: ClaimPermission;
  description: string;
}
