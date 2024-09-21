import { baseUrl, checkout, products } from '../../constants/urls';

export default {
  *fetchProducts(_, { call, put }) {
    try {
      const response = yield call(() => fetch(baseUrl + products));
      if (response.ok) {
        const json = yield call(() => response.json());
        yield put({
          type: 'updateState',
          payload: {
            products: json,
          },
        });
      }
      return { status: true };
    } catch (e) {
      console.log('fetchProducts error: ', e);
    }
    return { status: false };
  },
  *checkout({ payload }, { call, put }) {
    try {
      const response = yield call(() =>
        fetch(baseUrl + checkout, {
          method: 'post',
          body: JSON.stringify(payload),
        }),
      );
      if (response.ok) {
        const json = yield call(() => response.json());
        yield put({
          type: 'updateState',
          payload: {
            products: json,
          },
        });
      }
      return { status: true };
    } catch (e) {
      console.log('checkout error: ', e);
    }
    return { status: false };
  },
};
