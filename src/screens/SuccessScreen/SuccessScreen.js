import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Animated, Text, BackHandler } from 'react-native';

const SuccessScreen = ({ navigation }) => {
  const [seconds, setSeconds] = useState(5);
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // BackHandler: Disable Android back button
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);

    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false, // Required for width animations
    }).start();

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 1) {
          clearInterval(interval); // Clear interval when countdown ends
        }
        return prev - 1;
      });
    }, 1000);

    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Product List' }],
      });
    }, 5000);

    return () => {
      backHandler.remove();
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigation, progress]);

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'], // Width from 0% to 100%
  });

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Thank you!</Text>
        <Text style={styles.title}>Your order has been placed successfully.</Text>
        <Text style={styles.message}>
          Redirecting to product list in {seconds} second{seconds > 1 ? 's' : ''}...
        </Text>
      </View>
      {/* Progress bar container */}
      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBar, { width: widthInterpolated }]} />
      </View>
    </View>
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
  textContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666',
  },
  progressBarContainer: {
    width: '80%',
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden', // Ensure the progress stays inside the container
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#76c7c0',
    borderRadius: 5,
  },
});
