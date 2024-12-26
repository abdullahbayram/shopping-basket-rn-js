/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { darkTheme, lightTheme } from '@constants/theme';
import { Text, Button } from 'react-native';
import { ThemeContext, ThemeProvider } from '.';

describe('<ThemeProvider />', () => {
  it('provides light theme by default', () => {
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme }) => <Text testID="theme">{theme.colors.background}</Text>}
        </ThemeContext.Consumer>
      </ThemeProvider>,
    );

    const themeText = screen.getByTestId('theme');
    expect(themeText.props.children).toBe(lightTheme.colors.background);
  });

  it('toggles between light and dark themes', () => {
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme, toggleTheme }) => (
            <>
              <Text testID="theme">{theme.colors.background}</Text>
              <Button onPress={toggleTheme} title="Toggle" />
            </>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>,
    );

    const themeText = screen.getByTestId('theme');
    expect(themeText.props.children).toBe(lightTheme.colors.background);

    const toggleButton = screen.getByText('Toggle');
    fireEvent.press(toggleButton);

    expect(themeText.props.children).toBe(darkTheme.colors.background);
  });
});
