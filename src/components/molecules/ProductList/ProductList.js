import React, { useCallback, useMemo } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard/ProductCard';

const ProductList = ({ products, items, onAddOrRemoveItem, refetch, isCheckout, onQuantityChange }) => {
  const renderItem = useCallback(
    ({ item }) => {
      const existingItem = items.find((basketItem) => basketItem.sku === item.sku);
      const isDisabled = !isCheckout && existingItem && existingItem.quantity >= 15;

      // Simply passing the inline function without wrapping it in another useCallback
      return (
        <ProductCard
          title={item.name}
          subtitle={isCheckout ? `${item.description} (x${item.quantity})` : item.description}
          price={(item.price * (isCheckout ? item.quantity : 1)).toFixed(2)}
          buttonTitle={isCheckout ? 'Remove Item' : 'Add to basket'}
          onButtonPress={() => onAddOrRemoveItem(item)}
          isButtonDisabled={isDisabled}
          quantity={isCheckout ? item.quantity : undefined}
          onQuantityChange={onQuantityChange}
        />
      );
    },
    [isCheckout, items, onAddOrRemoveItem, onQuantityChange],
  );

  const keyExtractor = useMemo((item) => item?.sku, []);
  const refreshControl = useMemo(
    () => (refetch ? <RefreshControl refreshing={false} onRefresh={refetch} /> : null),
    [refetch],
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      refreshControl={refreshControl}
      contentContainerStyle={styles.flatListPadding}
    />
  );
};

ProductList.whyDidYouRender = true;

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      sku: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number,
    }),
  ).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      sku: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onAddOrRemoveItem: PropTypes.func.isRequired,
  refetch: PropTypes.func,
  onQuantityChange: PropTypes.func,
  isCheckout: PropTypes.bool,
};

const styles = StyleSheet.create({
  flatListPadding: {
    paddingRight: 10,
  },
});

export default ProductList;
