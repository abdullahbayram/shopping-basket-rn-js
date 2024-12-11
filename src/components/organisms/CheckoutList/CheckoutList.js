import React, { useCallback, useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import CheckoutCard from '../../molecules/CheckoutCard/CheckoutCard';

const CheckoutList = ({ basketItems, onRemoveItem, onQuantityChange }) => {
  const renderItem = useCallback(
    ({ item }) => {
      return (
        <CheckoutCard
          product={item}
          onRemoveButtonPress={() => onRemoveItem(item)}
          onQuantityChange={onQuantityChange}
        />
      );
    },
    [onRemoveItem, onQuantityChange],
  );

  const keyExtractor = useMemo((item) => item?.id, []);

  return (
    <FlatList
      data={basketItems}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={styles.flatList}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

CheckoutList.propTypes = {
  basketItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingRight: 10,
  },
  flatList: {
    marginTop: 7,
  },
});

export default CheckoutList;
