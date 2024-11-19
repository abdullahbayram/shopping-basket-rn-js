import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ActivityIndicator from '../../components/atoms/ActivityIndicator/ActivityIndicator';
import Button from '../../components/atoms/Button/Button';
import Text from '../../components/atoms/Text/Text';
import Screen from '../../components/templetes/Screen/Screen';
import { useGetProductsQuery } from '../../redux/api/apiSlice';
import { addItemToBasket } from '../../redux/slices/basketSlice';
import { selectTotalItemCount } from '../../redux/selectors/basketSelector';
import validateBasket from '../../utils/validateBasket';
import showToast from '../../utils/showToast';
import messages from '../../constants/strings';
import ProductList from '../../components/organisms/ProductList/ProductList';
import HelperText from '../../components/atoms/HelperText/HelperText';

const ProductListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const totalCount = useSelector(selectTotalItemCount);
  const basketItems = useSelector((state) => state.basket.items);
  const { data: products, error, isLoading, refetch } = useGetProductsQuery();

  const onCheckoutPress = () => {
    if (!validateBasket(basketItems)) {
      showToast(messages.basketError);
      return;
    }
    navigation.navigate('Checkout');
  };

  const onAddToBasket = (item) => {
    const existingItem = basketItems.find((basketItem) => basketItem.id === item.id);
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
        <HelperText style={styles.errorText} type="error">
          Error loading products. Pull to refresh
        </HelperText>
      ) : (
        <Text variant="titleMedium">Items in the basket: {totalCount}</Text>
      )}
      <ProductList products={products} basketItems={basketItems} onAddItem={onAddToBasket} refetch={refetch} />
      <View style={styles.buttonContainer}>
        <Button
          disabled={!validateBasket(basketItems)}
          icon="cart-arrow-down"
          mode="contained"
          onPress={onCheckoutPress}
        >
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
    paddingTop: 10,
    height: 100,
  },
  errorText: { alignSelf: 'center' },
});
