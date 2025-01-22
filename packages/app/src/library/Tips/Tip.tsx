// Copyright 2024 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { usePrompt } from 'contexts/Prompt'
import { Title } from 'library/Prompt/Title'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ButtonPrimary, ButtonPrimaryInvert } from 'ui-buttons'
import type { TipProps } from './types'

export const Tip = ({ title, description, page }: TipProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { closePrompt } = usePrompt()

  const [disabling, setDisabling] = useState<boolean>(false)

  return disabling ? (
    <>
      <Title title={t('module.dismissTips', { ns: 'tips' })} hideDone />
      <div className="body">
        <h4>{t('module.dismissResult', { ns: 'tips' })}</h4>
        <h4>{t('module.reEnable', { ns: 'tips' })}</h4>

        <div style={{ display: 'flex', marginTop: '1.5rem' }}>
          <ButtonPrimaryInvert
            text={t('module.cancel', { ns: 'tips' })}
            onClick={() => setDisabling(false)}
            style={{ marginLeft: '0.5rem' }}
          />
        </div>
      </div>
    </>
  ) : (
    <>
      <Title title={title} />
      <div className="body">
        {description.map((item, index: number) => (
          <h4 key={`inner_def_${index}`} className="definition">
            {item}
          </h4>
        ))}
        <div style={{ marginTop: '1.75rem', display: 'flex' }}>
          {!!page && (
            <ButtonPrimary
              marginRight
              text={`${t('goTo', { ns: 'base' })} ${t(page, {
                ns: 'base',
              })}`}
              onClick={() => {
                closePrompt()
                navigate(`/${page}`)
              }}
              iconRight={faAngleRight}
              iconTransform="shrink-1"
            />
          )}
        </div>
      </div>
    </>
  )
}
