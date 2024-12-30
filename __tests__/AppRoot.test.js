import { screen, waitFor } from '@testing-library/react-native';
import AppRoot from '../AppRoot';
import renderInProvider from './utils/renderInProvider';

describe('<AppRoot />', () => {
  test('AppRoot renders correctly and displays the initial text', async () => {
    const { toJSON } = renderInProvider(<AppRoot />);
    await waitFor(() => {
      screen.getByText('CHECKOUT (0)');
    });
  });
});
