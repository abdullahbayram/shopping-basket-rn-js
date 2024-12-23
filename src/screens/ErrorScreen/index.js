import React from 'react';
import { useRoute } from '@react-navigation/native';
import { BaseScreen, RedirectWithAnimation } from '@components/templates';
import { strings } from '@constants';

const ErrorScreen = () => {
  const route = useRoute();
  const { errorMessage } = route.params || { errorMessage: strings.payment.unexpectedErrorShort };

  return (
    <BaseScreen>
      <RedirectWithAnimation message={errorMessage} duration={10000} />
    </BaseScreen>
  );
};

export default ErrorScreen;
