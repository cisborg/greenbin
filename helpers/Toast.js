import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  const translateY = useSharedValue(-50); // Start position off-screen above

  useEffect(() => {
    // Animate toast into view
    translateY.value = withTiming(0, {
      duration: 500,
      easing: Easing.out(Easing.ease),
    });

    // Hide toast after the specified duration
    const timeout = setTimeout(() => {
      translateY.value = withTiming(-50, {
        duration: 500,
        easing: Easing.in(Easing.ease),
      });
      onClose && onClose();
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, onClose, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const getToastStyle = () => {
    switch (type) {
      case 'successful':
        return styles.success;
      case 'error':
        return styles.error;
      case 'info':
      default:
        return styles.info;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅'; // Success icon (replace with an icon component if available)
      case 'error':
        return '❌'; // Error icon
      case 'info':
      default:
        return 'ℹ️'; // Information icon
    }
  };

  return (
    <Animated.View style={[styles.toast, animatedStyle, getToastStyle()]}>
      <Text style={styles.icon}>{getIcon()}</Text>
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1000,
  },
  success: {
    backgroundColor: '#4CAF50', // Green for success
  },
  error: {
    backgroundColor: '#F44336', // Red for error
  },
  info: {
    backgroundColor: '#2196F3', // Blue for information
  },
  icon: {
    marginRight: 8,
    fontSize: 18,
  },
  toastText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Toast;
