import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './slices/counterSlice';
import basketSlice from './slices/basketSlice';
import { apiSlice } from './api/apiSlice';

const store = configureStore({
  reducer: {
    counter: counterSlice,
    basket: basketSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production', // Optional: Enable Redux DevTools in development mode
});

export default store;
