// app/splash.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const Splash = () => {
  const router = useRouter();

  const handleNavigateToTabs = () => {
    router.push('(tabs)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Splash Screen</Text>
      <Button title="Go to Tabs" onPress={handleNavigateToTabs} />
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
    marginBottom: 20,
  },
});

export default Splash;
