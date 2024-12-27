import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import { renderInThemeProvider } from '@testUtils/renderInThemeProvider';
import ProductCard from '.';

describe('<ProductCard />', () => {
  const mockOnButtonPress = jest.fn();
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 19.99,
    description: 'A wonderful test product',
    category: 'Test Category',
    image: 'https://example.com/image.jpg',
    rating: {
      rate: 4.5,
      count: 100,
    },
  };

  const renderProductCard = (props) => {
    return renderInThemeProvider(
      <ProductCard
        product={mockProduct}
        onButtonPress={mockOnButtonPress}
        isMaxQuantityPerProductReached={false}
        index={0}
        {...props}
      />,
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with product details', () => {
    renderProductCard();

    expect(screen.getByText('Test Product')).toBeTruthy();
    expect(screen.getByText('€19.99')).toBeTruthy();
    expect(screen.getByText('★★★★★')).toBeTruthy();
  });

  it('matches the snapshot', () => {
    const { toJSON } = renderProductCard();
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onButtonPress when the Add to basket button is pressed', () => {
    renderProductCard();

    const addButton = screen.getByText('Add to basket');
    fireEvent.press(addButton);

    expect(mockOnButtonPress).toHaveBeenCalled();
  });

  it('displays the helper text when max quantity per product is reached', () => {
    renderProductCard({ isMaxQuantityPerProductReached: true });

    expect(screen.getByText('You reached the max quantity per product!')).toBeTruthy();
    const addButton = screen.queryByText('Add to basket');
    expect(addButton).toBeNull();
  });

  it('renders left margin for even index', () => {
    renderProductCard({ index: 0 });
    const card = screen.getByTestId('product-card-container-outer-layer');

    expect(card.props.style).toEqual(expect.objectContaining({ marginRight: 5 }));
  });

  it('renders right margin for odd index', () => {
    renderProductCard({ index: 1 });
    const card = screen.getByTestId('product-card-container-outer-layer');

    expect(card.props.style).toEqual(expect.objectContaining({ marginLeft: 5 }));
  });
});
