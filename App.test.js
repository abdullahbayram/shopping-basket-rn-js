import { render, screen } from '@testing-library/react-native';

import Text from './src/components/atoms/Text/Text';

describe('<Text />', () => {
  test('Text renders correctly on App', () => {
    render(<Text>Open up App.js to start working on your app!</Text>);
    screen.getByText('Open up App.js to start working on your app!');
  });
});
