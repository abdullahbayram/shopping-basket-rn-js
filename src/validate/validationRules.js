import checkCreditCardWithCardValidator from './checkCreditCardWithCardValidator';

const validationRules = {
  cardholderName: {
    required: 'Cardholder name is required',
    minLength: { value: 3, message: 'Name must be at least 3 characters' },
  },
  creditCardNumber: {
    required: 'Credit card number is required',
    validate: {
      isValidCreditCard: (value) => checkCreditCardWithCardValidator(value) || 'Invalid credit card number',
    },
  },
  expirationDate: {
    required: 'Expiration date is required',
    pattern: {
      value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
      message: 'Invalid expiration date (MM/YY)',
    },
  },
  cvv: {
    required: 'CVV is required',
    minLength: { value: 3, message: 'CVV must be 3 digits' },
  },
};

export default validationRules;
