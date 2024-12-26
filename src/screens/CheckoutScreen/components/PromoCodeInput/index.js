import React from 'react';
import { Controller } from 'react-hook-form';
import { Button, TextInput } from '@components/atoms';
import { Input } from '@components/molecules';
import { useTheme } from 'react-native-paper';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const PromoCodeInput = ({ control, errors, handleSubmit, onApplyPromoCode, register, isApplyButtonDisabled }) => {
  const { colors } = useTheme();

  return (
    <View>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            {...register('promoCode', {
              required: 'Promo code is required',
              pattern: { value: /^A([\d]{1,2})$/, message: 'Promo code is invalid' },
            })}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            label="Promo Code"
            placeholder="Enter Promo Code"
            keyboardType="default"
            right={<TextInput.Icon icon="percent" color={errors.promoCode ? colors.error : colors.primary} />}
            errorObject={errors.promoCode}
          />
        )}
        name="promoCode"
      />
      <Button
        icon="sack-percent"
        onPress={handleSubmit(onApplyPromoCode)}
        mode="contained"
        disabled={isApplyButtonDisabled}
      >
        Apply
      </Button>
    </View>
  );
};

PromoCodeInput.propTypes = {
  control: PropTypes.object.isRequired,
  errors: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  onApplyPromoCode: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isApplyButtonDisabled: PropTypes.bool.isRequired,
};

export default PromoCodeInput;
