// Copyright 2024 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type { PageItem } from 'common-types'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Page } from 'ui-structure'

export const PageWithTitle = ({ page }: { page: PageItem }) => {
  const { t } = useTranslation()
  const { Entry, key } = page

  return (
    <Page>
      <Helmet>
        <title>{`${t('title', {
          ns: 'base',
        })} : ${t(key, { ns: 'base' })}`}</title>
      </Helmet>
      <Entry page={page} />
    </Page>
  )
}
