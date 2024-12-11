import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import Input from '.';

const creditCardNumber = '1234 5678 9012 3456';
const CREDIT_CARD = 'credit-card';
const LABEL = 'Credit Card';

const mockOnPress = jest.fn();

const renderInput = ({ label, icon }) => {
  return render(<Input value={creditCardNumber} onChangeText={mockOnPress} icon={icon} label={label} />);
};

describe('<Input />', () => {
  it('matches the snapshot with label and icon', () => {
    const { toJSON } = renderInput({ label: LABEL, icon: CREDIT_CARD });
    expect(toJSON()).toMatchSnapshot();
  });
  it('match the snapshot without an icon', () => {
    const { toJSON } = renderInput({ label: LABEL });
    expect(toJSON()).toMatchSnapshot();
  });
  it('renders the input label correctly', () => {
    renderInput({ label: LABEL, icon: CREDIT_CARD });
    expect(screen.getAllByText('Credit Card').length).toBe(2); // active and inactive text
  });
  it('calls the onChange function when input changes', () => {
    renderInput({ label: LABEL, icon: CREDIT_CARD });
    const inputElement = screen.getByTestId('text-input-flat'); // Find the input by label
    fireEvent.changeText(inputElement, '1234 5678 9012 3456'); // Simulate typing in the input
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
