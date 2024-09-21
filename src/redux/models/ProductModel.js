import ProductEffects from '../effects/ProductEffects';

export const initialState = {
  products: [],
  basket: [],
};

export default {
  namespace: 'product',
  state: initialState,
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
    addItemToBasket(state, { payload }) {
      return {
        ...state,
        ...{
          basket: [...state.basket, ...[payload]],
        },
      };
    },
  },
  effects: ProductEffects,
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'fetchProducts' });
    },
  },
};
