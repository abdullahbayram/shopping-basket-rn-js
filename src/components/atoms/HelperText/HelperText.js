import * as React from 'react';
import PropTypes from 'prop-types';
import { HelperText as PHelperText } from 'react-native-paper';

const HelperText = ({ children, type, visible }) => (
  <PHelperText type={type} visible={visible}>
    {children}
  </PHelperText>
);

HelperText.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  visible: PropTypes.bool,
};

export default HelperText;
