import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import Header from '.';
import accessibilityLabels from '../../../constants/accessibilityLabels'; // Adjust the path to the actual file

describe('<Header />', () => {
  const mockOnBackPress = jest.fn();
  const mockHandleSearch = jest.fn();
  const mockHandleMore = jest.fn();
  const title = 'Test Title';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the title correctly', () => {
    render(<Header title={title} />);

    expect(screen.getByText(title)).toBeTruthy();
  });

  it('renders back action when onBackPress is provided', () => {
    render(<Header title={title} onBackPress={mockOnBackPress} />);

    const backAction = screen.getByRole(accessibilityLabels.back);
    expect(backAction).toBeTruthy();
  });

  it('calls onBackPress when back button is pressed', () => {
    render(<Header title={title} onBackPress={mockOnBackPress} />);

    const backAction = screen.getByRole(accessibilityLabels.back);
    fireEvent.press(backAction);

    expect(mockOnBackPress).toHaveBeenCalledTimes(1);
  });

  it('renders search icon when handleSearch is provided', () => {
    render(<Header title={title} handleSearch={mockHandleSearch} />);

    const searchIcon = screen.getByRole(accessibilityLabels.search); // '󰍉'
    expect(searchIcon).toBeTruthy();
  });

  it('calls handleSearch when search button is pressed', () => {
    render(<Header title={title} handleSearch={mockHandleSearch} />);

    const searchIcon = screen.getByRole(accessibilityLabels.search); // '󰍉'
    fireEvent.press(searchIcon);

    expect(mockHandleSearch).toHaveBeenCalledTimes(1);
  });

  it('renders three dot button when handleMore is provided ', () => {
    render(<Header title={title} handleMore={mockHandleMore} />);

    const moreButton = screen.getAllByRole(accessibilityLabels.more);
    expect(moreButton).toBeTruthy();
  });

  it('calls handleMore when more button is pressed', () => {
    render(<Header title={title} handleMore={mockHandleMore} />);

    const moreButton = screen.getByRole(accessibilityLabels.more);
    fireEvent.press(moreButton);

    expect(mockHandleMore).toHaveBeenCalledTimes(1);
  });

  it('matches the snapshot', () => {
    const { toJSON } = render(
      <Header
        title={title}
        handleSearch={mockHandleSearch}
        handleMore={mockHandleMore}
        onBackPress={mockOnBackPress}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it('does not render search or more buttons when handlers are null', () => {
    render(<Header title={title} />);

    expect(screen.queryByRole(accessibilityLabels.search)).toBeNull();
    expect(screen.queryByRole(accessibilityLabels.more)).toBeNull();
  });
});
