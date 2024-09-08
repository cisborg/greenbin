import React from 'react';
import { View, Text, StyleSheet, FlatList ,TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";

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
      <TouchableOpacity onPress={()=> navigation.goBack()}>
        <View style={styles.proceed}>
            <Text style={styles.cardText}>Go Back</Text>
        </View>
      </TouchableOpacity>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    width: 404,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 1,
    color: Color.colorLimegreen_200,
    FontFamily: FontFamily.manropeBold
  },
  proceed: {
    backgroundColor: 'white',
    shadowColor: '#000',
    left: 250,
    marginTop:0,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    alignContent: 'center',
    width: 120,
    height: 35,
    bottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardText: {
    color: Color.colorLimegreen_200,
    fontWeight: 'bold',
  },
  list: {
    marginBottom: 20,
  },
  tagContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 10,
    marginVertical: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  tagText: {
    fontSize: 16,
    color: '#333',
  },
});

export default TagList;
