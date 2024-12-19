import { StyleSheet } from 'react-native';
import { spacing } from '@constants/theme';

export default StyleSheet.create({
  contentContainer: {
    paddingRight: spacing.sm,
  },
  flatList: {
    marginTop: spacing.special,
    marginBottom: spacing.xl,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: spacing.lg,
  },
});
