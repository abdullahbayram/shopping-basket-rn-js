import React from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ActivityIndicator from '../../components/atoms/ActivityIndicator/ActivityIndicator';
import Button from '../../components/atoms/Button/Button';
import Text from '../../components/atoms/Text/Text';
import ProductCard from '../../components/molecules/ProductCard/ProductCard';
import Screen from '../../components/templetes/Screen';
import { useGetProductsQuery } from '../../redux/api/apiSlice';
import { addItemToBasket } from '../../redux/slices/basketSlice';
import { selectTotalItemCount } from '../../redux/selectors/basketSelector';

const ProductListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const totalCount = useSelector(selectTotalItemCount);
  const items = useSelector((state) => state.basket.items);
  const { data: products, error, isLoading } = useGetProductsQuery();

  const onCheckoutPress = () => {
    navigation.navigate('Checkout');
  };

  const onAddToBasket = (item) => {
    const existingItem = items.find((basketItem) => basketItem.sku === item.sku);
    if (existingItem && existingItem.quantity >= 15) {
      Alert.alert('Limit Reached', 'You can only add a maximum of 15 items.');
      return;
    }
    dispatch(addItemToBasket(item));
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    console.log(error);
    return <Text>Error loading products</Text>;
  }

  return (
    <Screen>
      <Text variant="titleMedium">Items in the basket: {totalCount}</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard
            title={item.name}
            subtitle={item.description}
            buttonTitle="Add to basket"
            price={`${item.price.toFixed(2)}`}
            onButtonPress={() => onAddToBasket(item)}
          />
        )}
        keyExtractor={(item) => item.sku}
      />
      <View style={styles.buttonContainer}>
        <Button icon="cart-arrow-down" mode="contained" onPress={onCheckoutPress}>
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
