// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';
import React, { useState, useEffect, useRef } from 'react';
import { SERVICES, SIDE_MENU_STICKY_THRESHOLD } from 'consts';
import { localStorageOrDefault, setStateWithRef } from 'Utils';
import { ImportedAccount } from 'contexts/Connect/types';
import { MaybeAccount, Sync } from 'types';
import { useActivePools } from 'contexts/Pools/ActivePool';
import { usePoolMemberships } from 'contexts/Pools/PoolMemberships';
import { useConnect } from '../Connect';
import { useNetworkMetrics } from '../Network';
import { useStaking } from '../Staking';
import { useBalances } from '../Balances';
import { useApi } from '../Api';
import * as defaults from './defaults';
import { SetupType, UIContextInterface } from './types';

export const UIContext = React.createContext<UIContextInterface>(
  defaults.defaultUIContext
);

export const useUi = () => React.useContext(UIContext);

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const { isReady, network } = useApi();
  const { accounts: connectAccounts, activeAccount } = useConnect();
  const { staking, eraStakers, inSetup } = useStaking();
  const { metrics } = useNetworkMetrics();
  const { accounts } = useBalances();
  const { membership: poolMembership } = usePoolMemberships();
  const { synced: activePoolSynced } = useActivePools();

  // set whether app is syncing
  const [isSyncing, setIsSyncing] = useState(false);

  // get initial services
  const getAvailableServices = () => {
    // get services config from local storage
    const _services: any = localStorageOrDefault('services', SERVICES, true);

    // if fiat is disabled, remove binance_spot service
    const DISABLE_FIAT = Number(process.env.REACT_APP_DISABLE_FIAT ?? 0);
    if (DISABLE_FIAT && _services.includes('binance_spot')) {
      const index = _services.indexOf('binance_spot');
      if (index !== -1) {
        _services.splice(index, 1);
      }
    }
    return _services;
  };

  // get side menu minimised state from local storage, default to not
  const _userSideMenuMinimised = Number(
    localStorageOrDefault('side_menu_minimised', 0)
  );

  // side menu control
  const [sideMenuOpen, setSideMenuOpen] = useState(0);

  // side menu minimised
  const [userSideMenuMinimised, _setUserSideMenuMinimised] = useState(
    _userSideMenuMinimised
  );
  const userSideMenuMinimisedRef = useRef(userSideMenuMinimised);
  const setUserSideMenuMinimised = (v: number) => {
    localStorage.setItem('side_menu_minimised', String(v));
    setStateWithRef(v, _setUserSideMenuMinimised, userSideMenuMinimisedRef);
  };

  // automatic side menu minimised
  const [sideMenuMinimised, setSideMenuMinimised] = useState(
    window.innerWidth <= SIDE_MENU_STICKY_THRESHOLD
      ? 1
      : userSideMenuMinimisedRef.current
  );

  // is the user actively on the setup page
  const [onNominatorSetup, setOnNominatorSetup] = useState(0);

  // is the user actively on the pool creation page
  const [onPoolSetup, setOnPoolSetup] = useState(0);

  // services
  const [services, setServices] = useState(getAvailableServices());
  const servicesRef = useRef(services);

  // staking setup persist
  const [setup, setSetup]: any = useState([]);
  const setupRef = useRef<any>(setup);

  // resize side menu callback
  const resizeCallback = () => {
    if (window.innerWidth <= SIDE_MENU_STICKY_THRESHOLD) {
      setSideMenuMinimised(0);
    } else {
      setSideMenuMinimised(userSideMenuMinimisedRef.current);
    }
  };

  // move away from setup pages on completion / network change
  useEffect(() => {
    if (!inSetup()) {
      setOnNominatorSetup(0);
    }
    if (poolMembership) {
      setOnPoolSetup(0);
    }
  }, [inSetup(), network, poolMembership]);

  // resize event listener
  useEffect(() => {
    window.addEventListener('resize', resizeCallback);
    return () => {
      window.removeEventListener('resize', resizeCallback);
    };
  }, []);

  // re-configure minimised on user change
  useEffect(() => {
    resizeCallback();
  }, [userSideMenuMinimised]);

  // update setup state when activeAccount changes
  useEffect(() => {
    if (connectAccounts.length) {
      const _setup = setupDefault();
      setStateWithRef(_setup, setSetup, setupRef);
    }
  }, [activeAccount, network, connectAccounts]);

  // app syncing updates
  useEffect(() => {
    let syncing = false;

    if (!isReady) {
      syncing = true;
    }
    // staking metrics have synced
    if (staking.lastReward === new BN(0)) {
      syncing = true;
    }

    // era has synced from Network
    if (metrics.activeEra.index === 0) {
      syncing = true;
    }

    // all extension accounts have been synced
    const extensionAccounts = connectAccounts.filter(
      (a: ImportedAccount) => a.source !== 'external'
    );
    if (accounts.length < extensionAccounts.length) {
      syncing = true;
    }

    // eraStakers has synced
    if (!eraStakers.totalActiveNominators) {
      syncing = true;
    }

    // nomination pool contexts have synced
    if (activePoolSynced !== Sync.Synced) {
      syncing = true;
    }

    setIsSyncing(syncing);
  }, [isReady, staking, metrics, accounts, eraStakers, activePoolSynced]);

  const setSideMenu = (v: number) => {
    setSideMenuOpen(v);
  };

  /*
   * Generates the default setup objects or the currently
   * connected accounts.
   */
  const setupDefault = () => {
    // generate setup objects from connected accounts
    const _setup = connectAccounts.map((item) => {
      const localStakeSetup = localStorage.getItem(
        `${network.name.toLowerCase()}_stake_setup_${item.address}`
      );
      const localPoolSetup = localStorage.getItem(
        `${network.name.toLowerCase()}_pool_setup_${item.address}`
      );
      const stakeProgress =
        localStakeSetup !== null
          ? JSON.parse(localStakeSetup)
          : defaults.defaultStakeSetup;

      const poolProgress =
        localPoolSetup !== null
          ? JSON.parse(localPoolSetup)
          : defaults.defaultPoolSetup;

      return {
        address: item.address,
        progress: {
          stake: stakeProgress,
          pool: poolProgress,
        },
      };
    });
    return _setup;
  };

  /*
   * Gets the stake setup progress for a connected account.
   */
  const getSetupProgress = (type: SetupType, address: MaybeAccount) => {
    const _setup = setupRef.current.find((s: any) => s.address === address);

    if (_setup === undefined) {
      return type === SetupType.Stake
        ? defaults.defaultStakeSetup
        : defaults.defaultPoolSetup;
    }
    return _setup.progress[type];
  };

  /*
   * Gets the stake setup progress as a percentage for an address.
   */
  const getStakeSetupProgressPercent = (address: MaybeAccount) => {
    if (!address) return 0;
    const setupProgress = getSetupProgress(SetupType.Stake, address);

    const p = 25;
    let progress = 0;
    if (setupProgress.bond > 0) progress += p;
    if (setupProgress.controller !== null) progress += p;
    if (setupProgress.nominations.length) progress += p;
    if (setupProgress.payee !== null) progress += p - 1;
    return progress;
  };

  /*
   * Gets the stake setup progress as a percentage for an address.
   */
  const getPoolSetupProgressPercent = (address: MaybeAccount) => {
    if (!address) return 0;
    const setupProgress = getSetupProgress(SetupType.Pool, address);

    const p = 25;
    let progress = 0;
    if (setupProgress.metadata !== '') progress += p;
    if (setupProgress.bond > 0) progress += p;
    if (setupProgress.nominations.length) progress += p;
    if (setupProgress.roles !== null) progress += p - 1;
    return progress;
  };

  /*
   * Sets stake setup progress for an address.
   * Updates localStorage followed by app state.
   */
  const setActiveAccountSetup = (type: SetupType, progress: any) => {
    if (!activeAccount) return;

    localStorage.setItem(
      `${network.name.toLowerCase()}_${type}_setup_${activeAccount}`,
      JSON.stringify(progress)
    );

    const setupUpdated = setupRef.current.map((obj: any) =>
      obj.address === activeAccount
        ? {
            ...obj,
            progress: {
              ...obj.progress,
              [type]: progress,
            },
          }
        : obj
    );
    setStateWithRef(setupUpdated, setSetup, setupRef);
  };

  /*
   * Sets active setup section for an address
   */
  const setActiveAccountSetupSection = (type: SetupType, section: number) => {
    if (!activeAccount) return;

    // get current progress
    const _accountSetup = [...setupRef.current].find(
      (item) => item.address === activeAccount
    );

    // abort if setup does not exist
    if (_accountSetup === null) {
      return;
    }

    // amend section
    _accountSetup.progress[type].section = section;

    // update context setup
    const _setup = setupRef.current.map((obj: any) =>
      obj.address === activeAccount ? _accountSetup : obj
    );

    // update local storage
    localStorage.setItem(
      `${network.name.toLowerCase()}_${type}_setup_${activeAccount}`,
      JSON.stringify(_accountSetup.progress[type])
    );

    // update context
    setStateWithRef(_setup, setSetup, setupRef);
  };

  /*
   * Service toggling
   */
  const toggleService = (key: string) => {
    let _services = [...services];
    const found = _services.find((item) => item === key);

    if (found) {
      _services = _services.filter((_s) => _s !== key);
    } else {
      _services.push(key);
    }

    localStorage.setItem('services', JSON.stringify(_services));
    setStateWithRef(_services, setServices, servicesRef);
  };

  const getServices = () => {
    return servicesRef.current;
  };

  const [containerRefs, _setContainerRefs] = useState({});
  const setContainerRefs = (v: any) => {
    _setContainerRefs(v);
  };

  return (
    <UIContext.Provider
      value={{
        setSideMenu,
        setUserSideMenuMinimised,
        toggleService,
        getSetupProgress,
        getStakeSetupProgressPercent,
        getPoolSetupProgressPercent,
        setActiveAccountSetup,
        setActiveAccountSetupSection,
        getServices,
        setOnNominatorSetup,
        setOnPoolSetup,
        setContainerRefs,
        sideMenuOpen,
        userSideMenuMinimised: userSideMenuMinimisedRef.current,
        sideMenuMinimised,
        services: servicesRef.current,
        onNominatorSetup,
        onPoolSetup,
        isSyncing,
        containerRefs,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
