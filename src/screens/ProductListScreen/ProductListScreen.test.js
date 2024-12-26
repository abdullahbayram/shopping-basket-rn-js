import React from 'react';
import { fireEvent, screen, waitFor, within } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import renderWithProvidersAndNavigation from '@testUtils/renderInProvidersAndNavigation';
import { sampleBasket, sampleResponse } from '@mocks/handlers';
import { strings } from '@constants';
import { useGetProductsQuery } from '@redux/api/apiSlice';
import ProductListScreen from '.';

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
    expect(screen.getByTestId('loading-state')).toBeTruthy();
    expect(screen.queryByText(strings.productList.errorLoading)).toBeFalsy();
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
    expect(screen.getByText(strings.productList.errorLoading)).toBeTruthy();
    expect(screen.queryByText('loading-state')).toBeFalsy();
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

    const retryButton = screen.getByText('Retry');
    fireEvent.press(retryButton);

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
      expect(screen.getByText(anItem.title)).toBeTruthy();
    });
    expect(screen.getByText('Mens Casual Premium Slim Fit T-Shirts ')).toBeTruthy();
  });

  it('navigates to Checkout screen when checkout button is pressed', async () => {
    useGetProductsQuery.mockReturnValue({
      data: sampleResponse,
      error: false,
      isLoading: false,
    });
    renderWithProvidersAndNavigation(<ProductListScreen />, { initialState: { basket: { items: sampleBasket } } });

    const checkoutButton = await screen.findByText('CHECKOUT');
    fireEvent.press(checkoutButton);

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledTimes(1);
    });
    expect(navigateMock).toHaveBeenCalledWith('Checkout'); // Replace with the actual route name if necessary
  });

  it('should disable the checkout button when the basket is invalid', () => {
    useGetProductsQuery.mockReturnValue({
      data: sampleResponse,
      error: false,
      isLoading: false,
    });
    renderWithProvidersAndNavigation(<ProductListScreen />);

    const checkoutButton = screen.getByText('CHECKOUT');
    fireEvent.press(checkoutButton);
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
    expect(screen.getByText('Items in the basket: 0')).toBeTruthy();

    // Simulate adding the first product to the basket
    const addToBasketButton = screen.getAllByText('Add to basket')[0];
    fireEvent.press(addToBasketButton);

    // Updated totalItemCount
    await waitFor(() => {
      expect(screen.getByText('Items in the basket: 1')).toBeTruthy();
    });
    expect(screen.getByText('Total: $109.95')).toBeTruthy();
  });
  it('should not allow adding the same product to the basket more than five times', async () => {
    useGetProductsQuery.mockReturnValue({
      data: sampleResponse,
      error: false,
      isLoading: false,
    });

    renderWithProvidersAndNavigation(<ProductListScreen />);

    // Get the first product's Card and its "Add to basket" button
    const firstProductCard = screen.getAllByTestId('product-card')[0];
    const addToBasketButton = within(firstProductCard).getByText('Add to basket');

    // Initial assertions
    expect(screen.getByText('Items in the basket: 0')).toBeTruthy(); // Basket starts empty
    expect(screen.queryByText(strings.productList.limitReached)).toBeFalsy();

    // Add the same product to the basket five times
    for (let i = 0; i < 5; i += 1) {
      fireEvent.press(addToBasketButton);
    }

    // Check total item count and total price updated
    await waitFor(() => {
      expect(screen.getByText('Items in the basket: 5')).toBeTruthy();
    });
    expect(screen.getByText('Total: $549.75')).toBeTruthy(); // Ensure total price is updated correctly

    // Ensure the "Add to basket" button is removed after reaching the limit
    expect(within(firstProductCard).queryByText('Add to basket')).toBeFalsy();

    // Ensure the limit message is displayed
    expect(screen.getByText(strings.productList.limitReached)).toBeTruthy();

    // TotalItemCount should still be 5, not updated further
    expect(screen.getByText('Items in the basket: 5')).toBeTruthy();
  });
});
