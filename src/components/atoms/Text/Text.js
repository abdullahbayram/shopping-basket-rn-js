import * as React from 'react';
import PropTypes from 'prop-types';
import { Text as PaperText } from 'react-native-paper';

const Text = ({ children, variant = 'bodyMedium' }) => <PaperText variant={variant}>{children}</PaperText>;

Text.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
};

export default Text;
