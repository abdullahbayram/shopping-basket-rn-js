import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react-native';
import Navigator from './Navigator';
import renderInProvider from '../__tests__/utils/renderInProvider';

describe('Navigator Component', () => {
  it('should render ProductListScreen by default', async () => {
    renderInProvider(<Navigator />);
    let buttons;
    let button;
    await waitFor(() => {
      button = screen.getByText('CHECKOUT');
      buttons = screen.getAllByRole('button');
    });
    expect(button).toBeTruthy();
    expect(buttons.length).toBe(6);
  });
  it('should navigate to CheckoutScreen when CHECKOUT button is pressed', async () => {
    renderInProvider(<Navigator />);

    const checkoutButton = await screen.findByText('CHECKOUT');
    fireEvent.press(checkoutButton);

    await waitFor(() => {
      expect(screen.getByText('ORDER')).toBeTruthy(); // Assuming "ORDER" exists on CheckoutScreen
    });
  });
});
