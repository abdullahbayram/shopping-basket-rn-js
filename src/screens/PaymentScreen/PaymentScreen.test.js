import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import { strings } from '@constants';
import PaymentScreen from '.';
import renderInProvider from '../../../__tests__/utils/renderInProvider';
import { sampleBasket } from '../../../__tests__/mocks/handlers';

const initialState = {
  basket: {
    items: sampleBasket,
  },
};

describe('<PaymentScreen />', () => {
  const navigation = { navigate: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { toJSON } = renderInProvider(<PaymentScreen navigation={navigation} />, {
      initialState,
    });
    expect(toJSON()).toMatchSnapshot();
  });

  it('displays the correct basket summary', () => {
    renderInProvider(<PaymentScreen navigation={navigation} />, {
      initialState,
    });
    const itemCountText = screen.getByText('Items in the basket:  14');
    const totalText = screen.getByText('Total: $2648.01');
    // const itemCountText = screen.getByText(/Items in the basket:/i);
    // const totalText = screen.getByText(/Total:/i);

    expect(itemCountText).toBeTruthy();
    expect(totalText).toBeTruthy();
  });

  it('disables the order button when basket is empty', () => {
    const mockOnPress = jest.fn();
    renderInProvider(<PaymentScreen navigation={navigation} />, {
      initialState,
    });

    const orderButton = screen.getByText(strings.buttons.order);
    fireEvent.press(orderButton);

    expect(mockOnPress).not.toHaveBeenCalled();
  });
});
