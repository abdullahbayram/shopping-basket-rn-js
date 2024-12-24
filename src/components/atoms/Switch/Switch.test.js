import React from 'react';
import { render } from '@testing-library/react-native';
import Switch from '.';
import { lightColors } from '../../../constants/theme';

test('Switch renders correctly', () => {
  const view = render(
    <Switch
      trackColor={{ false: lightColors.textPrimary, true: lightColors.textSecondary }}
      ios_backgroundColor={lightColors.textPrimary}
      value
    />,
  );
  expect(view.toJSON()).toMatchSnapshot();
});
