import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { setupApiStore } from './testUtil';
import { apiSlice } from '../../src/redux/api/apiSlice';
import basketSlice from '../../src/redux/slices/basketSlice';

const renderInProvider = (
  ui,
  {
    initialState = {
      counter: { count: 0 },
      basket: { items: [] },
    }, // Default initial state if not provided
  } = {},
) => {
  // const refObj = setupApiStore(apiSlice, counterSlice, initialState);
  const { store } = setupApiStore(apiSlice, { basket: basketSlice }, initialState);
  // Wrapper component to provide the Redux store to the component under test
  const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

  return render(ui, { wrapper: Wrapper });
};

export default renderInProvider;
