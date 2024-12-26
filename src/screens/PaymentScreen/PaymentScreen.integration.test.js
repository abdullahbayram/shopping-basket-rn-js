import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react-native';
import renderWithProvidersAndNavigation from '@testUtils/renderInProvidersAndNavigation';
import { sampleBasket } from '@mocks/handlers';
import { useNavigation } from '@react-navigation/native';
import PaymentScreen from '.';
import { strings } from '../../constants';

const initialState = { basket: { items: sampleBasket } };

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

const navigateMock = jest.fn();

useNavigation.mockReturnValue({
  navigate: navigateMock,
});

// integration test with msw
describe('PaymentScreen', () => {
  it('should navigate SuccessScreen when filled valid inputs and PAY and ORDER button press', async () => {
    // console.log('Rendering CheckoutScreen...');
    renderWithProvidersAndNavigation(<PaymentScreen />, { initialState });

    const cardHolderNameInput = screen.getAllByText(strings.payment.cardholderName)[0];
    fireEvent.changeText(cardHolderNameInput, 'James Bond');

    const creditCardInput = screen.getAllByText(strings.payment.creditCardNumber)[0];
    fireEvent.changeText(creditCardInput, '5566561551349323');

    const expirationInput = screen.getAllByText(strings.payment.expirationDate)[0];
    fireEvent.changeText(expirationInput, '12/28');

    const cvvInput = screen.getAllByText(strings.payment.cvv)[0];
    fireEvent.changeText(cvvInput, '156');

    const payAndOrder = screen.getByText(strings.buttons.payAndOrder);
    fireEvent.press(payAndOrder);

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('Success');
    });
  }, 10000);

  // TODO Error case
});
