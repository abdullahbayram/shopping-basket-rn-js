import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Navigator from './Navigator';

describe('Navigator Component', () => {
  const mockAction = jest.fn();

  it('should render ProductListScreen by default', () => {
    render(<Navigator action={mockAction} />);

    // Check that ProductListScreen is displayed by default
    expect(screen.getAllByText('Items in the basket: 0').length).toBeTruthy();
  });
  // Simulate navigate
  // simulate an invalid screen state
});
