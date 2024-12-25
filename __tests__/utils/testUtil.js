import { combineReducers, configureStore } from '@reduxjs/toolkit';

/* const initialState = {
  count: 0,
};
const mockStore = configureStore({
  getState: () => {},
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware), // Add RTK Query middleware
  preloadedState: {
    counter: { count: 0 }, // Initial state
  },
}); */

// const store = mockStore(initialState);

// Custom global render function that wraps the component with Provider

export function setupApiStore(api, extraReducers = {}, initialState = {}) {
  const getStore = (preloadedState) =>
    configureStore({
      reducer: combineReducers({
        [api.reducerPath]: api.reducer,
        ...extraReducers,
      }),
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
          immutableCheck: false,
        }).concat(api.middleware),
      preloadedState,
    });

  const initialStore = getStore(initialState);
  const refObj = {
    api,
    store: initialStore,
  };
  const store = getStore(initialState);
  refObj.store = store;

  return refObj;
}
