// Copyright 2025 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type { AnyApi } from 'common-types'
import { MaxPayoutDays } from 'consts'
import { useActiveAccounts } from 'contexts/ActiveAccounts'
import { useApi } from 'contexts/Api'
import { useNetwork } from 'contexts/Network'
import { getUnixTime } from 'date-fns'
import { AveragePayoutLine } from 'library/Graphs/AveragePayoutLine'
import { PayoutBar } from 'library/Graphs/PayoutBar'
import { removeNonZeroAmountAndSort } from 'library/Graphs/Utils'
import { usePoolRewards, useRewards } from 'plugin-staking-api'
import type { NominatorReward, RewardResults } from 'plugin-staking-api/types'
import { useEffect } from 'react'

interface Props {
  nominating: boolean
  inPool: boolean
  setPayoutLists: (payouts: AnyApi[]) => void
}

export const ActiveGraph = ({ nominating, inPool, setPayoutLists }: Props) => {
  const { activeEra } = useApi()
  const { network } = useNetwork()
  const { activeAccount } = useActiveAccounts()

  const { data: nominatorRewardsData, loading: rewardsLoading } = useRewards({
    chain: network,
    who: activeAccount || '',
    fromEra: Math.max(activeEra.index.minus(1).toNumber(), 0),
  })

  const fromDate = new Date()
  fromDate.setDate(fromDate.getDate() - MaxPayoutDays)
  fromDate.setHours(0, 0, 0, 0)

  const { data: poolRewardsData, loading: poolRewardsLoading } = usePoolRewards(
    {
      chain: network,
      who: activeAccount || '',
      from: getUnixTime(fromDate),
    }
  )

  const allRewards = nominatorRewardsData?.allRewards ?? []
  const payouts =
    allRewards.filter((reward: NominatorReward) => reward.claimed === true) ??
    []
  const unclaimedPayouts =
    allRewards.filter((reward: NominatorReward) => reward.claimed === false) ??
    []
  const poolClaims = poolRewardsData?.poolRewards ?? []

  useEffect(() => {
    // filter zero rewards and order via timestamp, most recent first
    const payoutsList = (allRewards as RewardResults).concat(
      poolClaims
    ) as RewardResults
    setPayoutLists(removeNonZeroAmountAndSort(payoutsList))
  }, [JSON.stringify(payouts), JSON.stringify(poolClaims)])

  return (
    <>
      <PayoutBar
        days={MaxPayoutDays}
        height="165px"
        data={{ payouts, unclaimedPayouts, poolClaims }}
        nominating={nominating}
        inPool={inPool}
        syncing={rewardsLoading || poolRewardsLoading}
      />
      <AveragePayoutLine
        days={MaxPayoutDays}
        average={10}
        height="65px"
        data={{ payouts, unclaimedPayouts, poolClaims }}
        nominating={nominating}
        inPool={inPool}
      />
    </>
  )
}
