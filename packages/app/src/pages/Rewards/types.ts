// Copyright 2025 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type { AnyApi } from 'common-types'

export interface PayoutListProps {
  allowMoreCols?: boolean
  pagination?: boolean
  title?: string | null
  itemsPerPage: number
  payoutsList?: AnyApi
  payouts?: AnyApi
}

export interface CalculatorMetrics {
  currentStake: number
  averageRewardRate: number
  isInPool: boolean
  historicalRewards: {
    total: number
    totalUsdt: number
  }
}
