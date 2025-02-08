// Copyright 2025 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { Router } from 'Router'
import { useNetwork } from 'contexts/Network'
import { ThemeValuesProvider } from 'contexts/ThemeValues'
import { useTheme } from 'contexts/Themes'
import { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { Entry } from 'ui-core/base'

// light / dark `mode` added to styled-components provider
export const ThemedRouter = () => {
  const { network } = useNetwork()
  const { mode, themeElementRef } = useTheme()

  // Update body background to `--background-default` color upon theme change.
  useEffect(() => {
    const elem = document.querySelector('.core-entry')
    if (elem) {
      document.getElementsByTagName('body')[0].style.backgroundColor =
        getComputedStyle(elem).getPropertyValue('--background-default')
    }
  }, [mode])

  return (
    <ThemeProvider theme={{ mode }}>
      <Entry mode={mode} theme={`${network}-relay`} ref={themeElementRef}>
        <ThemeValuesProvider>
          <Router />
        </ThemeValuesProvider>
      </Entry>
    </ThemeProvider>
  )
}
