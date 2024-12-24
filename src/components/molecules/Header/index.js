import * as React from 'react';
import PropTypes from 'prop-types';
import { Appbar } from '../../atoms';

const Header = ({ onBackPress = null, title }) => {
  return (
    <Appbar.Header>
      {onBackPress && <Appbar.BackAction testID="back-action-button" onPress={onBackPress} />}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

Header.propTypes = {
  onBackPress: PropTypes.func,
  title: PropTypes.string.isRequired,
};

export default Header;
