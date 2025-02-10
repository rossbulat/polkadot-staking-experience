// Copyright 2025 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PageTitle } from 'ui-core/base'
import { Active } from './Active'
import { PayoutHistory } from './PayoutHistory'
import { Wrapper } from './Wrappers'

export const Rewards = () => {
  const { t } = useTranslation('pages')
  const [activeTab, setActiveTab] = useState<number>(0)

  return (
    <Wrapper>
      <PageTitle
        title={t('rewards.rewardsCalculator')}
        tabs={[
          {
            title: t('rewards.calculator'),
            active: activeTab === 0,
            onClick: () => setActiveTab(0),
          },
          {
            title: t('payouts.payoutHistory'),
            active: activeTab === 1,
            onClick: () => setActiveTab(1),
          },
        ]}
      />
      {activeTab === 0 && <Active />}
      {activeTab === 1 && <PayoutHistory />}
    </Wrapper>
  )
}
