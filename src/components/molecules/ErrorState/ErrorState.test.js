import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import ErrorState from '.';

describe('ErrorState Component', () => {
  const mockRetry = jest.fn();

  it('renders the error message', () => {
    render(<ErrorState errorMessage="Test error message" onRetry={mockRetry} />);
    expect(screen.getByText('Test error message')).toBeTruthy();
  });

  it('calls the retry function when the Retry button is pressed', () => {
    render(<ErrorState errorMessage="Another error" onRetry={mockRetry} />);

    const retryButton = screen.getByText('Retry');
    fireEvent.press(retryButton);

    expect(mockRetry).toHaveBeenCalledTimes(1);
  });

  it('matches the snapshot', () => {
    const { toJSON } = render(<ErrorState errorMessage="Snapshot error" onRetry={mockRetry} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
