import React from 'react';
import { screen, waitFor } from '@testing-library/react-native';
import Navigator from './Navigator';
import renderInProvider from '../__tests__/utils/renderInProvider';

describe('Navigator Component', () => {
  it('should render ProductListScreen by default', async () => {
    renderInProvider(<Navigator />);

    // Check that ProductListScreen is displayed by default
    await waitFor(() => {});
    expect(screen.toJSON()).toMatchSnapshot();
  });
  // Simulate navigate
  // simulate an invalid screen state
});
