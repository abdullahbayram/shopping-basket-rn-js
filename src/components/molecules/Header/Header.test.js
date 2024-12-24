import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import Header from '.';

describe('<Header />', () => {
  const mockOnBackPress = jest.fn();
  const mockHandleMore = jest.fn();
  const title = 'Test Title';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the title correctly', () => {
    render(<Header title={title} />);

    expect(screen.getByText(title)).toBeTruthy();
  });

  it('matches the snapshot', () => {
    const { toJSON } = render(<Header title={title} handleMore={mockHandleMore} onBackPress={mockOnBackPress} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onBackPress when the back button is clicked', () => {
    render(<Header title={title} onBackPress={mockOnBackPress} />);

    const backButton = screen.getByTestId('back-action-button'); // Use testID for targeting
    fireEvent.press(backButton);

    expect(mockOnBackPress).toHaveBeenCalled();
  });

  it('does not render back button when onBackPress is not provided', () => {
    render(<Header title={title} />);

    const backButton = screen.queryByTestId('back-action-button');
    expect(backButton).toBeNull();
  });
});
