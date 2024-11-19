import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  discount: 0,
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItemToBasket: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeItemFromBasket: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find((item) => item.id === productId);
      if (existingItem) {
        state.items = state.items.filter((item) => item.id !== productId);
      }
    },
    clearBasket: (state) => {
      state.items = [];
      state.discount = 0;
    },
    setDiscount: (state, action) => {
      state.discount = action.payload;
    },
    clearDiscount: (state) => {
      state.discount = 0;
    },
    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
  },
});

export const { addItemToBasket, removeItemFromBasket, clearBasket, clearDiscount, updateItemQuantity, setDiscount } =
  basketSlice.actions;
export default basketSlice.reducer;
