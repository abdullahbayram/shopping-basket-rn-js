import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './ActivityOverlay.style';
import { ActivityIndicator } from '../../atoms';

const ActivityOverlay = ({ isVisible = false, color = 'white', size = 'large', zIndex = 10 }) => {
  if (!isVisible) return null;

  return (
    <View style={[styles.overlay, { zIndex }]}>
      <ActivityIndicator testID="ActivityIndicator" size={size} color={color} />
    </View>
  );
};

ActivityOverlay.propTypes = {
  isVisible: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.oneOf(['small', 'large']),
  zIndex: PropTypes.number,
};

export default ActivityOverlay;
