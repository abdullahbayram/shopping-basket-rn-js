import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { strings } from '@constants';
import styles from './BasketSummary.style';

const BasketSummary = ({ totalItemCount, totalPrice }) => {
  return (
    <View>
      {totalItemCount && (
        <Text variant="titleSmall">
          {strings.payment.basketItemCount} {totalItemCount}
        </Text>
      )}
      <View style={styles.totalContainer}>
        <Text variant="titleSmall">
          {strings.payment.total} ${Number.isNaN(totalPrice) ? '0.00' : totalPrice.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

BasketSummary.propTypes = {
  totalItemCount: PropTypes.number,
  totalPrice: PropTypes.number.isRequired,
};

export default BasketSummary;
