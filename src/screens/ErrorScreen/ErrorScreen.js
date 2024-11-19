import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Text from '../../components/atoms/Text/Text';
import Screen from '../../components/templetes/Screen/Screen';

const ErrorScreen = () => {
  const route = useRoute();
  const { errorMessage = 'Unexpected Error' } = route.params || {};
  return (
    <Screen>
      <View style={[styles.container]}>
        <Text>{errorMessage}</Text>
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
