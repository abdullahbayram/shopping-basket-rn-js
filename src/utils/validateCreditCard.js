// https://gist.github.com/DiegoSalazar/4075533
function validateCreditCard(value) {
  // Accept only digits, dashes or spaces
  if (value === '') return false;
  if (/[^0-9-\s]+/.test(value)) return false;

  // The Luhn Algorithm. It's so pretty.
  let nCheck = 0;
  let bEven = false;
  // eslint-disable-next-line no-param-reassign
  value = value.replace(/\D/g, '');

  // eslint-disable-next-line no-plusplus
  for (let n = value.length - 1; n >= 0; n--) {
    const cDigit = value.charAt(n);
    let nDigit = parseInt(cDigit, 10);

    // eslint-disable-next-line no-cond-assign
    if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

    nCheck += nDigit;
    bEven = !bEven;
  }

  // eslint-disable-next-line eqeqeq
  return nCheck % 10 == 0;
}

export default validateCreditCard;
