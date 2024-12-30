import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react-native';
import renderInProvider from '@testUtils/renderInProvider';
import { sampleBasket } from '@mocks/handlers';
import Navigator from './Navigator';
import { ThemeProvider } from '../context/ThemeContext';
import { verifyExistenceByText } from '../../__tests__/utils/testUtil';

const initialState = { basket: { items: sampleBasket } };

const renderWithThemeProvider = (ui, options = {}) => {
  return renderInProvider(<ThemeProvider>{ui}</ThemeProvider>, options);
};

describe('Navigator Component', () => {
  it('should render ProductListScreen by default', async () => {
    renderWithThemeProvider(<Navigator />);
    let buttons;
    let button;
    await waitFor(() => {
      button = screen.getByText('CHECKOUT (0)');
      buttons = screen.getAllByRole('button');
    });

    expect(button).toBeTruthy();
    expect(buttons.length).toBe(21); // 20 products + 1 checkout button
  });

  it('should navigate to CheckoutScreen when CHECKOUT button is pressed', async () => {
    renderWithThemeProvider(<Navigator />, { initialState });

    const checkoutButton = await screen.findByText('CHECKOUT (14)');
    fireEvent.press(checkoutButton);
    let buttons;
    await waitFor(() => {
      buttons = screen.getAllByRole('button');
    });
    verifyExistenceByText(/Order\s*\(\s*14\s*items\s*\)/);
    expect(buttons).toBeTruthy(); // "ORDER(14)" exists on CheckoutScreen,
  });
});
