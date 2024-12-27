import React from 'react';
import { render } from '@testing-library/react-native';
import LoadingState from '.';

describe('LoadingState Component', () => {
  it('matches the snapshot', () => {
    const { toJSON } = render(<LoadingState color="blue" />);
    expect(toJSON()).toMatchSnapshot();
  });
});
