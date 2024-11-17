import { screen, waitFor } from '@testing-library/react-native';
import App from '../App';
import renderInProvider from './utils/renderInProvider';

describe('<App />', () => {
  test.skip('Text renders correctly on App', async () => {
    const { toJSON } = renderInProvider(<App />);
    await waitFor(() => {
      screen.getByText('Items in the basket: 0');
    });
    expect(toJSON()).toMatchSnapshot();
  });
});
