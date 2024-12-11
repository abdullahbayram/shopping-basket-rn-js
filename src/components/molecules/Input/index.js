import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import TextInput from '../../atoms/TextInput';
import HelperText from '../../atoms/HelperText';
import styles from './Input.style';

const Input = ({ label, onChangeText, maxLength, style, value = '', onBlur, onEndEditing, right, errorObject }) => {
  return (
    <View style={styles.container}>
      <TextInput
        maxLength={maxLength}
        style={style}
        label={label}
        onChangeText={onChangeText}
        value={value !== null && value !== undefined ? String(value) : ''}
        onBlur={onBlur}
        onEndEditing={onEndEditing}
        right={right}
        error={!!errorObject}
      />
      {errorObject ? (
        <HelperText type="error" visible={!!errorObject}>
          {errorObject?.message}
        </HelperText>
      ) : (
        <View style={styles.invisibleHeight} />
      )}
    </View>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onEndEditing: PropTypes.func,
  right: PropTypes.node,
  errorObject: PropTypes.shape({
    message: PropTypes.string,
  }),
  maxLength: PropTypes.oneOfType([PropTypes.number]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Input;
