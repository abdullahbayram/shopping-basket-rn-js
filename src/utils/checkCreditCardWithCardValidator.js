const valid = require('card-validator');

const checkCreditCardWithCardValidator = (creditCardNumber) => {
  const numberValidation = valid.number(creditCardNumber);
  console.log(numberValidation, 'numberValidation');
  return numberValidation.isValid;
};

export default checkCreditCardWithCardValidator;
