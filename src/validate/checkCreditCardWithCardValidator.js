const valid = require('card-validator');

const checkCreditCardWithCardValidator = (creditCardNumber) => {
  if (!creditCardNumber || typeof creditCardNumber !== 'string') {
    return false;
  }

  const numberValidation = valid.number(creditCardNumber);
  return numberValidation?.isValid || false;
};

export default checkCreditCardWithCardValidator;
