import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/atoms/Button/Button';
import Text from '../../components/atoms/Text/Text';
import Card from '../../components/molecules/ProductCard/ProductCard';
import Screen from '../../components/templetes/Screen';
import Input from '../../components/atoms/Input/Input';
import { increment } from '../../redux/slices/counterSlice';

const CREDIT_CARD_CHECK = 'credit-card-check';
const CREDIT_CARD = 'credit-card';

const CheckoutScreen = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  const [creditCardNumber, setCreditCardNumber] = React.useState('');
  const [isCreditCardValid] = React.useState(false);
  return (
    <Screen>
      <Text variant="titleMedium">Items in the basket: {count}</Text>
      <Card title="Product One" subtitle="Product One Description" buttonTitle="Remove Item" price="$1" />
      <Input
        value={creditCardNumber}
        onChangeText={setCreditCardNumber}
        icon={isCreditCardValid ? CREDIT_CARD_CHECK : CREDIT_CARD}
        label="Credit Card"
      />
      <Button icon="cart-arrow-down" mode="contained" onPress={() => dispatch(increment())}>
        ORDER
      </Button>
    </Screen>
  );
};

export default CheckoutScreen;
