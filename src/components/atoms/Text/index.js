import * as React from 'react';
import PropTypes from 'prop-types';
import { Text as PaperText, useTheme } from 'react-native-paper';

const Text = ({ children, variant = 'bodyMedium', style, numberOfLines, ellipsizeMode }) => {
  const theme = useTheme();
  return (
    <PaperText
      style={[{ color: theme.colors.tertiary }, style]}
      variant={variant}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
    >
      {children}
    </PaperText>
  );
};

Text.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  ellipsizeMode: PropTypes.string,
  numberOfLines: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Text;