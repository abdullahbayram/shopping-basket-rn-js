import * as React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const Input = ({ label, icon = null, onChangeText, maxLength, style, value, onBlur, onEndEditing }) => {
  return (
    <TextInput
      maxLength={maxLength}
      style={[styles.container, style]}
      label={label}
      onChangeText={onChangeText}
      right={<TextInput.Icon icon={icon || ''} />}
      value={String(value)}
      onBlur={onBlur}
      onEndEditing={onEndEditing}
    />
  );
};

Input.propTypes = {
  label: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onEndEditing: PropTypes.func,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
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
