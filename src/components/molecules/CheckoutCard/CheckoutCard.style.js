import { StyleSheet } from 'react-native';

export default (colors, spacing) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.cardBackground,
      marginVertical: spacing.sm,
      borderRadius: spacing.sm,
      padding: spacing.sm,
      shadowColor: colors.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
    topSection: {
      flexDirection: 'row',
      marginBottom: spacing.md,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 8,
      resizeMode: 'cover',
    },
    infoContainer: {
      flex: 1,
      paddingHorizontal: spacing.sm,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: spacing.sm,
      color: colors.textTertiary,
    },
    subtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: spacing.special,
    },
    price: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.textTertiary,
    },
    bottomSection: {
      flexDirection: 'row',
      flex: 1,
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    quantityButton: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.buttonBackground,
      borderWidth: 1,
      borderColor: colors.buttonBorder,
      borderRadius: 20,
      maxWidth: 50,
    },
    quantityTextContainer: {
      width: 30,
    },
    quantityText: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.textTertiary,
    },
    transparentButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.transparentButtonBorder,
      borderRadius: 20,
    },
  });
