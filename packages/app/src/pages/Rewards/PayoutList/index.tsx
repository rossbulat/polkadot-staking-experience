// Copyright 2025 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { faBars, faGripVertical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ellipsisFn } from '@w3ux/utils'
import BigNumber from 'bignumber.js'
import { useApi } from 'contexts/Api'
import { ListProvider, useList } from 'contexts/List'
import { useNetwork } from 'contexts/Network'
import { useBondedPools } from 'contexts/Pools/BondedPools'
import { useThemeValues } from 'contexts/ThemeValues'
import { useValidators } from 'contexts/Validators/ValidatorEntries'
import { formatDistance, fromUnixTime } from 'date-fns'
import { motion } from 'framer-motion'
import { Header, List, Wrapper as ListWrapper } from 'library/List'
import { MotionContainer } from 'library/List/MotionContainer'
import { Pagination } from 'library/List/Pagination'
import { Identity } from 'library/ListItem/Labels/Identity'
import { PoolIdentity } from 'library/ListItem/Labels/PoolIdentity'
import { DefaultLocale, locales } from 'locales'
import { isPoolReward } from 'plugin-staking-api'
import type {
  NominatorReward,
  PoolReward,
  RewardResults,
} from 'plugin-staking-api/types'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { BondedPool } from 'types'
import { planckToUnitBn } from 'utils'
import { ItemWrapper } from '../Wrappers'
import type { PayoutListProps } from '../types'

export const PayoutListInner = ({
  allowMoreCols,
  pagination,
  title,
  payouts: initialPayouts,
  itemsPerPage,
}: PayoutListProps) => {
  const { i18n, t } = useTranslation('pages')
  const { isReady, activeEra } = useApi()
  const {
    networkData: { units, unit },
  } = useNetwork()
  const { bondedPools } = useBondedPools()
  const { getValidators } = useValidators()
  const { getThemeValue } = useThemeValues()
  const {
    listFormat,
    setListFormat,
    pagination: { page, setPage },
  } = useList()

  // Manipulated list (ordering, filtering) of payouts
  const [payouts, setPayouts] = useState<RewardResults>(initialPayouts)

  // Whether still in initial fetch
  const [fetched, setFetched] = useState<boolean>(false)

  const totalPages = Math.ceil(payouts.length / itemsPerPage)
  const pageEnd = page * itemsPerPage - 1
  const pageStart = pageEnd - (itemsPerPage - 1)

  // Refetch list when list changes
  useEffect(() => {
    setFetched(false)
  }, [initialPayouts])

  // Configure list when network is ready to fetch
  useEffect(() => {
    if (isReady && !activeEra.index.isZero() && !fetched) {
      setPayouts(initialPayouts)
      setFetched(true)
    }
  }, [isReady, fetched, activeEra.index])

  const listPayouts = payouts.slice(pageStart).slice(0, itemsPerPage)
  if (!listPayouts.length) {
    return null
  }

  return (
    <ListWrapper>
      <Header>
        <div>
          <h4>{title}</h4>
        </div>
        <div>
          <button type="button" onClick={() => setListFormat('row')}>
            <FontAwesomeIcon
              icon={faBars}
              color={
                listFormat === 'row'
                  ? getThemeValue('--accent-color-primary')
                  : 'inherit'
              }
            />
          </button>
          <button type="button" onClick={() => setListFormat('col')}>
            <FontAwesomeIcon
              icon={faGripVertical}
              color={
                listFormat === 'col'
                  ? getThemeValue('--accent-color-primary')
                  : 'inherit'
              }
            />
          </button>
        </div>
      </Header>
      <List $flexBasisLarge={allowMoreCols ? '33.33%' : '50%'}>
        {pagination && (
          <Pagination page={page} total={totalPages} setter={setPage} />
        )}
        <MotionContainer>
          {listPayouts.map((p: NominatorReward | PoolReward, index: number) => {
            const poolReward = isPoolReward(p)
            const record = poolReward
              ? (p as PoolReward)
              : (p as NominatorReward)

            const label = poolReward
              ? t('payouts.poolClaim')
              : t('payouts.payout')

            const labelClass = poolReward ? 'claim' : 'reward'

            let batchIndex
            let pool: BondedPool | undefined
            if (poolReward) {
              const item = p as PoolReward
              pool = bondedPools.find(({ id }) => id === item.poolId)
              batchIndex = pool ? bondedPools.indexOf(pool) : 0
            } else {
              const item = p as NominatorReward
              const validator = getValidators().find(
                (v) => v.address === item.validator
              )
              batchIndex = validator ? getValidators().indexOf(validator) : 0
            }

            return (
              <motion.div
                className={`item ${listFormat === 'row' ? 'row' : 'col'}`}
                key={`nomination_${index}`}
                variants={{
                  hidden: {
                    y: 15,
                    opacity: 0,
                  },
                  show: {
                    y: 0,
                    opacity: 1,
                  },
                }}
              >
                <ItemWrapper>
                  <div className="inner">
                    <div className="row">
                      <div>
                        <div>
                          <h4 className={labelClass}>
                            <>
                              +
                              {planckToUnitBn(
                                new BigNumber(record.reward),
                                units
                              ).toString()}{' '}
                              {unit}
                            </>
                          </h4>
                        </div>
                        <div>
                          <h5 className={labelClass}>{label}</h5>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div>
                        <div>
                          {!poolReward ? (
                            <NominatorIdentity
                              batchIndex={batchIndex}
                              address={(record as NominatorReward).validator}
                            />
                          ) : (
                            <PoolClaim
                              pool={pool}
                              poolId={(record as PoolReward).poolId}
                            />
                          )}
                          {label === t('payouts.slashed') && (
                            <h4>{t('payouts.deductedFromBond')}</h4>
                          )}
                        </div>
                        <div>
                          <h5>
                            {formatDistance(
                              fromUnixTime(record.timestamp),
                              new Date(),
                              {
                                addSuffix: true,
                                locale:
                                  locales[
                                    i18n.resolvedLanguage ?? DefaultLocale
                                  ].dateFormat,
                              }
                            )}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </ItemWrapper>
              </motion.div>
            )
          })}
        </MotionContainer>
      </List>
    </ListWrapper>
  )
}

export const PayoutList = (props: PayoutListProps) => (
  <ListProvider>
    <PayoutListInner {...props} />
  </ListProvider>
)

export const NominatorIdentity = ({
  batchIndex,
  address,
}: {
  batchIndex: number
  address: string
}) =>
  batchIndex > 0 ? (
    <Identity address={address} />
  ) : (
    <div>{ellipsisFn(address)}</div>
  )

export const PoolClaim = ({
  pool,
  poolId,
}: {
  pool: BondedPool | undefined
  poolId: number
}) => {
  const { t } = useTranslation('pages')
  return pool ? (
    <PoolIdentity pool={pool} />
  ) : (
    <h4>
      {t('payouts.fromPool')} {poolId}
    </h4>
  )
}
