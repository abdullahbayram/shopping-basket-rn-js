import React from 'react';
import { fireEvent, waitFor, within } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import renderWithProvidersAndNavigation from '@testUtils/renderInProvidersAndNavigation';
import { sampleBasket, sampleResponse } from '@mocks/handlers';
import { strings } from '@constants';
import { useGetProductsQuery } from '@redux/api/apiSlice';
import ProductListScreen from '.';
import {
  verifyExistenceByTestId,
  verifyInExistenceByText,
  verifyInExistenceByTestId,
  pressButton,
  verifyExistenceByText,
  getFirstOfItemsByText,
  getFirstOfItemsByTestId,
  pressButtonAsync,
} from '../../../__tests__/utils/testUtil';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('@redux/api/apiSlice', () => ({
  ...jest.requireActual('@redux/api/apiSlice'),
  useGetProductsQuery: jest.fn(), // Mock the hook
}));
const navigateMock = jest.fn();

useNavigation.mockReturnValue({
  navigate: navigateMock,
});

const anItem = sampleResponse[0];

describe('ProductListScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render the loading state when loading', () => {
    useGetProductsQuery.mockReturnValue({
      data: [],
      error: false,
      isLoading: true,
    });

    renderWithProvidersAndNavigation(<ProductListScreen />);

    // Ensure the loading indicator is visible and error message is not
    verifyExistenceByTestId('loading-state');
    verifyInExistenceByText(strings.productList.errorLoading);
  });

  it('should render the error state when there is an error', async () => {
    const refetchMock = jest.fn();

    useGetProductsQuery.mockReturnValue({
      data: [],
      error: true,
      isLoading: false,
      refetch: refetchMock,
    });

    renderWithProvidersAndNavigation(<ProductListScreen />);

    // Ensure the error message is visible and  Loading state is not
    verifyExistenceByText(strings.productList.errorLoading);
    verifyInExistenceByTestId('loading-state');
  });

  it('should call refetch when Retry pressed in error state', async () => {
    const refetchMock = jest.fn();

    useGetProductsQuery.mockReturnValue({
      data: [],
      error: true,
      isLoading: false,
      refetch: refetchMock,
    });

    renderWithProvidersAndNavigation(<ProductListScreen />);

    pressButton('Retry');
    expect(refetchMock).toHaveBeenCalledTimes(1);
  });

  it('should render the first two items from the product list', async () => {
    useGetProductsQuery.mockReturnValue({
      data: sampleResponse,
      error: false,
      isLoading: false,
    });
    renderWithProvidersAndNavigation(<ProductListScreen />);

    await waitFor(() => {
      verifyExistenceByText(anItem.title);
    });
    verifyExistenceByText('Mens Casual Premium Slim Fit T-Shirts ');
  });

  it('navigates to Checkout screen when checkout button is pressed', async () => {
    useGetProductsQuery.mockReturnValue({
      data: sampleResponse,
      error: false,
      isLoading: false,
    });
    renderWithProvidersAndNavigation(<ProductListScreen />, { initialState: { basket: { items: sampleBasket } } });

    await pressButtonAsync('CHECKOUT (14)');

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('Checkout');
    });
  });

  it('should disable the checkout button when the basket is invalid', () => {
    useGetProductsQuery.mockReturnValue({
      data: sampleResponse,
      error: false,
      isLoading: false,
    });
    renderWithProvidersAndNavigation(<ProductListScreen />);

    pressButton('CHECKOUT (0)');
    expect(navigateMock).toHaveBeenCalledTimes(0);
  });

  it('should add a product to the basket and update totalItemCount and total price', async () => {
    useGetProductsQuery.mockReturnValue({
      data: sampleResponse,
      error: false,
      isLoading: false,
    });

    renderWithProvidersAndNavigation(<ProductListScreen />);

    // Initial totalItemCount
    verifyExistenceByText('CHECKOUT (0)');

    // Simulate adding the first product to the basket
    const addToBasketButton = getFirstOfItemsByText('Add to basket');
    fireEvent.press(addToBasketButton);

    // Updated totalItemCount
    await waitFor(() => {
      verifyExistenceByText('CHECKOUT (1)');
    });
    verifyExistenceByText('Total: $109.95');
  });
  it('should not allow adding the same product to the basket more than five times', async () => {
    useGetProductsQuery.mockReturnValue({
      data: sampleResponse,
      error: false,
      isLoading: false,
    });

    renderWithProvidersAndNavigation(<ProductListScreen />);

    // Get the first product's Card and its "Add to basket" button
    const firstProductCard = getFirstOfItemsByTestId('product-card');
    const addToBasketButton = within(firstProductCard).getByText('Add to basket');

    // Initial assertions
    verifyExistenceByText('CHECKOUT (0)'); // Basket starts empty
    verifyExistenceByText('Total: $0.00'); // Total price starts at 0
    verifyInExistenceByText(strings.productList.limitReached);

    // Add the same product to the basket five times
    for (let i = 0; i < 5; i += 1) {
      fireEvent.press(addToBasketButton);
    }

    // Check total item count and total price updated
    await waitFor(() => {
      verifyExistenceByText('CHECKOUT (5)');
    });
    // Ensure total price is updated correctly
    verifyExistenceByText('Total: $549.75');

    // Ensure the "Add to basket" button is removed after reaching the limit
    expect(within(firstProductCard).queryByText('Add to basket')).toBeFalsy();

    // Ensure the limit message is displayed
    verifyExistenceByText(strings.productList.limitReached);

    // TotalItemCount should still be 5, not updated further
    verifyExistenceByText('CHECKOUT (5)');
  });
});
