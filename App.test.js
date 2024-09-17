import { render, screen } from '@testing-library/react-native';

import App from './App';

describe('<App />', () => {
  test('Text renders correctly on App', () => {
    render(<App />);
    screen.getByText('Open up App.js to start working on your app!');
  });
});
