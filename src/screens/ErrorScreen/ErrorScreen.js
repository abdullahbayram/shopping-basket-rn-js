import React from 'react';
import { useRoute } from '@react-navigation/native';
import RedirectWithAnimation from '../../components/templetes/RedirectWithAnimation/RedirectWithAnimation';
import Screen from '../../components/templetes/Screen/Screen';
import strings from '../../constants/strings';

const ErrorScreen = () => {
  const route = useRoute();
  const { errorMessage } = route.params || { errorMessage: strings.unexpectedErrorShort };

  return (
    <Screen>
      <RedirectWithAnimation message={errorMessage} duration={10000} />
    </Screen>
  );
};

export default ErrorScreen;
