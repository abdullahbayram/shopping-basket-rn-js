import { FlatList as RNFlatList } from 'react-native';
import styles from './FlatList.style';

const FlatList = ({ ...rest }) => {
  return (
    <RNFlatList
      style={styles.flatList}
      initialNumToRender={10}
      maxToRenderPerBatch={5}
      windowSize={10}
      removeClippedSubviews
      {...rest}
    />
  );
};

export default FlatList;
