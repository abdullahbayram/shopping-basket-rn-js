import React from 'react';
import { render, screen } from '@testing-library/react-native';
import BasketSummary from '.';

describe('<BasketSummary />', () => {
  const mockTotalCount = 14;
  const mockTotal = 2648.01;

  it('renders correctly and matches the snapshot', () => {
    const { toJSON } = render(<BasketSummary totalCount={mockTotalCount} total={mockTotal} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('displays the correct totalCount and total', () => {
    render(<BasketSummary totalCount={mockTotalCount} total={mockTotal} />);

    expect(screen.getByText(`Items in the basket: ${mockTotalCount}`)).toBeTruthy();
    expect(screen.getByText(`Total: $${mockTotal.toFixed(2)}`)).toBeTruthy();
  });

  it('renders default value when total is NaN', () => {
    render(<BasketSummary totalCount={mockTotalCount} total={NaN} />);

    expect(screen.getByText('Total: $0.00')).toBeTruthy();
  });
});
