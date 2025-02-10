// Copyright 2025 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { useApi } from 'contexts/Api'
import { useNetwork } from 'contexts/Network'
import { Number } from 'library/StatCards/Number'
import { useTranslation } from 'react-i18next'
import { planckToUnitBn } from 'utils'

export const LastEraPayout = () => {
  const { t } = useTranslation('pages')
  const { unit, units } = useNetwork().networkData
  const { lastReward } = useApi().stakingMetrics

  const lastRewardUnit = planckToUnitBn(lastReward, units).toNumber()

  const params = {
    label: t('payouts.lastEraPayout'),
    value: lastRewardUnit,
    decimals: 3,
    unit,
    helpKey: 'Last Era Payout',
  }
  return <Number {...params} />
}
