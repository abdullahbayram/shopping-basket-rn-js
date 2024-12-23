import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import Button from '.';

const BUTTON_TEXT_CLICK_ME = 'Click Me';
const BUTTON_TEXT_PRESS_ME = 'Press Me';

beforeEach(() => {
  jest.clearAllMocks(); // Clears all mocks in the test suite
});

const mockOnPress = jest.fn();

const renderButton = (onPress, mode, children, icon, disabled) => {
  return render(
    <Button onPress={onPress} icon={icon} mode={mode} disabled={disabled}>
      {children}
    </Button>,
  );
};

describe('<Button />', () => {
  it('matches the snapshot', () => {
    const { toJSON } = renderButton(() => {}, 'outlined', BUTTON_TEXT_CLICK_ME, 'camera');
    expect(toJSON()).toMatchSnapshot();
  });
  it('matches the snapshot(defaultProps)', () => {
    const { toJSON } = renderButton(() => {}, undefined, BUTTON_TEXT_CLICK_ME);
    expect(toJSON()).toMatchSnapshot();
  });
  it('renders correctly with children and props', () => {
    renderButton(() => {}, 'outlined', BUTTON_TEXT_CLICK_ME, 'camera');
    expect(screen.getByText(BUTTON_TEXT_CLICK_ME)).toBeTruthy();
  });

  it('renders correctly with default props', () => {
    renderButton(mockOnPress, undefined, BUTTON_TEXT_PRESS_ME);
    const button = screen.getByText(BUTTON_TEXT_PRESS_ME);
    expect(button).toBeTruthy();
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('calls onPress when the button is pressed', () => {
    renderButton(mockOnPress, undefined, BUTTON_TEXT_PRESS_ME);
    const button = screen.getByText(BUTTON_TEXT_PRESS_ME);
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('renders correctly with a custom icon and mode', () => {
    renderButton(mockOnPress, 'outlined', BUTTON_TEXT_PRESS_ME, 'camera');
    const button = screen.getByText(BUTTON_TEXT_PRESS_ME);
    expect(button).toBeTruthy();
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when the button is disabled', () => {
    renderButton(mockOnPress, undefined, BUTTON_TEXT_PRESS_ME, 'camera', true);
    const button = screen.getByText(BUTTON_TEXT_PRESS_ME);
    fireEvent.press(button);
    expect(mockOnPress).not.toHaveBeenCalled();
  });
});
