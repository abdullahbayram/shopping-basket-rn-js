import React from 'react';
import { View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { Button, Text } from '../../components/atoms';
import { Input, ActivityOverlay } from '../../components/molecules';
import { CheckoutList } from '../../components/organisms';
import { BaseScreen } from '../../components/templetes';
import { removeItemFromBasket, updateItemQuantity, setDiscount } from '../../redux/slices/basketSlice';
import { useValidatePromoCodeMutation } from '../../redux/api/apiSlice';
import { selectBasketItems, selectTotalItemCount, selectTotalPrice } from '../../redux/selectors/basketSelector';
import validateBasket from '../../validate/validateBasket';
import showToast from '../../utils/showToast';
import messages from '../../constants/toastMessages';
import strings from '../../constants/strings';
import styles from './CheckoutScreen.style';

const CheckoutScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();

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

  const { basketItems, totalCount, total } = useSelector((state) => ({
    basketItems: selectBasketItems(state),
    totalCount: selectTotalItemCount(state),
    total: selectTotalPrice(state),
  }));

  const isBasketEmpty = basketItems.length === 0;

  const [validatePromoCode, { isLoading }] = useValidatePromoCodeMutation();

  const onRemoveItem = (item) => {
    dispatch(removeItemFromBasket(item.id));
  };

  const onOrderPress = () => {
    if (!validateBasket(basketItems)) {
      showToast(messages.basket.empty);
      return;
    }
    navigation.navigate('Payment');
  };

  const onApplyPromoCode = async (data) => {
    try {
      const { amount } = await validatePromoCode(data.promoCode).unwrap();
      if (amount) {
        dispatch(setDiscount(amount));
        showToast(messages.promo.success);
      } else {
        showToast(messages.promo.invalid);
      }
    } catch (err) {
      const errorMsg = err?.msg || messages.promoError.msg;
      showToast({ ...messages.promoError, msg: errorMsg });
    }
  };

  const onQuantityChange = (item, newQuantity) => {
    dispatch(updateItemQuantity({ id: item.id, quantity: newQuantity }));
  };

  return (
    <BaseScreen>
      <ActivityOverlay isVisible={isLoading} color={colors.secondary} />
      <View style={styles.totalContainer}>
        <Text variant="titleMedium">
          {strings.checkout.total} ${Number.isNaN(total) ? '0.00' : total.toFixed(2)}
        </Text>
      </View>

      <View style={styles.topContainer}>
        <View style={styles.orderButtonContainer}>
          <Button icon="cart-arrow-down" mode="contained" onPress={onOrderPress} disabled={isBasketEmpty}>
            {strings.checkout.order} ({totalCount} items)
          </Button>
        </View>

        <View style={styles.promoContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                {...register('promoCode', {
                  required: 'Promo code can not be empty',
                  pattern: { value: /^A([\d]{1,2})$/, message: 'This promo code is not valid' },
                })}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                label="Promo Code"
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
