import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Animated, Text, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import Button from '../../atoms/Button/Button';

const RedirectWithAnimation = ({ message, duration = 5000 }) => {
  const navigation = useNavigation();
  const [seconds, setSeconds] = useState(duration / 1000); // Countdown in seconds
  const progress = useRef(new Animated.Value(0)).current; // Animation progress
  const redirectTo = 'ProductList';

  const resetNavigation = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: redirectTo }],
    });
  }, [navigation]);

  useEffect(() => {
    // Disable Android back button
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);

    Animated.timing(progress, {
      toValue: 1, // Animate to 100% progress
      duration,
      useNativeDriver: false, // Required for width animations
    }).start();

    // Countdown logic
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 1) {
          clearInterval(interval);
        }
        return prev - 1;
      });
    }, 1000);
    // Redirect logic
    const timer = setTimeout(() => {
      resetNavigation();
    }, duration);

    return () => {
      backHandler.remove();
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigation, progress, duration, redirectTo, resetNavigation]);

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{message}</Text>
        <Text style={styles.message}>
          Redirecting to product list in {seconds} second{seconds > 1 ? 's' : ''}...
        </Text>
      </View>
      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBar, { width: widthInterpolated }]} />
      </View>
      <Button mode="contained" onPress={resetNavigation}>
        Go to Products
      </Button>
    </View>
  );
};

RedirectWithAnimation.propTypes = {
  message: PropTypes.string.isRequired,
  duration: PropTypes.number,
};

export default RedirectWithAnimation;

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
    marginBottom: 16,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#76c7c0',
    borderRadius: 5,
  },
});
