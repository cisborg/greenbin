// src/components/BackgroundLayout.js

import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const BackgroundLayout = ({ children }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../app/assets/images/background.png')} // Path to your top image
        style={styles.topImage}
      />
      <View style={styles.contentContainer}>
        {children}
      </View>
      <Image
        source={require('../../app/assets/images/background.png')} // Path to your bottom image
        style={styles.bottomImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  topImage: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: height / 4, // Adjust the height as needed
    resizeMode: 'cover',
  },
  bottomImage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height / 4, // Adjust the height as needed
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default BackgroundLayout;
