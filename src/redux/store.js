import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers/counterSlice';

// Configure the store with reducer and middleware
const store = configureStore({
  reducer, // This can also be an object if you're combining multiple reducers
  devTools: process.env.NODE_ENV !== 'production', // Optional: Enable Redux DevTools in development mode
});

export default store;
