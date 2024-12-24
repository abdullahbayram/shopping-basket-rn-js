import React from 'react';
import { render, screen } from '@testing-library/react-native';
import HelperText from '.';

jest.mock('./HelperText.style', () => ({
  helperText: {
    color: 'red',
    fontSize: 12,
  },
}));

describe('HelperText Component', () => {
  it('should match the snapshot when visible is true', () => {
    const { toJSON } = render(
      <HelperText type="info" visible>
        Visible helper text
      </HelperText>,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should match the snapshot when visible is false', () => {
    const { toJSON } = render(
      <HelperText type="info" visible={false}>
        Hidden helper text
      </HelperText>,
    );

    expect(toJSON()).toMatchSnapshot();
  });
  it('should render correctly with required props', () => {
    render(
      <HelperText type="error" visible style={{ fontWeight: 'bold' }}>
        This is a helper text
      </HelperText>,
    );

    const helperText = screen.getByText('This is a helper text');

    expect(helperText).toBeTruthy();
    expect(helperText.props.style).toEqual(expect.objectContaining({ fontWeight: 'bold' }));
  });

  it('should render with default and custom styles merged', () => {
    render(
      <HelperText type="info" visible style={{ letterSpacing: 1 }}>
        Default styled text
      </HelperText>,
    );

    const defaultText = screen.getByText('Default styled text');

    expect(defaultText).toBeTruthy();
    expect(defaultText.props.style).toEqual(
      expect.objectContaining({
        color: 'red',
        fontSize: 12,
      }),
      expect.objectContaining({ letterSpacing: 1 }),
    );
  });
});
