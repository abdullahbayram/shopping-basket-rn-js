import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ActivityIndicator from '../../components/atoms/ActivityIndicator/ActivityIndicator';
import Button from '../../components/atoms/Button/Button';
import Text from '../../components/atoms/Text/Text';
import Screen from '../../components/templetes/Screen/Screen';
import { useGetProductsQuery } from '../../redux/api/apiSlice';
import { addItemToBasket } from '../../redux/slices/basketSlice';
import { selectTotalItemCount } from '../../redux/selectors/basketSelector';
import validateBasket from '../../validate/validateBasket';
import showToast from '../../utils/showToast';
import messages from '../../constants/alertMessages';
import ProductList from '../../components/organisms/ProductList/ProductList';
import HelperText from '../../components/atoms/HelperText/HelperText';
import strings from '../../constants/strings';

const ProductListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const totalCount = useSelector(selectTotalItemCount);
  const basketItems = useSelector((state) => state.basket.items);
  const { data: products, error, isLoading, refetch } = useGetProductsQuery();

  const basketItemsMap = useMemo(() => new Map(basketItems.map((item) => [item.id, item])), [basketItems]);

  const onCheckoutPress = () => {
    if (!validateBasket(basketItems)) {
      showToast(messages.basketError);
      return;
    }
    navigation.navigate('Checkout');
  };

  const onAddToBasket = (item) => {
    const existingItem = basketItemsMap.get(item.id);
    if (existingItem && existingItem.quantity >= 5) {
      showToast(messages.limitReached);
      return;
    }
    dispatch(addItemToBasket(item));
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <Screen>
      {error ? (
        <View>
          <HelperText style={styles.errorText} type="error">
            {strings.errorLoading}
          </HelperText>
          <Button onPress={refetch} mode="contained">
            Retry
          </Button>
        </View>
      ) : (
        <Text variant="titleMedium">
          {strings.basketItemCount} {totalCount}
        </Text>
      )}
      {!error && (
        <ProductList products={products || []} basketItems={basketItems} onAddItem={onAddToBasket} refetch={refetch} />
      )}
      {!error && (
        <View style={styles.buttonContainer}>
          <Button
            disabled={!validateBasket(basketItems)}
            icon="cart-arrow-down"
            mode="contained"
            onPress={onCheckoutPress}
          >
            {strings.checkout}
          </Button>
        </View>
      )}
    </Screen>
  );
};

export default ProductListScreen;

ProductListScreen.whyDidYouRender = true;

const styles = StyleSheet.create({
  buttonContainer: {
    paddingTop: 10,
    paddingBottom: 30,
    flexGrow: 1,
    justifyContent: 'center',
  },
  errorText: { alignSelf: 'center' },
});
