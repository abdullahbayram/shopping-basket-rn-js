import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { ActivityIndicator, Button, HelperText } from '@components/atoms';
import { BasketSummary } from '@components/molecules';
import { ProductList } from '@components/organisms';
import { BaseScreen } from '@components/templates';
import { addItemToBasket } from '@redux/slices/basketSlice';
import { useGetProductsQuery } from '@redux/api/apiSlice';
import { selectTotalItemCount, selectBasketItems, selectTotalPrice } from '@redux/selectors/basketSelector';
import { validateBasket } from '@validate';
import showToast from '@utils/showToast';
import { toastMessages, strings } from '@constants';
import styles from './ProductListScreen.style';
import globalStyles from '../../global.style';

const ProductListScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { basketItems, totalItemCount, totalPrice } = useSelector((state) => ({
    basketItems: selectBasketItems(state),
    totalItemCount: selectTotalItemCount(state),
    totalPrice: selectTotalPrice(state),
  }));
  const { data: products, error, isLoading, refetch } = useGetProductsQuery();

  const basketItemsMap = useMemo(() => new Map(basketItems.map((item) => [item.id, item])), [basketItems]);

  const onCheckoutPress = () => {
    if (!validateBasket(basketItems)) {
      showToast(toastMessages.promo.error);
      return;
    }
    navigation.navigate(strings.screens.checkout);
  };

  const onAddToBasket = (item) => {
    const existingItem = basketItemsMap.get(item.id);
    if (existingItem && existingItem.quantity >= 5) {
      showToast(toastMessages.basket.limitReached);
      return;
    }
    dispatch(addItemToBasket(item));
  };

  return (
    <BaseScreen>
      {isLoading ? (
        <View style={[globalStyles.flex, globalStyles.centerContent]}>
          <ActivityIndicator style={styles.avtivityIndicator} size="large" color={colors.spinner} />
        </View>
      ) : (
        <>
          {error ? (
            <View>
              <HelperText style={styles.errorText} type="error">
                {strings.productList.errorLoading}
              </HelperText>
              <Button onPress={refetch} mode="contained">
                {strings.buttons.retry}
              </Button>
            </View>
          ) : (
            <BasketSummary totalItemCount={totalItemCount} totalPrice={totalPrice} />
          )}
          {!error && (
            <ProductList
              products={products || []}
              basketItems={basketItems}
              onAddItem={onAddToBasket}
              refetch={refetch}
            />
          )}
          {!error && (
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
        </>
      )}
    </BaseScreen>
  );
};

export default ProductListScreen;

ProductListScreen.whyDidYouRender = true;
