import { render, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import App from './App';

const mockStore = configureStore([]);
const store = mockStore({});

describe('<App />', () => {
  test('Text renders correctly on App', () => {
    const { toJSON } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    screen.getByTestId('SafeAreaProvider');
    expect(toJSON()).toMatchSnapshot();
  });
});
