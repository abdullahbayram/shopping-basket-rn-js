import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import CheckoutScreen from './CheckoutScreen';
import renderInProvider from '../../../__tests__/utils/renderInProvider';
import { sampleBasket } from '../../../__tests__/mocks/handlers';

const initialState = { basket: { items: sampleBasket } };

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  setParams: jest.fn(),
};

describe('CheckoutScreen', () => {
  it('should render CheckoutScreen correctly', () => {
    renderInProvider(<CheckoutScreen navigation={mockNavigation} />, { initialState });
    expect(screen.getByText('Items in the basket: 14')).toBeTruthy();
    expect(screen.getByText('Mens Casual Premium Slim Fit T-Shirts')).toBeTruthy();
    // expect(screen.getByText('Remove Item')).toBeTruthy();
    expect(screen.getByText('ORDER')).toBeTruthy();
  });
  it('should match the snapshot', () => {
    renderInProvider(<CheckoutScreen navigation={mockNavigation} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
  it('should update credit card input value', () => {
    renderInProvider(<CheckoutScreen navigation={mockNavigation} />, { initialState });

    // const creditCardInput = screen.getByLabelText('Credit Card');
    // const creditCardInput = screen.getByPlaceholderText('Enter your credit card number');
    const inputs = screen.getAllByTestId('text-input-flat');
    const creditCardInput = inputs[inputs.length - 1];
    fireEvent.changeText(creditCardInput, '1234 5678 9012 3456');

    expect(creditCardInput.props.value).toBe('1234 5678 9012 3456');
  });

  // remove item
});
