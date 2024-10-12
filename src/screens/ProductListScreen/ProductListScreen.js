import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ActivityIndicator from '../../components/atoms/ActivityIndicator/ActivityIndicator';
import Button from '../../components/atoms/Button/Button';
import Text from '../../components/atoms/Text/Text';
import ProductCard from '../../components/molecules/ProductCard/ProductCard';
import Screen from '../../components/templetes/Screen';
import { useGetProductsQuery } from '../../redux/api/apiSlice';
import { addItemToBasket } from '../../redux/slices/basketSlice';
import { selectTotalItemCount } from '../../redux/selectors/basketSelector';
import validateBasket from '../../utils/validateBasket';
import showToast from '../../utils/showToast';
import messages from '../../constants/strings';

const ProductListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const totalCount = useSelector(selectTotalItemCount);
  const items = useSelector((state) => state.basket.items);
  const { data: products, error, isLoading } = useGetProductsQuery();

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

  if (error) {
    return <Text>Error loading products</Text>;
  }

  return (
    <Screen>
      <Text variant="titleMedium">Items in the basket: {totalCount}</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => {
          const existingItem = items.find((basketItem) => basketItem.sku === item.sku);
          const isDisabled = existingItem && existingItem.quantity >= 15;
          return (
            <ProductCard
              title={item.name}
              subtitle={item.description}
              buttonTitle="Add to basket"
              price={`${item.price.toFixed(2)}`}
              onButtonPress={() => onAddToBasket(item)}
              isButtonDisabled={isDisabled}
            />
          );
        }}
        keyExtractor={(item) => item.sku}
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

const styles = StyleSheet.create({
  buttonContainer: {
    height: 100,
  },
});
