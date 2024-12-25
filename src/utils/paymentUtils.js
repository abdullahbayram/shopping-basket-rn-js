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
};
