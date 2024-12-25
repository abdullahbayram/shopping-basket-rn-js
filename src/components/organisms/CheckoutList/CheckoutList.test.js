import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import strings from '@constants/strings';
import { renderInThemeProvider } from '../../../../__tests__/utils/renderInThemeProvider';
import CheckoutList from '.';

describe('<CheckoutList />', () => {
  const mockOnRemoveItem = jest.fn();
  const mockOnQuantityChange = jest.fn();

  const mockBasketItems = [
    {
      id: 1,
      title: 'Test Product 1',
      description: 'A description for product 1',
      price: 10.0,
      quantity: 2,
      image: 'https://example.com/image1.jpg',
      rating: { rate: 4.5, count: 20 },
    },
    {
      id: 2,
      title: 'Test Product 2',
      description: 'A description for product 2',
      price: 20.0,
      quantity: 1,
      image: 'https://example.com/image2.jpg',
      rating: { rate: 3.5, count: 10 },
    },
  ];

  const renderCheckoutList = (props) => {
    return renderInThemeProvider(
      <CheckoutList
        basketItems={mockBasketItems}
        onRemoveItem={mockOnRemoveItem}
        onQuantityChange={mockOnQuantityChange}
        {...props}
      />,
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with basket items', () => {
    renderCheckoutList();

    expect(screen.getByText('Test Product 1')).toBeTruthy();
    expect(screen.getByText('Test Product 2')).toBeTruthy();
  });

  it('renders empty message when basket is empty', () => {
    renderCheckoutList({ basketItems: [] });

    expect(screen.getByText(strings.checkout.emptyBasket)).toBeTruthy();
  });

  it('calls onRemoveItem when remove button is pressed', () => {
    renderCheckoutList();

    const removeButton = screen.getAllByText('Remove Item')[0];
    fireEvent.press(removeButton);

    expect(mockOnRemoveItem).toHaveBeenCalledWith(mockBasketItems[0]);
  });

  it('calls onQuantityChange when quantity is updated', () => {
    renderCheckoutList();

    const increaseButton = screen.getAllByTestId('increase-button')[0];
    fireEvent.press(increaseButton);

    expect(mockOnQuantityChange).toHaveBeenCalledWith(mockBasketItems[0], mockBasketItems[0].quantity + 1);
  });
});
