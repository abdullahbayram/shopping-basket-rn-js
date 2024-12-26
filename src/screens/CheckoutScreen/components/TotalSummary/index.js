import React from 'react';
import { View } from 'react-native';
import { Button, Text } from '@components/atoms';
import PropTypes from 'prop-types';
import styles from './TotalSummary.style';

const TotalSummary = ({ totalPrice, totalItemCount, isOrderButtonDisabled, onOrderPress }) => (
  <View style={styles.totalContainer}>
    <Text style={styles.totalPrice} variant="titleSmall">
      Total: ${Number.isNaN(totalPrice) ? '0.00' : totalPrice.toFixed(2)}
    </Text>
    <Button
      testID="order-button"
      icon="cart-arrow-down"
      mode="contained"
      onPress={onOrderPress}
      disabled={isOrderButtonDisabled}
    >
      Order ({totalItemCount} items)
    </Button>
  </View>
);

TotalSummary.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  totalItemCount: PropTypes.number.isRequired,
  isOrderButtonDisabled: PropTypes.bool.isRequired,
  onOrderPress: PropTypes.func.isRequired,
};

export default TotalSummary;
