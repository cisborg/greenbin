// app/user/[id].js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const News = () => {

  return (
    <View style={styles.container}>
      <Text>User ID: </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default News;
