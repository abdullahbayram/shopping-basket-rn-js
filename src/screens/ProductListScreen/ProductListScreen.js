import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ActivityIndicator from '../../components/atoms/ActivityIndicator/ActivityIndicator';
import Button from '../../components/atoms/Button/Button';
import Text from '../../components/atoms/Text/Text';
import Screen from '../../components/templetes/Screen';
import { useGetProductsQuery } from '../../redux/api/apiSlice';
import { addItemToBasket } from '../../redux/slices/basketSlice';
import { selectTotalItemCount } from '../../redux/selectors/basketSelector';
import validateBasket from '../../utils/validateBasket';
import showToast from '../../utils/showToast';
import messages from '../../constants/strings';
import ProductList from '../../components/molecules/ProductList/ProductList';
import HelperText from '../../components/atoms/HelperText/HelperText';

const ProductListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const totalCount = useSelector(selectTotalItemCount);
  const items = useSelector((state) => state.basket.items);
  const { data: products, error, isLoading, refetch } = useGetProductsQuery();

  const onCheckoutPress = () => {
    if (!validateBasket(items)) {
      showToast(messages.basketError);
      return;
    }
    navigation.navigate('Checkout');
  };

  const onAddToBasket = (item) => {
    const existingItem = items.find((basketItem) => basketItem.sku === item.sku);
    if (existingItem && existingItem.quantity >= 15) {
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
        <HelperText style={styles.errorText} type="error">
          Error loading products. Pull to refresh
        </HelperText>
      ) : (
        <Text variant="titleMedium">Items in the basket: {totalCount}</Text>
      )}
      <ProductList
        products={products}
        items={items}
        onAddOrRemoveItem={onAddToBasket}
        refetch={refetch}
        isCheckout={false}
      />
      <View style={styles.buttonContainer}>
        <Button disabled={!validateBasket(items)} icon="cart-arrow-down" mode="contained" onPress={onCheckoutPress}>
          CHECKOUT
        </Button>
      </View>
    </Screen>
  );
};

export default ProductListScreen;
ProductListScreen.whyDidYouRender = true;

const styles = StyleSheet.create({
  buttonContainer: {
    height: 100,
  },
  errorText: { alignSelf: 'center' },
});
