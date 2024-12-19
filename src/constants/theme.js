import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const sharedColors = {
  overlayBackgroundColor: 'rgba(0,0,0,0.5)',
};

const lightColors = {
  primary: '#3498db',
  secondary: '#FED034',
  tertiary: '#34300F',
  error: '#FF6B6B',
  background: '#FFF',
  surface: '#F9F9F9',
  textPrimary: '#004f6b',
  textSecondary: '#666',
  textTertiary: '#000',
  linearLeft: '#6fc8dc',
  linearRight: '#8bd4c7',
  containerBackground: '#F9F9F9',
  shadowColor: 'rgba(0, 0, 0, 0.3)',
  buttonBackground: '#FFF',
  buttonBorder: '#FFA500',
  transparentButtonBorder: '#FFA500',
  cardBackground: '#F0F0F0',
  ratingStar: '#FFA500',
  textFour: '#333',
  disabledButton: '#ddd',
  disabledButtonBorder: '#aaa',
  get spinner() {
    return this.secondary;
  },
  progressBarBackground: '#e0e0e0',
  progressBar: '#76c7c0',
};

const darkColors = {
  primary: '#2980b9',
  secondary: '#E0A800',
  tertiary: '#FFF',
  error: '#FF6B6B',
  background: '#121212',
  surface: '#1E1E1E',
  textPrimary: '#E0E0E0',
  textSecondary: '#B3B3B3',
  textTertiary: '#FFF',
  linearLeft: '#2980b9',
  linearRight: '#4fb0c7',
  containerBackground: '#333',
  shadowColor: 'rgba(255, 255, 255, 0.1)',
  buttonBackground: '#444',
  buttonBorder: '#FFAA33',
  transparentButtonBorder: '#FFAA33',
  cardBackground: '#424242',
  ratingStar: '#FFD700',
  textFour: '#FFF',
  disabledButton: '#555',
  disabledButtonBorder: '#777',
  get spinner() {
    return this.secondary;
  },
  progressBarBackground: '#444',
  progressBar: '#76c7c0',
};

export const lightTheme = {
  ...MD3LightTheme,
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    ...lightColors,
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  roundness: 2,
  colors: {
    ...MD3DarkTheme.colors,
    ...darkColors,
  },
};

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  special: 7,
  baseScreenSpecial: 9,
};
