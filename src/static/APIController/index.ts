// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type { ActiveEraInfo, BlockNumber } from '@polkadot/types/interfaces';
import { makeCancelable, rmCommas, withTimeout } from '@polkadot-cloud/utils';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { ScProvider } from '@polkadot/rpc-provider/substrate-connect';
import { NetworkList, NetworksWithPagedRewards } from 'config/networks';
import type { NetworkName } from 'types';
import type {
  APIConfig,
  ConnectionType,
  EventDetail,
  EventStatus,
  SubstrateConnect,
} from './types';
import type { Option } from '@polkadot/types-codec';
import type { VoidFn } from '@polkadot/api/types';
import BigNumber from 'bignumber.js';
import { BalancesController } from 'static/BalancesController';
import type {
  APIActiveEra,
  APIConstants,
  APINetworkMetrics,
} from 'contexts/Api/types';

export class APIController {
  // ------------------------------------------------------
  // Class members.
  // ------------------------------------------------------

  // Base time in ms to wait for a connection before trying again.
  static CONNECT_TIMEOUT_BASE = 10000;

  // How many blocks to wait before verifying the connection is online.
  static MIN_EXPECTED_BLOCKS_PER_VERIFY = 4;

  // How many missing blocks to allow for leeway when verifying.
  static MIN_EXPECTED_BLOCKS_LEEWAY = 2;

  // Network config fallback values.
  static FALLBACK = {
    MAX_NOMINATIONS: new BigNumber(16),
    BONDING_DURATION: new BigNumber(28),
    SESSIONS_PER_ERA: new BigNumber(6),
    MAX_ELECTING_VOTERS: new BigNumber(22500),
    EXPECTED_BLOCK_TIME: new BigNumber(6000),
    EPOCH_DURATION: new BigNumber(2400),
  };

  // The active network.
  static network: NetworkName;

  // API provider.
  static _provider: WsProvider | ScProvider;

  // API provider unsubs.
  static _providerUnsubs: VoidFn[] = [];

  // API instance.
  static _api: ApiPromise;

  // The current RPC endpoint.
  static _rpcEndpoint: string;

  // The current connection type.
  static _connectionType: ConnectionType;

  // Unsubscribe objects.
  static _unsubs: Record<string, VoidFn> = {};

  // The number of connection attempts.
  static _connectAttempts = 0;

  // The expected block time.
  static _expectedBlockTime: number;

  // The latest received block number.
  static _blockNumber = '0';

  // Block number verification data.
  static _blockNumberVerify: {
    minBlockNumber: string;
    interval: ReturnType<typeof setInterval> | undefined;
  } = {
    minBlockNumber: '0',
    interval: undefined,
  };

  // Cancel function of dynamic substrate connect import.
  static cancelFn: () => void;

  // ------------------------------------------------------
  // Getters.
  // ------------------------------------------------------

  static get provider() {
    return this._provider;
  }

  static get api() {
    return this._api;
  }

  // ------------------------------------------------------
  // Initialization and connection  API methods.
  // ------------------------------------------------------

  // Class initialization. Sets the `provider` and `api` class members.
  static async initialize(
    network: NetworkName,
    type: ConnectionType,
    rpcEndpoint: string,
    options?: {
      initial?: boolean;
    }
  ) {
    // Only needed once: Initialize window online listeners.
    if (options?.initial) {
      this.initOnlineEvents();
    } else {
      // Tidy up any previous connection.
      await this.disconnect();
    }

    const config: APIConfig = {
      type,
      network,
      rpcEndpoint,
    };

    // Handles class and local storage config.
    localStorage.setItem('network', network);
    this.network = network;
    this._connectionType = type;
    this._rpcEndpoint = rpcEndpoint;

    // Register connection attempt.
    this._connectAttempts++;

    // Start connection attempt.
    this.onMonitorConnect(config);
    await withTimeout(this.getTimeout(), this.connect(config));
  }

  // Calculate connection timeout. First attempt = base, second = 3x, 6x thereafter.
  static getTimeout = () => {
    if (this._connectAttempts <= 1) {
      return this.CONNECT_TIMEOUT_BASE;
    } else if (this._connectAttempts === 2) {
      return this.CONNECT_TIMEOUT_BASE * 2;
    } else {
      return this.CONNECT_TIMEOUT_BASE * 3;
    }
  };

