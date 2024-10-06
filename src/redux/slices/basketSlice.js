import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalCount: 0,
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItemToBasket: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.sku === product.sku);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      state.totalCount += 1;
    },
    removeItemFromBasket: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find((item) => item.sku === productId);
      if (existingItem) {
        state.totalCount -= existingItem.quantity;
        state.items = state.items.filter((item) => item.sku !== productId);
      }
    },
  },
});

export const { addItemToBasket, removeItemFromBasket } = basketSlice.actions;
export default basketSlice.reducer;
