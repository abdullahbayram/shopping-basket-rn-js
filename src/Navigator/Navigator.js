import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import PropTypes from 'prop-types';
import { ProductListScreen, CheckoutScreen, PaymentScreen, SuccessScreen, ErrorScreen } from '../screens';
import { Toggle } from '../components/molecules';
import { LinearGradient } from '../components/atoms';

const Stack = createNativeStackNavigator();

const HeaderBackground2 = () => <HeaderBackground />;
const ToggleDark = (isDarkMode, toggleTheme) => <Toggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />;

const HeaderBackground = () => {
  const { colors } = useTheme();

  return <LinearGradient colors={[colors.linearLeft, colors.linearRight]} />;
};

const screenOptionsResultScreens = {
  headerLeft: () => null,
  gestureEnabled: false,
  headerBackVisible: false,
};

const Navigator = ({ toggleTheme, isDarkMode }) => {
  const { colors } = useTheme();

  const screenOptions = () => ({
    headerBackground: () => HeaderBackground2(),
    headerTitleStyle: {
      color: colors.textPrimary,
    },
    headerBackTitleVisible: false,
    headerTintColor: colors.textPrimary,
    headerRight: () => ToggleDark(isDarkMode, toggleTheme),
  });

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

Navigator.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default Navigator;
