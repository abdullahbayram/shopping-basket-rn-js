import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import { renderInThemeProvider } from '@testUtils/renderInThemeProvider'; // Utility for ThemeProvider wrapping
import ProductList from '.';

describe('<ProductList />', () => {
  const mockOnAddItem = jest.fn();
  const mockRefetch = jest.fn();

  const mockProducts = [
    {
      id: 1,
      title: 'Product 1',
      description: 'Description 1',
      price: 10.0,
      rating: {
        rate: 3.9,
        count: 120,
      },
    },
    {
      id: 2,
      title: 'Product 2',
      description: 'Description 2',
      price: 30.0,
      rating: {
        rate: 4.9,
        count: 120,
      },
    },
  ];

  const mockBasketItems = [
    {
      id: 1,
      quantity: 5,
    },
  ];

  const renderProductList = (props) => {
    return renderInThemeProvider(
      <ProductList
        products={mockProducts}
        basketItems={mockBasketItems}
        onAddItem={mockOnAddItem}
        refetch={mockRefetch}
        {...props}
      />,
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders product list correctly', () => {
    renderProductList();

    expect(screen.getByText('Product 1')).toBeTruthy();
    expect(screen.getByText('Product 2')).toBeTruthy();
  });

  it('calls onAddItem when add to basket button is pressed', () => {
    renderProductList();

    const addButton = screen.getAllByText('Add to basket')[0];
    fireEvent.press(addButton);

    expect(mockOnAddItem).toHaveBeenCalledWith(mockProducts[1]);
  });
});
