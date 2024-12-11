import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Text from '.'; // Adjust the import path to your file

describe('<Text />', () => {
  const testText = 'Hello, World!';
  it('matches the snapshot', () => {
    const { toJSON } = render(<Text>{testText}</Text>);
    expect(toJSON()).toMatchSnapshot();
  });
  it('renders the children correctly', () => {
    render(<Text>{testText}</Text>);
    expect(screen.getByText(testText)).toBeTruthy();
  });
  it('uses the default variant when not provided', () => {
    render(<Text>{testText}</Text>);
    const textElement = screen.getByText(testText);
    expect(textElement.props.style).toMatchSnapshot();
  });

  it('renders with the provided variant', () => {
    render(<Text variant="headlineSmall">{testText}</Text>);
    const textElement = screen.getByText(testText);
    expect(textElement.props.style).toMatchSnapshot();
  });
});
