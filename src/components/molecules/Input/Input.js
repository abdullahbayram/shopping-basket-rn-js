import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import TextInput from '../../atoms/TextInput/TextInput';

const Input = ({ label = null, onChangeText, maxLength, style, value, onBlur, onEndEditing, right }) => {
  return (
    <TextInput
      maxLength={maxLength}
      style={[styles.container, style]}
      label={label}
      onChangeText={onChangeText}
      value={String(value)}
      onBlur={onBlur}
      onEndEditing={onEndEditing}
      right={right}
    />
  );
};

Input.propTypes = {
  label: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onEndEditing: PropTypes.func,
  right: PropTypes.node,
  maxLength: PropTypes.oneOfType([PropTypes.number]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
});
