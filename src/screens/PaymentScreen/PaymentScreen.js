import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useTheme } from 'react-native-paper';
import Button from '../../components/atoms/Button/Button';
import Text from '../../components/atoms/Text/Text';
import Screen from '../../components/templetes/Screen/Screen';
import Input from '../../components/molecules/Input/Input';
import TextInput from '../../components/atoms/TextInput/TextInput';
import { clearBasket, clearDiscount } from '../../redux/slices/basketSlice';
import { usePlaceOrderMutation } from '../../redux/api/apiSlice';
import { selectBasketItems, selectTotalItemCount, selectTotalPrice } from '../../redux/selectors/basketSelector';
import validateBasket from '../../utils/validateBasket';
import showToast from '../../utils/showToast';
import messages from '../../constants/strings';
import ActivityOverlay from '../../components/molecules/ActivityOverlay/ActivityOverlay';
import checkCreditCardWithCardValidator from '../../utils/checkCreditCardWithCardValidator';

const CREDIT_CARD_CHECK = 'credit-card-check';
const CREDIT_CARD = 'credit-card';
const DEFAULT_ERROR_MESSAGE = 'An unexpected error occurred. Please try again later.';

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

  const basketItems = useSelector(selectBasketItems);
  const totalCount = useSelector(selectTotalItemCount);
  const dispatch = useDispatch();
  const creditCardValue = watch('creditCardNumber');
  const isCreditCardValid = checkCreditCardWithCardValidator(creditCardValue);
  const total = useSelector(selectTotalPrice);

  const [placeOrder, { isLoading }] = usePlaceOrderMutation();

  const onPlaceOrder = async (data) => {
    if (!validateBasket(basketItems)) {
      showToast(messages.basketError);
      return;
    }
    try {
      await placeOrder({
        basket: basketItems,
        cardNumber: data.creditCardNumber,
        cardholderName: data.cardholderName,
        expirationDate: data.expirationDate,
        cvv: data.cvv,
      })
        .unwrap()
        .then((response) => {
          if (response) {
            dispatch(clearBasket());
            dispatch(clearDiscount());
            reset();
            navigation.navigate('Success');
          }
        })
        .catch((err) => {
          console.log(err);
          const errorMessage =
            Array.isArray(err?.data?.errors) && err?.data?.errors.length > 0
              ? err?.data?.errors[0].msg
              : err?.msg || DEFAULT_ERROR_MESSAGE;
          navigation.navigate('Error', { errorMessage });
        });
    } catch (err) {
      const errorMessage = DEFAULT_ERROR_MESSAGE;
      console.log(err);
      navigation.navigate('Error', { errorMessage });
    }
  };

  return (
    <Screen>
      <ActivityOverlay isVisible={isLoading} color={colors.secondary} />
      <Text variant="titleMedium">Items in the basket: {totalCount}</Text>
      <View style={styles.totalContainer}>
        <Text variant="titleMedium">Total: ${total.toFixed(2)}</Text>
      </View>

      <View style={styles.formContainer}>
        <Controller
          control={control}
          rules={{
            required: 'Cardholder name is required',
            minLength: { value: 3, message: 'Name must be at least 3 characters' },
          }}
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
                  icon={!errors.cardholderName ? 'account-check' : 'account'}
                  color={errors.cardholderName ? colors.error : colors.primary}
                />
              }
            />
          )}
          name="cardholderName"
        />

        <Controller
          control={control}
          rules={{
            required: 'Credit card number is required',
            validate: {
              isValidCreditCard: (value) => checkCreditCardWithCardValidator(value) || 'Invalid credit card number',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              label="Credit Card Number"
              placeholder="Enter your credit card number"
              maxLength={16}
              keyboardType="numeric"
              right={
                <TextInput.Icon
                  icon={isCreditCardValid ? CREDIT_CARD_CHECK : CREDIT_CARD}
                  color={errors.creditCardNumber ? colors.error : colors.primary}
                />
              }
              errorObject={errors.creditCardNumber}
            />
          )}
          name="creditCardNumber"
        />

        <Controller
          control={control}
          rules={{
            required: 'Expiration date is required',
            pattern: {
              value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
              message: 'Invalid expiration date (MM/YY)',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              label="Expiration Date"
              placeholder="MM/YY"
              maxLength={5}
              keyboardType="numeric"
              errorObject={errors.expirationDate}
              right={
                <TextInput.Icon
                  icon={!errors.expirationDate ? 'calendar-check' : 'calendar-alert'}
                  color={errors.expirationDate ? colors.error : colors.primary}
                />
              }
            />
          )}
          name="expirationDate"
        />

        <Controller
          control={control}
          rules={{
            required: 'CVV is required',
            minLength: { value: 3, message: 'CVV must be 3 digits' },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChangeText={(text) => {
                // Filter input to allow only numeric characters
                const numericValue = text.replace(/[^0-9]/g, '');
                onChange(numericValue);
              }}
              label="CVV"
              placeholder="CVV"
              maxLength={3}
              keyboardType="numeric"
              errorObject={errors.cvv}
              right={
                <TextInput.Icon
                  icon={!errors.cvv ? 'shield-check' : 'shield-alert'}
                  color={errors.cvv ? colors.error : colors.primary}
                />
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
          ORDER
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
    height: 275,
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
});
