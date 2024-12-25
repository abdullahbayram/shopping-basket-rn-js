import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useTheme } from 'react-native-paper';
import { Button, Text, TextInput } from '@components/atoms';
import { ActivityOverlay, ControlledInput } from '@components/molecules';
import { BaseScreen } from '@components/templates';
import { clearBasket, clearDiscount } from '@redux/slices/basketSlice';
import { usePlaceOrderMutation } from '@redux/api/apiSlice';
import { selectBasketItems, selectTotalItemCount, selectTotalPrice } from '@redux/selectors/basketSelector';
import { showToast, paymentUtils } from '@utils';
import { toastMessages, strings } from '@constants';
import { checkCreditCardWithCardValidator, validationRules, validateBasket } from '@validate';
import styles from './PaymentScreen.style';

const DEFAULT_FORM_VALUES = {
  creditCardNumber: '',
  cardholderName: '',
  expirationDate: '',
  cvv: '',
};

const PaymentScreen = ({ navigation }) => {
  const { navigate } = navigation;
  const { colors } = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const navigateToError = (errorMessage) => {
    navigate(strings.screens.error, { errorMessage });
  };

  const navigateToSuccess = () => {
    navigate(strings.screens.success);
  };

  const { basketItems, totalCount, total } = useSelector((state) => ({
    basketItems: selectBasketItems(state),
    totalCount: selectTotalItemCount(state),
    total: selectTotalPrice(state),
  }));

  const dispatch = useDispatch();

  const isCreditCardValid = useMemo(() => checkCreditCardWithCardValidator(watch('creditCardNumber')), [watch]);

  const [placeOrder, { isLoading }] = usePlaceOrderMutation();

  const handleOrderError = (err) => {
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

    navigateToError(errorMessage);
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
      if (response) {
        dispatch(clearBasket());
        dispatch(clearDiscount());
        reset();
        navigateToSuccess();
      }
    } catch (err) {
      console.log(err, 'err2');
      handleOrderError(err);
    }
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
