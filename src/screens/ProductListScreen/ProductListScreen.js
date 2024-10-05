import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Button from '../../components/atoms/Button/Button';
import Header from '../../components/molecules/Header/Header';
import Text from '../../components/atoms/Text/Text';
import Card from '../../components/molecules/ProductCard/ProductCard';
import Screen from '../../components/templetes/Screen';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '1',
    title: '4th Item',
  },
  {
    id: '2',
    title: '5th Item',
  },
  {
    id: '3',
    title: '6th Item',
  },
];

const ProductListScreen = ({ onPress }) => {
  const [itemCount] = useState(0);

  return (
    <Screen>
      <Header title="Product List" dark />
      <Text variant="titleMedium">Items in the basket: {itemCount}</Text>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Card
            id={item.id}
            title={item.title}
            subtitle="Product One Description"
            buttonTitle="Add to basket"
            price="$1"
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.buttonContainer}>
        <Button icon="cart-arrow-down" mode="contained" onPress={onPress}>
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

ProductListScreen.propTypes = {
  onPress: PropTypes.func.isRequired,
};
