import { StyleSheet } from 'react-native';
import { spacing } from '../../constants/theme';

export default StyleSheet.create({
  totalContainer: {
    marginBottom: spacing.special,
    paddingLeft: spacing.xxs,
  },
  topContainer: {
    height: 165,
    justifyContent: 'space-between',
    marginVertical: spacing.sm,
  },
  orderButtonContainer: {
    flex: 4,
  },
  promoContainer: { flex: 6 },
});
