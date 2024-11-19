import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import Button from '../../components/atoms/Button/Button';
import Text from '../../components/atoms/Text/Text';
import Screen from '../../components/templetes/Screen/Screen';
import Input from '../../components/molecules/Input/Input';
import { removeItemFromBasket, updateItemQuantity, setDiscount } from '../../redux/slices/basketSlice';
import { useValidatePromoCodeMutation } from '../../redux/api/apiSlice';
import { selectBasketItems, selectTotalItemCount, selectTotalPrice } from '../../redux/selectors/basketSelector';
import validateBasket from '../../utils/validateBasket';
import showToast from '../../utils/showToast';
import messages from '../../constants/strings';
import CheckoutList from '../../components/organisms/CheckoutList/CheckoutList';

const CheckoutScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      promoCode: '',
    },
  });

  const basketItems = useSelector(selectBasketItems);
  const isBasketEmtpy = basketItems.length === 0;
  const totalCount = useSelector(selectTotalItemCount);
  const dispatch = useDispatch();
  const total = useSelector(selectTotalPrice);

  const [validatePromoCode] = useValidatePromoCodeMutation();

  const onRemoveItem = (item) => {
    dispatch(removeItemFromBasket(item.id));
  };

  const onOrderPress = () => {
    if (!validateBasket(basketItems)) {
      showToast(messages.basketError);
      return;
    }
    navigation.navigate('Payment');
  };

  const onApplyPromoCode = async (data) => {
    console.log(data);
    try {
      const response = await validatePromoCode(data.promoCode).unwrap();
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
    dispatch(updateItemQuantity({ id: item.id, quantity: newQuantity }));
  };

  return (
    <Screen>
      <Text variant="titleMedium">Items in the basket: {totalCount}</Text>

      <CheckoutList
        products={basketItems}
        onQuantityChange={onQuantityChange}
        basketItems={basketItems}
        onRemoveItem={onRemoveItem}
      />

      <View style={styles.totalContainer}>
        <Text variant="titleMedium">Total: ${total.toFixed(2)}</Text>
      </View>

      <View style={styles.bottomContainer}>
        <View>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                {...register('promoCode', {
                  required: 'Promo code can not be empty',
                  pattern: { value: /^A([\d]{1,2})$/, message: 'This promo code is not valid' },
                })}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                label="Promo Code"
                placeholder="Enter your promo code"
                keyboardType="default"
                right={<TextInput.Icon icon="percent" color={errors.promoCode ? colors.error : colors.primary} />}
                errorObject={errors.promoCode}
              />
            )}
            name="promoCode"
          />

          <Button icon="sack-percent" onPress={handleSubmit(onApplyPromoCode)} mode="contained">
            APPLY PROMO CODE
          </Button>
        </View>

        <Button icon="cart-arrow-down" mode="contained" onPress={onOrderPress} disabled={isBasketEmtpy}>
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
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
});
