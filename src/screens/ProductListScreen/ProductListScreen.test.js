import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react-native';
import ProductListScreen from './ProductListScreen';
import renderInProvider from '../../../__tests__/utils/renderInProvider';

const mockOnPress = jest.fn();
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  setParams: jest.fn(),
};

describe('ProductListScreen', () => {
  it('should render the product list with the correct number of items', async () => {
    renderInProvider(<ProductListScreen navigation={mockNavigation} onPress={mockOnPress} />);

    // expect(screen.getByText('Items in the basket: 0')).toBeTruthy();

    // Check that product titles are rendered
    await waitFor(() => {
      expect(screen.getByText('Product One')).toBeTruthy();
    });
    expect(screen.getByText('Product Two')).toBeTruthy();
  });

  it('should call onPress when the checkout button is pressed', async () => {
    renderInProvider(<ProductListScreen navigation={mockNavigation} onPress={mockOnPress} />);
    let button;
    await waitFor(() => {
      button = screen.getByText('CHECKOUT');
    });
    fireEvent.press(button);

    expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Checkout');
  });
  /*   // mock the state to simulate a change to CheckoutScreen
    it('should render the CheckoutScreen when the state changes', () => {
      // mock the `useState` to return the `CHECKOUT_SCREEN` state
      // simulate the flow to change screens
    }); */
});
