import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { Button, Text, TextInput } from '@components/atoms';
import { Input, ActivityOverlay } from '@components/molecules';
import { CheckoutList } from '@components/organisms';
import { BaseScreen } from '@components/templates';
import { removeItemFromBasket, updateItemQuantity, setDiscount } from '@redux/slices/basketSlice';
import { useValidatePromoCodeMutation } from '@redux/api/apiSlice';
import { validateBasket } from '@validate';
import { showToast } from '@utils';
import { toastMessages, strings } from '@constants';
import styles from './CheckoutScreen.style';
import { useBasket, useNavigationHandlers } from '../../hooks';

const CheckoutScreen = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { navigateToPayment } = useNavigationHandlers();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      promoCode: '',
    },
  });

  const { basketItems, totalItemCount, totalPrice } = useBasket();

  const isBasketEmpty = basketItems.length === 0;

  const [validatePromoCode, { isLoading }] = useValidatePromoCodeMutation();

  const onRemoveItem = (item) => {
    dispatch(removeItemFromBasket(item.id));
  };

  const onOrderPress = () => {
    if (!validateBasket(basketItems)) {
      showToast(toastMessages.basket.empty);
      return;
    }
    navigateToPayment();
  };

  const onApplyPromoCode = async (data) => {
    try {
      const { amount } = await validatePromoCode(data.promoCode).unwrap();
      if (amount) {
        dispatch(setDiscount(amount));
        showToast(toastMessages.promo.success);
      } else {
        showToast(toastMessages.promo.invalid);
      }
    } catch (err) {
      const errorMsg = err?.msg || toastMessages.promo.error;
      showToast({ ...toastMessages.promo.error, msg: errorMsg });
    }
  };

  const onQuantityChange = (item, newQuantity) => {
    dispatch(updateItemQuantity({ id: item.id, quantity: newQuantity }));
  };

  return (
    <BaseScreen>
      <ActivityOverlay isVisible={isLoading} color={colors.secondary} />
      <View style={styles.totalContainer}>
        <Text variant="titleSmall">
          {strings.checkout.total} ${Number.isNaN(totalPrice) ? '0.00' : totalPrice.toFixed(2)}
        </Text>
      </View>

      <View style={styles.topContainer}>
        <View style={styles.orderButtonContainer}>
          <Button icon="cart-arrow-down" mode="contained" onPress={onOrderPress} disabled={isBasketEmpty}>
            {strings.checkout.order} ({totalItemCount} items)
          </Button>
        </View>

        <View style={styles.promoContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                {...register('promoCode', {
                  required: strings.checkout.promoCodeRequiredMessage,
                  pattern: { value: /^A([\d]{1,2})$/, message: strings.checkout.promoCodeNotValid },
                })}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                label={strings.checkout.promoCode}
                placeholder={strings.checkout.promoCodePlaceholder}
                keyboardType="default"
                right={<TextInput.Icon icon="percent" color={errors.promoCode ? colors.error : colors.primary} />}
                errorObject={errors.promoCode}
              />
            )}
            name="promoCode"
          />

          <Button icon="sack-percent" onPress={handleSubmit(onApplyPromoCode)} mode="contained">
            {strings.checkout.applyPromo}
          </Button>
        </View>
      </View>
      <CheckoutList onQuantityChange={onQuantityChange} basketItems={basketItems} onRemoveItem={onRemoveItem} />
    </BaseScreen>
  );
};

export default CheckoutScreen;
