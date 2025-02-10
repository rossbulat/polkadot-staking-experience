// Copyright 2025 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { MaxPayoutDays } from 'consts'
import { AveragePayoutLine } from 'library/Graphs/AveragePayoutLine'
import { PayoutBar } from 'library/Graphs/PayoutBar'

export const InactiveGraph = () => (
  <>
    <PayoutBar
      days={MaxPayoutDays}
      height="165px"
      data={{ payouts: [], unclaimedPayouts: [], poolClaims: [] }}
      nominating={false}
      inPool={false}
      syncing={false}
    />
    <AveragePayoutLine
      days={MaxPayoutDays}
      average={10}
      height="65px"
      data={{ payouts: [], unclaimedPayouts: [], poolClaims: [] }}
      nominating={false}
      inPool={false}
    />
  </>
)
