import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { setupApiStore } from './testUtil';
import { apiSlice } from '../../src/redux/api/apiSlice';
import basketSlice from '../../src/redux/slices/basketSlice';

const renderWithProvidersAndNavigation = (
  ui,
  {
    initialState = { basket: { items: [] } }, // Default Redux initial state
    navigationOptions = {}, // NavigationContainer options
  } = {},
) => {
  const { store } = setupApiStore(apiSlice, { basket: basketSlice }, initialState);

  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <NavigationContainer {...navigationOptions}>{children}</NavigationContainer>
    </Provider>
  );

  return render(ui, { wrapper: Wrapper });
};

export default renderWithProvidersAndNavigation;
