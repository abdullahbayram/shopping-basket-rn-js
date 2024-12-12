import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from 'react-native-paper';
import styles from './BaseScreen.style';

const Screen = ({ children }) => {
  const { colors } = useTheme();
  return <View style={[styles.container, { backgroundColor: colors.background }]}>{children}</View>;
};

export default Screen;

Screen.propTypes = {
  children: PropTypes.node.isRequired,
};
