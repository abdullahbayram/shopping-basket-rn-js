import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import ProductListScreen from './screens/ProductListScreen/ProductListScreen';
import CheckoutScreen from './screens/CheckoutScreen/CheckoutScreen';
import ErrorScreen from './screens/ErrorScreen/ErrorScreen';
import SuccessScreen from './screens/SuccessScreen/SuccessScreen';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerBackground: () => (
    <LinearGradient colors={['#6fc8dc', '#8bd4c7']} style={styles.linear} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} />
  ),
  headerTitleStyle: {
    color: '#004f6b',
  },
  headerBackTitleVisible: false,
  headerTintColor: '#004f6b',
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Product List">
        <Stack.Screen options={screenOptions} name="Product List" component={ProductListScreen} />
        <Stack.Screen options={screenOptions} name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="Error" component={ErrorScreen} />
        <Stack.Screen name="Success" component={SuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({
  linear: {
    flex: 1,
  },
});
