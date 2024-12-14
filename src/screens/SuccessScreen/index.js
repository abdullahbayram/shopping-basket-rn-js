import React from 'react';
import { BaseScreen, RedirectWithAnimation } from '../../components/templetes';
import strings from '../../constants/strings';

const SuccessScreen = () => {
  return (
    <BaseScreen>
      <RedirectWithAnimation message={strings.payment.success} />
    </BaseScreen>
  );
};

export default SuccessScreen;
