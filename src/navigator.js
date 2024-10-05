import React, { useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import ProductListScreen from './screens/ProductListScreen/ProductListScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import ErrorScreen from './screens/ErrorScreen';

const CHECKOUT_SCREEN = 'CheckoutScreen';
const PRODUCT_LIST_SCREEN = 'ProductListScreen';

const Navigator = ({ action }) => {
  const [currentScreen] = useState(PRODUCT_LIST_SCREEN);

  return (
    <>
      {currentScreen === PRODUCT_LIST_SCREEN ? (
        <ProductListScreen onPress={() => action('INCREMENT_ASYNC')} />
      ) : (
        <View />
      )}
      {currentScreen === CHECKOUT_SCREEN ? <CheckoutScreen /> : <View />}
      {!(currentScreen === CHECKOUT_SCREEN || currentScreen === PRODUCT_LIST_SCREEN) && <ErrorScreen />}
    </>
  );
};

export default Navigator;

Navigator.propTypes = {
  action: PropTypes.func.isRequired,
};
