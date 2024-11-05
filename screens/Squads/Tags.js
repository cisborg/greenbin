import React from 'react';
import { View, Text, StyleSheet, FlatList ,TouchableOpacity } from 'react-native';
import { FontFamily, Color } from "../../GlobalStyles";

import { useNavigation } from '@react-navigation/core';

const TagList = () => {
  const trendingTags = [
    'startup',
    'career',
    'tailwind-css',
    'react-native',
    'tutorial',
    'backend',
    'typescript',
    'malware',
    'javascript',
    'android',
  ];

  const popularTags = [
    'tools',
    'html',
    'community',
    'cyber',
    'tutorial',
    'productivity',
  ];
  const navigation = useNavigation()
  const renderTag = ({ item }) => (
    <View style={styles.tagContainer}>
      <Text style={styles.tagText}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>

      <Text style={styles.header}>Trending Tags</Text>
      <FlatList
        data={trendingTags}
        renderItem={renderTag}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />

      <Text style={styles.header}>Popular Tags</Text>
      <FlatList
        data={popularTags}
        renderItem={renderTag}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
      
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 5,
    overflow: 'hidden',
  },
  header: {
    fontSize: 17,
    fontWeight: 'bold',

    marginVertical: 5,
    color: 'green',
    FontFamily: FontFamily.manropeBold
  },
 
  cardText: {
    color: 'green',
    fontWeight: 'bold',
  },
  list: {
    marginBottom: 20,
  },
  tagContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 10,
    marginVertical: 5,
    
  },
  tagText: {
    fontSize: 14,
    color: '#333',
  },
});

export default TagList;
