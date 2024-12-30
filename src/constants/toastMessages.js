const messages = {
  basket: {
    limitReached: { title: 'Limit Reached', message: 'You can only add a maximum of 5 units per item.' },
    empty: { title: 'Empty Basket', message: 'Please add items to your basket before placing an order.' },
    invalidQuantity: { title: 'Invalid Quantity', message: 'Quantity must be between 1 and 5.' },
  },
  promo: {
    success: { title: 'Promo Code', message: 'Promo code applied successfully' },
    invalid: { title: 'Promo Code', message: 'Invalid promo code' },
    error: { title: 'Promo Error', message: 'Error applying promo code' },
  },
};
export default messages;
