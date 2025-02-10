// Copyright 2025 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
`

export const RewardText = styled.div`
  .content.chart {
    .labels {
      > div:first-child {
        color: var(--accent-color-primary);
      }
    }
  }
`

export const RewardsGrid = styled.div`
  padding: 1rem;

  .header {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 0.5rem;
    border-bottom: 1px solid var(--border-primary-color);
    font-weight: 500;
    color: var(--text-color-secondary);
  }

  .reward-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 0.75rem 0.5rem;
    border-bottom: 1px solid var(--border-secondary-color);

    &:last-child {
      border-bottom: none;
    }

    span {
      &:first-child {
        color: var(--text-color-secondary);
      }
      &:not(:first-child) {
        font-family: InterSemiBold, sans-serif;
      }
    }
  }
`

export const HistoryPlaceholder = styled.div`
  padding: 2rem;
  text-align: center;

  p {
    margin: 0;

    &.secondary {
      color: var(--text-color-secondary);
      font-size: 0.9rem;
      margin-top: 0.5rem;
    }
  }
`

export const ItemWrapper = styled.div`
  padding: 0.5rem;
  width: 100%;

  > .inner {
    background: var(--background-list-item);
    padding: 0 0.75rem;
    flex: 1;
    border-radius: 1rem;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    flex: 1;
    max-width: 100%;

    > .row {
      width: 100%;
      display: flex;
      flex-flow: row wrap;
      align-items: center;

      &:first-child {
        padding: 1rem 0 0.75rem 0;
      }

      &:last-child {
        border-top: 1px solid var(--border-primary-color);
        padding-top: 0rem;

        > div {
          min-height: 3.2rem;
        }
      }

      > div {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        flex: 1;
        max-width: 100%;

        h4 {
          color: var(--text-color-secondary);
          font-family: InterSemiBold, sans-serif;
          &.claim {
            color: var(--accent-color-secondary);
          }
          &.reward {
            color: var(--accent-color-primary);
          }
        }

        h5 {
          color: var(--text-color-secondary);
          &.claim {
            color: var(--accent-color-secondary);
            border: 1px solid var(--accent-color-secondary);
            border-radius: 0.75rem;
            padding: 0.2rem 0.5rem;
          }
          &.reward {
            color: var(--accent-color-primary);
            border: 1px solid var(--accent-color-primary);
            border-radius: 0.75rem;
            padding: 0.2rem 0.5rem;
          }
        }

        > div:first-child {
          flex-grow: 1;
          display: flex;
          flex-flow: row wrap;
          align-items: center;
        }

        > div:last-child {
          display: flex;
          flex-flow: row wrap;
          justify-content: flex-end;

          > h4 {
            color: var(--text-color-secondary);
            opacity: 0.8;
          }
        }
      }
    }
  }
`
export const PayoutListWrapper = styled.div`
  width: 100%;

  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding: 0 0.5rem;

    .pagination {
      color: var(--text-color-secondary);
      font-size: 0.9rem;
    }
  }
`

export const PayoutGrid = styled.div`
  display: grid;
  gap: 0.75rem;

  .payout-item {
    background: var(--background-primary);
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left-content {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .amount {
        color: var(--accent-color-primary);
        font-family: InterSemiBold, sans-serif;
      }

      .validator {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--text-color-primary);

        .icon {
          width: 1.2rem;
          height: 1.2rem;
          border-radius: 50%;
          background: var(--background-secondary);
        }
      }
    }

    .right-content {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.5rem;

      .tag {
        background: var(--accent-color-primary);
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 0.75rem;
        font-size: 0.85rem;
      }

      .time {
        color: var(--text-color-secondary);
        font-size: 0.85rem;
      }
    }
  }
`
