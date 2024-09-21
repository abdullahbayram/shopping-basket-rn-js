export const initialState = {
  basket: [],
};

export default {
  namespace: 'checkout',
  state: initialState,
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {},
};
