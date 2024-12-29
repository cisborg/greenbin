// SplashScreen.js
import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from 'expo-linear-gradient'; // Import for gradient background

const Splash = ({ onFinish }) => {
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    setTimeout(async () => {
      await SplashScreen.hideAsync();
      onFinish()
    }, 8000);
  }, []);

  return (
    <LinearGradient
      colors={['white', 'white', 'white']} // Gradient colors: Orange, White, Green
      style={styles.container}
    >
      <LottieView
        source={require('./assets/lottie/boxLoading.json')}
        autoPlay
        loop={true}
        style={styles.lottie} // Style for Lottie animation
      />
      <Text style={styles.text}>Welcome to GreenBin App!</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 150, // Adjust the size as needed
    height: 150,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000', // Changed text color to black for better contrast
    textShadowColor: '#FFFFFF', // Shadow color for text
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 10,
    marginTop: 20, // Space between Lottie and text
  },
});

export default Splash;
