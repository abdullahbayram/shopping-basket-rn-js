import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = { count: 0 };

// Create the slice
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // Increment action
    increment: (state) => {
      state.count += 1;
    },
    // Decrement action
    decrement: (state) => {
      state.count -= 1;
    },
    // Set count action (payload will be the new count value)
    setCount: (state, action) => {
      state.count = action.payload;
    },
  },
});

// Export the generated actions
export const { increment, decrement, setCount } = counterSlice.actions;

// Export the reducer to be used in store configuration
export default counterSlice.reducer;
