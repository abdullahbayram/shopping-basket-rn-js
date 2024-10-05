import { takeEvery, all } from 'redux-saga/effects';
import { runSaga } from 'redux-saga';
import rootSaga, { watchIncrementAsync, incrementAsync } from './sagas';

jest.useFakeTimers();

describe('rootSaga', () => {
  it('should run all sagas', () => {
    const gen = rootSaga();

    // Check if the saga is running all other sagas
    expect(gen.next().value).toEqual(all([watchIncrementAsync()]));
  });
});

describe('watchIncrementAsync Saga', () => {
  it('should listen for INCREMENT_ASYNC and trigger incrementAsync', () => {
    const gen = watchIncrementAsync();

    // Check if takeEvery is listening for INCREMENT_ASYNC
    expect(gen.next().value).toEqual(takeEvery('INCREMENT_ASYNC', incrementAsync));
  });
});

describe('incrementAsync Saga', () => {
  it('should wait 1 second and then dispatch INCREMENT', async () => {
    const dispatchedActions = [];

    // Run the saga manually using runSaga
    const task = runSaga(
      {
        dispatch: (action) => dispatchedActions.push(action),
      },
      incrementAsync,
    );

    // Fast-forward time by 1 second
    jest.advanceTimersByTime(1000);

    // Wait for the saga to complete
    await task.toPromise();

    // Check that INCREMENT action was dispatched
    expect(dispatchedActions).toContainEqual({ type: 'INCREMENT' });
  });
});
