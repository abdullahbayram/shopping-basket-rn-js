import React from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/atoms/Button/Button';
import Text from '../../components/atoms/Text/Text';
import Screen from '../../components/templetes/Screen';
import Input from '../../components/atoms/Input/Input';
import ProductCard from '../../components/molecules/ProductCard/ProductCard';
import { removeItemFromBasket, clearBasket } from '../../redux/slices/basketSlice';
import validateCreditCard from '../../utils/validateCreditCard'; //
import { usePlaceOrderMutation } from '../../redux/api/apiSlice';

const CREDIT_CARD_CHECK = 'credit-card-check';
const CREDIT_CARD = 'credit-card';

const CheckoutScreen = () => {
  const items = useSelector((state) => state.basket?.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const dispatch = useDispatch();
  const [creditCardNumber, setCreditCardNumber] = React.useState('');
  const [isCreditCardValid, setIsCreditCardValid] = React.useState(false);

  const [placeOrder, { isLoading, isSuccess, isError, error }] = usePlaceOrderMutation();
  const onRemoveItem = (item) => {
    dispatch(removeItemFromBasket(item.sku));
  };

  const onPlaceOrder = async () => {
    if (!isCreditCardValid) {
      Alert.alert('Invalid Credit Card', 'Please enter a valid credit card number.');
    } else {
      try {
        const response = await placeOrder({
          basket: items,
          cardNumber: creditCardNumber,
        }).unwrap();
        if (isSuccess) {
          Alert.alert('Order Success', response.msg);
          dispatch(clearBasket());
          setCreditCardNumber('');
        }
        if (isError) {
          console.log(error);
          Alert.alert('Error', error);
        }
      } catch (err) {
        Alert.alert('Order Failed', err?.data || 'Failed to place order');
      }
    }
    // Dispatch an action to place the order, dispatch(placeOrder(items, creditCardNumber));
  };

  console.log(isCreditCardValid, 'isCreditCardValid');

  React.useEffect(() => {
    setIsCreditCardValid(validateCreditCard(creditCardNumber));
  }, [creditCardNumber]);

  return (
    <Screen>
      <Text variant="titleMedium">Items in the basket: {items.length}</Text>

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
          />
        )}
        keyExtractor={(item) => item.sku}
      />

      <View style={styles.totalContainer}>
        <Text variant="titleMedium">Total: ${total.toFixed(2)}</Text>
      </View>

      <Input
        value={creditCardNumber}
        onChangeText={setCreditCardNumber}
        icon={isCreditCardValid ? CREDIT_CARD_CHECK : CREDIT_CARD}
        label="Credit Card"
        placeholder="Enter your credit card number"
        maxLength={16} // Restrict the input to 16 characters
        keyboardType="numeric" // Ensure numeric keyboard input for mobile devices
      />

      <Button
        icon="cart-arrow-down"
        mode="contained"
        onPress={onPlaceOrder}
        disabled={items.length === 0 || !isCreditCardValid || isLoading}
      >
        ORDER
      </Button>
    </Screen>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  totalContainer: {
    marginVertical: 16,
  },
});
