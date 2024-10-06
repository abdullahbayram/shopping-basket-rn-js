import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { setupApiStore } from './testUtil';
import { apiSlice } from '../../src/redux/api/apiSlice';
import counterSlice from '../../src/redux/slices/counterSlice';

const renderInProvider = (
  ui,
  {
    initialState = { counter: { count: 0 } }, // Default initial state if not provided
  } = {},
) => {
  // const refObj = setupApiStore(apiSlice, counterSlice, initialState);
  const { store } = setupApiStore(apiSlice, { counter: counterSlice }, initialState);
  // Wrapper component to provide the Redux store to the component under test
  const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

  return render(ui, { wrapper: Wrapper });
};

export default renderInProvider;
