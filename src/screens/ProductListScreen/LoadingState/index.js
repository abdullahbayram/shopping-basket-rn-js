import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from '@components/atoms';
import PropTypes from 'prop-types';
import globalStyles from '../../../global.style';

const LoadingState = ({ color }) => (
  <View style={[globalStyles.flex, globalStyles.centerContent]}>
    <ActivityIndicator size="large" color={color} />
  </View>
);

export default LoadingState;

LoadingState.propTypes = {
  color: PropTypes.string,
};
