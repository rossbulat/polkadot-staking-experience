// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { faCopy } from '@fortawesome/free-regular-svg-icons';
import {
  faBars,
  faChartLine,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useMenu } from 'contexts/Menu';
import { useNotifications } from 'contexts/Notifications';
import type { NotificationText } from 'contexts/Notifications/types';
import { CopyAddress } from 'library/ListItem/Labels/CopyAddress';
import { ParaValidator } from 'library/ListItem/Labels/ParaValidator';
import {
  Labels,
  MenuPosition,
  Separator,
  ValidatorPulseWrapper,
  Wrapper,
} from 'library/ListItem/Wrappers';
import { useOverlay } from '@polkadot-cloud/react/hooks';
import { usePlugins } from 'contexts/Plugins';
import type { AnyJson } from 'types';
import { useValidators } from '../../../contexts/Validators/ValidatorEntries';
import { useList } from '../../List/context';
import { Blocked } from '../../ListItem/Labels/Blocked';
import { Commission } from '../../ListItem/Labels/Commission';
import { EraStatus } from '../../ListItem/Labels/EraStatus';
import { FavoriteValidator } from '../../ListItem/Labels/FavoriteValidator';
import { Identity } from '../../ListItem/Labels/Identity';
import { Oversubscribed } from '../../ListItem/Labels/Oversubscribed';
import { Select } from '../../ListItem/Labels/Select';
import { getIdentityDisplay } from './Utils';
import type { ValidatorItemProps } from './types';
import { Pulse } from './Pulse';

export const Default = ({
  validator,
  toggleFavorites,
  showMenu,
  displayFor,
}: ValidatorItemProps) => {
  const { t } = useTranslation('library');
  const { selectActive } = useList();
  const { pluginEnabled } = usePlugins();
  const { openModal } = useOverlay().modal;
  const { addNotification } = useNotifications();
  const { setMenuPosition, setMenuItems, open } = useMenu();
  const { validatorIdentities, validatorSupers } = useValidators();

  const { address, prefs } = validator;
  const commission = prefs?.commission ?? null;

  const identity = getIdentityDisplay(
    validatorIdentities[address],
    validatorSupers[address]
  );

  // copy address notification.
  const notificationCopyAddress: NotificationText | null =
    address == null
      ? null
      : {
          title: t('addressCopiedToClipboard'),
          subtitle: address,
        };

  // configure floating menu
  const posRef = useRef(null);
  const menuItems: AnyJson[] = [];
  menuItems.push({
    icon: <FontAwesomeIcon icon={faChartLine} transform="shrink-3" />,
    wrap: null,
    title: `${t('viewMetrics')}`,
    cb: () => {
      openModal({
        key: 'ValidatorMetrics',
        options: {
          address,
          identity,
        },
      });
    },
  });

  if (pluginEnabled('polkawatch')) {
    menuItems.push({
      icon: <FontAwesomeIcon icon={faGlobe} transform="shrink-3" />,
      wrap: null,
      title: `${t('viewDecentralization')}`,
      cb: () => {
        openModal({
          key: 'ValidatorGeo',
          options: {
            address,
            identity,
          },
        });
      },
    });
  }

  menuItems.push({
    icon: <FontAwesomeIcon icon={faCopy} transform="shrink-3" />,
    wrap: null,
    title: `${t('copyAddress')}`,
    cb: () => {
      navigator.clipboard.writeText(address);
      if (notificationCopyAddress) {
        addNotification(notificationCopyAddress);
      }
    },
  });

  const toggleMenu = () => {
    if (!open) {
      setMenuItems(menuItems);
      setMenuPosition(posRef);
    }
  };

  return (
    <Wrapper>
      <div className={`inner ${displayFor}`}>
        <MenuPosition ref={posRef} />
        <div className="row top">
          {selectActive && <Select item={validator} />}
          <Identity address={address} />
          <div>
            <Labels>
              <Oversubscribed address={address} />
              <Blocked prefs={prefs} />
              <Commission commission={commission} />
              <ParaValidator address={address} />
              {toggleFavorites && <FavoriteValidator address={address} />}

              {/* restrict opening modal within a canvas */}
              {displayFor === 'default' && showMenu && (
                <button
                  type="button"
                  className="label"
                  onClick={() => toggleMenu()}
                >
                  <FontAwesomeIcon icon={faBars} />
                </button>
              )}
            </Labels>
          </div>
        </div>
        <Separator />
        <div className="row bottom lg">
          <div>
            <ValidatorPulseWrapper>
              <Pulse address={address} />
            </ValidatorPulseWrapper>
          </div>
          <div>
            <Labels style={{ marginBottom: '0.7rem' }}>
              {displayFor !== 'default' ? (
                <CopyAddress address={address} />
              ) : (
                <>&nbsp;</>
              )}
            </Labels>
            <EraStatus address={address} noMargin />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
