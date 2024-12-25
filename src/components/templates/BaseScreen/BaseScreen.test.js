import React from 'react';
import { screen } from '@testing-library/react-native';
import { renderInThemeProvider } from '../../../../__tests__/utils/renderInThemeProvider';
import Screen from '.';
import Text from '../../atoms/Text';

describe('<Screen />', () => {
  it('renders correctly and matches the snapshot', () => {
    const { toJSON } = renderInThemeProvider(
      <Screen>
        <Text>Test Content</Text>
      </Screen>,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders children correctly', () => {
    renderInThemeProvider(
      <Screen>
        <Text>Test Content</Text>
      </Screen>,
    );

    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('applies styles from the theme correctly', () => {
    const theme = {
      colors: { background: 'blue' },
    };

    renderInThemeProvider(
      <Screen testID="base-screen">
        <Text>Styled Content</Text>
      </Screen>,
      theme,
    );

    const baseScreen = screen.getByTestId('base-screen');

    expect(baseScreen.props.style).toEqual(
      expect.objectContaining({
        flex: 1,
        backgroundColor: 'blue',
      }),
    );
  });
});
