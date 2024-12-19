import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Animated, BackHandler, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { useTheme } from 'react-native-paper';
import { Button, Text, LinearGradient } from '../../atoms';
import createStyles from './RedirectWithAnimation.style';
import { spacing } from '../../../constants/theme';
import { strings } from '../../../constants';

const RedirectWithAnimation = ({ message, duration = 5000, redirectTo = 'ProductList' }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors, spacing);
  const navigation = useNavigation();
  const [seconds, setSeconds] = useState(Math.max(duration / 1000, 1));
  const progress = useRef(new Animated.Value(0)).current;
  const shimmerPosition = useRef(new Animated.Value(-1)).current; // For the shimmer effect

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

    Animated.loop(
      Animated.timing(shimmerPosition, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      }),
    ).start();

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
  }, [navigation, progress, duration, resetNavigation, shimmerPosition]);

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const shimmerTranslate = shimmerPosition.interpolate({
    inputRange: [-1, 1],
    outputRange: [-100, 100],
  });

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text variant="titleLarge" style={styles.title}>
          {message}
        </Text>
        <Text style={styles.message}>
          Redirecting to product list in {seconds} second{seconds > 1 ? 's' : ''}...
        </Text>
      </View>
      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.animatedContainer, { width: widthInterpolated }]}>
          <LinearGradient colors={[colors.linearLeft, colors.linearRight]} end={{ x: 1, y: 0 }} />
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              transform: [{ translateX: shimmerTranslate }],
            }}
          >
            <LinearGradient
              colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0)']}
              end={{ x: 1, y: 0 }}
            />
          </Animated.View>
        </Animated.View>
      </View>
      <Button mode="contained" style={styles.button} textStyle={styles.buttonText} onPress={resetNavigation}>
        {strings.buttons.gotoProducts}
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
