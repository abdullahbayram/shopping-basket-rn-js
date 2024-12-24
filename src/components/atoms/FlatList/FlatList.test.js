import React from 'react';
import { render, screen } from '@testing-library/react-native';
import FlatList from '.';
import styles from './FlatList.style';

jest.mock('./FlatList.style', () => ({
  flatList: {
    backgroundColor: 'white',
  },
}));

describe('FlatList Component', () => {
  it('should render correctly with default props', () => {
    render(<FlatList testID="custom-flatlist" data={[]} renderItem={() => null} />);

    const flatList = screen.getByTestId('custom-flatlist');

    expect(flatList).toBeTruthy();
    expect(flatList.props.style).toEqual(styles.flatList);
    expect(flatList.props.initialNumToRender).toBe(10);
    expect(flatList.props.maxToRenderPerBatch).toBe(5);
    expect(flatList.props.windowSize).toBe(10);
    expect(flatList.props.removeClippedSubviews).toBe(true);
  });

  it('should pass additional props to the FlatList', () => {
    const mockData = [{ id: '1', title: 'Test Item' }];
    const mockRenderItem = jest.fn();

    render(<FlatList testID="custom-flatlist" data={mockData} renderItem={mockRenderItem} horizontal />);

    const flatList = screen.getByTestId('custom-flatlist');

    expect(flatList.props.data).toEqual(mockData);
    expect(flatList.props.horizontal).toBe(true);
  });
});
