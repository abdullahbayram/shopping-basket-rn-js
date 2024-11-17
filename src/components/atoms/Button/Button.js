import * as React from 'react';
import PropTypes from 'prop-types';
import { Button as PaperButton, useTheme } from 'react-native-paper';

const Button = ({ children, onPress, icon = '', mode = 'outlined', disabled = false, style = {} }) => {
  const theme = useTheme();
  return (
    <PaperButton
      style={style}
      onPress={onPress}
      textColor={theme.colors.tertiary}
      buttonColor={theme.colors.secondary}
      icon={icon}
      mode={mode}
      disabled={disabled}
    >
      {children}
    </PaperButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  mode: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Button;
