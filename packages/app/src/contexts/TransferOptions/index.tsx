// Copyright 2025 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { useEffectIgnoreInitial } from '@w3ux/hooks'
import BigNumber from 'bignumber.js'
import { useActiveAccounts } from 'contexts/ActiveAccounts'
import { useApi } from 'contexts/Api'
import { useBalances } from 'contexts/Balances'
import { getUnlocking } from 'contexts/Balances/Utils'
import { useNetwork } from 'contexts/Network'
import type { ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'
import type { MaybeAddress } from 'types'
import { planckToUnitBn } from 'utils'
import { defaultTransferOptionsContext } from './defaults'
import type { TransferOptions, TransferOptionsContextInterface } from './types'
import { getLocalFeeReserve, setLocalFeeReserve } from './Utils'

export const TransferOptionsContext =
  createContext<TransferOptionsContextInterface>(defaultTransferOptionsContext)

export const useTransferOptions = () => useContext(TransferOptionsContext)

export const TransferOptionsProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const {
    network,
    networkData: { units, defaultFeeReserve },
  } = useNetwork()
  const { consts, activeEra } = useApi()
  const { activeAccount } = useActiveAccounts()
  const { getLedger, getBalance, getLocks, getPoolMembership } = useBalances()
  const { existentialDeposit } = consts
  const membership = getPoolMembership(activeAccount)

  // A user-configurable reserve amount to be used to pay for transaction fees
  const [feeReserve, setFeeReserve] = useState<BigNumber>(
    getLocalFeeReserve(activeAccount, defaultFeeReserve, { network, units })
  )

  // Calculates various balances for an account pertaining to free balance, nominating and pools.
  // Gets balance numbers from `useBalances` state, which only takes the active accounts from
  // `Balances`
  const getTransferOptions = (address: MaybeAddress): TransferOptions => {
    const { maxLock } = getLocks(address)
    const { free, frozen } = getBalance(address)
    const { active, total, unlocking } = getLedger({ stash: address })

    // Calculate a forced amount of free balance that needs to be reserved to keep the account
    // alive. Deducts `locks` from free balance reserve needed
    const edReserved = BigNumber.max(existentialDeposit.minus(maxLock), 0)

    // Total free balance after `edReserved` is subtracted
    const freeMinusReserve = BigNumber.max(
      free.minus(edReserved).minus(feeReserve),
      0
    )
    // Free balance that can be transferred
    const transferrableBalance = BigNumber.max(
      freeMinusReserve.minus(frozen),
      0
    )
    // Free balance to pay for tx fees. Does not factor `feeReserve`
    const balanceTxFees = BigNumber.max(free.minus(edReserved).minus(frozen), 0)
    // Total amount unlocking and unlocked.
    const { totalUnlocking, totalUnlocked } = getUnlocking(
      unlocking,
      activeEra.index
    )
    // Free balance to stake after `total` (total staked) ledger amount
    const freeBalance = BigNumber.max(freeMinusReserve.minus(total), 0)

    const nominatorBalances = () => {
      const totalPossibleBond = BigNumber.max(
        freeMinusReserve.minus(totalUnlocking).minus(totalUnlocked),
        0
      )
      return {
        active,
        totalUnlocking,
        totalUnlocked,
        totalPossibleBond,
        totalAdditionalBond: BigNumber.max(totalPossibleBond.minus(active), 0),
        totalUnlockChunks: unlocking.length,
      }
    }

    const poolBalances = () => {
      const unlockingPool = membership?.unlocking || []
      const {
        totalUnlocking: totalUnlockingPool,
        totalUnlocked: totalUnlockedPool,
      } = getUnlocking(unlockingPool, activeEra.index)

      return {
        active: membership?.balance || new BigNumber(0),
        totalUnlocking: totalUnlockingPool,
        totalUnlocked: totalUnlockedPool,
        totalPossibleBond: BigNumber.max(freeMinusReserve.minus(maxLock), 0),
        totalUnlockChunks: unlockingPool.length,
      }
    }

    return {
      freeBalance,
      transferrableBalance,
      balanceTxFees,
      edReserved,
      nominate: nominatorBalances(),
      pool: poolBalances(),
    }
  }

  // Updates account's reserve amount in state and in local storage
  const setFeeReserveBalance = (amount: BigNumber) => {
    if (!activeAccount) {
      return
    }
    setLocalFeeReserve(activeAccount, amount, network)
    setFeeReserve(amount)
  }

  // Gets staked balance, whether nominating or in pool, for an account
  const getStakedBalance = (address: MaybeAddress): BigNumber => {
    const allTransferOptions = getTransferOptions(address)

    // Total funds nominating
    const nominating = planckToUnitBn(
      allTransferOptions.nominate.active
        .plus(allTransferOptions.nominate.totalUnlocking)
        .plus(allTransferOptions.nominate.totalUnlocked),
      units
    )

    // Total funds in pool
    const inPool = planckToUnitBn(
      allTransferOptions.pool.active
        .plus(allTransferOptions.pool.totalUnlocking)
        .plus(allTransferOptions.pool.totalUnlocked),
      units
    )

    // Determine the actual staked balance
    return !nominating.isZero()
      ? nominating
      : !inPool.isZero()
        ? inPool
        : new BigNumber(0)
  }

  // Gets a feeReserve from local storage for an account, or the default value otherwise
  const getFeeReserve = (address: MaybeAddress): BigNumber =>
    getLocalFeeReserve(address, defaultFeeReserve, { network, units })

  // Update an account's reserve amount on account or network change
  useEffectIgnoreInitial(() => {
    setFeeReserve(
      getLocalFeeReserve(activeAccount, defaultFeeReserve, { network, units })
    )
  }, [activeAccount, network])

  return (
    <TransferOptionsContext.Provider
      value={{
        getTransferOptions,
        getStakedBalance,
        setFeeReserveBalance,
        feeReserve,
        getFeeReserve,
      }}
    >
      {children}
    </TransferOptionsContext.Provider>
  )
}
