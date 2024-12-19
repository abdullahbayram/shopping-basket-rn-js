import { StyleSheet } from 'react-native';
import { spacing } from '../../constants/theme';

export default StyleSheet.create({
  buttonContainer: {
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
    flexGrow: 1,
    justifyContent: 'center',
  },
  errorText: { alignSelf: 'center' },
});
