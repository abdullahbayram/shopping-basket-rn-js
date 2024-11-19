import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

const ActivityOverlay = ({ isVisible, color = 'white', size = 'large' }) => {
  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

ActivityOverlay.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOf(['small', 'large']),
};

export default ActivityOverlay;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
