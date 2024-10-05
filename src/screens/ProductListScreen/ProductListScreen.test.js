import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import ProductListScreen from './ProductListScreen';

const mockOnPress = jest.fn();

describe('ProductListScreen', () => {
  it('should render the product list with the correct number of items', () => {
    render(<ProductListScreen onPress={mockOnPress} />);

    expect(screen.getByText('Product List')).toBeTruthy();
    expect(screen.getByText('Items in the basket: 0')).toBeTruthy();

    // Check that product titles are rendered
    expect(screen.getByText('First Item')).toBeTruthy();
    expect(screen.getByText('Second Item')).toBeTruthy();
  });

  it('should call onPress when the checkout button is pressed', () => {
    render(<ProductListScreen onPress={mockOnPress} />);

    fireEvent.press(screen.getByText('CHECKOUT'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
  /*   // mock the state to simulate a change to CheckoutScreen
    it('should render the CheckoutScreen when the state changes', () => {
      // mock the `useState` to return the `CHECKOUT_SCREEN` state
      // simulate the flow to change screens
    }); */
});
