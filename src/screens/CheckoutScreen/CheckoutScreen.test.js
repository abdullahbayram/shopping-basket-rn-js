import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import CheckoutScreen from './CheckoutScreen'; // Adjust the path as needed

describe('CheckoutScreen', () => {
  it('should render CheckoutScreen correctly', () => {
    render(<CheckoutScreen />);

    expect(screen.getByText('Checkout')).toBeTruthy();
    expect(screen.getByText('Items in the basket: 0')).toBeTruthy();
    expect(screen.getAllByText('Credit Card').length).toBe(2); // active and inactive text
    expect(screen.getByText('Product One')).toBeTruthy();
    expect(screen.getByText('Product One Description')).toBeTruthy();
    expect(screen.getByText('REMOVE ITEM')).toBeTruthy();
  });

  it('should update credit card input value', () => {
    render(<CheckoutScreen />);

    const creditCardInput = screen.getByTestId('text-input-flat');
    fireEvent.changeText(creditCardInput, '1234 5678 9012 3456');

    expect(creditCardInput.props.value).toBe('1234 5678 9012 3456');
  });

  it('should match the snapshot', () => {
    render(<CheckoutScreen />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
  // remove item
});
