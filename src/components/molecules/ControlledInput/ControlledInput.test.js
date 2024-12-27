import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import renderInFormProvider from '@testUtils/renderInFormProvider';
import ControlledInput from '.';

describe('<ControlledInput />', () => {
  const mockName = 'testInput';
  const mockLabel = 'Test Label';
  const mockPlaceholder = 'Enter value';

  it('renders correctly', () => {
    const { toJSON } = renderInFormProvider(
      <ControlledInput name={mockName} label={mockLabel} placeholder={mockPlaceholder} />,
    );

    expect(screen.getAllByText(mockLabel).length).toBe(2);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onChangeText and updates text when text changes without formatValue', () => {
    renderInFormProvider(<ControlledInput name={mockName} label={mockLabel} placeholder={mockPlaceholder} />);

    const input = screen.getAllByText(mockLabel)[0];
    fireEvent.changeText(input, 'New Value');

    const formValues = screen.getByDisplayValue('New Value');
    expect(formValues).toBeTruthy();
  });

  it('updates text and calls formatValue with formatted value when formatValue func is provided', () => {
    const formatValue = jest.fn((value) => value.toUpperCase());
    renderInFormProvider(
      <ControlledInput name={mockName} label={mockLabel} placeholder={mockPlaceholder} formatValue={formatValue} />,
    );

    const input = screen.getAllByText(mockLabel)[0];
    fireEvent.changeText(input, 'lowercase');

    expect(formatValue).toHaveBeenCalledWith('lowercase');
    expect(screen.getByDisplayValue('LOWERCASE')).toBeTruthy();
  });

  it('renders error message when errorObject is provided', () => {
    const mockErrorObject = { message: 'This field is required' };

    renderInFormProvider(
      <ControlledInput name={mockName} label={mockLabel} placeholder={mockPlaceholder} errorObject={mockErrorObject} />,
    );

    expect(screen.getByText(mockErrorObject.message)).toBeTruthy();
  });
});
