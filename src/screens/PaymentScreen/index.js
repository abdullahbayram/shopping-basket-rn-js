import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useTheme } from 'react-native-paper';
import { Button, Text, TextInput } from '@components/atoms';
import { Input, ActivityOverlay } from '@components/molecules';
import { BaseScreen } from '@components/templetes';
import { clearBasket, clearDiscount } from '@redux/slices/basketSlice';
import { usePlaceOrderMutation } from '@redux/api/apiSlice';
import { selectBasketItems, selectTotalItemCount, selectTotalPrice } from '@redux/selectors/basketSelector';
import showToast from '@utils/showToast';
import { toastMessages, strings } from '@constants';
import { checkCreditCardWithCardValidator, validationRules, validateBasket } from '@validate';
import styles from './PaymentScreen.style';

const CREDIT_CARD_CHECK = 'credit-card-check';
const CREDIT_CARD = 'credit-card';

const PaymentScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      creditCardNumber: '',
      cardholderName: '',
      expirationDate: '',
      cvv: '',
    },
  });

  const { basketItems, totalCount, total } = useSelector((state) => ({
    basketItems: selectBasketItems(state),
    totalCount: selectTotalItemCount(state),
    total: selectTotalPrice(state),
  }));

  const dispatch = useDispatch();

  const isCreditCardValid = useMemo(() => checkCreditCardWithCardValidator(watch('creditCardNumber')), [watch]);

  const [placeOrder, { isLoading }] = usePlaceOrderMutation();

  const filterNumericInput = (text) => text.replace(/[^0-9]/g, '');

  const handleOrderError = (err) => {
    console.log(err, 'err1');
    let errorMessage = strings.payment.unexpectedError;

    try {
      if (typeof err.msg === 'string') {
        const parsedError = JSON.parse(err.msg);

        if (Array.isArray(parsedError?.errors) && parsedError.errors.length > 0) {
          errorMessage = parsedError.errors[0].msg; // Use the first specific error message
        }
      } else if (Array.isArray(err?.errors) && err.errors.length > 0) {
        errorMessage = err.errors[0].msg;
      }
    } catch (e) {
      console.log(strings.devErrors.parseErrorMessage, e);
    }

    navigation.navigate(strings.screens.error, { errorMessage });
  };

  const onPlaceOrder = async (data) => {
    if (!validateBasket(basketItems)) {
      showToast(toastMessages.basket.empty);
      return;
    }
    try {
      const response = await placeOrder({
        basket: basketItems,
        cardNumber: data.creditCardNumber,
        cardholderName: data.cardholderName,
        expirationDate: data.expirationDate,
        cvv: data.cvv,
      }).unwrap();
      console.log(response, 'response');
      if (response) {
        dispatch(clearBasket());
        dispatch(clearDiscount());
        reset();
        navigation.navigate(strings.screens.success);
      }
    } catch (err) {
      console.log(err, 'err2');
      handleOrderError(err);
    }
  };

  const formatExpirationDate = (value) => {
    const sanitized = value.replace(/[^0-9]/g, '');
    if (sanitized.length <= 2) return sanitized;
    return `${sanitized.slice(0, 2)}/${sanitized.slice(2, 4)}`;
  };

  const getIcon = (field) => {
    if (field === 'creditCardNumber') return isCreditCardValid ? CREDIT_CARD_CHECK : CREDIT_CARD;
    const isValid = !errors[field];
    const iconMap = {
      cardholderName: isValid ? strings.icons.accountCheck : strings.icons.account,
      expirationDate: isValid ? strings.icons.calendarCheck : strings.icons.calendarAlert,
      cvv: isValid ? strings.icons.shieldCheck : strings.icons.shieldAlert,
    };
    return iconMap[field];
  };

  return (
    <BaseScreen>
      <ActivityOverlay isVisible={isLoading} color={colors.secondary} />
      <Text variant="titleSmall">
        {strings.payment.basketItemCount} {totalCount}
      </Text>
      <View style={styles.totalContainer}>
        <Text variant="titleSmall">
          {strings.payment.total} ${Number.isNaN(total) ? '0.00' : total.toFixed(2)}
        </Text>
      </View>

      <View style={styles.formContainer}>
        <Controller
          control={control}
          rules={validationRules.cardholderName}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              label={strings.payment.cardholderName}
              placeholder={strings.payment.cardholderNamePlaceholder}
              errorObject={errors.cardholderName}
              right={
                <TextInput.Icon
                  icon={getIcon('cardholderName', errors)}
                  color={errors.cardholderName ? colors.error : colors.primary}
                />
              }
            />
          )}
          name="cardholderName"
        />

        <Controller
          control={control}
          rules={validationRules.creditCardNumber}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              label={strings.payment.creditCardNumber}
              placeholder={strings.payment.creditCardPlaceholder}
              maxLength={16}
              keyboardType="numeric"
              errorObject={errors.creditCardNumber}
              right={
                <TextInput.Icon
                  icon={getIcon('creditCardNumber', errors)}
                  color={errors.creditCardNumber ? colors.error : colors.primary}
                />
              }
            />
          )}
          name="creditCardNumber"
        />

        <Controller
          control={control}
          rules={validationRules.expirationDate}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChangeText={(text) => onChange(formatExpirationDate(text))}
              label={strings.payment.expirationDate}
              placeholder={strings.payment.expirationDatePlaceholder}
              maxLength={5}
              keyboardType="numeric"
              errorObject={errors.expirationDate}
              right={
                <TextInput.Icon
                  icon={getIcon('expirationDate', errors)}
                  color={errors.expirationDate ? colors.error : colors.primary}
                />
              }
            />
          )}
          name="expirationDate"
        />

        <Controller
          control={control}
          rules={validationRules.cvv}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChangeText={(text) => onChange(filterNumericInput(text))}
              label={strings.payment.cvv}
              placeholder={strings.payment.cvv}
              maxLength={3}
              keyboardType="numeric"
              errorObject={errors.cvv}
              right={
                <TextInput.Icon icon={getIcon('cvv', errors)} color={errors.cvv ? colors.error : colors.primary} />
              }
            />
          )}
          name="cvv"
        />
      </View>

      <View style={styles.bottomContainer}>
        <Button
          icon="cart-arrow-down"
          mode="contained"
          onPress={handleSubmit(onPlaceOrder)}
          disabled={basketItems.length === 0 || isLoading}
        >
          {strings.buttons.order}
        </Button>
      </View>
    </BaseScreen>
  );
};

export default PaymentScreen;
