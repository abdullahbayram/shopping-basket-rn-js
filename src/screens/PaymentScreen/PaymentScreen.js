import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useTheme } from 'react-native-paper';
import Button from '../../components/atoms/Button';
import Text from '../../components/atoms/Text';
import Screen from '../../components/templetes/Screen/Screen';
import Input from '../../components/molecules/Input/Input';
import TextInput from '../../components/atoms/TextInput';
import { clearBasket, clearDiscount } from '../../redux/slices/basketSlice';
import { usePlaceOrderMutation } from '../../redux/api/apiSlice';
import { selectBasketItems, selectTotalItemCount, selectTotalPrice } from '../../redux/selectors/basketSelector';
import validateBasket from '../../validate/validateBasket';
import showToast from '../../utils/showToast';
import messages from '../../constants/alertMessages';
import ActivityOverlay from '../../components/molecules/ActivityOverlay/ActivityOverlay';
import checkCreditCardWithCardValidator from '../../validate/checkCreditCardWithCardValidator';
import strings from '../../constants/strings';
import validationRules from '../../validate/validationRules';

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
      creditCardNumber: '4539456463019519', // 4539456463019519 4929718047638157
      cardholderName: 'ABD',
      expirationDate: '12/12',
      cvv: '111',
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
    let errorMessage = strings.unexpectedError; // Default error message

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
      console.error('Failed to parse error message:', e);
    }

    navigation.navigate('Error', { errorMessage });
  };

  const onPlaceOrder = async (data) => {
    if (!validateBasket(basketItems)) {
      showToast(messages.basketError);
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
        navigation.navigate('Success');
      }
    } catch (err) {
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
      cardholderName: isValid ? 'account-check' : 'account',
      expirationDate: isValid ? 'calendar-check' : 'calendar-alert',
      cvv: isValid ? 'shield-check' : 'shield-alert',
    };
    return iconMap[field];
  };

  return (
    <Screen>
      <ActivityOverlay isVisible={isLoading} color={colors.secondary} />
      <Text variant="titleMedium">
        {strings.basketItemCount} {totalCount}
      </Text>
      <View style={styles.totalContainer}>
        <Text variant="titleMedium">
          {strings.total} ${Number.isNaN(total) ? '0.00' : total.toFixed(2)}
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
              label="Cardholder Name"
              placeholder="Enter the name on your card"
              errorObject={errors.cardholderName}
              right={
                <TextInput.Icon
                  icon={getIcon('cardholderName', errors)}
                  color={errors.cardholderName ? colors.error : colors.primary}
                />
              }
              accessibilityLabel="Cardholder Name"
              accessibilityHint="Enter the name as it appears on your credit card"
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
              label="Credit Card Number"
              placeholder="Enter your credit card number"
              maxLength={16}
              keyboardType="numeric"
              errorObject={errors.creditCardNumber}
              right={
                <TextInput.Icon
                  icon={getIcon('creditCardNumber', errors)}
                  color={errors.creditCardNumber ? colors.error : colors.primary}
                />
              }
              accessibilityLabel="Credit Card Number"
              accessibilityHint="Enter the number on your credit card"
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
              label="Expiration Date"
              placeholder="MM/YY"
              maxLength={5}
              keyboardType="numeric"
              errorObject={errors.expirationDate}
              right={
                <TextInput.Icon
                  icon={getIcon('expirationDate', errors)}
                  color={errors.expirationDate ? colors.error : colors.primary}
                />
              }
              accessibilityLabel="Expiration Date"
              accessibilityHint="Enter the card's expiration date in MM/YY format"
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
              label="CVV"
              placeholder="CVV"
              maxLength={3}
              keyboardType="numeric"
              errorObject={errors.cvv}
              right={
                <TextInput.Icon icon={getIcon('cvv', errors)} color={errors.cvv ? colors.error : colors.primary} />
              }
              accessibilityLabel="CVV"
              accessibilityHint="Enter the 3-digit security code on the back of your card"
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
          {strings.order}
        </Button>
      </View>
    </Screen>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  totalContainer: {
    marginVertical: 16,
  },
  formContainer: {
    marginBottom: 16,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
});
