// Copyright 2025 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { faTimes, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHelp } from 'contexts/Help'
import { ButtonHelp } from 'ui-buttons'
import {
  StatButton,
  StatContent,
  StatGraphic,
  StatSubtitle,
  StatTitle,
} from 'ui-core/base'
import type { ButtonProps } from './types'

export const Button = ({
  Icon,
  label,
  title,
  helpKey,
  onClick,
  active,
}: ButtonProps) => {
  const { openHelp } = useHelp()

  return (
    <StatButton>
      <button type="button" onClick={() => onClick()}>
        <div style={{ position: 'absolute', right: '2rem', top: '0.5rem' }}>
          {active ? (
            <FontAwesomeIcon
              icon={faTimes}
              color="var(--text-color-secondary)"
            />
          ) : (
            <FontAwesomeIcon
              icon={faUpRightFromSquare}
              transform="shrink-3"
              color="var(--text-color-secondary)"
            />
          )}
        </div>
        <StatGraphic>{Icon}</StatGraphic>
        <StatContent>
          <StatTitle>{title}</StatTitle>
          <StatSubtitle primary>
            {label}{' '}
            {helpKey !== undefined ? (
              <ButtonHelp marginLeft onClick={() => openHelp(helpKey)} />
            ) : null}
          </StatSubtitle>
        </StatContent>
      </button>
    </StatButton>
  )
}
