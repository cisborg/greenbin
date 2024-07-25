// src/screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MyApp!</Text>
      <Button title="Continue" onPress={() => navigation.navigate('login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
