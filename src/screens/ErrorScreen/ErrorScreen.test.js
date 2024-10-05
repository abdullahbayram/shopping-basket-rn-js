import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ErrorScreen from './ErrorScreen'; // Adjust the path as needed

describe('ErrorScreen Component', () => {
  it('should render the error message', () => {
    render(<ErrorScreen />);

    expect(screen.getByText('Unexpected Error')).toBeTruthy();
  });

  it('should match the snapshot', () => {
    const { toJSON } = render(<ErrorScreen />);

    // Snapshot test to ensure UI consistency
    expect(toJSON()).toMatchSnapshot();
  });
});
