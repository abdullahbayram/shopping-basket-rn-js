export default {
  icons: {
    cardholderName: 'account',
    cardholderNameCheck: 'account-check',
    expirationDate: 'calendar-alert',
    expirationDateCheck: 'calendar-check',
    cvv: 'shield-alert',
    cvvCheck: 'shield-check',
    creditCardNumber: 'credit-card',
    creditCardNumberCheck: 'credit-card-check',
  },
  screens: {
    success: 'Success',
    payment: 'Payment',
    error: 'Error',
    checkout: 'Checkout',
  },
  devErrors: {
    parseErrorMessage: 'Failed to parse error message:',
  },
  buttons: {
    retry: 'Retry',
    checkout: 'CHECKOUT',
    order: 'ORDER',
    payAndOrder: 'PAY AND ORDER',
    gotoProducts: 'Go to Products',
  },
  productList: {
    basketItemCount: 'Items in the basket: ',
    loading: 'Loading products...',
    errorLoading: 'Unable to load products. Please try again.',
    limitReached: 'You reached the max quantity per product!',
  },
  checkout: {
    total: 'Total:',
    order: 'ORDER',
    promoCodePlaceholder: 'Enter your promo code',
    promoCode: 'Promo Code',
    promoCodeRequiredMessage: 'Promo code can not be empty',
    promoCodeNotValid: 'This promo code is not valid',
    applyPromo: 'APPLY PROMO CODE',
    emptyBasket: 'Your basket is empty.',
  },
  payment: {
    total: 'Total:',
    basketItemCount: 'Items in the basket: ',
    cardholderName: 'Cardholder Name',
    cardholderNamePlaceholder: 'Enter the name on your card',
    creditCardNumber: 'Credit Card Number',
    creditCardPlaceholder: 'Enter your credit card number',
    expirationDate: 'Expiration Date',
    expirationDatePlaceholder: 'MM/YY',
    cvv: 'CVV',
    cvvPlaceholder: '123',
    unexpectedError: 'An unexpected error occurred. Please try again later.',
    unexpectedErrorShort: 'Unexpected Error',
    invalidCard: 'Invalid credit card number',
    cardHolderRequired: 'Cardholder name is required',
    creditCardRequired: 'Credit card number is required',
    expirationDateRequired: 'Expiration date is required',
    cvvRequired: 'CVV is required',
    invalidExpirationDate: 'Invalid expiration date (MM/YY)',
    cvvLength: 'CVV must be 3 digits',
    cardHolderMinLength: 'Cardholder name must be at least 3 characters',
    success: `
Thank you!
Your order has been placed successfully.
      `,
  },
};
