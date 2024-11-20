import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import ProductListScreen from './screens/ProductListScreen/ProductListScreen';
import CheckoutScreen from './screens/CheckoutScreen/CheckoutScreen';
import ErrorScreen from './screens/ErrorScreen/ErrorScreen';
import SuccessScreen from './screens/SuccessScreen/SuccessScreen';
import PaymentScreen from './screens/PaymentScreen/PaymentScreen';

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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen options={screenOptions} name="ProductList" component={ProductListScreen} />
        <Stack.Screen options={screenOptions} name="Checkout" component={CheckoutScreen} />
        <Stack.Screen options={screenOptions} name="Payment" component={PaymentScreen} />
        <Stack.Screen
          name="Error"
          options={{ ...screenOptions, ...screenOptionsResultScreens }}
          component={ErrorScreen}
        />
        <Stack.Screen
          name="Success"
          component={SuccessScreen}
          options={{ ...screenOptions, ...screenOptionsResultScreens }}
        />
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
