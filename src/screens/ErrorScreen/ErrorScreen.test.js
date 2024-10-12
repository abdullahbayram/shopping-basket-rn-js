import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { useRoute } from '@react-navigation/native';
import ErrorScreen from './ErrorScreen';

// Mock useRoute to control the route parameters for testing
jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
}));

describe('ErrorScreen Component', () => {
  it('should render the default error message when no parameters are passed', () => {
    useRoute.mockReturnValue({
      params: {},
    });

    render(<ErrorScreen />);

    expect(screen.getByText('Unexpected Error')).toBeTruthy();
  });

  it('should render a custom error message when provided via navigation params', () => {
    useRoute.mockReturnValue({
      params: { errorMessage: 'Custom Error Message' },
    });

    render(<ErrorScreen />);

    expect(screen.getByText('Custom Error Message')).toBeTruthy();
  });

  it('should match the snapshot', () => {
    useRoute.mockReturnValue({
      params: { errorMessage: 'Snapshot Error Test' },
    });

    const { toJSON } = render(<ErrorScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
