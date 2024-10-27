import React, { useCallback, useMemo } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard/ProductCard';

const ProductList = ({ products, basketItems, onAddItem, refetch }) => {
  const renderItem = useCallback(
    ({ item }) => {
      const existingItem =
        (!!basketItems && Array.isArray(basketItems) && basketItems.length > 0) ||
        basketItems.find((basketItem) => basketItem.sku === item.sku);
      const isDisabled = existingItem && existingItem.quantity >= 15;

      return <ProductCard product={item} onButtonPress={() => onAddItem(item)} isButtonDisabled={isDisabled} />;
    },
    [basketItems, onAddItem],
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
      style={styles.flatList}
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
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
  basketItems: PropTypes.arrayOf(
    PropTypes.shape({
      sku: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onAddItem: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  flatListPadding: {
    paddingRight: 10,
  },
  flatList: {
    marginTop: 7,
  },
});

export default ProductList;
