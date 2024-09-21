import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import rootSaga from './sagas'; // Assuming you have a rootSaga combining all sagas

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create the Redux store and apply saga middleware
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;
