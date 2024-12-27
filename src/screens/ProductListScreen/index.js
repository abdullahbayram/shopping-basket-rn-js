import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { Button } from '@components/atoms';
import { BasketSummary, ErrorState, LoadingState } from '@components/molecules';
import { ProductList } from '@components/organisms';
import { BaseScreen } from '@components/templates';
import { addItemToBasket } from '@redux/slices/basketSlice';
import { useGetProductsQuery } from '@redux/api/apiSlice';
import { validateBasket } from '@validate';
import { strings } from '@constants';
import { useBasket, useNavigationHandlers } from '@hooks';
import styles from './ProductListScreen.style';

const ProductListScreen = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { basketItems, totalItemCount, totalPrice } = useBasket();
  const { navigateToCheckout } = useNavigationHandlers();
  const { data: products, error, isLoading, refetch } = useGetProductsQuery();

  const isCheckoutButtonVisible = !error && !isLoading;
  const isBasketSummaryVisible = !error && !isLoading;

  const onCheckoutPress = () => {
    navigateToCheckout();
  };

  const onAddToBasket = (item) => {
    dispatch(addItemToBasket(item));
  };

  if (isLoading) return <LoadingState color={colors.spinner} />;
  if (error) return <ErrorState onRetry={refetch} errorMessage={strings.productList.errorLoading} />;

  return (
    <BaseScreen>
      {isBasketSummaryVisible && <BasketSummary totalPrice={totalPrice} />}
      {!error && (
        <ProductList products={products || []} basketItems={basketItems} onAddItem={onAddToBasket} refetch={refetch} />
      )}
      {isCheckoutButtonVisible && (
        <View style={styles.buttonContainer}>
          <Button
            disabled={!validateBasket(basketItems)}
            icon="cart-arrow-down"
            mode="contained"
            onPress={onCheckoutPress}
          >
            {`${strings.buttons.checkout} (${totalItemCount})`}
          </Button>
        </View>
      )}
    </BaseScreen>
  );
};

export default ProductListScreen;

ProductListScreen.whyDidYouRender = true;
