import * as React from 'react';
import PropTypes from 'prop-types';
import { Appbar } from 'react-native-paper';

const Header = ({ handleSearch = null, handleMore = null, onBackPress = null, title }) => {
  return (
    <Appbar.Header>
      {onBackPress && <Appbar.BackAction onPress={onBackPress} />}
      <Appbar.Content title={title} />
      {handleSearch && <Appbar.Action icon="magnify" onPress={handleSearch} />}
      {handleMore && <Appbar.Action icon="dots-vertical" onPress={handleMore} />}
    </Appbar.Header>
  );
};

Header.propTypes = {
  handleSearch: PropTypes.func,
  handleMore: PropTypes.func,
  onBackPress: PropTypes.func,
  title: PropTypes.string.isRequired,
};

export default Header;
