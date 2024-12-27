/* eslint-disable import/no-unresolved */
import '@testing-library/react-native/extend-expect';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
import { server } from './__tests__/mocks/server';

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

jest.useFakeTimers('modern');

// MSW: Start API mocking before all tests
beforeAll(() => {
  server.listen();

  // Log unhandled requests during testing
  server.events.on('request:unhandled', (req) => {
    console.warn(`Unhandled request to ${req.url.href}`);
  });
  server.events.on('request:start', ({ request }) => {
    console.log('MSW intercepted:', request.method, request.url);
  });
});

// MSW: Reset any runtime request handlers after each test
afterEach(() => server.resetHandlers());

// MSW: Stop the server after all tests
afterAll(() => server.close());
