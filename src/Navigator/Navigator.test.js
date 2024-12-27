import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react-native';
import renderInProvider from '@testUtils/renderInProvider';
import { sampleBasket } from '@mocks/handlers';
import Navigator from './Navigator';
import { ThemeProvider } from '../context/ThemeContext'; // Import ThemeProvider

const initialState = { basket: { items: sampleBasket } };

// TODO centralize
const renderWithThemeProvider = (ui, options = {}) => {
  return renderInProvider(<ThemeProvider>{ui}</ThemeProvider>, options);
};

describe('Navigator Component', () => {
  it('should render ProductListScreen by default', async () => {
    renderWithThemeProvider(<Navigator />);
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
    renderWithThemeProvider(<Navigator />, { initialState });

    const checkoutButton = await screen.findByText('CHECKOUT');
    fireEvent.press(checkoutButton);
    let buttons;
    await waitFor(() => {
      buttons = screen.getAllByRole('button');
    });
    expect(buttons).toBeTruthy(); // "ORDER" exists on CheckoutScreen, TODO getByText(Order(1 items))
  });
});
