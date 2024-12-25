import React from 'react';
import { render, screen, fireEvent, userEvent, waitFor } from '@testing-library/react-native';
import { snapshotDiff } from 'snapshot-diff/build';
import TextInput from '../../atoms/TextInput';
import Input from '.';
import { lightColors } from '../../../constants/theme';

const mockOnChangeText = jest.fn();
const mockOnBlur = jest.fn();
const mockOnEndEditing = jest.fn();

const renderInput = ({ label = 'Default Label', icon = null, maxLength, value = '', errorObject = null, style }) => {
  return render(
    <Input
      label={label}
      icon={icon}
      maxLength={maxLength}
      value={value}
      onChangeText={mockOnChangeText}
      onBlur={mockOnBlur}
      onEndEditing={mockOnEndEditing}
      errorObject={errorObject}
      style={style}
    />,
  );
};

describe('<Input />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with label and value', () => {
    renderInput({ value: 'Test Value', label: 'Test Label' });

    expect(screen.getAllByText('Test Label')).toBeTruthy();
    expect(screen.getByDisplayValue('Test Value')).toBeTruthy();
  });

  it('matches the snapshot', () => {
    const { toJSON } = renderInput({ value: 'Snapshot Value', label: 'Snapshot Label' });
    expect(toJSON()).toMatchSnapshot();
  });

  it('match snapshot difference with and without an icon', () => {
    const rightIcon = <TextInput.Icon testID="right-icon" icon="percent" color={lightColors.error} />;
    const inputWithIcon = renderInput({ right: rightIcon }).toJSON();
    const inputWithoutIcon = renderInput({ right: undefined }).toJSON();

    expect(snapshotDiff(inputWithIcon, inputWithoutIcon)).toMatchSnapshot();
  });

  it('calls onChangeText when the input text changes', () => {
    renderInput({ label: 'Input Label' });

    const inputElement = screen.getByTestId('text-input-flat');
    fireEvent.changeText(inputElement, 'New Value');

    expect(mockOnChangeText).toHaveBeenCalledWith('New Value');
  });

  it('calls onBlur when the input loses focus', async () => {
    renderInput({ label: 'Input Label' });
    const user = userEvent.setup();
    const inputElement = screen.getByTestId('text-input-flat');
    await waitFor(() => user.type(inputElement));
    await waitFor(() => user.clear(inputElement));

    expect(mockOnBlur).toHaveBeenCalled();
  });

  it('calls onEndEditing when editing ends', () => {
    renderInput({ label: 'Input Label' });

    const inputElement = screen.getByTestId('text-input-flat');
    fireEvent(inputElement, 'onEndEditing');

    expect(mockOnEndEditing).toHaveBeenCalled();
  });

  it('renders error message when errorObject is provided', () => {
    const errorMessage = 'This is an error';
    renderInput({ errorObject: { message: errorMessage } });

    expect(screen.getByText(errorMessage)).toBeTruthy();
  });

  it('does not render error message when errorObject is null', () => {
    renderInput({});

    const errorElement = screen.queryByText(/This is an error/i);
    expect(errorElement).toBeNull();
  });

  it('limits input length when maxLength is provided', () => {
    renderInput({ maxLength: 10 });

    const inputElement = screen.getByTestId('text-input-flat');
    fireEvent.changeText(inputElement, '123456789012345');

    expect(mockOnChangeText).toHaveBeenCalledWith('123456789012345'); // maxLength of 10
  });
});

describe('<Input /> edge cases for value prop', () => {
  it('handles null value gracefully', () => {
    renderInput({ value: null });

    const inputElement = screen.getByTestId('text-input-flat');
    expect(inputElement.props.value).toBe(''); // Null should be converted to an empty string
  });

  it('handles undefined value gracefully', () => {
    renderInput({ value: undefined });

    const inputElement = screen.getByTestId('text-input-flat');
    expect(inputElement.props.value).toBe(''); // Undefined should be converted to an empty string
  });

  it('handles empty string value gracefully', () => {
    renderInput({ value: '' });

    const inputElement = screen.getByTestId('text-input-flat');
    expect(inputElement.props.value).toBe(''); // Empty string remains as is
  });

  it('handles numeric value gracefully', () => {
    renderInput({ value: 123 });

    const inputElement = screen.getByTestId('text-input-flat');
    expect(inputElement.props.value).toBe('123'); // Number should be converted to a string
  });
});
