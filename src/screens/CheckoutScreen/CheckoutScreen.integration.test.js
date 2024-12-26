import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react-native';
import renderWithProvidersAndNavigation from '@testUtils/renderInProvidersAndNavigation';
import { sampleBasket } from '@mocks/handlers';
import mockNavigation from '@mocks/navigation';
import CheckoutScreen from '.';

const initialState = { basket: { items: sampleBasket } };

// integration test with msw
describe('CheckoutScreen', () => {
  it('should apply a promo code and update the total price', async () => {
    // console.log('Rendering CheckoutScreen...');
    renderWithProvidersAndNavigation(<CheckoutScreen navigation={mockNavigation} />, { initialState });

    // console.log('Checking initial total price...');
    expect(screen.getByText('Total: $2648.01')).toBeTruthy();

    // Input a promo code
    const promoInput = screen.getAllByText('Promo Code')[0];
    fireEvent.changeText(promoInput, 'A10');

    // console.log('Pressing Apply button...');
    const applyButton = screen.getByText('Apply');
    fireEvent.press(applyButton);

    // console.log('Waiting for discount to apply...');
    await waitFor(() => {
      expect(screen.queryByText('Total: $2648.01')).toBeFalsy();
    });
    expect(screen.getByText('Total: $2383.21')).toBeTruthy();
    // console.log('Test complete.');
  }, 10000);
});
