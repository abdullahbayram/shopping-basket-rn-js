import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { useForm, FormProvider } from 'react-hook-form';
import ControlledInput from '.';

describe('<ControlledInput />', () => {
  const mockName = 'testInput';
  const mockLabel = 'Test Label';
  const mockPlaceholder = 'Enter value';

  // eslint-disable-next-line react/prop-types
  const Wrapper = ({ children }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  it('renders correctly', () => {
    const { toJSON } = render(
      <Wrapper>
        <ControlledInput name={mockName} label={mockLabel} placeholder={mockPlaceholder} />
      </Wrapper>,
    );

    expect(screen.getAllByText(mockLabel).length).toBe(2);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onChangeText and update text when text changes without formatValue', () => {
    render(
      <Wrapper>
        <ControlledInput name={mockName} label={mockLabel} placeholder={mockPlaceholder} />
      </Wrapper>,
    );

    const input = screen.getAllByText(mockLabel)[0];
    fireEvent.changeText(input, 'New Value');

    const formValues = screen.getByDisplayValue('New Value');
    expect(formValues).toBeTruthy();
  });

  it('update text and calls formatValue with formatted value when formatValue func is provided', () => {
    const formatValue = jest.fn((value) => value.toUpperCase());
    render(
      <Wrapper>
        <ControlledInput name={mockName} label={mockLabel} placeholder={mockPlaceholder} formatValue={formatValue} />
      </Wrapper>,
    );

    const input = screen.getAllByText(mockLabel)[0];
    fireEvent.changeText(input, 'lowercase');

    expect(formatValue).toHaveBeenCalledWith('lowercase');
    expect(screen.getByDisplayValue('LOWERCASE')).toBeTruthy();
    expect(formatValue).toHaveBeenCalledWith('lowercase');
  });

  it('renders error message when errorObject is provided', () => {
    const mockErrorObject = { message: 'This field is required' };

    render(
      <Wrapper>
        <ControlledInput
          name={mockName}
          label={mockLabel}
          placeholder={mockPlaceholder}
          errorObject={mockErrorObject}
        />
      </Wrapper>,
    );

    expect(screen.getByText(mockErrorObject.message)).toBeTruthy();
  });
});
