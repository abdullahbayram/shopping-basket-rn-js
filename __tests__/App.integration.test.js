import { act, fireEvent, screen, waitFor, within } from '@testing-library/react-native';
import App from '../App';
import renderInProvider from './utils/renderInProvider';
import { sampleResponse } from './mocks/handlers';
import { strings } from '../src/constants';

const anItem = sampleResponse[1]; // 2nd item in the sampleResponse

describe('<App />', () => {
  renderInProvider(<App />);
  test('user expected journey', async () => {
    // Initial state in ProductListScreen
    await waitFor(() => {
      screen.getByText('CHECKOUT (0)');
    });
    expect(screen.getAllByText('Add to basket').length).toBe(20); // 20 items in the list
    // add 2nd item in the sampleResponse
    const addToBasketButton = screen.getAllByText('Add to basket')[1];
    fireEvent.press(addToBasketButton);

    // Updated totalItemCount
    await waitFor(() => {
      expect(screen.getByText('CHECKOUT (1)')).toBeTruthy();
    });
    expect(screen.getByText('Total: $22.30')).toBeTruthy();
    const checkoutButton = await screen.findByText('CHECKOUT (1)');
    fireEvent.press(checkoutButton);

    // check navigates to CheckoutScreen
    let orderButton;
    await waitFor(() => {
      orderButton = screen.getByText(/Order\s*\(\s*1\s*items\s*\)/);
    });
    expect(orderButton).toBeTruthy();
    const promoInput = screen.getAllByText('Promo Code')[0];
    expect(promoInput).toBeTruthy();
    const applyButton = screen.getByText('Apply');
    expect(applyButton).toBeTruthy();

    // check item in the basket
    const checkoutCard = screen.getByTestId('checkout-card');
    expect(within(checkoutCard).getByText(anItem.title)).toBeTruthy();

    //apply promo code
    fireEvent.changeText(promoInput, 'A90');
    fireEvent.press(applyButton);
    await waitFor(() => {
      expect(screen.queryByText('Total: $22.30')).toBeFalsy();
    });
    expect(screen.queryByText('Total: $2.23')).toBeTruthy();

    // check navigates to PaymentScreen
    fireEvent.press(orderButton);

    let payAndOrderButton;
    await waitFor(() => {
      payAndOrderButton = screen.getByText(strings.buttons.payAndOrder);
    });
    expect(payAndOrderButton).toBeTruthy();

    const itemCountText = screen.getByText('Items in the basket:  1');
    const totalText = screen.getByText('Total: $2.23');
    const cardholderNameInput = screen.getAllByText(strings.payment.cardholderName)[0];
    const cardNumberInput = screen.getAllByText(strings.payment.creditCardNumber)[0];
    const cvvInput = screen.getAllByText(strings.payment.cvv)[0];
    fireEvent.changeText(cvvInput, '12');
    const expirationInput = screen.getAllByText(strings.payment.expirationDate)[0];
    fireEvent.changeText(expirationInput, '07');

    expect(itemCountText).toBeTruthy();
    expect(totalText).toBeTruthy();
    expect(cardholderNameInput).toBeTruthy();
    expect(cvvInput).toBeTruthy();
    expect(expirationInput).toBeTruthy();
    expect(cardNumberInput).toBeTruthy();

    // Fill in valid inputs
    fireEvent.changeText(cardholderNameInput, 'James Bond');
    fireEvent.changeText(cardNumberInput, '5566561551349323'); // Successful card
    fireEvent.changeText(expirationInput, '12/28');
    fireEvent.changeText(cvvInput, '156');

    // Submit payment
    fireEvent.press(screen.getByText(strings.buttons.payAndOrder));

    // Assert navigation to Success screen
    await waitFor(() => {
      expect(screen.getByText(strings.payment.success)).toBeTruthy();
    });

    expect(screen.getByText('Redirecting to product list in 5 seconds...')).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // check navigates to ProductListScreen after 5 seconds
    await waitFor(() => {
      screen.getByText('CHECKOUT (0)');
    });
    expect(screen.getAllByText('Add to basket').length).toBe(20); // 20 items in the list
  }, 10000);
});
