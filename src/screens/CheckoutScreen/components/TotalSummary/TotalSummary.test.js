import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import TotalSummary from '.';

describe('TotalSummary Component', () => {
  it('should render total price and items', () => {
    render(
      <TotalSummary totalPrice={2648.01} totalItemCount={14} isOrderButtonDisabled={false} onOrderPress={jest.fn()} />,
    );

    expect(screen.getByText('Total: $2648.01')).toBeTruthy();
    expect(screen.getByText('Order (14 items)')).toBeTruthy();
  });

  it('should call onOrderPress when order button is pressed', () => {
    const onOrderPressMock = jest.fn();
    render(
      <TotalSummary
        totalPrice={2648.01}
        totalItemCount={14}
        isOrderButtonDisabled={false}
        onOrderPress={onOrderPressMock}
      />,
    );

    fireEvent.press(screen.getByText('Order (14 items)'));
    expect(onOrderPressMock).toHaveBeenCalled();
  });

  it('should disable the order button when isOrderButtonDisabled is true', () => {
    render(<TotalSummary totalPrice={2648.01} totalItemCount={14} isOrderButtonDisabled onOrderPress={jest.fn()} />);

    const orderButton = screen.getByTestId('order-button');
    expect(orderButton).toBeDisabled();
  });
});
