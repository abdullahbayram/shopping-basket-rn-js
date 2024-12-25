import React from 'react';
import { screen, act, fireEvent } from '@testing-library/react-native';
import { strings } from '@constants';
import { renderInThemeProvider } from '../../../../__tests__/utils/renderInThemeProvider';
import RedirectWithAnimation from '.';
import useBackHandler from '../../../hooks/useBackHandler';

jest.mock('../../../hooks/useBackHandler', () => jest.fn());

jest.useFakeTimers();

const mockNavigation = {
  reset: jest.fn(),
};

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => mockNavigation,
}));

describe('<RedirectWithAnimation />', () => {
  const message = 'Test message';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly and matches snapshot', () => {
    const { toJSON } = renderInThemeProvider(<RedirectWithAnimation message={message} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders the message and countdown', () => {
    renderInThemeProvider(<RedirectWithAnimation message={message} duration={3000} />);

    expect(screen.getByText(message)).toBeTruthy();
    expect(screen.getByText('Redirecting to product list in 3 seconds...')).toBeTruthy();
  });

  it('updates countdown every second', () => {
    renderInThemeProvider(<RedirectWithAnimation message={message} duration={3000} />);

    expect(screen.getByText('Redirecting to product list in 3 seconds...')).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText('Redirecting to product list in 2 seconds...')).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText('Redirecting to product list in 1 second...')).toBeTruthy();
  });

  it('navigates after duration', () => {
    renderInThemeProvider(<RedirectWithAnimation message={message} duration={3000} />);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(mockNavigation.reset).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: 'ProductList' }],
    });
  });

  it('handles button press to navigate immediately', () => {
    renderInThemeProvider(<RedirectWithAnimation message={message} />);

    const button = screen.getByText(strings.buttons.gotoProducts);
    expect(button).toBeTruthy();

    fireEvent.press(button);

    expect(mockNavigation.reset).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: 'ProductList' }],
    });
  });

  it('disables back button functionality', () => {
    renderInThemeProvider(<RedirectWithAnimation message={message} />);

    // Simulate the back handler callback
    const backHandlerCallback = useBackHandler.mock.calls[0][0];
    const result = backHandlerCallback();

    // Verify that the back handler prevents navigation
    expect(result).toBe(true);
  });
});
