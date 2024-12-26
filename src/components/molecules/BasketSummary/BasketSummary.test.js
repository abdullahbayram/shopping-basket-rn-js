import React from 'react';
import { render, screen } from '@testing-library/react-native';
import BasketSummary from './index';

describe('<BasketSummary />', () => {
  const mockTotalCount = 14;
  const mockTotal = 2648.01;

  it('renders correctly and matches the snapshot', () => {
    const { toJSON } = render(<BasketSummary totalItemCount={mockTotalCount} totalPrice={mockTotal} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('displays the correct totalItemCount and total', () => {
    render(<BasketSummary totalItemCount={mockTotalCount} totalPrice={mockTotal} />);

    expect(screen.getByText(`Items in the basket: ${mockTotalCount}`)).toBeTruthy();
    expect(screen.getByText(`Total: $${mockTotal.toFixed(2)}`)).toBeTruthy();
  });

  it('renders default value when total is NaN', () => {
    render(<BasketSummary totalItemCount={mockTotalCount} totalPrice={NaN} />);

    expect(screen.getByText('Total: $0.00')).toBeTruthy();
  });
});
