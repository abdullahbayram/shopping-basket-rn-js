import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import CheckoutCard from '../../molecules/CheckoutCard';
import Text from '../../atoms/Text';
import styles from './CheckoutList.style';

const CheckoutList = ({ basketItems, onRemoveItem, onQuantityChange }) => {
  const renderItem = useCallback(
    ({ item }) => (
      <CheckoutCard product={item} onRemoveButtonPress={() => onRemoveItem(item)} onQuantityChange={onQuantityChange} />
    ),
    [onRemoveItem, onQuantityChange],
  );

  const keyExtractor = useCallback((item) => String(item?.id), []);

  if (!basketItems.length) {
    return (
      <Text style={styles.emptyMessage} variant="titleMedium">
        Your basket is empty.
      </Text>
    );
  }

  return (
    <FlatList
      data={basketItems}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={styles.flatList}
      contentContainerStyle={styles.contentContainer}
      initialNumToRender={10}
      maxToRenderPerBatch={5}
      windowSize={10}
      removeClippedSubviews
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
      image: PropTypes.string.isRequired,
      rating: PropTypes.shape({
        rate: PropTypes.number,
        count: PropTypes.number,
      }),
    }),
  ).isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
};

export default CheckoutList;
