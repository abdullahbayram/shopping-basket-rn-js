import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ActivityOverlay from '.';

describe('ActivityOverlay Component', () => {
  it('renders correctly when isVisible is true', () => {
    const { toJSON } = render(<ActivityOverlay isVisible color="blue" size="small" zIndex={20} />);

    expect(toJSON()).toMatchSnapshot();

    expect(screen.getByTestId('ActivityIndicator')).toBeTruthy();
  });

  it('does not render when isVisible is false', () => {
    const { toJSON } = render(<ActivityOverlay isVisible={false} />);

    expect(toJSON()).toMatchSnapshot();

    expect(screen.queryByTestId('ActivityIndicator')).toBeNull();
  });

  it('applies the correct color and size props to ActivityIndicator', () => {
    render(<ActivityOverlay isVisible color="red" size="large" />);

    const activityIndicator = screen.getByTestId('ActivityIndicator');

    expect(activityIndicator.props.color).toBe('red');
    expect(activityIndicator.props.size).toBe('large');
  });

  it('renders with default props when none are provided', () => {
    render(<ActivityOverlay isVisible />);

    const activityIndicator = screen.getByTestId('ActivityIndicator');

    // Default prop checks
    expect(activityIndicator.props.color).toBe('white');
    expect(activityIndicator.props.size).toBe('large');
  });
});

describe('ActivityOverlay Component - Snapshot Tests', () => {
  it('matches snapshot with default props', () => {
    const { toJSON } = render(<ActivityOverlay isVisible />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('matches snapshot with custom props', () => {
    const { toJSON } = render(<ActivityOverlay isVisible color="green" size="small" zIndex={30} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
