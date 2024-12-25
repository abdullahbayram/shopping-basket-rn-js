import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { strings } from '@constants';
import styles from './BasketSummary.style';

const BasketSummary = ({ totalCount, total }) => {
  return (
    <View>
      <Text variant="titleSmall">
        {strings.payment.basketItemCount} {totalCount}
      </Text>
      <View style={styles.totalContainer}>
        <Text variant="titleSmall">
          {strings.payment.total} ${Number.isNaN(total) ? '0.00' : total.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

BasketSummary.propTypes = {
  totalCount: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default BasketSummary;
