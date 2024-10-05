import counterReducer, { increment, decrement, setCount } from './counterSlice';

describe('counter slice', () => {
  const initialState = { count: 0 };

  it('should return the initial state when passed an empty action', () => {
    const result = counterReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should increment the count', () => {
    const nextState = counterReducer(initialState, increment());
    expect(nextState.count).toEqual(1);
  });

  it('should decrement the count', () => {
    const nextState = counterReducer({ count: 1 }, decrement());
    expect(nextState.count).toEqual(0);
  });

  it('should set the count to a specific value', () => {
    const nextState = counterReducer(initialState, setCount(10));
    expect(nextState.count).toEqual(10);
  });
});
