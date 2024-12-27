import { StyleSheet } from 'react-native';
import { spacing } from '@constants/theme';

export default StyleSheet.create({
  buttonContainer: {
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
    paddingRight: spacing.special,
    flexGrow: 1,
    justifyContent: 'center',
  },
  activityIndicator: { marginBottom: 72 },
});
