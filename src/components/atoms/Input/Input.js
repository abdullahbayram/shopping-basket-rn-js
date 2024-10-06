import * as React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const Input = ({ label, icon = null, onChangeText, maxLength }) => {
  return (
    <TextInput
      maxLength={maxLength}
      style={styles.container}
      label={label}
      onChangeText={onChangeText}
      right={<TextInput.Icon icon={icon || ''} />}
    />
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  maxLength: PropTypes.oneOfType([PropTypes.number]),
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
});
