import React from 'react';
import { render, screen } from '@testing-library/react-native';
import LinearGradient from '.';

describe('LinearGradient Component', () => {
  it('renders correctly with default props', () => {
    render(<LinearGradient colors={['#000000', '#ffffff']} />);
    const gradient = screen.getByTestId('linear-gradient');
    screen.getByTestId('linear-gradient');
    expect(gradient).toBeTruthy();
  });

  it('applies custom start and end props correctly', () => {
    const start = { x: 0.5, y: 0.5 };
    const end = { x: 1, y: 1 };
    render(<LinearGradient colors={['#123456', '#abcdef']} start={start} end={end} />);

    // The snapshot reveals that the LinearGradient component uses `startPoint` and `endPoint`
    // instead of `start` and `end`, and the values are represented as arrays ([x, y]) instead of objects ({x, y}).
    const gradient = screen.getByTestId('linear-gradient');
    expect(gradient.props.startPoint).toEqual([0.5, 0.5]);
    expect(gradient.props.endPoint).toEqual([1, 1]);
  });

  it('applies custom styles correctly', () => {
    const style = { margin: 10 };
    render(<LinearGradient colors={['#123456', '#abcdef']} style={style} />);

    const gradient = screen.getByTestId('linear-gradient');
    expect(gradient.props.style).toContainEqual(style);
  });

  // Snapshot Tests
  it('matches the snapshot with default props', () => {
    render(<LinearGradient colors={['#000000', '#ffffff']} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('matches the snapshot with custom start and end props', () => {
    const start = { x: 0.5, y: 0.5 };
    const end = { x: 1, y: 1 };
    const { toJSON } = render(<LinearGradient colors={['#123456', '#abcdef']} start={start} end={end} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('matches the snapshot with custom styles', () => {
    const style = { margin: 10 };
    render(<LinearGradient colors={['#123456', '#abcdef']} style={style} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
