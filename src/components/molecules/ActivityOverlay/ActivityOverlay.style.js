import { StyleSheet } from 'react-native';
import { sharedColors } from '../../../constants/theme';

export default StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: sharedColors.overlayBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
