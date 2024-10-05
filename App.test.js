import { render, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
// eslint-disable-next-line import/no-unresolved
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

import App from './App';

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

const initialState = {
  count: 0,
};
const mockStore = configureStore([]);
const store = mockStore(initialState);

describe('<App />', () => {
  test('Text renders correctly on App', () => {
    const { toJSON } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    screen.getByText('Items in the basket: 0');
    expect(toJSON()).toMatchSnapshot();
  });
});
