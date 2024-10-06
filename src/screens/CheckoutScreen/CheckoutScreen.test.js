import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import CheckoutScreen from './CheckoutScreen';
import renderInProvider from '../../../__tests__/utils/renderInProvider';

describe('CheckoutScreen', () => {
  it('should render CheckoutScreen correctly', () => {
    renderInProvider(<CheckoutScreen />);

    expect(screen.getByText('Items in the basket: 0')).toBeTruthy();
    expect(screen.getAllByText('Credit Card').length).toBe(2); // active and inactive text
    expect(screen.getByText('Product One')).toBeTruthy();
    expect(screen.getByText('Product One Description')).toBeTruthy();
    expect(screen.getByText('Remove Item')).toBeTruthy();
    expect(screen.getByText('ORDER')).toBeTruthy();
  });
  it('should match the snapshot', () => {
    renderInProvider(<CheckoutScreen />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
  it('should update credit card input value', () => {
    renderInProvider(<CheckoutScreen />);

    const creditCardInput = screen.getByTestId('text-input-flat');
    fireEvent.changeText(creditCardInput, '1234 5678 9012 3456');

    expect(creditCardInput.props.value).toBe('1234 5678 9012 3456');
  });

  // remove item
});
