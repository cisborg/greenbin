import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Color } from '../GlobalStyles';

const squadsData = [
  {
    id: '1',
    name: 'Eco Warriors',
    logo: require('../assets/greenBin.png'), // Replace with actual logo
    points: 1500,
    activitiesCompleted: 30,
    memberCount: 25,
    recentAchievements: 'Reached a milestone of 72% threshold',
  },
  {
    id: '2',
    name: 'Green Guardians',
    logo: require('../assets/greenBin.png'), // Replace with actual logo
    points: 1300,
    activitiesCompleted: 19,
    memberCount: 20,
    recentAchievements: 'Reached a milestone of 68% threshold',
  },
  {
    id: '3',
    name: 'Digital Green',
    logo: require('../assets/greenBin.png'), // Replace with actual logo
    points: 1300,
    activitiesCompleted: 42,
    memberCount: 20,
    recentAchievements: 'Reached a milestone of 64% threshold',
  },
  {
    id: '2',
    name: 'Nature Diversity Custodians',
    logo: require('../assets/greenBin.png'), // Replace with actual logo
    points: 1300,
    activitiesCompleted: 38,
    memberCount: 20,
    recentAchievements: 'Reached a milestone of 60% threshold',
  },
];

const LeaderboardScreen = () => {
 const navigation = useNavigation();
  const renderSquadItem = ({ item, index }) => (
    <View style={styles.squadCard}>
      <Text style={styles.rank}>{index + 1}</Text>
      <Image source={item.logo} style={styles.logo} />
      <View style={styles.squadInfo}>
        <Text style={styles.squadName}>{item.name}</Text>
        <Text style={styles.points}>Points: {item.points}</Text>
        <Text style={styles.activities}>Activities: {item.activitiesCompleted}</Text>
        <Text style={styles.members}>Members: {item.memberCount}</Text>
        <Text style={styles.achievements}>{item.recentAchievements}</Text>
      </View>
      <TouchableOpacity style={styles.followButton}>
        <Text style={styles.followButtonText}>Join 🚀</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Squads Leaderboard</Text>
      <FlatList
        data={squadsData}
        renderItem={renderSquadItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
      <Image
        style={[styles.shapesIcon1, styles.vectorIconLayout]}
        source={require("../assets/shapes.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 20,
    overflow: 'hidden',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  shapesIcon1: {
    height: "18.5%",
    width: "41.26%",
    top: "84.24%",
    right: "-18.97%",
    bottom: "-4.74%",
    left: "58.72%",
  },
  vectorIconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  squadCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 3,
  },
  rank: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    width: 40,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  squadInfo: {
    flex: 1,
  },
  squadName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  points: {
    fontSize: 14,
    color: '#555',
  },
  activities: {
    fontSize: 14,
    color: '#555',
  },
  members: {
    fontSize: 14,
    color: '#555',
  },
  achievements: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },
  followButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  followButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
 
});

export default LeaderboardScreen;
