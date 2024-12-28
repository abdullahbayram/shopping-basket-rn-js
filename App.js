import { registerRootComponent } from 'expo';
import AppRoot from './AppRoot';

const mockingEnabled = true; // Enable mocking for development

console.log('Is Development:', __DEV__);

async function enableMocking() {
  console.log('Enabling mock server');
  if (__DEV__ && mockingEnabled) {
    try {
      // Import polyfills for React Native
      await import('./msw.polyfills');
      // Initialize MSW server
      const { server } = await import('./mocks/server');
      server.listen({
        onUnhandledRequest: 'warn', // Log unhandled requests for debugging
      });
      console.log('Mock server enabled');
    } catch (error) {
      console.error('Failed to start mock server', error);
    }
    return;
  }
  console.log('Mocking is disabled.');
}

// Ensure mocking is initialized before the app starts
enableMocking().then(() => {
  registerRootComponent(AppRoot);
});
