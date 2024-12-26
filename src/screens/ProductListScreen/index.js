import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { Button } from '@components/atoms';
import { BasketSummary } from '@components/molecules';
import { ProductList } from '@components/organisms';
import { BaseScreen } from '@components/templates';
import { addItemToBasket } from '@redux/slices/basketSlice';
import { useGetProductsQuery } from '@redux/api/apiSlice';
import { validateBasket } from '@validate';
import showToast from '@utils/showToast';
import { toastMessages, strings } from '@constants';
import { useBasket, useNavigationHandlers } from '@hooks';
import styles from './ProductListScreen.style';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

const ProductListScreen = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { basketItems, totalItemCount, totalPrice } = useBasket();
  const { navigateToCheckout } = useNavigationHandlers();
  const { data: products, error, isLoading, refetch } = useGetProductsQuery();

  const basketItemsMap = useMemo(() => new Map(basketItems.map((item) => [item.id, item])), [basketItems]);
  const isCheckoutButtonVisible = !error && !isLoading;
  const isBasketSummaryVisible = !error && !isLoading;

  const onCheckoutPress = () => {
    if (!validateBasket(basketItems)) {
      showToast(toastMessages.promo.error);
      return;
    }
    navigateToCheckout();
  };

  const onAddToBasket = (item) => {
    const existingItem = basketItemsMap.get(item.id);
    if (existingItem && existingItem.quantity >= 5) {
      showToast(toastMessages.basket.limitReached);
      return;
    }
    dispatch(addItemToBasket(item));
  };

  if (isLoading) return <LoadingState color={colors.spinner} />;
  if (error) return <ErrorState onRetry={refetch} errorMessage={strings.productList.errorLoading} />;

  return (
    <BaseScreen>
      {isBasketSummaryVisible && <BasketSummary totalItemCount={totalItemCount} totalPrice={totalPrice} />}
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
            {strings.buttons.checkout}
          </Button>
        </View>
      )}
    </BaseScreen>
  );
};

export default ProductListScreen;

ProductListScreen.whyDidYouRender = true;
