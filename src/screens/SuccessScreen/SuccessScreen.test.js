import React from 'react';
import { render, screen } from '@testing-library/react-native';
import SuccessScreen from './SuccessScreen';

describe('SuccessScreen Component', () => {
  it('should render the thank you message', () => {
    render(<SuccessScreen />);
    expect(screen.getByText('Thank you!')).toBeTruthy();
  });

  it('should render the success message', () => {
    render(<SuccessScreen />);
    expect(screen.getByText('Your order has been placed successfully')).toBeTruthy();
  });

  it('should match the snapshot', () => {
    const { toJSON } = render(<SuccessScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