  // Check if API is connected after a ser period, and try again if it has not.
  static onMonitorConnect = async (config: APIConfig) => {
    setTimeout(() => {
      // If blocks are not being subscribed to, assume connection failed.
      if (!Object.keys(this._unsubs).length) {
        // Atempt api connection again.
        this.initialize(config.network, config.type, config.rpcEndpoint);
      }
    }, this.getTimeout());
  };

  // Instantiates provider and connects to an api instance.
  static async connect({ type, network, rpcEndpoint }: APIConfig) {
    // Tell UI api is connecting.
    this.dispatchEvent(this.ensureEventStatus('connecting'));

    // Initiate provider.
    if (type === 'ws') {
      this.initWsProvider(network, rpcEndpoint);
    } else {
      await this.initScProvider(network);
    }

    // Initialise provider events.
    this.initProviderEvents();

    // Initialise api.
    this._api = await ApiPromise.create({ provider: this.provider });

    // Reset connection attempts.
    this._connectAttempts = 0;

    // Tell UI api is ready.
    this.dispatchEvent(this.ensureEventStatus('ready'));

    // Subscribe to block numbers.
    this.subscribeBlockNumber();
  }

  // ------------------------------------------------------
  // Provider initialization.
  // ------------------------------------------------------

  // Initiate Websocket Provider.
  static initWsProvider(network: NetworkName, rpcEndpoint: string) {
    this._provider = new WsProvider(
      NetworkList[network].endpoints.rpcEndpoints[rpcEndpoint]
    );
  }

  // Dynamically load substrate connect.
  static async initScProvider(network: NetworkName) {
    // Dynamically load substrate connect.
    const ScPromise = makeCancelable(import('@substrate/connect'));
    this.cancelFn = ScPromise.cancel;
    const Sc = (await ScPromise.promise) as SubstrateConnect;

    this._provider = new ScProvider(
      // @ts-expect-error mismatch between `@polkadot/rpc-provider/substrate-connect` and  `@substrate/connect` types: Chain[]' is not assignable to type 'string'.
      Sc,
      NetworkList[network].endpoints.lightClient
    );
    await this.provider.connect();
  }

  // Fetch network config to bootstrap UI state.
  static bootstrapNetworkConfig = async (): Promise<{
    consts: APIConstants;
    networkMetrics: APINetworkMetrics;
    activeEra: APIActiveEra;
  }> => {
    // Fetch network constants.
    const allPromises = [
      this.api.consts.staking.bondingDuration,
      this.api.consts.staking.maxNominations,
      this.api.consts.staking.sessionsPerEra,
      this.api.consts.electionProviderMultiPhase.maxElectingVoters,
      this.api.consts.babe.expectedBlockTime,
      this.api.consts.babe.epochDuration,
      this.api.consts.balances.existentialDeposit,
      this.api.consts.staking.historyDepth,
      this.api.consts.fastUnstake.deposit,
      this.api.consts.nominationPools.palletId,
    ];
    // DEPRECATION: Paged Rewards
    //
    // Fetch `maxExposurePageSize` instead of `maxNominatorRewardedPerValidator` for networks that
    // have paged rewards.
    if (NetworksWithPagedRewards.includes(this.network)) {
      allPromises.push(this.api.consts.staking.maxExposurePageSize);
    } else {
      allPromises.push(
        this.api.consts.staking.maxNominatorRewardedPerValidator
      );
    }

    const resultConsts = await Promise.all(allPromises);

    // Fetch network config.
    const resultNetworkMetrics = await this.api.queryMulti([
      this.api.query.balances.totalIssuance,
      this.api.query.auctions.auctionCounter,
      this.api.query.paraSessionInfo.earliestStoredSession,
      this.api.query.fastUnstake.erasToCheckPerBlock,
      this.api.query.staking.minimumActiveStake,
      this.api.query.staking.activeEra,
    ]);

    return {
      consts: {
        bondDuration: resultConsts[0]
          ? this.stringToBigNumber(resultConsts[0].toString())
          : this.FALLBACK.BONDING_DURATION,
        maxNominations: resultConsts[1]
          ? this.stringToBigNumber(resultConsts[1].toString())
          : this.FALLBACK.MAX_NOMINATIONS,
        sessionsPerEra: resultConsts[2]
          ? this.stringToBigNumber(resultConsts[2].toString())
          : this.FALLBACK.SESSIONS_PER_ERA,
        maxElectingVoters: resultConsts[3]
          ? this.stringToBigNumber(resultConsts[3].toString())
          : this.FALLBACK.MAX_ELECTING_VOTERS,
        expectedBlockTime: resultConsts[4]
          ? this.stringToBigNumber(resultConsts[4].toString())
          : this.FALLBACK.EXPECTED_BLOCK_TIME,
        epochDuration: resultConsts[5]
          ? this.stringToBigNumber(resultConsts[5].toString())
          : this.FALLBACK.EPOCH_DURATION,
        existentialDeposit: resultConsts[6]
          ? this.stringToBigNumber(resultConsts[6].toString())
          : new BigNumber(0),
        historyDepth: resultConsts[7]
          ? this.stringToBigNumber(resultConsts[7].toString())
          : new BigNumber(0),
        fastUnstakeDeposit: resultConsts[8]
          ? this.stringToBigNumber(resultConsts[8].toString())
          : new BigNumber(0),
        poolsPalletId: resultConsts[9]
          ? resultConsts[9].toU8a()
          : new Uint8Array(0),
        maxExposurePageSize: resultConsts[10]
          ? this.stringToBigNumber(resultConsts[10].toString())
          : NetworkList[this.network].maxExposurePageSize,
      },
      networkMetrics: {
        totalIssuance: new BigNumber(resultNetworkMetrics[0].toString()),
        auctionCounter: new BigNumber(resultNetworkMetrics[1].toString()),
        earliestStoredSession: new BigNumber(
          resultNetworkMetrics[2].toString()
        ),
        fastUnstakeErasToCheckPerBlock: Number(
          rmCommas(resultNetworkMetrics[3].toString())
        ),
        minimumActiveStake: new BigNumber(resultNetworkMetrics[4].toString()),
      },
      activeEra: JSON.parse(
        (resultNetworkMetrics[5] as Option<ActiveEraInfo>)
          .unwrapOrDefault()
          .toString()
      ),
    };
  };

