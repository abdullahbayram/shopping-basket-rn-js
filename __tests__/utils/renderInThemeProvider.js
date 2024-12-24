import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'react-native-paper';
import { lightTheme } from '../../src/constants/theme';

/**
 * Renders a component wrapped in the ThemeProvider.
 *
 * @param {React.ReactElement} component - The component to render.
 * @param {object} theme - Optional custom theme to pass to the ThemeProvider. Defaults to DefaultTheme.
 * @returns {RenderResult} The render result from @testing-library/react-native.
 */
export const renderInThemeProvider = (component, theme = lightTheme) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};
