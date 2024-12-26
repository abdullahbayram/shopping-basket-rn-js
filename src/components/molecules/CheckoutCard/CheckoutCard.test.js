import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import { showToast } from '@utils';
import { renderInThemeProvider } from '@testUtils/renderInThemeProvider';
import CheckoutCard from '.';

jest.mock('@utils', () => ({
  showToast: jest.fn(),
}));

jest.mock('./CheckoutCard.style', () => jest.fn(() => ({})));

describe('CheckoutCard', () => {
  const mockProduct = {
    id: 1,
    quantity: 2,
    price: 10.0,
    title: 'Test Product',
    description: 'This is a test product.',
    image: 'https://example.com/image.jpg',
  };

  const mockOnQuantityChange = jest.fn();
  const mockOnRemoveButtonPress = jest.fn();

  const renderComponent = (props) =>
    renderInThemeProvider(
      <CheckoutCard
        product={mockProduct}
        maxQuantity={5}
        onQuantityChange={mockOnQuantityChange}
        onRemoveButtonPress={mockOnRemoveButtonPress}
        {...props}
      />,
    );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly and matches the snapshot', () => {
    const { toJSON } = renderComponent();
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onQuantityChange with decreased quantity when decrease button is pressed', () => {
    renderComponent();

    const decreaseButton = screen.getByTestId('decrease-button');
    fireEvent.press(decreaseButton);

    expect(mockOnQuantityChange).toHaveBeenCalledWith(mockProduct, 1);
  });

  it('calls onRemoveButtonPress when quantity is 1 and decrease button is pressed', () => {
    renderComponent({
      product: { ...mockProduct, quantity: 1 },
    });

    const removeButton = screen.getByText('Remove Item');
    fireEvent.press(removeButton);

    expect(mockOnRemoveButtonPress).toHaveBeenCalled();
  });

  it('calls onQuantityChange with increased quantity when increase button is pressed', () => {
    renderComponent();

    const increaseButton = screen.getByTestId('increase-button');
    fireEvent.press(increaseButton);

    expect(mockOnQuantityChange).toHaveBeenCalledWith(mockProduct, 3);
  });

  it('shows a toast when trying to increase quantity above maxQuantity', () => {
    renderComponent({
      product: { ...mockProduct, quantity: 5 },
    });

    const increaseButton = screen.getByTestId('increase-button');
    fireEvent.press(increaseButton);

    expect(showToast).toHaveBeenCalledWith({ msg: 'Quantity must be between 1 and 5.', title: 'Invalid Quantity' });
  });

  it('calls onRemoveButtonPress when Remove Item button is pressed', () => {
    renderComponent();

    const removeItemButton = screen.getByText('Remove Item');
    fireEvent.press(removeItemButton);

    expect(mockOnRemoveButtonPress).toHaveBeenCalled();
  });

  it('renders the correct formatted price', () => {
    renderComponent();

    const priceText = screen.getByText('$20.00');
    expect(priceText).toBeTruthy();
  });
});
