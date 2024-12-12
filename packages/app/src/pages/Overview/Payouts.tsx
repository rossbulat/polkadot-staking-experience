// Copyright 2024 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { useSize } from '@w3ux/hooks'
import { Odometer } from '@w3ux/react-odometer'
import type { AnyJson } from '@w3ux/types'
import { minDecimalPlaces } from '@w3ux/utils'
import BigNumber from 'bignumber.js'
import { useActiveAccounts } from 'contexts/ActiveAccounts'
import { useApi } from 'contexts/Api'
import { useNetwork } from 'contexts/Network'
import { usePlugins } from 'contexts/Plugins'
import { useStaking } from 'contexts/Staking'
import { useUi } from 'contexts/UI'
import { formatDistance, fromUnixTime, getUnixTime } from 'date-fns'
import { useSubscanData } from 'hooks/useSubscanData'
import { useSyncing } from 'hooks/useSyncing'
import { CardHeaderWrapper } from 'library/Card/Wrappers'
import { PayoutBar } from 'library/Graphs/PayoutBar'
import { PayoutLine } from 'library/Graphs/PayoutLine'
import { formatRewardsForGraphs, formatSize } from 'library/Graphs/Utils'
import { GraphWrapper } from 'library/Graphs/Wrapper'
import { StatusLabel } from 'library/StatusLabel'
import { DefaultLocale, locales } from 'locales'
import { ApolloProvider, client, useRewards } from 'plugin-staking-api'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { planckToUnitBn } from 'utils'

export const PayoutsInner = () => {
  const { i18n, t } = useTranslation('pages')
  const {
    networkData: {
      units,
      brand: { token: Token },
    },
  } = useNetwork()
  const { activeEra } = useApi()
  const { inSetup } = useStaking()
  const { syncing } = useSyncing()
  const { plugins } = usePlugins()
  const { network } = useNetwork()
  const { containerRefs } = useUi()
  const { poolClaims } = useSubscanData()
  const { activeAccount } = useActiveAccounts()

  const { data } = useRewards({
    chain: network,
    who: activeAccount || '',
    fromEra: Math.max(activeEra.index.minus(1).toNumber(), 0),
  })

  const allRewards = data?.allRewards ?? []
  const payouts =
    allRewards.filter((reward: AnyJson) => reward.claimed === true) ?? []

  const unclaimedPayouts =
    allRewards.filter((reward: AnyJson) => reward.claimed === false) ?? []

  const notStaking = !syncing && inSetup()

  // Ref to the graph container.
  const graphInnerRef = useRef<HTMLDivElement>(null)

  // Get the size of the graph container.
  const size = useSize(graphInnerRef, {
    outerElement: containerRefs?.mainInterface,
  })
  const { width, height, minHeight } = formatSize(size, 260)

  // Get the last reward with its timestmap.
  const { lastReward } = formatRewardsForGraphs(
    new Date(),
    14,
    units,
    payouts,
    poolClaims,
    unclaimedPayouts
  )
  let formatFrom = new Date()
  let formatTo = new Date()
  let formatOpts = {}
  if (lastReward !== null) {
    formatFrom = fromUnixTime(lastReward?.timestamp ?? getUnixTime(new Date()))
    formatTo = new Date()
    formatOpts = {
      addSuffix: true,
      locale: locales[i18n.resolvedLanguage ?? DefaultLocale].dateFormat,
    }
  }

  return (
    <>
      <CardHeaderWrapper>
        <h4>{t('overview.recentPayouts')}</h4>
        <h2>
          <Token className="networkIcon" />
          <Odometer
            value={minDecimalPlaces(
              lastReward === null
                ? '0'
                : planckToUnitBn(
                    new BigNumber(lastReward.amount),
                    units
                  ).toFormat(),
              2
            )}
          />
          <span className="note">
            {lastReward === null ? (
              ''
            ) : (
              <>&nbsp;{formatDistance(formatFrom, formatTo, formatOpts)}</>
            )}
          </span>
        </h2>
      </CardHeaderWrapper>
      <div className="inner" ref={graphInnerRef} style={{ minHeight }}>
        {!plugins.includes('subscan') ? (
          <StatusLabel
            status="active_service"
            statusFor="subscan"
            title={t('overview.subscanDisabled')}
            topOffset="37%"
          />
        ) : (
          <StatusLabel
            status="sync_or_setup"
            title={t('overview.notStaking')}
            topOffset="37%"
          />
        )}
        <GraphWrapper
          style={{
            height: `${height}px`,
            width: `${width}px`,
            position: 'absolute',
            opacity: notStaking ? 0.75 : 1,
            transition: 'opacity 0.5s',
          }}
        >
          <PayoutBar
            days={19}
            height="150px"
            data={{ payouts, unclaimedPayouts, poolClaims }}
          />
          <div style={{ marginTop: '3rem' }}>
            <PayoutLine
              days={19}
              average={10}
              height="65px"
              data={{ payouts, unclaimedPayouts, poolClaims }}
            />
          </div>
        </GraphWrapper>
      </div>
    </>
  )
}

export const Payouts = () => (
  <ApolloProvider client={client}>
    <PayoutsInner />
  </ApolloProvider>
)
