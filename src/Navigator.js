import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import ProductListScreen from './screens/ProductListScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import ErrorScreen from './screens/ErrorScreen';
import SuccessScreen from './screens/SuccessScreen';
import PaymentScreen from './screens/PaymentScreen';

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

const screenOptionsResultScreens = {
  headerLeft: () => null,
  gestureEnabled: false,
  headerBackVisible: false,
};

const Navigator = () => {
  return (
    <NavigationContainer testID="NavigationContainer" accessibilityRole="navigation">
      <Stack.Navigator initialRouteName="ProductList" screenOptions={screenOptions}>
        <Stack.Screen name="ProductList" component={ProductListScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Error" component={ErrorScreen} options={screenOptionsResultScreens} />
        <Stack.Screen name="Success" component={SuccessScreen} options={screenOptionsResultScreens} />
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
