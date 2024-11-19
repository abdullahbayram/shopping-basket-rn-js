import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import Button from '../../components/atoms/Button/Button';
import Text from '../../components/atoms/Text/Text';
import Screen from '../../components/templetes/Screen';
import Input from '../../components/atoms/Input/Input';
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
    },
  });

  console.log(errors, 'errors');

  const basketItems = useSelector(selectBasketItems);
  const totalCount = useSelector(selectTotalItemCount);
  const dispatch = useDispatch();
  const creditCardValue = watch('creditCardNumber');
  const isCreditCardValid = validateCreditCard(creditCardValue);
  const total = useSelector(selectTotalPrice);

  const [placeOrder, { isLoading }] = usePlaceOrderMutation();

  const onPlaceOrder = async (data) => {
    console.log(data, 'onPlaceOrder');
    if (!validateBasket(basketItems)) {
      showToast(messages.basketError);
      return;
    }
    try {
      await placeOrder({
        basket: basketItems,
        cardNumber: data.creditCardNumber,
      })
        .unwrap()
        .then((response) => {
          if (response) {
            dispatch(clearBasket());
            // TODO clear hook promo form and creditcard
            navigation.navigate('Success');
          }
        })
        .catch((err) => {
          console.log('err', err);
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

      <View style={styles.bottomContainer}>
        <Controller
          control={control}
          rules={{
            required: 'Credit card can not be empty',
            validate: {
              isExactLength: (value) => /^[0-9]{16}$/.test(value) || 'Credit card must be 16 digits',
              isValidCreditCard: (value) => validateCreditCard(value) || 'Credit card number is invalid',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              icon={isCreditCardValid ? CREDIT_CARD_CHECK : CREDIT_CARD}
              label="Credit Card"
              placeholder="Enter your credit card number"
              maxLength={16}
              keyboardType="numeric"
            />
          )}
          name="creditCardNumber"
        />
        {errors.creditCardNumber && <Text>{errors.creditCardNumber.message}</Text>}

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
  bottomContainer: {
    height: 275,
  },
});
