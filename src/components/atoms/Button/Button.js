import * as React from 'react';
import PropTypes from 'prop-types';
import { Button as PaperButton } from 'react-native-paper';

const Button = ({ children, onPress, icon = '', mode = 'contained', disabled = false }) => (
  <PaperButton onPress={onPress} icon={icon} mode={mode} disabled={disabled}>
    {children}
  </PaperButton>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  mode: PropTypes.string,
};

export default Button;
