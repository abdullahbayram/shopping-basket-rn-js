import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import { apiSlice } from './api/apiSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production', // Optional: Enable Redux DevTools in development mode
});

export default store;
