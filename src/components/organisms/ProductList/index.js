import React, { useCallback, useMemo } from 'react';
import { RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import { FlatList } from '../../atoms';
import { ProductCard } from '../../molecules';
import styles from './ProductList.style';

const ProductList = ({ products, basketItems, onAddItem, refetch }) => {
  const basketMap = useMemo(() => new Map(basketItems?.map((item) => [item.id, item])), [basketItems]);
  const isMaxQuantityReached = useCallback(
    (productId) => {
      const existingItem = basketMap.get(productId);
      return existingItem ? existingItem.quantity >= 5 : false;
    },
    [basketMap],
  );

  const keyExtractor = useCallback((item) => item?.id?.toString() || `key-${Math.random()}`, []);
  const renderItem = useCallback(
    ({ item, index }) => (
      <ProductCard
        index={index}
        product={item}
        onButtonPress={() => onAddItem(item)}
        isMaxQuantityPerProductReached={isMaxQuantityReached(item.id)}
      />
    ),
    [onAddItem, isMaxQuantityReached],
  );

  return (
    <FlatList
      data={products}
      numColumns={2}
      columnWrapperStyle={styles.flatListColumnStyle}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      refreshControl={refetch && <RefreshControl refreshing={false} onRefresh={refetch} />}
      contentContainerStyle={styles.flatListPadding}
    />
  );
};

ProductList.whyDidYouRender = true;

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
  basketItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onAddItem: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default ProductList;
