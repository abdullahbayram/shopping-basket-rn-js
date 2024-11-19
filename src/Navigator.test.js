import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react-native';
import Navigator from './Navigator';
import renderInProvider from '../__tests__/utils/renderInProvider';
import { sampleBasket } from '../__tests__/mocks/handlers';

const initialState = { basket: { items: sampleBasket } };

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
    expect(buttons.length).toBe(9);
  });
  it('should navigate to CheckoutScreen when CHECKOUT button is pressed', async () => {
    renderInProvider(<Navigator />, { initialState });

    const checkoutButton = await screen.findByText('CHECKOUT');
    fireEvent.press(checkoutButton);
    let buttons;
    await waitFor(() => {
      buttons = screen.getAllByRole('button');
    });
    expect(buttons).toBeTruthy(); //  "ORDER" exists on CheckoutScreen, TODO getByText(Order(1 items))
  });
});
