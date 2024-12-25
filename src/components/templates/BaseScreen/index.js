import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { useTheme } from 'react-native-paper';
import { spacing } from '@constants/theme';
import createStyles from './BaseScreen.style';

const Screen = ({ children }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors, spacing);
  return (
    <View testID="base-screen" style={styles.container}>
      {children}
    </View>
  );
};

export default Screen;

Screen.propTypes = {
  children: PropTypes.node.isRequired,
};
