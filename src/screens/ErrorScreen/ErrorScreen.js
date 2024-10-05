import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../../components/atoms/Text/Text';
import Screen from '../../components/templetes/Screen';

const ErrorScreen = () => {
  return (
    <Screen>
      <View style={[styles.container]}>
        <Text>Unexpected Error</Text>
      </View>
    </Screen>
  );
};

export default ErrorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
