import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import { renderInThemeProvider } from '../../../../__tests__/utils/renderInThemeProvider'; // Import the utility function
import Toggle from '.';
import { darkTheme, lightTheme } from '../../../constants/theme';

describe('<Toggle />', () => {
  const mockToggleTheme = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('match snapshot in light mode', () => {
    const { toJSON } = renderInThemeProvider(<Toggle isDarkMode={false} toggleTheme={mockToggleTheme} />, lightTheme);
    expect(toJSON()).toMatchSnapshot();
  });

  it('match snapshot  in dark mode', () => {
    const { toJSON } = renderInThemeProvider(<Toggle isDarkMode toggleTheme={mockToggleTheme} />, darkTheme);

    expect(toJSON()).toMatchSnapshot();
  });

  it('calls toggleTheme when the switch is toggled', () => {
    renderInThemeProvider(<Toggle isDarkMode toggleTheme={mockToggleTheme} />, darkTheme);

    const toggleSwitch = screen.getByTestId('toggle-switch');
    fireEvent(toggleSwitch, 'valueChange', true);

    expect(mockToggleTheme).toHaveBeenCalledWith(true);
  });
});
