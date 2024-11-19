import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../../components/atoms/Text/Text';
import Screen from '../../components/templetes/Screen/Screen';

const SuccessScreen = () => {
  return (
    <Screen>
      <View style={styles.container}>
        <Text variant="titleLarge" style={styles.title}>
          Thank you!
        </Text>
        <Text style={styles.message}>Your order has been placed successfully</Text>
      </View>
    </Screen>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: '#666',
  },
});
