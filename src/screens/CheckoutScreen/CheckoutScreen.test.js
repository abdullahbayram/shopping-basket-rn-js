import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import renderWithProvidersAndNavigation from '@testUtils/renderInProvidersAndNavigation';
import { sampleBasket } from '@mocks/handlers';
import mockNavigation from '@mocks/navigation';
import CheckoutScreen from '.';

const initialState = { basket: { items: sampleBasket } };

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

const navigateMock = jest.fn();

useNavigation.mockReturnValue({
  navigate: navigateMock,
});

describe('CheckoutScreen', () => {
  it('should render CheckoutScreen correctly', () => {
    renderWithProvidersAndNavigation(<CheckoutScreen navigation={mockNavigation} />, { initialState });
    expect(screen.getByText('Mens Casual Premium Slim Fit T-Shirts')).toBeTruthy();
    // expect(screen.getByText('Remove Item')).toBeTruthy();
    // expect(screen.getByText('ORDER')).toBeTruthy(); + (14 items)
  });
  it('should match the snapshot', () => {
    renderWithProvidersAndNavigation(<CheckoutScreen navigation={mockNavigation} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
  it('should update credit card input value', () => {
    renderWithProvidersAndNavigation(<CheckoutScreen navigation={mockNavigation} />, { initialState });

    // const creditCardInput = screen.getByLabelText('Credit Card');
    // const creditCardInput = screen.getByPlaceholderText('Enter your credit card number');
    const inputs = screen.getAllByTestId('text-input-flat');
    const creditCardInput = inputs[inputs.length - 1];
    fireEvent.changeText(creditCardInput, '1234 5678 9012 3456');

    expect(creditCardInput.props.value).toBe('1234 5678 9012 3456');
  });

  // remove item
});
