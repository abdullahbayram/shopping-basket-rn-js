import { StyleSheet } from 'react-native';

const createStyles = (colors, spacing) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 24,
      marginBottom: spacing.special,
      textAlign: 'center',
      color: colors.textPrimary,
    },
    textContainer: {
      marginBottom: spacing.lg,
      alignItems: 'center',
    },
    message: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    progressBarContainer: {
      width: '80%',
      height: 10,
      backgroundColor: colors.progressBarBackground,
      borderRadius: 5,
      overflow: 'hidden', // Ensures the gradient is clipped within the container
      marginBottom: spacing.md,
    },
    button: {
      backgroundColor: colors.secondary,
    },
    buttonText: {
      color: colors.buttonText,
    },
    animatedContainer: { height: '100%' },
  });

export default createStyles;
