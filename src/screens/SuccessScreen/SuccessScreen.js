import React from 'react';
import RedirectWithAnimation from '../../components/templetes/RedirectWithAnimation';
import Screen from '../../components/templetes/BaseScreen';
import strings from '../../constants/alertMessages';

const SuccessScreen = () => {
  return (
    <Screen>
      <RedirectWithAnimation message={strings.orderSuccess.msg} />
    </Screen>
  );
};

export default SuccessScreen;
