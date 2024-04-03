// Copyright 2024 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type BigNumber from 'bignumber.js';
import type { Sync } from 'types';

export interface PoolPerformanceContextInterface {
  getPoolRewardPoints: (key: PoolRewardPointsBatchKey) => PoolRewardPoints;
  getPerformanceFetchedKey: (
    key: PoolRewardPointsBatchKey
  ) => PoolPerformanceFetchingStatus;
  setPerformanceFetchedKey: (
    key: PoolRewardPointsBatchKey,
    status: Sync,
    addresses: string[],
    currentEra: BigNumber,
    endEra: BigNumber
  ) => void;
  updatePerformanceFetchedKey: (
    key: PoolRewardPointsBatchKey,
    status: Sync
  ) => void;
  startGetPoolPerformance: (
    key: PoolRewardPointsBatchKey,
    addresses: string[]
  ) => void;
}

// Fetching status for keys.
export type PoolPerformanceFetched = Partial<
  Record<PoolRewardPointsBatchKey, PoolPerformanceFetchingStatus>
>;

// Performance fetching status.
export interface PoolPerformanceFetchingStatus {
  status: Sync;
  addresses: string[];
  currentEra: BigNumber;
  endEra: BigNumber;
}

/*
 * Batch Key -> Pool Address -> Era -> Points.
 */

// Supported reward points batch keys.
export type PoolRewardPointsBatchKey = 'pool_list' | 'pool_page' | 'join_pool';

// Pool reward batches, keyed by batch key.
export type PoolRewardPointsBatch = Partial<Record<string, PoolRewardPoints>>;

// Pool reward points are keyed by era, then by pool address.

export type PoolRewardPoints = Record<PoolAddress, PointsByEra>;

export type PointsByEra = Record<EraKey, EraPoints>;

// Type aliases to better understand pool reward records.

export type PoolAddress = string;

export type EraKey = number;

export type EraPoints = string;
