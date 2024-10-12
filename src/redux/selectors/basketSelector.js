import { createSelector } from '@reduxjs/toolkit';

export const selectBasketItems = (state) => state.basket?.items || [];

export const selectTotalItemCount = createSelector([selectBasketItems], (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0),
);

export const selectDiscount = (state) => state.basket.discount || 0;

export const selectTotalPrice = createSelector([selectBasketItems, selectDiscount], (items, discount) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return total * (1 - discount / 100);
});