  // ------------------------------------------------------
  // Subscription handling.
  // ------------------------------------------------------

  // Subscribe to block number.
  static subscribeBlockNumber = async (): Promise<void> => {
    if (this._unsubs['blockNumber'] === undefined) {
      // Retrieve and store the estimated block time.
      const blockTime = this.api.consts.babe.expectedBlockTime;
      this._expectedBlockTime = Number(blockTime.toString());

      // Get block numbers.
      const unsub = await this.api.query.system.number((num: BlockNumber) => {
        this._blockNumber = num.toString();

        document.dispatchEvent(
          new CustomEvent(`new-block-number`, {
            detail: { blockNumber: num.toString() },
          })
        );
      });

      // Block number subscription now initialised. Store unsub.
      this._unsubs['blockNumber'] = unsub as unknown as VoidFn;

      // Bootstrap block number verification. Should always pass first verification.
      this._blockNumberVerify = {
        minBlockNumber: new BigNumber(this._blockNumber)
          .plus(this.MIN_EXPECTED_BLOCKS_PER_VERIFY)
          .toString(),
        interval: setInterval(
          () => {
            this.verifyBlocksOnline();
          },
          this._expectedBlockTime *
            (this.MIN_EXPECTED_BLOCKS_PER_VERIFY +
              this.MIN_EXPECTED_BLOCKS_LEEWAY)
        ),
      };
    }
  };

  // Subscribe to network metrics.
  static subscribeNetworkMetrics = async (): Promise<void> => {
    if (this._unsubs['networkMetrics'] === undefined) {
      const unsub = await this.api.queryMulti(
        [
          this.api.query.balances.totalIssuance,
          this.api.query.auctions.auctionCounter,
          this.api.query.paraSessionInfo.earliestStoredSession,
          this.api.query.fastUnstake.erasToCheckPerBlock,
          this.api.query.staking.minimumActiveStake,
        ],
        (result) => {
          const networkMetrics = {
            totalIssuance: new BigNumber(result[0].toString()),
            auctionCounter: new BigNumber(result[1].toString()),
            earliestStoredSession: new BigNumber(result[2].toString()),
            fastUnstakeErasToCheckPerBlock: Number(
              rmCommas(result[3].toString())
            ),
            minimumActiveStake: new BigNumber(result[4].toString()),
          };

          document.dispatchEvent(
            new CustomEvent(`new-network-metrics`, {
              detail: { networkMetrics },
            })
          );
        }
      );
      this._unsubs['networkMetrics'] = unsub as unknown as VoidFn;
    }
  };

