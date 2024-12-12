const messages = {
  basket: {
    limitReached: { title: 'Limit Reached', msg: 'You can only add a maximum of 15 units per item.' },
    empty: { title: 'Empty Basket', msg: 'Please add items to your basket before placing an order.' },
    invalidQuantity: { title: 'Invalid Quantity', msg: 'Quantity must be between 1 and 5.' },
  },
  promo: {
    success: { title: 'Promo Code', msg: 'Promo code applied successfully' },
    invalid: { title: 'Promo Code', msg: 'Invalid promo code' },
    error: { title: 'Promo Error', msg: 'Error applying promo code' },
  },
};
export default messages;
