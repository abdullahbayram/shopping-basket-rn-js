import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CheckoutScreen from './CheckoutScreen';

const initialState = {
  count: 0,
};
const mockStore = configureStore([]);
const store = mockStore(initialState);

describe('CheckoutScreen', () => {
  it('should render CheckoutScreen correctly', () => {
    render(
      <Provider store={store}>
        <CheckoutScreen />
      </Provider>,
    );

    expect(screen.getByText('Checkout')).toBeTruthy();
    expect(screen.getByText('Items in the basket: 0')).toBeTruthy();
    expect(screen.getAllByText('Credit Card').length).toBe(2); // active and inactive text
    expect(screen.getByText('Product One')).toBeTruthy();
    expect(screen.getByText('Product One Description')).toBeTruthy();
    expect(screen.getByText('REMOVE ITEM')).toBeTruthy();
  });
  it('should match the snapshot', () => {
    render(
      <Provider store={store}>
        <CheckoutScreen />
      </Provider>,
    );
    expect(screen.toJSON()).toMatchSnapshot();
  });
  it('should update credit card input value', () => {
    render(
      <Provider store={store}>
        <CheckoutScreen />
      </Provider>,
    );

    const creditCardInput = screen.getByTestId('text-input-flat');
    fireEvent.changeText(creditCardInput, '1234 5678 9012 3456');

    expect(creditCardInput.props.value).toBe('1234 5678 9012 3456');
  });

  // remove item
});
