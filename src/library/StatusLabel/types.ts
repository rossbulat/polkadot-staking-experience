// Copyright 2024 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type { Plugin } from 'config/plugins';

export interface StatusLabelProps {
  hideIcon?: boolean;
  status: string;
  statusFor?: Plugin;
  title: string;
  topOffset?: string;
  helpKey?: string;
}

export interface WrapperProps {
  $topOffset?: string;
}
