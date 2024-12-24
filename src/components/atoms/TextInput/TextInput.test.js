import React from 'react';
import { render } from '@testing-library/react-native';
import TextInput from '.';

test('TextInput renders correctly', () => {
  const view = render(<TextInput maxLength={16} label="Label" value="Value" />);
  expect(view.toJSON()).toMatchSnapshot();
});
