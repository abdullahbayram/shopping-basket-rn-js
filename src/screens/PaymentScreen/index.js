import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useTheme } from 'react-native-paper';
import { Button } from '@components/atoms';
import { ActivityOverlay } from '@components/molecules';
import { BaseScreen } from '@components/templates';
import { clearBasket, clearDiscount } from '@redux/slices/basketSlice';
import { usePlaceOrderMutation } from '@redux/api/apiSlice';
import { selectBasketItems, selectTotalItemCount, selectTotalPrice } from '@redux/selectors/basketSelector';
import { showToast, paymentUtils } from '@utils';
import { toastMessages, strings } from '@constants';
import { checkCreditCardWithCardValidator, validateBasket } from '@validate';
import styles from './PaymentScreen.style';
import { BasketSummary, PaymentForm } from './components';

const DEFAULT_FORM_VALUES = {
  creditCardNumber: '5566561551349323',
  cardholderName: '',
  expirationDate: '',
  cvv: '',
};

const PaymentScreen = ({ navigation }) => {
  const dispatch = useDispatch();
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

  const { basketItems, totalCount, total } = useSelector((state) => ({
    basketItems: selectBasketItems(state),
    totalCount: selectTotalItemCount(state),
    total: selectTotalPrice(state),
  }));

  const [placeOrder, { isLoading }] = usePlaceOrderMutation();
  const isOrderDisabled = basketItems.length === 0 || isLoading;

  const navigateToError = (errorMessage) => {
    navigate(strings.screens.error, { errorMessage });
  };

  const navigateToSuccess = () => {
    navigate(strings.screens.success);
  };

  const isCreditCardValid = useMemo(() => checkCreditCardWithCardValidator(watch('creditCardNumber')), [watch]);

  const handleOrderError = (err) => {
    const errorMessage = paymentUtils.parseErrorMessage(err);
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
      handleOrderError(err);
    }
  };

  return (
    <BaseScreen>
      <ActivityOverlay isVisible={isLoading} color={colors.secondary} />
      <BasketSummary totalCount={totalCount} total={total} />
      <PaymentForm control={control} errors={errors} isCreditCardValid={isCreditCardValid} />
      <View style={styles.bottomContainer}>
        <Button icon="cart-arrow-down" mode="contained" onPress={handleSubmit(onPlaceOrder)} disabled={isOrderDisabled}>
          {strings.buttons.order}
        </Button>
      </View>
    </BaseScreen>
  );
};

export default PaymentScreen;
