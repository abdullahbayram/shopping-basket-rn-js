import React from 'react';
import { render } from '@testing-library/react-native';
import Appbar from '.';

test('Appbar renders correctly', () => {
  const view = render(<Appbar />);
  expect(view.toJSON()).toMatchSnapshot();
});
