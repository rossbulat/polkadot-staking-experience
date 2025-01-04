// Copyright 2024 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { unitToPlanck } from '@w3ux/utils'
import { TransferKeepAlive } from 'api/tx/transferKeepAlive'
import { useActiveAccounts } from 'contexts/ActiveAccounts'
import { useNetwork } from 'contexts/Network'
import { useBatchCall } from 'hooks/useBatchCall'
import { useSubmitExtrinsic } from 'hooks/useSubmitExtrinsic'
import { Close } from 'library/Modal/Close'
import { SubmitTx } from 'library/SubmitTx'
import { useOverlay } from 'ui-overlay'
import { ModalPadding, ModalTitle } from 'ui-overlay/structure'

export const BalanceTest = () => {
  const {
    network,
    networkData: { units },
  } = useNetwork()
  const { newBatchCall } = useBatchCall()
  const { activeAccount } = useActiveAccounts()
  const { setModalStatus } = useOverlay().modal

  const getTx = () => {
    const tx = null
    if (!activeAccount) {
      return tx
    }

    const txs = [
      new TransferKeepAlive(
        network,
        '1554u1a67ApEt5xmjbZwjgDNaVckbzB6cjRHWAQ1SpNkNxTd',
        unitToPlanck('0.1', units)
      ).tx(),
      new TransferKeepAlive(
        network,
        '1554u1a67ApEt5xmjbZwjgDNaVckbzB6cjRHWAQ1SpNkNxTd',
        unitToPlanck('0.1', units)
      ).tx(),
    ]
    const batch = newBatchCall(txs, activeAccount)
    return batch
  }

  const submitExtrinsic = useSubmitExtrinsic({
    tx: getTx(),
    from: activeAccount,
    shouldSubmit: true,
    callbackSubmit: () => {
      setModalStatus('closing')
    },
  })

  return (
    <>
      <Close />
      <ModalPadding>
        <ModalTitle>Balance Test</ModalTitle>
      </ModalPadding>
      <SubmitTx valid {...submitExtrinsic} />
    </>
  )
}
