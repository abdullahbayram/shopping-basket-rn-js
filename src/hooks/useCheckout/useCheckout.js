import { useDispatch } from 'react-redux';
import { removeItemFromBasket, updateItemQuantity, setDiscount } from '@redux/slices/basketSlice';
import { useValidatePromoCodeMutation } from '@redux/api/apiSlice';
import useBasket from '@hooks/useBasket/useBasket';
import { showToast } from '@utils';
import { toastMessages } from '@constants';

const useCheckout = () => {
  const dispatch = useDispatch();
  const { basketItems, totalItemCount, totalPrice } = useBasket();
  const [validatePromoCode, { isLoading }] = useValidatePromoCodeMutation();

  const isBasketEmpty = basketItems.length === 0;

  const onRemoveItem = (item) => dispatch(removeItemFromBasket(item.id));

  const onApplyPromoCode = async (promoCode) => {
    try {
      const { amount } = await validatePromoCode(promoCode).unwrap();
      if (amount) {
        dispatch(setDiscount(amount));
        showToast(toastMessages.promo.success);
      } else {
        showToast(toastMessages.promo.invalid);
      }
    } catch (err) {
      const errorMsg = err?.message || toastMessages.promo.error;
      showToast({ ...toastMessages.promo.error, message: errorMsg });
    }
  };

  const onQuantityChange = (item, newQuantity) => dispatch(updateItemQuantity({ id: item.id, quantity: newQuantity }));

  return {
    basketItems,
    totalItemCount,
    totalPrice,
    isBasketEmpty,
    isLoading,
    onRemoveItem,
    onApplyPromoCode,
    onQuantityChange,
  };
};

export default useCheckout;
