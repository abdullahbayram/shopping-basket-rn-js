import reducer from './reducers';

describe('Reducer Tests', () => {
  let initialState;

  beforeEach(() => {
    initialState = { itemCount: 0 };
  });

  it('should return the initial state when no action is provided', () => {
    const state = reducer(undefined, undefined);
    expect(state).toEqual({ itemCount: 0 });
  });

  it('should handle INCREMENT action', () => {
    const action = { type: 'INCREMENT' };
    const state = reducer(initialState, action);

    expect(state.itemCount).toBe(1);
  });

  it('should handle multiple INCREMENT actions', () => {
    const action = { type: 'INCREMENT' };
    const stateAfterFirstIncrement = reducer(initialState, action);
    const stateAfterSecondIncrement = reducer(stateAfterFirstIncrement, action);

    expect(stateAfterSecondIncrement.itemCount).toBe(2);
  });

  it('should handle DECREMENT action', () => {
    const action = { type: 'DECREMENT' };
    const state = reducer({ itemCount: 2 }, action);

    expect(state.itemCount).toBe(1);
  });

  it('should not decrement itemCount below 0', () => {
    const action = { type: 'DECREMENT' };
    const state = reducer(initialState, action);

    expect(state.itemCount).toBe(0);
  });

  it('should return the current state for unknown action types', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const state = reducer(initialState, action);

    expect(state).toEqual(initialState);
  });
});
