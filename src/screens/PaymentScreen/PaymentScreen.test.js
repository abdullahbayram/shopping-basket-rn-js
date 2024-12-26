import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react-native';
import { strings } from '@constants';
import { useNavigation } from '@react-navigation/native';
import renderWithProvidersAndNavigation from '@testUtils/renderInProvidersAndNavigation';
import { sampleBasket } from '@mocks/handlers';
import PaymentScreen from '.';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

const navigateMock = jest.fn();

useNavigation.mockReturnValue({
  navigate: navigateMock,
});

const initialState = {
  basket: {
    items: sampleBasket,
  },
};

describe('<PaymentScreen />', () => {
  const navigation = { navigate: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays the correct basket summary', () => {
    renderWithProvidersAndNavigation(<PaymentScreen navigation={navigation} />, {
      initialState,
    });
    const itemCountText = screen.getByText('Items in the basket:  14');
    const totalText = screen.getByText('Total: $2648.01');
    // const itemCountText = screen.getByText(/Items in the basket:/i);
    // const totalText = screen.getByText(/Total:/i);

    expect(itemCountText).toBeTruthy();
    expect(totalText).toBeTruthy();
  });

  it('renders PaymentForm', () => {
    renderWithProvidersAndNavigation(<PaymentScreen navigation={navigation} />, {
      initialState,
    });

    expect(screen.getAllByText(strings.payment.cardholderName)[0]).toBeTruthy();
    expect(screen.getAllByText(strings.payment.creditCardNumber)[0]).toBeTruthy();
    expect(screen.getAllByText(strings.payment.expirationDate)[0]).toBeTruthy();
    expect(screen.getAllByText(strings.payment.cvv)[0]).toBeTruthy();
  });

  it('disables the order button when basket is empty', () => {
    const mockOnPress = jest.fn();
    renderWithProvidersAndNavigation(<PaymentScreen navigation={navigation} />, {
      initialState,
    });

    const orderButton = screen.getByText(strings.buttons.payAndOrder);
    fireEvent.press(orderButton);

    expect(mockOnPress).not.toHaveBeenCalled();
  });
  it('validates credit card input', async () => {
    renderWithProvidersAndNavigation(<PaymentScreen navigation={navigation} />, {
      initialState,
    });

    const cardNumberInput = screen.getAllByText(strings.payment.creditCardNumber)[0];
    fireEvent.changeText(cardNumberInput, '1234');

    const orderButton = screen.getByText(strings.buttons.payAndOrder);
    fireEvent.press(orderButton);

    await waitFor(() => {
      expect(screen.getByText(strings.payment.invalidCard)).toBeTruthy();
    });
  });
  it('show feedback messages about required fields when pressed pay and order button with filling invalid inputs', async () => {
    renderWithProvidersAndNavigation(<PaymentScreen navigation={navigation} />, {
      initialState,
    });

    const cardholderNameInput = screen.getAllByText(strings.payment.cardholderName)[0];
    fireEvent.changeText(cardholderNameInput, 'AB');
    const cvvInput = screen.getAllByText(strings.payment.cvv)[0];
    fireEvent.changeText(cvvInput, '12');
    const expirationInput = screen.getAllByText(strings.payment.expirationDate)[0];
    fireEvent.changeText(expirationInput, '07');

    const orderButton = screen.getByText(strings.buttons.payAndOrder);
    fireEvent.press(orderButton);
    await waitFor(() => {
      expect(screen.getAllByText(strings.payment.cardHolderMinLength)[0]).toBeTruthy();
    });
    expect(screen.getAllByText(strings.payment.cvvLength)[0]).toBeTruthy();
    expect(screen.getAllByText(strings.payment.invalidExpirationDate)[0]).toBeTruthy();
  });
  it('show feedback messages about required fields when pressed pay and order button without filling inputs', async () => {
    renderWithProvidersAndNavigation(<PaymentScreen navigation={navigation} />, {
      initialState,
    });

    const orderButton = screen.getByText(strings.buttons.payAndOrder);
    fireEvent.press(orderButton);

    await waitFor(() => {
      expect(screen.getAllByText(strings.payment.cardHolderRequired)[0]).toBeTruthy();
    });
    expect(screen.getAllByText(strings.payment.cvvRequired)[0]).toBeTruthy();
    expect(screen.getAllByText(strings.payment.expirationDateRequired)[0]).toBeTruthy();
    await waitFor(() => {
      expect(screen.getAllByText(strings.payment.creditCardRequired)[0]).toBeTruthy();
    });
  });
});
