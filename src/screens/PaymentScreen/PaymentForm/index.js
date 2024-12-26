import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { ControlledInput } from '@components/molecules';
import { TextInput } from '@components/atoms';
import { paymentUtils } from '@utils';
import { strings } from '@constants';
import { validationRules } from '@validate';
import { useTheme } from 'react-native-paper';
import styles from './PaymentForm.style';

const PaymentForm = ({ control, errors, isCreditCardValid }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.formContainer}>
      <ControlledInput
        control={control}
        rules={validationRules.cardholderName}
        name="cardholderName"
        label={strings.payment.cardholderName}
        placeholder={strings.payment.cardholderNamePlaceholder}
        errorObject={errors.cardholderName}
        right={
          <TextInput.Icon
            icon={paymentUtils.getIcon('cardholderName', errors)}
            color={errors.cardholderName ? colors.error : colors.primary}
          />
        }
      />

      <ControlledInput
        control={control}
        rules={validationRules.creditCardNumber}
        name="creditCardNumber"
        label={strings.payment.creditCardNumber}
        placeholder={strings.payment.creditCardPlaceholder}
        errorObject={errors.creditCardNumber}
        maxLength={16}
        keyboardType="numeric"
        right={
          <TextInput.Icon
            icon={paymentUtils.getIcon('creditCardNumber', errors, isCreditCardValid)}
            color={errors.creditCardNumber ? colors.error : colors.primary}
          />
        }
      />

      <ControlledInput
        control={control}
        rules={validationRules.expirationDate}
        name="expirationDate"
        label={strings.payment.expirationDate}
        placeholder={strings.payment.expirationDatePlaceholder}
        errorObject={errors.expirationDate}
        maxLength={5}
        keyboardType="numeric"
        formatValue={paymentUtils.formatExpirationDate}
        right={
          <TextInput.Icon
            icon={paymentUtils.getIcon('expirationDate', errors)}
            color={errors.expirationDate ? colors.error : colors.primary}
          />
        }
      />

      <ControlledInput
        control={control}
        rules={validationRules.cvv}
        name="cvv"
        label={strings.payment.cvv}
        placeholder={strings.payment.cvv}
        errorObject={errors.cvv}
        maxLength={3}
        keyboardType="numeric"
        formatValue={paymentUtils.filterNumericInput}
        right={
          <TextInput.Icon
            icon={paymentUtils.getIcon('cvv', errors)}
            color={errors.cvv ? colors.error : colors.primary}
          />
        }
      />
    </View>
  );
};

PaymentForm.propTypes = {
  control: PropTypes.oneOfType([PropTypes.object]).isRequired,
  errors: PropTypes.oneOfType([PropTypes.object]).isRequired,
  isCreditCardValid: PropTypes.bool.isRequired,
};

export default PaymentForm;
