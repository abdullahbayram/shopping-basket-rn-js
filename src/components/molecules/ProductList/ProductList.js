import React, { useCallback, useMemo } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard/ProductCard';

const ProductList = ({ products, basketItems, onAddItem, refetch }) => {
  const renderItem = useCallback(
    ({ item, index }) => {
      const existingItem =
        !!basketItems && Array.isArray(basketItems) && basketItems.length > 0
          ? basketItems.find((basketItem) => basketItem.sku === item.sku)
          : {};
      const isMaxQuantityPerProductReached = existingItem && existingItem.quantity >= 5;
      console.log(isMaxQuantityPerProductReached, 'isButtonDisabled');
      console.log(existingItem, 'existingItem');

      return (
        <ProductCard
          index={index}
          product={item}
          onButtonPress={() => onAddItem(item)}
          isMaxQuantityPerProductReached={!!isMaxQuantityPerProductReached}
        />
      );
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
      numColumns={2}
      columnWrapperStyle={styles.flatListColumnStyle}
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
  flatListColumnStyle: {
    justifyContent: 'space-between',
  },
});

export default ProductList;
