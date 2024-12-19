import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { spacing } from '@constants/theme';
import styles from './Toggle.style';
import { Switch, Icon } from '../../atoms';

const Toggle = ({ isDarkMode, toggleTheme }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.toggleButton}>
      <Icon color={isDarkMode ? colors.textPrimary : colors.textSecondary} size={24} source="theme-light-dark" />
      <Switch
        style={{ marginHorizontal: spacing.special }}
        trackColor={{ false: colors.textPrimary, true: colors.textSecondary }}
        // thumbColor={isDarkMode ? colors.textSecondary : colors.textPrimary}
        ios_backgroundColor={isDarkMode ? colors.textPrimary : colors.textSecondary}
        value={isDarkMode}
        onValueChange={toggleTheme}
      />
    </View>
  );
};

Toggle.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default Toggle;
