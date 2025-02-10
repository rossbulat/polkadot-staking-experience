// Copyright 2025 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type { TimeLeftFormatted } from '@w3ux/types'
import type { ReactNode } from 'react'

export interface NumberProps {
  label: string
  value: number
  decimals?: number
  unit: string
  helpKey: string
}

export interface PieProps {
  label: string
  stat: {
    value: string | number
    unit: string | number
    total?: string | number
  }
  pieValue: number
  tooltip?: string
  helpKey: string
}

export interface TextProps {
  primary?: boolean
  label: string
  value: string
  secondaryValue?: string
  helpKey: string
}

export interface TimeleftProps {
  label: string
  timeleft: TimeLeftFormatted
  graph: {
    value1: number
    value2: number
  }
  tooltip?: string
  helpKey?: string
}

export interface ButtonProps {
  Icon: ReactNode
  label: string
  title: string
  helpKey?: string
  active: boolean
  onClick: () => void
}
