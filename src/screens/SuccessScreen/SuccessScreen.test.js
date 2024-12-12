import React from 'react';
import { screen } from '@testing-library/react-native';
import SuccessScreen from './SuccessScreen';
import renderInNavigation from '../../../__tests__/utils/renderInNavigation';
import strings from '../../constants/strings';

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
