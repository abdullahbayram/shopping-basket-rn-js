import { StyleSheet } from 'react-native';
import { spacing } from '@constants/theme';

export default StyleSheet.create({
  totalContainer: {
    marginVertical: spacing.md,
  },
  formContainer: {
    marginBottom: spacing.md,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: spacing.lg,
  },
});
