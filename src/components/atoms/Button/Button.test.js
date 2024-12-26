import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import Button from '.';

const BUTTON_TEXT_CLICK_ME = 'Click Me';
const BUTTON_TEXT_PRESS_ME = 'Press Me';

const mockOnPress = jest.fn();

const renderButton = ({ onPress = () => {}, mode, children, icon, disabled }) => {
  return render(
    <Button onPress={onPress} icon={icon} mode={mode} disabled={disabled}>
      {children}
    </Button>,
  );
};

describe('<Button />', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Ensures mocks are cleared after each test
  });

  it('matches the snapshot with custom props', () => {
    const { toJSON } = renderButton({
      onPress: mockOnPress,
      mode: 'outlined',
      children: BUTTON_TEXT_CLICK_ME,
      icon: 'camera',
    });
    expect(toJSON()).toMatchSnapshot();
  });

  it('matches the snapshot with default props', () => {
    const { toJSON } = renderButton({
      onPress: mockOnPress,
      children: BUTTON_TEXT_CLICK_ME,
    });
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders button text correctly', () => {
    renderButton({ onPress: mockOnPress, children: BUTTON_TEXT_CLICK_ME });
    expect(screen.getByText(BUTTON_TEXT_CLICK_ME)).toBeTruthy();
  });

  it('calls onPress when the button is pressed', () => {
    renderButton({ onPress: mockOnPress, children: BUTTON_TEXT_PRESS_ME });
    const button = screen.getByText(BUTTON_TEXT_PRESS_ME);
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when the button is disabled', () => {
    renderButton({
      onPress: mockOnPress,
      children: BUTTON_TEXT_PRESS_ME,
      disabled: true,
    });
    const button = screen.getByText(BUTTON_TEXT_PRESS_ME);
    fireEvent.press(button);
    expect(button).toBeDisabled();
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('renders with a custom icon and mode', () => {
    renderButton({
      onPress: mockOnPress,
      mode: 'outlined',
      children: BUTTON_TEXT_PRESS_ME,
      icon: 'camera',
    });
    expect(screen.getByText(BUTTON_TEXT_PRESS_ME)).toBeTruthy();
    fireEvent.press(screen.getByText(BUTTON_TEXT_PRESS_ME));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
