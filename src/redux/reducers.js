export default function reducer(state = {}, action = '') {
  console.log('Action received:', action);
  switch (action.type) {
    case 'INCREMENT':
      console.log('Item count before increment:', state.itemCount);
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
