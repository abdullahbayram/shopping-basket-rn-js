import React from 'react';
import { screen } from '@testing-library/react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { strings } from '@constants';
import PaymentForm from '.';
import { renderInThemeProvider } from '../../../../../__tests__/utils/renderInThemeProvider';

jest.mock('@utils', () => ({
  paymentUtils: {
    getIcon: jest.fn(() => 'mock-icon'),
    formatExpirationDate: jest.fn((value) => value),
    filterNumericInput: jest.fn((value) => value),
  },
}));

describe('<PaymentForm />', () => {
  // eslint-disable-next-line react/prop-types
  const Wrapper = ({ children }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  const mockErrors = {
    cardholderName: false,
    creditCardNumber: false,
    expirationDate: false,
    cvv: false,
  };

  it('renders all inputs with correct labels', () => {
    renderInThemeProvider(
      <Wrapper>
        <PaymentForm errors={mockErrors} isCreditCardValid />
      </Wrapper>,
    );

    expect(screen.getAllByText(strings.payment.cardholderName).length).toBe(2);
    expect(screen.getAllByText(strings.payment.creditCardNumber).length).toBe(2);
    expect(screen.getAllByText(strings.payment.expirationDate).length).toBe(2);
    expect(screen.getAllByText(strings.payment.cvv).length).toBe(2);
  });
});
