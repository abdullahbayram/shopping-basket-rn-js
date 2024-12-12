import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Header from '.';

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
});
