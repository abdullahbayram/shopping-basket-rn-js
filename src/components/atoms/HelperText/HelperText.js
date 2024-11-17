import * as React from 'react';
import PropTypes from 'prop-types';
import { HelperText as PHelperText } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const HelperText = ({ children, type, visible, style }) => (
  <PHelperText type={type} visible={visible} style={[styles.helperText, style]}>
    {children}
  </PHelperText>
);

HelperText.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  visible: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default HelperText;

const styles = StyleSheet.create({
  helperText: {
    paddingVertical: 0,
  },
});
