const valid = require('card-validator');

const checkCreditCardWithCardValidator = (creditCardNumber) => {
  if (!creditCardNumber || typeof creditCardNumber !== 'string') {
    console.log('Invalid input: creditCardNumber must be a non-empty string');
    return false;
  }

  const numberValidation = valid.number(creditCardNumber);
  return numberValidation?.isValid || false;
};

export default checkCreditCardWithCardValidator;
