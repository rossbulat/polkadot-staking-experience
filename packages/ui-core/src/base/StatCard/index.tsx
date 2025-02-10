// Copyright 2025 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type { ComponentBase } from '@w3ux/types'
import classNames from 'classnames'
import classes from './index.module.scss'

/**
 * @name StatCard
 * @summary Used to house a Stat item within a `StatRow`.
 */
export const StatCard = ({ children, style }: ComponentBase) => (
  <div className={classes.statCard} style={style}>
    {children}
  </div>
)

/**
 * @name StatButton
 * @summary Used to house a Stat item as a button within a `StatRow`.
 */
export const StatButton = ({ children, style }: ComponentBase) => {
  const allClasses = classNames(classes.statCard, classes.button)

  return (
    <div className={allClasses} style={style}>
      {children}
    </div>
  )
}
