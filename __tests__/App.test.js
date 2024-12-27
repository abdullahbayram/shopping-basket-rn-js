import { screen, waitFor } from '@testing-library/react-native';
import App from '../App';
import renderInProvider from './utils/renderInProvider';

describe('<App />', () => {
  test('App renders correctly and displays the initial text', async () => {
    const { toJSON } = renderInProvider(<App />);
    await waitFor(() => {
      screen.getByText('CHECKOUT (0)');
    });
  });
});
