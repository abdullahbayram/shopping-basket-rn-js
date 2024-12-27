import React from 'react';
import { screen } from '@testing-library/react-native';
import { strings } from '@constants';
import renderInFormProvider from '@testUtils/renderInFormProvider';
import PaymentForm from './index';

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

    expect(screen.getAllByText(strings.payment.cardholderName).length).toBe(2);
    expect(screen.getAllByText(strings.payment.creditCardNumber).length).toBe(2);
    expect(screen.getAllByText(strings.payment.expirationDate).length).toBe(2);
    expect(screen.getAllByText(strings.payment.cvv).length).toBe(2);
  });
});
