import React from 'react';
import { render } from '@testing-library/react-native';
import Card from '.';

test('Card renders correctly', () => {
  const view = render(<Card />);
  expect(view.toJSON()).toMatchSnapshot();
});
