import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { fireEvent, screen, waitFor } from '@testing-library/react-native';
import { sampleResponse, sampleBasket } from '@mocks/handlers';
import { strings } from '../../src/constants';

// Utility for logging during tests
const logHelper = (message, details = {}) => {
  console.log(`Test Helper: ${message}`, details);
};

const errorHelper = (message, details = {}) => {
  console.error(`Test Helper Error: ${message}`, details);
};

// Getters

export const getFirstOfItemsByText = (text) => {
  const items = screen.getAllByText(text);
  if (!items.length) {
    errorHelper('No items found by text', { text });
    throw new Error(`No items found for text: ${text}`);
  }
  return items[0];
};

export const getXthOfItemsByText = (text, index) => {
  const items = screen.getAllByText(text);
  if (!items.length) {
    errorHelper('No items found by text', { text });
    throw new Error(`No items found for text: ${text}`);
  }
  return items[index];
};

export const getFirstOfItemsByTestId = (testID) => {
  const items = screen.getAllByTestId(testID);
  if (!items.length) {
    errorHelper('No items found by Test ID', { testID });
    throw new Error(`No items found for Test ID: ${testID}`);
  }
  return items[0];
};

// Enhanced verification utils
export const verifyItemCount = (text, count) => {
  const items = screen.getAllByText(text);
  if (items.length !== count) {
    errorHelper('Item count mismatch', { text, expected: count, actual: items.length });
  }
  expect(items.length).toBe(count);
};

export const verifyInExistenceByText = (text) => {
  const result = screen.queryByText(text);
  if (result) {
    errorHelper('Unexpected text found', { text });
  }
  expect(result).toBeFalsy();
};

export const verifyExistenceByText = (text) => {
  const result = screen.getByText(text);
  if (!result) {
    errorHelper('Expected text not found', { text });
  }
  expect(result).toBeTruthy();
};

export const verifyExistenceByTestId = (testID) => {
  const result = screen.getByTestId(testID);
  if (!result) {
    errorHelper('Expected element not found by Test ID', { testID });
  }
  expect(result).toBeTruthy();
};

export const verifyInExistenceByTestId = (testID) => {
  const result = screen.queryByTestId(testID);
  if (result) {
    errorHelper('Unexpected item found by Test ID', { testID });
  }
  expect(result).toBeFalsy();
};

export const verifyInputExistenceByText = (text) => {
  const inputs = screen.getAllByText(text);
  if (inputs.length < 2) {
    errorHelper('Expected multiple inputs but found less', { text, count: inputs.length });
  }
  expect(inputs[0]).toBeTruthy();
  expect(inputs[1]).toBeTruthy();
};

export const verifyCheckoutScreenContents = async ({ totalPrice, totalItemCount, titleOfAnItem }) => {
  try {
    verifyExistenceByText('Apply');
    verifyInputExistenceByText('Promo Code');
    verifyExistenceByText('Total: $' + totalPrice);
    verifyExistenceByText(new RegExp(`Order\\s*\\(\\s*${totalItemCount}\\s*items\\s*\\)`));
    verifyExistenceByText(titleOfAnItem);
  } catch (error) {
    errorHelper('Error verifying checkout screen contents', { error });
    throw error;
  }
};

export const verifyExistenceOfPaymentInputs = () => {
  expect(screen.getAllByText(strings.payment.cardholderName).length).toBe(2);
  expect(screen.getAllByText(strings.payment.creditCardNumber).length).toBe(2);
  expect(screen.getAllByText(strings.payment.expirationDate).length).toBe(2);
  expect(screen.getAllByText(strings.payment.cvv).length).toBe(2);
};

export const verifyPaymentInputsFilled = (cardDetails) => {
  const { cardholderName, cardNumber, expirationDate, cvv } = cardDetails;

  // Verify inputs are filled correctly
  expect(screen.getByDisplayValue(cardholderName)).toBeTruthy();
  expect(screen.getByDisplayValue(cardNumber)).toBeTruthy();
  expect(screen.getByDisplayValue(expirationDate)).toBeTruthy();
  expect(screen.getByDisplayValue(cvv)).toBeTruthy();
};

// Enhanced action utils
export const pressButton = (buttonText) => {
  const button = screen.getByText(buttonText);
  if (!button) {
    errorHelper('Button not found', { buttonText });
  }
  fireEvent.press(button);
};

export const pressButtonAsync = async (buttonText) => {
  const button = await screen.findByText(buttonText);
  if (!button) {
    errorHelper('Button not found', { buttonText });
  }
  fireEvent.press(button);
};

export const changeText = (inputLabelText, text) => {
  const input = screen.getAllByText(inputLabelText)[0];
  if (!input) {
    errorHelper('Input not found', { inputLabelText });
  }
  fireEvent.changeText(input, text);
};

export const applyPromoCodeAndVerifyApplied = async (code) => {
  changeText('Promo Code', code);
  pressButton('Apply');
  await waitFor(() => {
    try {
      verifyInExistenceByText('Total: $2648.01');
    } catch (error) {
      errorHelper('Error applying promo code', { code, error });
      throw error;
    }
  });
};

export const fillPaymentInputs = (cardDetails) => {
  const { cardholderName, cardNumber, expirationDate, cvv } = cardDetails;
  changeText(strings.payment.cardholderName, cardholderName);
  changeText(strings.payment.creditCardNumber, cardNumber);
  changeText(strings.payment.expirationDate, expirationDate);
  changeText(strings.payment.cvv, cvv);
};

// Mock states
export const mockBasketState = {
  basket: { items: sampleBasket },
};

export const mockProductState = {
  products: sampleResponse,
};

// Setup utils
export function setupApiStore(api, extraReducers = {}, initialState = {}) {
  const getStore = (preloadedState) =>
    configureStore({
      reducer: combineReducers({
        [api.reducerPath]: api.reducer,
        ...extraReducers,
      }),
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
          immutableCheck: false,
        }).concat(api.middleware),
      preloadedState,
    });

  const initialStore = getStore(initialState);
  const refObj = {
    api,
    store: initialStore,
  };
  const store = getStore(initialState);
  refObj.store = store;

  return refObj;
}
