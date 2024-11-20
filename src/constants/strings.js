const messages = {
  basketError: { title: 'Empty Basket', msg: 'Please add items to your basket before placing an order.' },
  invalidCard: { title: 'Invalid Credit Card', msg: 'Please enter a valid credit card number.' },
  invalidQuantity: { title: 'Invalid Quantity', msg: 'Quantity must be between 1 and 5.' },
  limitReached: { title: 'Limit Reached', msg: 'You can only add a maximum of 15 units per item.' },
  promoSuccess: { title: 'Promo Code', msg: 'Promo code applied successfully' },
  invalidPromo: { title: 'Promo Code', msg: 'Invalid promo code' },
  promoError: { title: 'Order Success', msg: 'Error applying promo code' },
  orderSuccess: {
    title: 'Promo Error',
    msg: `
Thank you!
Your order has been placed successfully.
`,
  },
};

export default messages;
