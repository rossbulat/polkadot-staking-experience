// Copyright 2024 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { Checkbox } from 'ui-core/list'
import { useList } from '../../List/context'
import type { SelectProps } from '../types'

export const Select = ({ item }: SelectProps) => {
  const { addToSelected, removeFromSelected, selected } = useList()
  const isSelected = selected.includes(item)
  return (
    <Checkbox
      checked={isSelected}
      onClick={() => {
        if (isSelected) {
          removeFromSelected([item])
        } else {
          addToSelected(item)
        }
      }}
    />
  )
}
