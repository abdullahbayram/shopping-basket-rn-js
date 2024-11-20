import React from 'react';
import RedirectWithAnimation from '../../components/templetes/RedirectWithAnimation/RedirectWithAnimation';
import Screen from '../../components/templetes/Screen/Screen';
import strings from '../../constants/strings';

const SuccessScreen = () => {
  return (
    <Screen>
      <RedirectWithAnimation message={strings.orderSuccess.msg} />
    </Screen>
  );
};

export default SuccessScreen;
