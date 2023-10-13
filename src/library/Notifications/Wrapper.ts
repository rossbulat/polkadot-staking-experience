// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import styled from 'styled-components';

export const Wrapper = styled.ul`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  list-style: none;
  justify-content: flex-end;
  z-index: 10;

  li {
    background: var(--background-primary);
    margin: 0.3rem 1.2rem;
    position: relative;
    border-radius: 1.25rem;
    padding: 1rem 1.25rem;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;
    width: 375px;

    h3 {
      color: var(--accent-color-primary);
      font-family: InterSemiBold, sans-serif;
      margin: 0.15rem 0 0.5rem;
      flex: 1;
    }
  }
`;
