// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { ThemeProvider } from 'styled-components';
import { Entry } from '@polkadot-cloud/react';
import { Router } from 'Router';
import { useTheme } from 'contexts/Themes';
import { useNetwork } from 'contexts/Network';
import { useEffect } from 'react';

// light / dark `mode` added to styled-components provider
// `@polkadot-cloud/react` themes are added to `Entry`.
export const ThemedRouter = () => {
  const { mode } = useTheme();
  const { network } = useNetwork();

  // Update body background to `--background-default` color upon theme change.
  useEffect(() => {
    const elem = document.querySelector('.core-entry');
    if (elem) {
      document.getElementsByTagName('body')[0].style.backgroundColor =
        getComputedStyle(elem).getPropertyValue('--background-default');
    }
  }, [mode]);

  return (
    <ThemeProvider theme={{ mode }}>
      <Entry mode={mode} theme={`${network}-relay`}>
        <Router />
      </Entry>
    </ThemeProvider>
  );
};
