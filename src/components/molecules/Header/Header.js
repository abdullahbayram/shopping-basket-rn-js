import * as React from 'react';
import PropTypes from 'prop-types';
import Appbar from '../../atoms/Appbar';
import accessibilityLabels from '../../../constants/accessibilityLabels';

const Header = ({ handleSearch = null, handleMore = null, onBackPress = null, title }) => {
  return (
    <Appbar.Header>
      {onBackPress && <Appbar.BackAction accessibilityRole={accessibilityLabels.back} onPress={onBackPress} />}
      <Appbar.Content title={title} />
      {handleSearch && (
        <Appbar.Action accessibilityRole={accessibilityLabels.search} icon="magnify" onPress={handleSearch} />
      )}
      {handleMore && (
        <Appbar.Action accessibilityRole={accessibilityLabels.more} icon="dots-vertical" onPress={handleMore} />
      )}
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
