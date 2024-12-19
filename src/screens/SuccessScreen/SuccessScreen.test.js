import React from 'react';
import { screen } from '@testing-library/react-native';
import strings from '@constants/strings';
import SuccessScreen from '.';
import renderInNavigation from '../../../__tests__/utils/renderInNavigation';

describe('SuccessScreen Component', () => {
  it('should render the success message', () => {
    renderInNavigation(<SuccessScreen />);
    expect(screen.getByText(strings.payment.success)).toBeTruthy();
  });

  it('should match the snapshot', () => {
    const { toJSON } = renderInNavigation(<SuccessScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
