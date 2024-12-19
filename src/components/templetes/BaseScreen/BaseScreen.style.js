import { StyleSheet } from 'react-native';

const createStyles = (colors, spacing) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingLeft: spacing.md,
      paddingRight: spacing.baseScreenSpecial,
      paddingTop: spacing.sm,
    },
  });

export default createStyles;
