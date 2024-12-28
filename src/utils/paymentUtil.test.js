import paymentUtils from './paymentUtils';
import { strings } from '../constants';

describe('paymentUtils', () => {
  describe('filterNumericInput', () => {
    it('removes all non-numeric characters', () => {
      expect(paymentUtils.filterNumericInput('123abc456')).toBe('123456');
      expect(paymentUtils.filterNumericInput('a1!@#$%^&*()2b')).toBe('12');
    });

    it('returns an empty string for non-numeric input', () => {
      expect(paymentUtils.filterNumericInput('abc')).toBe('');
    });
  });

  describe('formatExpirationDate', () => {
    it('formats date correctly for input with 4 digits', () => {
      expect(paymentUtils.formatExpirationDate('1223')).toBe('12/23');
    });

    it('adds a slash when input exceeds two digits', () => {
      expect(paymentUtils.formatExpirationDate('123')).toBe('12/3');
    });

    it('returns input unchanged if less than or equal to two digits', () => {
      expect(paymentUtils.formatExpirationDate('1')).toBe('1');
      expect(paymentUtils.formatExpirationDate('12')).toBe('12');
    });

    it('removes all non-numeric characters', () => {
      expect(paymentUtils.formatExpirationDate('12/23')).toBe('12/23');
      expect(paymentUtils.formatExpirationDate('abc')).toBe('');
    });
  });

  describe('getIcon', () => {
    it('returns correct valid icon for valid fields', () => {
      const errors = { cardholderName: false };
      expect(paymentUtils.getIcon('cardholderName', errors, false)).toBe(strings.icons.cardholderNameCheck);
    });

    it('returns correct error icon for invalid fields', () => {
      const errors = { cardholderName: true };
      expect(paymentUtils.getIcon('cardholderName', errors, false)).toBe(strings.icons.cardholderName);
    });

    it('handles creditCardNumber field with isCreditCardValid flag', () => {
      const errors = { creditCardNumber: true };
      expect(paymentUtils.getIcon('creditCardNumber', errors, true)).toBe(strings.icons.creditCardNumberCheck);
      expect(paymentUtils.getIcon('creditCardNumber', errors, false)).toBe(strings.icons.creditCardNumber);
    });
  });

  describe('parseErrorMessage', () => {
    it('returns the first error message from parsed JSON string', () => {
      const error = {
        message: JSON.stringify({ errors: [{ message: 'Card declined' }] }),
      };
      expect(paymentUtils.parseErrorMessage(error)).toBe('Card declined');
    });

    it('returns the first error message from the errors array', () => {
      const error = {
        errors: [{ message: 'Invalid card number' }],
      };
      expect(paymentUtils.parseErrorMessage(error)).toBe('Invalid card number');
    });

    it('returns unexpectedError message if no specific error is found', () => {
      const error = {};
      expect(paymentUtils.parseErrorMessage(error)).toBe(strings.payment.unexpectedError);
    });

    it('handles invalid JSON gracefully and returns unexpectedError', () => {
      const error = {
        message: 'Invalid JSON',
      };
      expect(paymentUtils.parseErrorMessage(error)).toBe(strings.payment.unexpectedError);
    });
  });
});
