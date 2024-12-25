import { strings } from '../constants';

export default {
  filterNumericInput: (text) => text.replace(/[^0-9]/g, ''),
  formatExpirationDate: (value) => {
    const sanitized = value.replace(/[^0-9]/g, '');
    if (sanitized.length <= 2) return sanitized;
    return `${sanitized.slice(0, 2)}/${sanitized.slice(2, 4)}`;
  },
  getIcon: (field, errors, isCreditCardValid) => {
    console.log(errors, 'errors');
    const { icons } = strings; // Extract icons from strings
    let isValid = !errors[field]; // Check if the field is valid

    if (field === 'creditCardNumber') {
      isValid = isCreditCardValid;
    }
    return isValid ? icons[`${field}Check`] : icons[field]; // Dynamically map field to valid/invalid icons
  },
  parseErrorMessage: (err) => {
    try {
      if (typeof err.msg === 'string') {
        const parsedError = JSON.parse(err.msg);
        if (Array.isArray(parsedError?.errors) && parsedError.errors.length > 0) {
          return parsedError.errors[0].msg;
        }
      } else if (Array.isArray(err?.errors) && err.errors.length > 0) {
        return err.errors[0].msg;
      }
    } catch (e) {
      console.error(strings.devErrors.parseErrorMessage, e);
    }
    return strings.payment.unexpectedError;
  },
};
