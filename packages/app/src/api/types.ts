// Copyright 2024 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type { ChainId, MaybeAddress } from 'types';

export interface APIConfig {
  type: ConnectionType;
  rpcEndpoint: string;
}

export interface APIEventDetail {
  status: EventApiStatus;
  network: ChainId;
  chainType: ApiChainType;
  connectionType: ConnectionType;
  rpcEndpoint: string;
  err?: string;
}

export interface PapiChainSpec {
  genesisHash: string;
  ss58Format: number;
  tokenDecimals: number;
  tokenSymbol: string;
  authoringVersion: number;
  implName: string;
  implVersion: number;
  specName: string;
  specVersion: number;
  stateVersion: number;
  transactionVersion: number;
}

export type PapiReadyEvent = PapiChainSpec & {
  network: ChainId;
  chainType: string;
};

export type ConnectionType = 'ws' | 'sc';

export type ApiStatus = 'connecting' | 'connected' | 'disconnected' | 'ready';

export type EventApiStatus = ApiStatus | 'error';

export type ApiChainType = 'relay' | 'system';

export type TxSubmissionItem = {
  uid: number;
  from: MaybeAddress;
  processing: boolean;
};
