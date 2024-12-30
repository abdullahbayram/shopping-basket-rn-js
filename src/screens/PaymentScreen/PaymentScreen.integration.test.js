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

describe('PaymentScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should navigate to SuccessScreen on valid input and successful payment', async () => {
    renderWithProvidersAndNavigation(<PaymentScreen />, { initialState });

    // Fill in valid inputs
    fireEvent.changeText(screen.getAllByText(strings.payment.cardholderName)[0], 'James Bond');
    fireEvent.changeText(screen.getAllByText(strings.payment.creditCardNumber)[0], '5566561551349323'); // Successful card
    fireEvent.changeText(screen.getAllByText(strings.payment.expirationDate)[0], '12/28');
    fireEvent.changeText(screen.getAllByText(strings.payment.cvv)[0], '156');

    // Submit payment
    fireEvent.press(screen.getByText(strings.buttons.payAndOrder));

    // Assert navigation to Success screen
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('Success');
    });
  }, 10000);

  it('should navigate to ErrorScreen on valid input but failed payment', async () => {
    renderWithProvidersAndNavigation(<PaymentScreen />, { initialState });

    // Fill in valid inputs with a failing card
    fireEvent.changeText(screen.getAllByText(strings.payment.cardholderName)[0], 'James Bond');
    fireEvent.changeText(screen.getAllByText(strings.payment.creditCardNumber)[0], '5249045959484101'); // Failing card
    fireEvent.changeText(screen.getAllByText(strings.payment.expirationDate)[0], '12/28');
    fireEvent.changeText(screen.getAllByText(strings.payment.cvv)[0], '156');

    // Submit payment
    fireEvent.press(screen.getByText(strings.buttons.payAndOrder));

    // Assert navigation to Error screen
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('Error', { errorMessage: 'Card can not be processed.' });
    });
  }, 10000);
});
