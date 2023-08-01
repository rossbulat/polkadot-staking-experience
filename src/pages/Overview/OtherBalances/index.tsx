// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import {
  ButtonHelp,
  ButtonPrimaryInvert,
  Separator,
} from '@polkadotcloud/core-ui';
import { Tokens } from 'library/Tokens/Wrappers';
import { useApi } from 'contexts/Api';
import { useParaSync } from 'contexts/ParaSync';
import type { AnyJson } from 'types';
import { RadicalLoaderWrapper } from 'library/Loader/Wrapper';
import { useHelp } from 'contexts/Help';
import { MoreWrapper } from '../Wrappers';
import { TokenList } from './TokenList';

export const BalanceFooter = () => {
  const {
    network: { name },
  } = useApi();
  const { openHelp } = useHelp();
  const { paraSyncing, paraBalances } = useParaSync();

  // Other balances are only enabled on Polkadot.
  const enabled = name === 'polkadot';

  // Get Interlay tokens
  const interlay = paraBalances?.interlay;
  const localTokens = interlay?.tokens.filter(
    (t: AnyJson) => t.assetType.Token !== undefined
  );
  // TODO: discover foreign asset (probably better to do on context level).
  // eslint-disable-next-line
  const foreignAssets = interlay?.tokens?.filter(
    (t: AnyJson) => t.assetType.ForeignAsset === undefined
  );

  // Metadata for UI display.
  const total = interlay?.tokens?.length || 0;
  const remaining = Math.max(0, total - 3);

  return (
    <MoreWrapper>
      <Separator />
      <h4>
        Other Balances <ButtonHelp onClick={() => openHelp('Other Balances')} />
      </h4>
      <section>
        <Tokens>
          {enabled && (
            <>
              {paraSyncing === 'synced' ? (
                <TokenList tokens={localTokens} />
              ) : (
                <div className="symbols">
                  <div className="token">
                    <RadicalLoaderWrapper className="preload" />{' '}
                  </div>
                </div>
              )}
            </>
          )}

          <div className="text">
            {!enabled ? (
              <h3>Not Available</h3>
            ) : (
              <>
                {paraSyncing === 'synced' ? (
                  <h3
                    className={
                      total === 0
                        ? `noSymbols`
                        : remaining === 0
                        ? `empty`
                        : undefined
                    }
                  >
                    {remaining > 0 && total > 0 ? (
                      `+ ${remaining} Other${remaining === 1 ? '' : 's'}`
                    ) : total === 0 ? (
                      <>
                        No Balances <span>4 Available</span>
                      </>
                    ) : (
                      ``
                    )}
                  </h3>
                ) : (
                  <h3>Syncing...</h3>
                )}
              </>
            )}
          </div>
        </Tokens>
        <ButtonPrimaryInvert
          lg
          text="Manage"
          iconLeft={faGlobe}
          disabled={!enabled || paraSyncing !== 'synced'}
        />
      </section>
    </MoreWrapper>
  );
};
