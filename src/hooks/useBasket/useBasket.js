import { useSelector } from 'react-redux';
import { selectBasketItems, selectTotalItemCount, selectTotalPrice } from '@redux/selectors/basketSelector';

const useBasket = () => {
  const basketItems = useSelector(selectBasketItems);
  const totalItemCount = useSelector(selectTotalItemCount);
  const totalPrice = useSelector(selectTotalPrice);

  return { basketItems, totalItemCount, totalPrice };
};

export default useBasket;
