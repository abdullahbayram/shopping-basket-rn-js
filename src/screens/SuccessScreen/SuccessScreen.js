import React from 'react';
import RedirectWithAnimation from '../../components/templetes/RedirectWithAnimation';
import Screen from '../../components/templetes/BaseScreen';
import strings from '../../constants/strings';

const SuccessScreen = () => {
  return (
    <Screen>
      <RedirectWithAnimation message={strings.payment.success} />
    </Screen>
  );
};

export default SuccessScreen;
