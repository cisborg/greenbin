// SplashScreen.js
import React, { useEffect } from 'react';
import { View, StyleSheet,Text } from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    // Simulate an app initialization delay
    const timer = setTimeout(() => {
      onFinish();
    }, 2000); // Adjust duration as per your Lottie animation

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/lottie/burst.json')} // Update with your Lottie file path
        autoPlay
        loop={false}
      />
      <Text style={styles.text}>Welcome to GreenBin</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green', // Match your desired background color
  },
  text: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'orange', // Match your desired text color
  }
});

export default SplashScreen;
