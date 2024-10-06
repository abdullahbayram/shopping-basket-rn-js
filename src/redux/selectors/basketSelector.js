import { createSelector } from '@reduxjs/toolkit';

export const selectBasketItems = (state) => state.basket?.items || [];

export const selectTotalItemCount = createSelector([selectBasketItems], (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0),
);

export const selectTotalPrice = createSelector([selectBasketItems], (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0),
);
