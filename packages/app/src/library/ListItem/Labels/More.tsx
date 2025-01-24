// Copyright 2024 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { useTranslation } from 'react-i18next'
import type { BondedPool } from 'types'
import { HeaderButton } from 'ui-core/list'
import { useOverlay } from 'ui-overlay'

export const More = ({
  pool,
  setActiveTab,
  disabled,
}: {
  pool: BondedPool
  setActiveTab: (t: number) => void
  disabled: boolean
}) => {
  const { t } = useTranslation('tips')
  const { openCanvas } = useOverlay().canvas
  const { id } = pool

  // Define a unique pool performance data key
  const performanceKey = `pool_page_standalone_${id}`

  return (
    <HeaderButton withText>
      <button
        type="button"
        onClick={() => {
          openCanvas({
            key: 'Pool',
            options: {
              providedPool: {
                id,
                performanceBatchKey: performanceKey,
              },
              onJoinCallback: () => setActiveTab(0),
            },
            size: 'xl',
          })
        }}
        disabled={disabled}
      >
        {t('module.more')}
      </button>
    </HeaderButton>
  )
}
