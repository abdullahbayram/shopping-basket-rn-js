import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ActivityIndicator from '../../components/atoms/ActivityIndicator/ActivityIndicator';
import Button from '../../components/atoms/Button/Button';
import Text from '../../components/atoms/Text/Text';
import Card from '../../components/molecules/ProductCard/ProductCard';
import Screen from '../../components/templetes/Screen';
import { useGetProductsQuery } from '../../redux/api/apiSlice';

const ProductListScreen = ({ navigation }) => {
  const { data: products, error, isLoading } = useGetProductsQuery();
  const [itemCount] = useState(0);
  const onCheckoutPress = () => {
    navigation.navigate('Checkout');
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error loading products</Text>;
  }

  return (
    <Screen>
      <Text variant="titleMedium">Items in the basket: {itemCount}</Text>

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <Card
            id={item?.sku}
            title={item.name}
            subtitle={item.description}
            buttonTitle="Add to basket"
            price={item.price}
          />
        )}
        keyExtractor={(item) => item.id}
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
