import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from 'expo-linear-gradient';

const Splash = ({ onFinish }) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity is 0

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000, // Duration of fade-in
      useNativeDriver: true,
    }).start();

    setTimeout(async () => {
      await SplashScreen.hideAsync()
      onFinish();
    }, 8000);
  }, []);

  return (
    <LinearGradient
      colors={['#FFFFFF', '#000000']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        {/* Image with faded bottom */}
        <Animated.View style={[styles.imageContainer, { opacity: fadeAnim }]}>
          <FastImage
            source={require('./assets/ZEROWASTE.avif')} // Replace with your image path
            style={styles.image}
            resizeMode={FastImage.resizeMode.cover}
          />
          {/* Gradient overlay for image fade */}
          <LinearGradient
            colors={['transparent', '#000000']}
            style={styles.imageOverlay}
          />
        </Animated.View>

        {/* Lottie Animation and Text */}
        <View style={styles.bottomContainer}>
          <LottieView
            source={require('./assets/lottie/boxLoading.json')}
            autoPlay
            loop={true}
            style={styles.lottie}
          />
          <Text style={styles.text}>Welcome to GreenBin App!</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align items to the top
  },
  imageContainer: {
    height: '40%', // Adjust to fit your layout
    justifyContent: 'flex-end', // Align image to bottom
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    width: '100%',
    height: '40%', // Adjust fade area
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 50,
    height: 50,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    marginTop: 20,
  },
});

export default Splash;
