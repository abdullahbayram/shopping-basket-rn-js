import React from 'react';
import { useRoute } from '@react-navigation/native';
import RedirectWithAnimation from '../../components/templetes/RedirectWithAnimation/RedirectWithAnimation';
import Screen from '../../components/templetes/Screen/Screen';

const ErrorScreen = () => {
  const route = useRoute();
  const { errorMessage = 'Unexpected Error' } = route.params || {};
  return (
    <Screen>
      <RedirectWithAnimation message={errorMessage} duration={10000} />
    </Screen>
  );
};

export default ErrorScreen;