  // Subscribe to active era.
  static subscribeToActiveEra = async (): Promise<void> => {
    const unsub = await this.api.query.staking.activeEra(
      (result: Option<ActiveEraInfo>) => {
        // determine activeEra: toString used as alternative to `toHuman`, that puts commas in
        // numbers
        const activeEra = JSON.parse(result.unwrapOrDefault().toString());

        document.dispatchEvent(
          new CustomEvent(`new-active-era`, {
            detail: { activeEra },
          })
        );
      }
    );
    this._unsubs['activeEra'] = unsub as unknown as VoidFn;
  };

  // Verify block subscription is online.
  static verifyBlocksOnline = async () => {
    const blocksSynced = new BigNumber(
      this._blockNumber
    ).isGreaterThanOrEqualTo(this._blockNumberVerify.minBlockNumber);

    if (!blocksSynced) {
      await this.disconnect();
    } else {
      // Update block number verification data.
      this._blockNumberVerify.minBlockNumber = String(
        new BigNumber(this._blockNumber).plus(
          this.MIN_EXPECTED_BLOCKS_PER_VERIFY
        )
      ).toString();
    }
  };

  // Unsubscribe from all active subscriptions.
  static unsubscribe = () => {
    Object.values(this._unsubs).forEach((unsub) => {
      unsub();
    });
    this._unsubs = {};
  };

  // Remove API event listeners if they exist.
  static unsubscribeProvider() {
    this._providerUnsubs.forEach((unsub) => {
      unsub();
    });
  }

  // ------------------------------------------------------
  // Event handling.
  // ------------------------------------------------------

  // Set up API event listeners. Relays information to `document` for the UI to handle.
  static initProviderEvents() {
    this._providerUnsubs.push(
      this.provider.on('connected', () => {
        this.dispatchEvent(this.ensureEventStatus('connected'));
      })
    );
    this._providerUnsubs.push(
      this.provider.on('disconnected', () => {
        this.dispatchEvent(this.ensureEventStatus('disconnected'));
      })
    );
    this._providerUnsubs.push(
      this.provider.on('error', (err: string) => {
        this.dispatchEvent(this.ensureEventStatus('error'), { err });
      })
    );
  }

  // Set up online / offline event listeners. Relays information to `document` for the UI to handle.
  static initOnlineEvents() {
    window.addEventListener('offline', async () => {
      this.handleOfflineEvent();
    });
    window.addEventListener('online', () => {
      // Reconnect to the current API configuration.
      this.initialize(this.network, this._connectionType, this._rpcEndpoint);
    });
  }

  // Handle offline event
  static handleOfflineEvent = async () => {
    await this.disconnect();
    // Tell UI api has been disconnected from an offline event.
    this.dispatchEvent(this.ensureEventStatus('disconnected'), {
      err: 'offline-event',
    });
  };

  // Handler for dispatching events.
  static dispatchEvent(
    event: EventStatus,
    options?: {
      err?: string;
    }
  ) {
    const detail: EventDetail = { event };
    if (options?.err) {
      detail['err'] = options.err;
    }
    document.dispatchEvent(new CustomEvent('polkadot-api', { detail }));
  }

  // ------------------------------------------------------
  // Class helpers.
  // ------------------------------------------------------

  // Converts a balance string into a `BigNumber`.
  static stringToBigNumber = (value: string): BigNumber =>
    new BigNumber(rmCommas(value));

  // Ensures the provided status is a valid `EventStatus` being passed, or falls back to `error`.
  static ensureEventStatus = (status: string | EventStatus): EventStatus => {
    const eventStatus: string[] = [
      'connecting',
      'connected',
      'disconnected',
      'ready',
      'error',
    ];
    if (eventStatus.includes(status)) {
      return status as EventStatus;
    }
    return 'error' as EventStatus;
  };

  // Disconnect gracefully from API.
  static async disconnect() {
    // Clear block number verification interval.
    clearInterval(this._blockNumberVerify.interval);

    // Unsubscribe from all subscriptions.
    this.unsubscribe();
    BalancesController.unsubscribe();

    // Disconnect from provider and api.
    this.unsubscribeProvider();
    this.provider?.disconnect();
    await this.api?.disconnect();
  }
}
