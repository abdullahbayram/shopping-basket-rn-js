import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/atoms/Button/Button';
import Text from '../../components/atoms/Text/Text';
import Screen from '../../components/templetes/Screen';
import Input from '../../components/atoms/Input/Input';
import ProductCard from '../../components/molecules/ProductCard/ProductCard';
import { removeItemFromBasket, clearBasket, updateItemQuantity, setDiscount } from '../../redux/slices/basketSlice';
import validateCreditCard from '../../utils/validateCreditCard'; //
import { usePlaceOrderMutation, useValidatePromoCodeMutation } from '../../redux/api/apiSlice';
import { selectBasketItems, selectTotalItemCount, selectTotalPrice } from '../../redux/selectors/basketSelector';
import validateBasket from '../../utils/validateBasket';
import showToast from '../../utils/showToast';
import messages from '../../constants/strings';

const CREDIT_CARD_CHECK = 'credit-card-check';
const CREDIT_CARD = 'credit-card';

const CheckoutScreen = ({ navigation }) => {
  const items = useSelector(selectBasketItems);
  const totalCount = useSelector(selectTotalItemCount);
  const dispatch = useDispatch();
  const [creditCardNumber, setCreditCardNumber] = React.useState('');
  const [promoCode, setPromoCode] = React.useState('');
  const [isCreditCardValid, setIsCreditCardValid] = React.useState(false);
  const total = useSelector(selectTotalPrice);

  const [placeOrder, { isLoading, isSuccess }] = usePlaceOrderMutation();
  const [validatePromoCode] = useValidatePromoCodeMutation();

  const onRemoveItem = (item) => {
    dispatch(removeItemFromBasket(item.sku));
  };

  const onPlaceOrder = async () => {
    if (!validateBasket(items)) {
      showToast(messages.basketError);
      return;
    }
    if (!isCreditCardValid) {
      showToast(messages.invalidCard);
    } else {
      try {
        await placeOrder({
          basket: items,
          cardNumber: creditCardNumber,
        }).unwrap();

        if (isSuccess) {
          dispatch(clearBasket());
          setCreditCardNumber('');
          navigation.navigate('Success');
        }
      } catch (err) {
        const errorMessage =
          Array.isArray(err?.data?.errors) && err?.data?.errors.length > 0
            ? err?.data?.errors[0].msg
            : 'An unexpected error occurred. Please try again later.';
        navigation.navigate('Error', { errorMessage });
      }
    }
  };

  const onApplyPromoCode = async () => {
    try {
      const response = await validatePromoCode(promoCode).unwrap();
      if (response?.amount) {
        dispatch(setDiscount(response.amount));
        showToast(messages.promoSuccess);
      } else {
        showToast(messages.invalidPromo);
      }
    } catch (err) {
      showToast(messages.promoError);
    }
  };

  const onQuantityChange = (item, newQuantity) => {
    dispatch(updateItemQuantity({ sku: item.sku, quantity: newQuantity }));
  };

  React.useEffect(() => {
    setIsCreditCardValid(validateCreditCard(creditCardNumber));
  }, [creditCardNumber]);

  return (
    <Screen>
      <Text variant="titleMedium">Items in the basket: {totalCount}</Text>

      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ProductCard
            key={item?.sku}
            title={item.name}
            subtitle={`${item.description} (x${item.quantity})`}
            buttonTitle="Remove Item"
            price={`${(item.price * item.quantity).toFixed(2)}`}
            onButtonPress={() => onRemoveItem(item)}
            keyExtractor={() => item.sku}
            quantity={item.quantity}
            onQuantityChange={(newQuantity) => onQuantityChange(item, newQuantity)}
          />
        )}
        keyExtractor={(item) => item.sku}
      />

      <View style={styles.totalContainer}>
        <Text variant="titleMedium">Total: ${total.toFixed(2)}</Text>
      </View>

      <View style={styles.bottomContainer}>
        <Input
          value={promoCode}
          onChangeText={setPromoCode}
          label="Promo Code"
          placeholder="Enter your promo code"
          keyboardType="default"
          icon="percent"
        />

        <Button icon="sack-percent" onPress={() => onApplyPromoCode()} mode="contained">
          APPLY PROMO CODE
        </Button>

        <Input
          value={creditCardNumber}
          onChangeText={setCreditCardNumber}
          icon={isCreditCardValid ? CREDIT_CARD_CHECK : CREDIT_CARD}
          label="Credit Card"
          placeholder="Enter your credit card number"
          maxLength={16}
          keyboardType="numeric"
        />

        <Button
          icon="cart-arrow-down"
          mode="contained"
          onPress={onPlaceOrder}
          disabled={items.length === 0 || !isCreditCardValid || isLoading}
        >
          ORDER
        </Button>
      </View>
    </Screen>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  totalContainer: {
    marginVertical: 16,
  },
  bottomContainer: {
    height: 275,
  },
});
