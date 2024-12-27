import React from 'react';
import { waitFor } from '@testing-library/react-native';
import { strings } from '@constants';
import { useNavigation } from '@react-navigation/native';
import renderWithProvidersAndNavigation from '@testUtils/renderInProvidersAndNavigation';
import { sampleBasket } from '@mocks/handlers';
import {
  fillPaymentInputs,
  verifyPaymentInputsFilled,
  verifyExistenceOfPaymentInputs,
  changeText,
  pressButton,
  verifyExistenceByText,
} from '@testUtils/testUtil';
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
    verifyExistenceByText('Items in the basket:  14');
    verifyExistenceByText('Total: $2648.01');
  });

  it('renders PaymentForm', () => {
    renderWithProvidersAndNavigation(<PaymentScreen navigation={navigation} />, {
      initialState,
    });

    verifyExistenceOfPaymentInputs();
  });

  it('disables the order button when basket is empty', () => {
    const mockOnPress = jest.fn();
    renderWithProvidersAndNavigation(<PaymentScreen navigation={navigation} />, {
      initialState,
    });

    pressButton(strings.buttons.payAndOrder);

    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('validates credit card input', async () => {
    renderWithProvidersAndNavigation(<PaymentScreen navigation={navigation} />, {
      initialState,
    });

    changeText('Credit Card Number', '1234');
    pressButton(strings.buttons.payAndOrder);

    await waitFor(() => {
      verifyExistenceByText(strings.payment.invalidCard);
    });
  });

  it('show feedback messages about required fields when pressed pay and order button with filling invalid inputs', async () => {
    renderWithProvidersAndNavigation(<PaymentScreen navigation={navigation} />, {
      initialState,
    });

    const cardDetails = {
      cardholderName: 'AB',
      cardNumber: '5566561551349323', // Valid card
      expirationDate: '07',
      cvv: '12',
    };

    fillPaymentInputs(cardDetails);
    verifyPaymentInputsFilled(cardDetails);

    pressButton(strings.buttons.payAndOrder);
    await waitFor(() => {
      verifyExistenceByText(strings.payment.cardHolderMinLength);
    });

    verifyExistenceByText(strings.payment.invalidExpirationDate);
    verifyExistenceByText(strings.payment.invalidExpirationDate);
    verifyExistenceByText(strings.payment.cvvLength);
  });

  it('show feedback messages about required fields when pressed pay and order button without filling inputs', async () => {
    renderWithProvidersAndNavigation(<PaymentScreen navigation={navigation} />, {
      initialState,
    });

    pressButton(strings.buttons.payAndOrder);

    await waitFor(() => {
      verifyExistenceByText(strings.payment.cardHolderRequired);
    });
    verifyExistenceByText(strings.payment.cvvRequired);
    verifyExistenceByText(strings.payment.expirationDateRequired);
    verifyExistenceByText(strings.payment.creditCardRequired);
  });
});
