import checkCreditCardWithCardValidator from './checkCreditCardWithCardValidator';
import { strings } from '../constants';

const validationRules = {
  cardholderName: {
    required: strings.payment.cardHolderRequired,
    minLength: { value: 3, message: strings.payment.cardHolderMinLength },
  },
  creditCardNumber: {
    required: strings.payment.creditCardRequired,
    validate: {
      isValidCreditCard: (value) => checkCreditCardWithCardValidator(value) || strings.payment.invalidCard,
    },
  },
  expirationDate: {
    required: strings.payment.expirationDateRequired,
    pattern: {
      value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
      message: strings.payment.invalidExpirationDate,
    },
  },
  cvv: {
    required: strings.payment.cvvRequired,
    minLength: { value: 3, message: strings.payment.cvvLength },
  },
};

export default validationRules;
