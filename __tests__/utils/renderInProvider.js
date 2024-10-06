import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

/* const initialState = {
  count: 0,
};
const mockStore = configureStore({
  getState: () => {},
  reducer: {
    counter: counterReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware), // Add RTK Query middleware
  preloadedState: {
    counter: { count: 0 }, // Initial state
  },
}); */

// const store = mockStore(initialState);

// Custom global render function that wraps the component with Provider
const renderInProvider = (
  ui,
  {
    initialState = { counter: { count: 0 } }, // Default initial state if not provided
    store = configureStore([])(initialState), // Create the store dynamically using the provided initialState
  } = {},
) => {
  // Wrapper component to provide the Redux store to the component under test
  const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

  return render(ui, { wrapper: Wrapper });
};

export default renderInProvider;
