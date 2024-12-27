import { useNavigation } from '@react-navigation/native';
import { strings } from '@constants';

export default () => {
  const navigation = useNavigation();

  const navigateToCheckout = () => {
    navigation.navigate(strings.screens.checkout);
  };

  const navigateToPayment = () => {
    navigation.navigate(strings.screens.payment);
  };

  const navigateToError = (errorMessage) => {
    navigation.navigate(strings.screens.error, { errorMessage });
  };

  const navigateToSuccess = () => {
    navigation.navigate(strings.screens.success);
  };

  return { navigateToCheckout, navigateToPayment, navigateToError, navigateToSuccess };
};
