import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import Button from '../../components/atoms/Button/Button';
import Text from '../../components/atoms/Text/Text';
import Screen from '../../components/templetes/Screen/Screen';
import Input from '../../components/molecules/Input/Input';
import { clearBasket } from '../../redux/slices/basketSlice';
import validateCreditCard from '../../utils/validateCreditCard';
import { usePlaceOrderMutation } from '../../redux/api/apiSlice';
import { selectBasketItems, selectTotalItemCount, selectTotalPrice } from '../../redux/selectors/basketSelector';
import validateBasket from '../../utils/validateBasket';
import showToast from '../../utils/showToast';
import messages from '../../constants/strings';

const CREDIT_CARD_CHECK = 'credit-card-check';
const CREDIT_CARD = 'credit-card';
const DEFAULT_ERROR_MESSAGE = 'An unexpected error occurred. Please try again later.';

const PaymentScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      creditCardNumber: '',
      cardholderName: '',
      expirationDate: '',
      cvv: '',
    },
  });

  const basketItems = useSelector(selectBasketItems);
  const totalCount = useSelector(selectTotalItemCount);
  const dispatch = useDispatch();
  const creditCardValue = watch('creditCardNumber');
  const isCreditCardValid = validateCreditCard(creditCardValue);
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
            navigation.navigate('Success');
          }
        })
        .catch((err) => {
          const errorMessage =
            Array.isArray(err?.data?.errors) && err?.data?.errors.length > 0
              ? err?.data?.errors[0].msg
              : DEFAULT_ERROR_MESSAGE;
          navigation.navigate('Error', { errorMessage });
        });
    } catch (err) {
      const errorMessage = DEFAULT_ERROR_MESSAGE;
      navigation.navigate('Error', { errorMessage });
    }
  };

  return (
    <Screen>
      <Text variant="titleMedium">Items in the basket: {totalCount}</Text>
      <View style={styles.totalContainer}>
        <Text variant="titleMedium">Total: ${total.toFixed(2)}</Text>
      </View>

      <View style={styles.formContainer}>
        {/* Cardholder Name */}
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
            />
          )}
          name="cardholderName"
        />
        {errors.cardholderName && <Text>{errors.cardholderName.message}</Text>}

        <Controller
          control={control}
          rules={{
            required: 'Credit card number is required',
            validate: {
              isExactLength: (value) => /^[0-9]{16}$/.test(value) || 'Credit card must be 16 digits',
              isValidCreditCard: (value) => validateCreditCard(value) || 'Invalid credit card number',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              icon={isCreditCardValid ? CREDIT_CARD_CHECK : CREDIT_CARD}
              label="Credit Card Number"
              placeholder="Enter your credit card number"
              maxLength={16}
              keyboardType="numeric"
            />
          )}
          name="creditCardNumber"
        />
        {errors.creditCardNumber && <Text>{errors.creditCardNumber.message}</Text>}

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
            />
          )}
          name="expirationDate"
        />
        {errors.expirationDate && <Text>{errors.expirationDate.message}</Text>}

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
              onChangeText={onChange}
              label="CVV"
              placeholder="CVV"
              maxLength={3}
              keyboardType="numeric"
            />
          )}
          name="cvv"
        />
        {errors.cvv && <Text>{errors.cvv.message}</Text>}
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
