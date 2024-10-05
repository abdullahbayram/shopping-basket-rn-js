const defaultState = { itemCount: 0 };

export default function reducer(state = defaultState, action = '') {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        itemCount: state.itemCount + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        itemCount: state.itemCount > 0 ? state.itemCount - 1 : 0,
      };
    default:
      return state;
  }
}
