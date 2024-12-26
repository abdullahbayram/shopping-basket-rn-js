import React from 'react';
import { View } from 'react-native';
import { Button, HelperText } from '@components/atoms';
import PropTypes from 'prop-types';
import styles from './ErrorState.style';

const ErrorState = ({ errorMessage, onRetry }) => {
  return (
    <View style={styles.container}>
      <HelperText style={styles.errorText} type="error">
        {errorMessage}
      </HelperText>
      <Button onPress={onRetry} mode="contained">
        Retry
      </Button>
    </View>
  );
};

ErrorState.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default ErrorState;
