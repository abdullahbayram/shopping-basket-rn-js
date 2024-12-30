import './wdyr'; // <--- first import
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { ThemeContext, ThemeProvider } from './src/context/ThemeContext';
import store from './src/redux/store';
import Navigator from './src/Navigator/Navigator';

const AppContent = () => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <PaperProvider theme={theme}>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="auto" />
      <Navigator />
    </PaperProvider>
  );
};

const AppRoot = () => (
  <SafeAreaProvider>
    <Provider store={store}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Provider>
  </SafeAreaProvider>
);

export default AppRoot;
