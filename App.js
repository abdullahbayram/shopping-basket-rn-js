import './wdyr'; // <--- first import

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import * as React from 'react';
import { useState } from 'react';
import store from './src/redux/store';
import Navigator from './src/Navigator/Navigator';
import { darkTheme, lightTheme } from './src/constants/theme';

const App = () => {
  const systemColorScheme = useColorScheme(); // 'light' or 'dark'
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  const toggleTheme = () => setIsDarkMode((prev) => !prev);
  const theme = isDarkMode ? darkTheme : lightTheme;
  return (
    <SafeAreaProvider testID="SafeAreaProvider" style={styles.container}>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          {/* eslint-disable-next-line react/style-prop-object */}
          <StatusBar style="auto" />
          <Navigator isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
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
