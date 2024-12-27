import React from 'react';
import renderInFormProvider from '@testUtils/renderInFormProvider';
import PaymentForm from './index';
import { verifyExistenceOfPaymentInputs } from '../../../../__tests__/utils/testUtil';

jest.mock('@utils', () => ({
  paymentUtils: {
    getIcon: jest.fn(() => 'mock-icon'),
    formatExpirationDate: jest.fn((value) => value),
    filterNumericInput: jest.fn((value) => value),
  },
}));

describe('<PaymentForm />', () => {
  const mockErrors = {
    cardholderName: false,
    creditCardNumber: false,
    expirationDate: false,
    cvv: false,
  };

  it('renders all inputs with correct labels', () => {
    renderInFormProvider(<PaymentForm errors={mockErrors} isCreditCardValid />);

    verifyExistenceOfPaymentInputs();
  });
});
