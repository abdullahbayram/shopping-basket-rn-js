import { act, fireEvent, screen, waitFor, within } from '@testing-library/react-native';
import AppRoot from '../AppRoot';
import renderInProvider from './utils/renderInProvider';
import { sampleResponse } from '@mocks/handlers';
import { strings } from '../src/constants';
import {
  changeText,
  fillPaymentInputs,
  getXthOfItemsByText,
  pressButton,
  verifyCheckoutScreenContents,
  verifyExistenceByText,
  verifyItemCount,
  verifyPaymentInputsFilled,
} from './utils/testUtil';
import { darkTheme, lightTheme } from '../src/constants/theme';

const anItem = sampleResponse[1]; // 2nd item in the sampleResponse

// Helper functions
const addItemToBasket = async () => {
  const addToBasketButton = getXthOfItemsByText('Add to basket', 1);
  fireEvent.press(addToBasketButton);

  await waitFor(() => {
    verifyExistenceByText('CHECKOUT (1)');
  });

  // Verify updated basket summary
  verifyExistenceByText('Total: $22.30');
};

const navigateToCheckoutScreen = async () => {
  pressButton('CHECKOUT (1)');

  let orderButton;
  await waitFor(() => {
    orderButton = screen.getByText(/Order\s*\(\s*1\s*items\s*\)/);
  });

  // Verify checkout screen static and dynamic contents
  await verifyCheckoutScreenContents({
    totalPrice: '22.30',
    totalItemCount: 1,
    titleOfAnItem: anItem.title,
  });

  // Verify the item in the basket and in the checkout card
  const checkoutCard = screen.getByTestId('checkout-card');
  expect(within(checkoutCard).getByText(anItem.title)).toBeTruthy();

  return orderButton;
};

const applyPromoCodeAndVerifyApplied = async (promoCode) => {
  changeText('Promo Code', promoCode);
  pressButton('Apply');

  await waitFor(() => {
    verifyExistenceByText('Total: $22.30');
  });

  // Verify the discount is applied
  verifyExistenceByText('Total: $2.23');
};

const submitPayment = async (cardDetails) => {
  fillPaymentInputs(cardDetails);
  verifyPaymentInputsFilled(cardDetails);
  pressButton(strings.buttons.payAndOrder);
};

const verifyPaymentScreenContents = (payAndOrderButton) => {
  expect(payAndOrderButton).toBeTruthy();
  verifyExistenceByText('Items in the basket:  1');
  verifyExistenceByText('Total: $2.23');
};

describe('<AppRoot />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('user expected journey (success)', async () => {
    renderInProvider(<AppRoot />);

    // Verify initial state in ProductListScreen
    await waitFor(() => {
      verifyExistenceByText('CHECKOUT (0)');
    });
    verifyItemCount('Add to basket', 8); // 8 items in the list

    // Add item to basket and navigate
    await addItemToBasket();
    const orderButton = await navigateToCheckoutScreen();

    // Apply promo code
    await applyPromoCodeAndVerifyApplied('A90');

    // Navigate to PaymentScreen
    fireEvent.press(orderButton);

    let payAndOrderButton;
    await waitFor(() => {
      payAndOrderButton = screen.getByText(strings.buttons.payAndOrder);
    });

    verifyPaymentScreenContents(payAndOrderButton);

    // Submit payment
    await submitPayment({
      cardholderName: 'James Bond',
      cardNumber: '5566561551349323', // Valid card for success
      expirationDate: '12/28',
      cvv: '156',
    });

    // Verify navigation to SuccessScreen
    await waitFor(() => {
      verifyExistenceByText(strings.payment.success);
    });
    verifyExistenceByText('Redirecting to product list in 5 seconds...');

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Verify navigation back to ProductListScreen
    await waitFor(() => {
      verifyExistenceByText('CHECKOUT (0)');
    });
    verifyItemCount('Add to basket', 8); // 8 items in the list
  }, 10000);

  test('user expected journey (error)', async () => {
    renderInProvider(<AppRoot />);

    // Verify initial state in ProductListScreen
    await waitFor(() => {
      verifyExistenceByText('CHECKOUT (0)');
    });
    verifyItemCount('Add to basket', 8); // 8 items in the list

    // Add item to basket and navigate
    await addItemToBasket();
    const orderButton = await navigateToCheckoutScreen();

    // Apply promo code
    await applyPromoCodeAndVerifyApplied('A90');

    // Navigate to PaymentScreen
    fireEvent.press(orderButton);

    let payAndOrderButton;
    await waitFor(() => {
      payAndOrderButton = screen.getByText(strings.buttons.payAndOrder);
    });

    verifyPaymentScreenContents(payAndOrderButton);

    // Submit payment with failing card
    await submitPayment({
      cardholderName: 'James Bond',
      cardNumber: '5249045959484101', // Failing card
      expirationDate: '12/28',
      cvv: '156',
    });

    // Verify navigation to ErrorScreen
    await waitFor(() => {
      verifyExistenceByText('Card can not be processed');
    });
    verifyExistenceByText('Redirecting to product list in 10 seconds...');

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    // Verify navigation back to ProductListScreen
    await waitFor(() => {
      verifyExistenceByText('CHECKOUT (1)'); // Basket still contains the item after failure
    });
    verifyItemCount('Add to basket', 8); // 8 items in the list
  }, 10000);
  test('toggle dark mode', async () => {
    renderInProvider(<AppRoot />);

    // Verify light mode is enabled by default
    await waitFor(() => {
      expect(screen.getByTestId('base-screen')).toHaveStyle({
        backgroundColor: lightTheme.colors.background,
      });
    });

    // Locate and toggle dark mode
    const toggleButton = await waitFor(() => screen.getByTestId('toggle-dark-mode'));
    fireEvent(toggleButton, 'valueChange', true);

    // Verify dark mode is enabled
    await waitFor(() => {
      expect(screen.getByTestId('base-screen')).toHaveStyle({
        backgroundColor: darkTheme.colors.background,
      });
    });

    // Toggle back to light mode
    fireEvent(toggleButton, 'valueChange', false);

    // Verify light mode is enabled
    await waitFor(() => {
      expect(screen.getByTestId('base-screen')).toHaveStyle({
        backgroundColor: lightTheme.colors.background,
      });
    });
  });
});
