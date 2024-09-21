import * as React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const Input = ({ label, icon = null }) => {
  return <TextInput style={styles.container} label={label} right={<TextInput.Icon icon={icon} />} />;
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
});
