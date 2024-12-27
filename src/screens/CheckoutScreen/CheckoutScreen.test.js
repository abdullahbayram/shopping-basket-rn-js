import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { screen, waitFor, fireEvent, within } from '@testing-library/react-native';
import renderWithProvidersAndNavigation from '@testUtils/renderInProvidersAndNavigation';
import {
  mockBasketState,
  verifyCheckoutScreenContents,
  verifyInExistenceByText,
  verifyExistenceByText,
  pressButton,
  changeText,
  getFirstOfItemsByTestId,
} from '@testUtils/testUtil';
import { sampleBasket } from '@mocks/handlers';
import { strings } from '@constants';
import CheckoutScreen from '.';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

const navigateMock = jest.fn();

useNavigation.mockReturnValue({
  navigate: navigateMock,
});

// Apply promo code is in the integration test
describe('CheckoutScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const initialState = mockBasketState;

  it('renders CheckoutScreen correctly', () => {
    renderWithProvidersAndNavigation(<CheckoutScreen />, { initialState });

    verifyCheckoutScreenContents({
      totalPrice: '2648.01',
      totalItemCount: 14,
      titleOfAnItem: sampleBasket[0].title,
    });
  });

  it('should remove an item from the basket when "Remove Item" is pressed', async () => {
    renderWithProvidersAndNavigation(<CheckoutScreen />, { initialState });

    // Get the checkoutcard and its 'Remove Item' button
    const firstCheckoutCard = getFirstOfItemsByTestId('checkout-card');
    const removeItemButton = within(firstCheckoutCard).getByText('Remove Item');

    // Initial assertions
    verifyCheckoutScreenContents({
      totalPrice: '2648.01',
      totalItemCount: 14, // Basket starts with 14 item
      titleOfAnItem: sampleBasket[0].title,
    });

    fireEvent.press(removeItemButton); // there were 3 items of removed product

    // Check total item count and total price updated
    verifyInExistenceByText(sampleBasket[0].title);
    verifyExistenceByText(/Order\s*\(\s*11\s*items\s*\)/);
    verifyExistenceByText('Total: $2318.16');
  });

  it('should navigate to Payment screen when ORDER button is pressed', async () => {
    renderWithProvidersAndNavigation(<CheckoutScreen />, { initialState });

    // Press the "ORDER" button
    pressButton(/Order\s*\(\s*14\s*items\s*\)/);

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('Payment');
    });
  });

  it('should show an error message when an invalid promo code or empty code is applied ', async () => {
    renderWithProvidersAndNavigation(<CheckoutScreen />, { initialState });

    pressButton('Apply');

    await waitFor(() => {
      verifyExistenceByText(strings.checkout.promoCodeRequired);
    });

    changeText('Promo Code', 'INVALIDCODE');

    pressButton('Apply');
    await waitFor(() => {
      verifyExistenceByText(strings.checkout.promoCodeNotValid);
    });
  });
  it('should disable order and promo buttons if the basket is empty', () => {
    renderWithProvidersAndNavigation(<CheckoutScreen />, {
      initialState: { basket: { items: [] } },
    });

    verifyExistenceByText(strings.checkout.emptyBasket);
    const orderButton = screen.getByTestId('order-button');
    const applyPromoButton = screen.getByText('Apply');

    expect(orderButton).toBeDisabled();
    expect(applyPromoButton).toBeDisabled();
  });
  it('should increase unit quantity, total count, and total price on "+" button press', async () => {
    renderWithProvidersAndNavigation(<CheckoutScreen />, { initialState });

    const firstCheckoutCard = getFirstOfItemsByTestId('checkout-card');
    const increaseQuantityButton = within(firstCheckoutCard).getByTestId('increase-button');

    // Check initial state
    verifyCheckoutScreenContents({
      totalPrice: '2648.01',
      totalItemCount: 14,
      titleOfAnItem: sampleBasket[0].title,
    });

    // Press "+" button
    fireEvent.press(increaseQuantityButton);

    // Assertions after increment
    await waitFor(() => {
      verifyExistenceByText(/Order\s*\(\s*15\s*items\s*\)/);
    });
    verifyExistenceByText('Total: $2757.96'); // Updated for increased item
  });
  it('should decrease unit quantity, total count, and total price on "-" button press', async () => {
    renderWithProvidersAndNavigation(<CheckoutScreen />, { initialState });

    const firstCheckoutCard = getFirstOfItemsByTestId('checkout-card');
    const decreaseQuantityButton = within(firstCheckoutCard).getByTestId('decrease-button');

    // Check initial state
    verifyCheckoutScreenContents({
      totalPrice: '2648.01',
      totalItemCount: 14,
      titleOfAnItem: sampleBasket[0].title,
    });

    // Press "-" button
    fireEvent.press(decreaseQuantityButton);

    // Assertions after decrement
    await waitFor(() => {
      verifyExistenceByText(/Order\s*\(\s*13\s*items\s*\)/);
    });
    verifyExistenceByText('Total: $2538.06'); // Adjusted for decreased item
  });
  it('should remove an item from the basket if quantity is 1 on delete icon press', async () => {
    renderWithProvidersAndNavigation(<CheckoutScreen />, { initialState });

    const firstCheckoutCard = getFirstOfItemsByTestId('checkout-card');
    const decreaseQuantityButton = within(firstCheckoutCard).getByTestId('decrease-button');
    const quantityText = within(firstCheckoutCard).getByTestId('product-quantity');

    // Check initial state
    verifyCheckoutScreenContents({
      totalPrice: '2648.01',
      totalItemCount: 14,
      titleOfAnItem: sampleBasket[0].title,
    });

    expect(within(quantityText).getByText('3')).toBeTruthy(); // count of first item in the basket is 3
    expect(within(firstCheckoutCard).queryByTestId('delete-button')).toBeFalsy(); // delete button is not present

    fireEvent.press(decreaseQuantityButton); // product count decreased to 2
    // await waitFor(() => {});
    fireEvent.press(decreaseQuantityButton); // product count decreased to 1

    expect(within(quantityText).getByText('1')).toBeTruthy(); // check product count is 1
    expect(within(firstCheckoutCard).queryByTestId('decrease-button')).toBeFalsy(); // decrease button is removed namely changed to delete button
    const deleteButton = within(firstCheckoutCard).getByTestId('delete-button'); // delete button is present

    fireEvent.press(deleteButton);

    // Check item removed
    await waitFor(() => {
      verifyInExistenceByText(sampleBasket[0].title); // first item in the basket removed
    });
    verifyExistenceByText(/Order\s*\(\s*11\s*items\s*\)/);
    verifyExistenceByText('Total: $2318.16');
  });
});
