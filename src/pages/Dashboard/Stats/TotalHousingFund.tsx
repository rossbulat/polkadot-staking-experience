// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useNetworkMetrics } from 'contexts/Network';
import { Text } from 'library/StatBoxList/Text';
import { useTranslation } from 'react-i18next';
import { toReadableNum } from 'utils';

const TotalHousingFund = () => {
  const { t } = useTranslation('pages');
  const { metrics } = useNetworkMetrics();

  const params = {
    label: 'Housing Fund',
    value: `$ ${toReadableNum(metrics.totalHousingFund.toString())}`,
  };
  return <Text {...params} />;
};

export default TotalHousingFund;
