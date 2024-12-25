import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import Input from '../Input';

const ControlledInput = ({
  control,
  name,
  label,
  placeholder,
  maxLength,
  keyboardType,
  errorObject,
  right,
  formatValue,
  rules,
}) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({ field: { onChange, onBlur, value } }) => (
      <Input
        value={value}
        onBlur={onBlur}
        onChangeText={(text) => onChange(formatValue ? formatValue(text) : text)}
        label={label}
        placeholder={placeholder}
        maxLength={maxLength}
        keyboardType={keyboardType}
        errorObject={errorObject}
        right={right}
      />
    )}
  />
);

ControlledInput.propTypes = {
  control: PropTypes.oneOfType([PropTypes.object]).isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  keyboardType: PropTypes.string,
  errorObject: PropTypes.oneOfType([PropTypes.object]),
  right: PropTypes.node,
  formatValue: PropTypes.func,
  rules: PropTypes.oneOfType([PropTypes.object]),
};

export default ControlledInput;
