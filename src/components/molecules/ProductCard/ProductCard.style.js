import { StyleSheet } from 'react-native';
import { typography } from '@constants/theme';

export default (colors, spacing) =>
  StyleSheet.create({
    container: {
      marginVertical: spacing.sm,
      borderRadius: spacing.sm,
      flex: 1,
      backgroundColor: colors.cardBackground,
      shadowColor: colors.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
    title: {
      flexDirection: 'row',
      paddingVertical: 0,
      paddingBottom: 0,
      marginVertical: 0,
    },
    rating: {
      fontSize: typography.sm,
      color: colors.ratingStar,
      marginBottom: spacing.xs,
    },
    feedbackAndPrice: {
      paddingHorizontal: spacing?.md,
    },
    price: {
      fontSize: typography.default,
      fontWeight: typography.bold,
      color: colors.textTertiary,
    },
    button: {
      borderRadius: 50,
      flex: 1,
      backgroundColor: colors.secondary,
    },
    disabledButton: {
      backgroundColor: colors.disabledButton,
      borderColor: colors.disabledButtonBorder,
    },
    buttonOrHelperTextContainer: {
      paddingHorizontal: spacing.special,
      flexDirection: 'row',
      height: 75,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
