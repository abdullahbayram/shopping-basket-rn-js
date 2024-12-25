import React from 'react';
import { render, screen } from '@testing-library/react-native';
import FlatList from '.';
import styles from './FlatList.style';
import Text from '../Text';

jest.mock('./FlatList.style', () => ({
  flatList: {
    backgroundColor: 'white',
  },
}));

describe('FlatList Component', () => {
  const mockData = [
    { id: '1', title: 'Test Item' },
    { id: '2', title: 'Test Item 2' },
  ];

  it('renders correctly with default props (snapshot)', () => {
    const { toJSON } = render(<FlatList testID="custom-flatlist" data={[]} renderItem={() => null} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with default props', () => {
    render(<FlatList testID="custom-flatlist" data={[]} renderItem={() => null} />);
    const flatList = screen.getByTestId('custom-flatlist');
    expect(flatList).toBeTruthy();
    expect(flatList.props.style).toEqual(styles.flatList);
    expect(flatList.props.initialNumToRender).toBe(10);
    expect(flatList.props.maxToRenderPerBatch).toBe(5);
    expect(flatList.props.windowSize).toBe(10);
    expect(flatList.props.removeClippedSubviews).toBe(true);
  });

  it('passes additional props to the FlatList', () => {
    const mockRenderItem = jest.fn(({ item }) => <Text>{item.title}</Text>);

    render(<FlatList testID="custom-flatlist" data={mockData} renderItem={mockRenderItem} horizontal />);

    const flatList = screen.getByTestId('custom-flatlist');
    expect(flatList.props.data).toEqual(mockData);
    expect(flatList.props.horizontal).toBe(true);
  });

  it('renders data items correctly', () => {
    const mockRenderItem = jest.fn(({ item }) => <Text>{item.title}</Text>);

    render(<FlatList testID="custom-flatlist" data={mockData} renderItem={mockRenderItem} />);

    const flatList = screen.getByTestId('custom-flatlist');
    expect(flatList).toBeTruthy();

    expect(mockRenderItem).toHaveBeenCalledTimes(mockData.length);

    expect(screen.getByText('Test Item')).toBeTruthy();
  });

  it('handles an empty data array gracefully', () => {
    render(<FlatList testID="custom-flatlist" data={[]} renderItem={() => null} />);
    const flatList = screen.getByTestId('custom-flatlist');
    expect(flatList.props.data).toEqual([]);
  });
});
