import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Animated } from 'react-native';
import { Color } from '../../GlobalStyles';

const squadsData = [
  {
    id: '1',
    name: 'Eco Warriors',
    logo: require('../../assets/greenBin.png'), // Replace with actual logo
    points: 1500,
    activitiesCompleted: 30,
    memberCount: 25,
    recentAchievements: 'Reached a milestone of 72% threshold',
  },
  {
    id: '2',
    name: 'Green Guardians',
    logo: require('../../assets/greenBin.png'), // Replace with actual logo
    points: 1300,
    activitiesCompleted: 8,
    memberCount: 20,
    recentAchievements: 'Reached a milestone of 68% threshold',
  },
  {
    id: '3',
    name: 'Digital Green',
    logo: require('../../assets/greenBin.png'), // Replace with actual logo
    points: 1300,
    activitiesCompleted: 7,
    memberCount: 20,
    recentAchievements: 'Reached a milestone of 64% threshold',
  },
  {
    id: '4',
    name: 'Nature Diversity Custodians',
    logo: require('../../assets/greenBin.png'), // Replace with actual logo
    points: 1300,
    activitiesCompleted: 6,
    memberCount: 20,
    recentAchievements: 'Reached a milestone of 60% threshold',
  },
];

const LeaderboardScreen = () => {
  const navigation = useNavigation();
  const [animValue] = useState(new Animated.Value(0));
  const [pendingSquads, setPendingSquads] = useState({}); // Track pending states for each squad

  useEffect(() => {
    // Start animation on mount
    Animated.timing(animValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [animValue]);

  const handleJoin = (id) => {
    // Show pending state and start loading spinner
    setPendingSquads((prev) => ({ ...prev, [id]: true }));

    // Simulate API call with a timeout
    setTimeout(() => {
      // Set squad as permanently pending
      setPendingSquads((prev) => ({ ...prev, [id]: 'pending' }));
    }, 400);
  };

  const renderSquadItem = ({ item, index }) => (
    <View style={styles.squadCard}>
      <Text style={styles.rank}>{index + 1}</Text>
      <Image source={item.logo} style={styles.logo} />
      <View style={styles.squadInfo}>
        <Text style={styles.squadName}>{item.name}</Text>
        <Text style={styles.points}>Total Tiers: {item.points}</Text>
        <Text style={styles.activities}>Activities: {item.activitiesCompleted}</Text>
        <Text style={styles.members}>Members: {item.memberCount}</Text>
        <Text style={styles.achievements}>{item.recentAchievements}</Text>
      </View>
      <TouchableOpacity
        style={[styles.followButton, pendingSquads[item.id] === 'pending' ? styles.pendingButton : {}]}
        onPress={() => handleJoin(item.id)}
        disabled={pendingSquads[item.id] === 'pending'} // Disable button when pending
      >
        {pendingSquads[item.id] === 'pending' ? (
          <Text style={styles.followButtonText}>Pending</Text>
        ) : (
          <>
            {pendingSquads[item.id] && <ActivityIndicator size="small" color="#fff" />}
            <Text style={styles.followButtonText}>Join 🚀</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ opacity: animValue }}>
        <FlatList
          data={squadsData}
          renderItem={renderSquadItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </Animated.View>
      <Image
        style={[styles.shapesIcon1, styles.vectorIconLayout]}
        source={require("../../assets/shapes.png")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
    overflow: 'hidden',
  },
  shapesIcon1: {
    height: "18.5%",
    width: "41.26%",
    position: "absolute",
    bottom: 0,
    right: 0,
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
    backgroundColor: '#ffff',
    borderRadius: 14,
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
    alignItems: 'center',
  },
  pendingButton: {
    backgroundColor: 'orange',
  },
  followButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LeaderboardScreen;
