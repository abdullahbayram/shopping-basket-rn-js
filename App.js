import './wdyr'; // <--- first import

import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';
import * as React from 'react';
import store from './src/redux/store';
import Navigator from './src/Navigator';

const theme = {
  ...MD3LightTheme, // or MD3DarkTheme
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#3498db',
    secondary: '#f1c40f',
    tertiary: '#a1b2c3',
  },
};

const App = () => {
  return (
    <SafeAreaProvider testID="SafeAreaProvider" style={styles.container}>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          {/* eslint-disable-next-line react/style-prop-object */}
          <StatusBar style="auto" />
          <Navigator />
        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
