import { StyleSheet } from 'react-native';

const createStyles = (colors, spacing) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingLeft: spacing.medium,
      paddingRight: spacing.baseScreenSpecial,
      paddingTop: spacing.small,
    },
  });

export default createStyles;
