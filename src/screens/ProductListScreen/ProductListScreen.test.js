import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react-native';
import ProductListScreen from './ProductListScreen';
import renderInProvider from '../../../__tests__/utils/renderInProvider';
import { sampleBasket, sampleResponse } from '../../../__tests__/mocks/handlers';

const mockOnPress = jest.fn();
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  setParams: jest.fn(),
};

const initialState = { items: { items: sampleResponse }, basket: { items: sampleBasket } };

describe('ProductListScreen', () => {
  it('should render the first two items', async () => {
    renderInProvider(<ProductListScreen navigation={mockNavigation} onPress={mockOnPress} />);

    // expect(screen.getByText('Items in the basket: 0')).toBeTruthy();

    // Check that product titles are rendered
    await waitFor(() => {
      expect(screen.getByText('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops')).toBeTruthy();
    });
    expect(screen.getByText('Mens Casual Premium Slim Fit T-Shirts ')).toBeTruthy();
  });

  it('should call onPress when the checkout button is pressed', async () => {
    renderInProvider(<ProductListScreen navigation={mockNavigation} onPress={mockOnPress} />, { initialState });
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
