import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from './screens/ProductListScreen/ProductListScreen';
import CheckoutScreen from './screens/CheckoutScreen/CheckoutScreen';
import ErrorScreen from './screens/ErrorScreen/ErrorScreen';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Product List">
        <Stack.Screen name="Product List" component={ProductListScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="Error" component={ErrorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
