import React from 'react';
import { fireEvent, screen, waitFor, within } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import renderWithProvidersAndNavigation from '@testUtils/renderInProvidersAndNavigation';
import { sampleBasket } from '@mocks/handlers';
import mockNavigation from '@mocks/navigation';
import CheckoutScreen from '.';
import { strings } from '../../constants';

const initialState = { basket: { items: sampleBasket } };

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

const navigateMock = jest.fn();

useNavigation.mockReturnValue({
  navigate: navigateMock,
});

describe('CheckoutScreen', () => {
  it('should render CheckoutScreen correctly', () => {
    renderWithProvidersAndNavigation(<CheckoutScreen navigation={mockNavigation} />, { initialState });

    expect(screen.getByText('Mens Casual Premium Slim Fit T-Shirts')).toBeTruthy();

    expect(screen.getByText('Total: $2648.01')).toBeTruthy();
    expect(screen.getByText(/Order\s*\(\s*14\s*items\s*\)/)).toBeTruthy();

    expect(screen.getAllByText('Promo Code')[0]).toBeTruthy();
    expect(screen.getByText('Apply')).toBeTruthy();
  });
  it('should remove an item from the basket when "Remove Item" is pressed', async () => {
    renderWithProvidersAndNavigation(<CheckoutScreen navigation={mockNavigation} />, { initialState });

    // Get the checkoutcard and its 'Remove Item' button
    const firstCheckoutCard = screen.getAllByTestId('checkout-card')[0];
    const removeItemButton = within(firstCheckoutCard).getByText('Remove Item');

    // Initial assertions
    expect(screen.getByText(sampleBasket[0].title)).toBeTruthy();
    expect(screen.getByText(/Order\s*\(\s*14\s*items\s*\)/)).toBeTruthy(); // Basket starts with 14 item
    expect(screen.getByText('Total: $2648.01')).toBeTruthy();

    fireEvent.press(removeItemButton); // there were 3 items of removed product

    // Check total item count and total price updated
    expect(screen.queryByText(sampleBasket[0].title)).toBeFalsy();
    expect(screen.getByText(/Order\s*\(\s*11\s*items\s*\)/)).toBeTruthy();
    expect(screen.getByText('Total: $2318.16')).toBeTruthy();
  });
  it('should navigate to Payment screen when the ORDER button is pressed', () => {
    renderWithProvidersAndNavigation(<CheckoutScreen navigation={mockNavigation} />, { initialState });

    // Press the "ORDER" button
    const orderButton = screen.getByText(/Order\s*\(\s*14\s*items\s*\)/);
    fireEvent.press(orderButton);

    // Assert that navigation is called
    expect(navigateMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith('Payment'); // Replace with the actual route name
  });
  it('should show an error message when an invalid promo code is applied', async () => {
    renderWithProvidersAndNavigation(<CheckoutScreen navigation={mockNavigation} />, { initialState });
    const applyButton = screen.getByText('Apply');
    fireEvent.press(applyButton);
    await waitFor(() => {
      expect(screen.getByText(strings.checkout.promoCodeRequired)).toBeTruthy();
    });

    const promoInput = screen.getAllByText('Promo Code')[0];
    fireEvent.changeText(promoInput, 'INVALIDCODE');

    fireEvent.press(applyButton);
    await waitFor(() => {
      expect(screen.getByText(strings.checkout.promoCodeNotValid)).toBeTruthy();
    });
  });
  it('should disable order and promo buttons if the basket is empty', () => {
    renderWithProvidersAndNavigation(<CheckoutScreen navigation={mockNavigation} />, {
      initialState: { basket: { items: [] } },
    });

    expect(screen.getByText(strings.checkout.emptyBasket)).toBeTruthy();
    const orderButton = screen.getByTestId('order-button');
    const applyPromoButton = screen.getByText('Apply');

    expect(orderButton).toBeDisabled();
    expect(applyPromoButton).toBeDisabled();
  });
  it('should increase unit quantity, total count, and total price on "+" button press', async () => {
    renderWithProvidersAndNavigation(<CheckoutScreen navigation={mockNavigation} />, { initialState });

    const firstCheckoutCard = screen.getAllByTestId('checkout-card')[0];
    const increaseQuantityButton = within(firstCheckoutCard).getByTestId('increase-button');

    // Check initial state
    expect(screen.getByText(/Order\s*\(\s*14\s*items\s*\)/)).toBeTruthy();
    expect(screen.getByText('Total: $2648.01')).toBeTruthy();

    // Press "+" button
    fireEvent.press(increaseQuantityButton);

    // Assertions after increment
    await waitFor(() => {
      expect(screen.getByText(/Order\s*\(\s*15\s*items\s*\)/)).toBeTruthy();
    });
    expect(screen.getByText('Total: $2757.96')).toBeTruthy(); // Adjusted for increased item
  });
  it('should decrease unit quantity, total count, and total price on "-" button press', async () => {
    renderWithProvidersAndNavigation(<CheckoutScreen navigation={mockNavigation} />, { initialState });

    const firstCheckoutCard = screen.getAllByTestId('checkout-card')[0];
    const decreaseQuantityButton = within(firstCheckoutCard).getByTestId('decrease-button');

    // Check initial state
    expect(screen.getByText(/Order\s*\(\s*14\s*items\s*\)/)).toBeTruthy();
    expect(screen.getByText('Total: $2648.01')).toBeTruthy();

    // Press "-" button
    fireEvent.press(decreaseQuantityButton);

    // Assertions after decrement
    await waitFor(() => {
      expect(screen.getByText(/Order\s*\(\s*13\s*items\s*\)/)).toBeTruthy();
    });
    expect(screen.getByText('Total: $2538.06')).toBeTruthy(); // Adjusted for decreased item
  });
  it('should remove an item from the basket if quantity is 1 on delete icon press', async () => {
    renderWithProvidersAndNavigation(<CheckoutScreen navigation={mockNavigation} />, { initialState });

    const firstCheckoutCard = screen.getAllByTestId('checkout-card')[0]; // first card in the basket
    const decreaseQuantityButton = within(firstCheckoutCard).getByTestId('decrease-button');
    const quantityText = within(firstCheckoutCard).getByTestId('product-quantity');

    // Check initial state
    expect(screen.getByText(/Order\s*\(\s*14\s*items\s*\)/)).toBeTruthy();
    expect(screen.getByText('Total: $2648.01')).toBeTruthy();
    expect(screen.getByText(sampleBasket[0].title)).toBeTruthy(); // title of first item in the basket
    expect(within(quantityText).getByText('3')).toBeTruthy(); // count of first item in the basket is 3
    expect(within(firstCheckoutCard).queryByTestId('delete-button')).toBeFalsy(); // delete button is not present

    fireEvent.press(decreaseQuantityButton); // product count descrased to 2
    // await waitFor(() => {});
    fireEvent.press(decreaseQuantityButton); // product count descrased to 1

    expect(within(quantityText).getByText('1')).toBeTruthy(); // check product count is 1
    expect(within(firstCheckoutCard).queryByTestId('decrease-button')).toBeFalsy(); // decrease button is removed namely changed to delete button
    const deleteButton = within(firstCheckoutCard).getByTestId('delete-button'); // delete button is present

    fireEvent.press(deleteButton);

    // Check item removed
    await waitFor(() => {
      expect(screen.queryByText(sampleBasket[0].title)).toBeFalsy(); // first item in the basket removed
    });
    expect(screen.getByText(/Order\s*\(\s*11\s*items\s*\)/)).toBeTruthy();
    expect(screen.getByText('Total: $2318.16')).toBeTruthy();
  });
});
