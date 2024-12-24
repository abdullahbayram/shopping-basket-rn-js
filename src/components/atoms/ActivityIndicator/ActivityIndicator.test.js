import React from 'react';
import { render } from '@testing-library/react-native';
import ActivityIndicator from '.';
import { lightColors } from '../../../constants/theme';

test('ActivityIndicator renders correctly', () => {
  const view = render(<ActivityIndicator size="large" color={lightColors.spinner} />);
  expect(view.toJSON()).toMatchSnapshot();
});
