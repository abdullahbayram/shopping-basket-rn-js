import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import ProductListScreen from './ProductListScreen';

const mockOnPress = jest.fn();
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  setParams: jest.fn(),
};

describe('ProductListScreen', () => {
  it('should render the product list with the correct number of items', () => {
    render(<ProductListScreen navigation={mockNavigation} onPress={mockOnPress} />);

    expect(screen.getByText('Items in the basket: 0')).toBeTruthy();

    // Check that product titles are rendered
    expect(screen.getByText('First Item')).toBeTruthy();
    expect(screen.getByText('Second Item')).toBeTruthy();
  });

  it('should call onPress when the checkout button is pressed', () => {
    render(<ProductListScreen navigation={mockNavigation} onPress={mockOnPress} />);

    fireEvent.press(screen.getByText('CHECKOUT'));
    expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Checkout');
  });
  /*   // mock the state to simulate a change to CheckoutScreen
    it('should render the CheckoutScreen when the state changes', () => {
      // mock the `useState` to return the `CHECKOUT_SCREEN` state
      // simulate the flow to change screens
    }); */
});
