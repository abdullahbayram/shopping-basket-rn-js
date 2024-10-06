// https://gist.github.com/ShirtlessKirk/2134376
const validateCreditCardAlternative = (function (arr) {
  return function (ccNum) {
    let len = ccNum.length;
    let bit = 1;
    let sum = 0;
    let val;

    while (len) {
      // eslint-disable-next-line no-plusplus
      val = parseInt(ccNum.charAt(--len), 10);
      // eslint-disable-next-line no-bitwise,no-cond-assign
      sum += (bit ^= 1) ? arr[val] : val;
    }

    return sum && sum % 10 === 0;
  };
})([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]);

export default validateCreditCardAlternative;
