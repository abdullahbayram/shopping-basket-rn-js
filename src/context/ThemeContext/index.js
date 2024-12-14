import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Appearance, useColorScheme } from 'react-native';
import PropTypes from 'prop-types';
import { darkTheme, lightTheme } from '../../constants/theme';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme(); // Automatically detects system theme
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === 'dark');
    });
    return () => listener.remove();
  }, []);

  const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

  const toggleTheme = useCallback(() => setIsDarkMode((prev) => !prev), []);

  const contextValue = useMemo(() => ({ theme, isDarkMode, toggleTheme }), [theme, isDarkMode, toggleTheme]);

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeProvider };

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
