import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Animated, Text, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import Button from '../../atoms/Button';
import styles from './RedirectWithAnimation.style';

const RedirectWithAnimation = ({ message, duration = 5000, redirectTo = 'ProductList' }) => {
  const navigation = useNavigation();
  const [seconds, setSeconds] = useState(Math.max(duration / 1000, 1));
  const progress = useRef(new Animated.Value(0)).current;

  const resetNavigation = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: redirectTo }],
    });
  }, [navigation, redirectTo]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);

    Animated.timing(progress, {
      toValue: 1,
      duration,
      useNativeDriver: false,
    }).start();

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
        }
        return Math.max(prev - 1, 0);
      });
    }, 1000);

    const timer = setTimeout(() => {
      resetNavigation();
    }, duration);

    return () => {
      backHandler.remove();
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigation, progress, duration, resetNavigation]);

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
  redirectTo: PropTypes.string,
};

export default RedirectWithAnimation;
