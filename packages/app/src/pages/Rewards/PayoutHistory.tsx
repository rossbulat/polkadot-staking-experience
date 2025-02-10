// Copyright 2025 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { useSize } from '@w3ux/hooks'
import { useHelp } from 'contexts/Help'
import { usePlugins } from 'contexts/Plugins'
import { useActivePool } from 'contexts/Pools/ActivePool'
import { useStaking } from 'contexts/Staking'
import { useUi } from 'contexts/UI'
import { useSyncing } from 'hooks/useSyncing'
import { CardWrapper } from 'library/Card/Wrappers'
import {
  formatSize,
  getPayoutsFromDate,
  getPayoutsToDate,
} from 'library/Graphs/Utils'
import { GraphWrapper } from 'library/Graphs/Wrapper'
import { StatusLabel } from 'library/StatusLabel'
import { DefaultLocale, locales } from 'locales'
import type { RewardResults } from 'plugin-staking-api/types'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ButtonHelp } from 'ui-buttons'
import { CardHeader, PageRow, StatRow } from 'ui-core/base'
import { ActiveGraph } from './Graph/ActiveGraph'
import { InactiveGraph } from './Graph/InactiveGraph'
import { PayoutList } from './PayoutList'
import { LastEraPayout } from './Stats/LastEraPayout'

export const PayoutHistory = () => {
  const { i18n, t } = useTranslation('pages')
  const { openHelp } = useHelp()
  const { inSetup } = useStaking()
  const { syncing } = useSyncing()
  const { containerRefs } = useUi()
  const { inPool } = useActivePool()
  const { pluginEnabled } = usePlugins()

  const nominating = !inSetup()
  const staking = nominating || inPool
  const notStaking = !syncing && !staking

  const [payoutsList, setPayoutLists] = useState<RewardResults>([])

  const ref = useRef<HTMLDivElement>(null)
  const size = useSize(ref, {
    outerElement: containerRefs?.mainInterface,
  })
  const { width, height, minHeight } = formatSize(size, 280)

  const payoutsFromDate = getPayoutsFromDate(
    payoutsList,
    locales[i18n.resolvedLanguage ?? DefaultLocale].dateFormat
  )
  const payoutsToDate = getPayoutsToDate(
    payoutsList,
    locales[i18n.resolvedLanguage ?? DefaultLocale].dateFormat
  )

  useEffect(() => {
    if (!pluginEnabled('staking_api')) {
      setPayoutLists([])
    }
  }, [pluginEnabled('staking_api')])

  return (
    <>
      <StatRow>
        <LastEraPayout />
      </StatRow>
      <PageRow>
        <CardWrapper>
          <CardHeader>
            <h4>
              {t('payouts.payoutHistory')}
              <ButtonHelp
                marginLeft
                onClick={() => openHelp('Payout History')}
              />
            </h4>
            <h2>
              {payoutsFromDate && payoutsToDate ? (
                <>
                  {payoutsFromDate}
                  {payoutsToDate !== payoutsFromDate && (
                    <>&nbsp;-&nbsp;{payoutsToDate}</>
                  )}
                </>
              ) : (
                t('payouts.none')
              )}
            </h2>
          </CardHeader>
          <div ref={ref} className="inner" style={{ minHeight }}>
            {!pluginEnabled('staking_api') ? (
              <StatusLabel
                status="active_service"
                statusFor="staking_api"
                title={t('common.stakingApiDisabled')}
                topOffset="30%"
              />
            ) : (
              notStaking && (
                <StatusLabel
                  status="sync_or_setup"
                  title={t('payouts.notStaking')}
                  topOffset="30%"
                />
              )
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
              {staking && pluginEnabled('staking_api') ? (
                <ActiveGraph
                  nominating={nominating}
                  inPool={inPool()}
                  setPayoutLists={setPayoutLists}
                />
              ) : (
                <InactiveGraph />
              )}
            </GraphWrapper>
          </div>
        </CardWrapper>
      </PageRow>
      {!!payoutsList?.length && (
        <PageRow>
          <CardWrapper>
            <PayoutList
              title={t('payouts.recentPayouts')}
              payouts={payoutsList}
              pagination
              itemsPerPage={50}
            />
          </CardWrapper>
        </PageRow>
      )}
    </>
  )
}
