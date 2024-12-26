import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import renderWithProvidersAndNavigation from '@testUtils/renderInProvidersAndNavigation';
import { sampleBasket, sampleResponse } from '@mocks/handlers';
import ProductListScreen from '.';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

const navigateMock = jest.fn();

useNavigation.mockReturnValue({
  navigate: navigateMock,
});

const initialState = {
  items: { items: sampleResponse },
  basket: { items: sampleBasket },
};

describe('ProductListScreen', () => {
  it('should render the first two items', async () => {
    renderWithProvidersAndNavigation(<ProductListScreen />, { initialState });

    await waitFor(() => {
      expect(screen.getByText('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops')).toBeTruthy();
    });

    expect(screen.getByText('Mens Casual Premium Slim Fit T-Shirts ')).toBeTruthy();
  });

  it('should call navigate when the checkout button is pressed', async () => {
    renderWithProvidersAndNavigation(<ProductListScreen />, { initialState });

    const checkoutButton = await screen.findByText('CHECKOUT');
    fireEvent.press(checkoutButton);

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledTimes(1);
    });
    expect(navigateMock).toHaveBeenCalledWith('Checkout'); // Replace 'Checkout' with the actual route name
  });
});
