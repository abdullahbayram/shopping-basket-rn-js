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
    },
    removeItemFromBasket: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find((item) => item.sku === productId);
      if (existingItem) {
        state.items = state.items.filter((item) => item.sku !== productId);
      }
    },
    clearBasket: (state) => {
      state.items = [];
    },
    updateItemQuantity: (state, action) => {
      const { sku, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.sku === sku);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
  },
});

export const { addItemToBasket, removeItemFromBasket, clearBasket, updateItemQuantity } = basketSlice.actions;
export default basketSlice.reducer;
