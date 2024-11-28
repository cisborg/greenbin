import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Animated } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import { requestJoinSquad } from '../../redux/actions/squads'
import { fetchSquadLeaderboard } from '../../redux/actions/leaderboard'; // Adjust the path as necessary

const LeaderboardScreen = () => {
  const dispatch = useDispatch();
  const [animValue] = useState(new Animated.Value(0));
  const [pendingSquads, setPendingSquads] = useState({}); // Track pending states for each squad
  const squadsLeaderboard = useSelector((state) => state.squad.leaderboard); // Adjust according to your state structure
  const loading = useSelector((state) => state.squad.loading); // Loading state from Redux
  const userId = useSelector((state) => state.user.id); // Get user ID from Redux state

  useEffect(() => {
    // Start animation on mount
    Animated.timing(animValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Fetch squad leaderboard data
    dispatch(fetchSquadLeaderboard());
  }, [dispatch]);

  const handleJoin = (id) => {
    setPendingSquads((prev) => ({ ...prev, [id]: true }));

    // Dispatch the request to join the squad using the dynamic user ID
    dispatch(requestJoinSquad(id, userId)).then(() => {
      setPendingSquads((prev) => ({ ...prev, [id]: 'pending' }));
    });
  };

  const renderSquadItem = ({ item, index }) => (
    <View style={styles.squadCard}>
      <Text style={styles.rank}>{index + 1}</Text>
      <FastImage source={item.logo} style={styles.logo} resizeMode={FastImage.resizeMode.cover} />
      <View style={styles.squadInfo}>
        <Text style={styles.squadName}>{item.name}</Text>
        <Text style={styles.points}>Total Tiers: {item.points}</Text>
        <Text style={styles.activities}>Activities: {item.activitiesCompleted}</Text>
        <Text style={styles.members}>Members: {item.memberCount}</Text>
        <Text style={styles.rank}>{item.rank}</Text>
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
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <FlatList
            data={squadsLeaderboard}
            renderItem={renderSquadItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        )}
      </Animated.View>
      <FastImage
        style={[styles.shapesIcon1, styles.vectorIconLayout]}
        source={require("../../assets/shapes.png")}
        resizeMode={FastImage.resizeMode.cover}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
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
    backgroundColor: '#f9f9f9',
    borderRadius: 18,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2,
  },
  rank: {
    fontSize: 16,
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
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  points: {
    fontSize: 13,
    color: '#555',
  },
  activities: {
    fontSize: 12,
    color: '#555',
  },
  members: {
    fontSize: 11,
    color: '#555',
  },
  rank: {
    fontSize: 11,
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
