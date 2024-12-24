import React from 'react';
import { render } from '@testing-library/react-native';
import Icon from '.';
import { darkColors } from '../../../constants/theme';

test('Icon renders correctly', () => {
  const view = render(<Icon color={darkColors.textSecondary} size={24} source="theme-light-dark" />);
  expect(view.toJSON()).toMatchSnapshot();
});
