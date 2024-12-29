import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator,Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Animated } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { requestJoinSquad } from '../../redux/actions/squads';
import LottieView from 'lottie-react-native';
import { fetchSquadLeaderboard } from '../../redux/actions/leaderboard';

const { width,height } = Dimensions.get('window');


const LeaderboardScreen = () => {
  const dispatch = useDispatch();
  const [animValue] = useState(new Animated.Value(0));
  const [pendingSquads, setPendingSquads] = useState({});
  const {squadsLeaderboard, loading, error} = useSelector((state) => ({
    squadsLeaderboard: state.leaderboard.squadLeaderboard,
    loading: state.leaderboard.loading,
    error: state.leaderboard.error,
  }));
  const userId = useSelector((state) => state.auth.id);

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    dispatch(fetchSquadLeaderboard());
  }, [dispatch]);

  const handleJoin = (id) => {
    setPendingSquads((prev) => ({ ...prev, [id]: true }));
    dispatch(requestJoinSquad(id, userId)).then(() => {
      setPendingSquads((prev) => ({ ...prev, [id]: 'pending' }));
    });
  };

  const renderSquadItem = ({ item, index }) => {
    const activitiesCompleted = item.activitiesCompleted;
    const maxActivities = 12;
    const progressPercentage = (activitiesCompleted / maxActivities) * 100;
    let statusText = 'Fair';
    if (activitiesCompleted >= 8) {
      statusText = 'Commendable';
    } else if (activitiesCompleted >= 6) {
      statusText = 'Good';
    }

    return (
      <View style={styles.squadCard}>
        <View style={styles.squadHeader}>
          <FastImage source={item.logo} style={styles.logo} resizeMode={FastImage.resizeMode.cover} />
          <View style={styles.squadInfo}>
            <Text style={styles.squadName}>{item.name}</Text>
            <Text style={styles.squadDescription}>{item.description}</Text>
          </View>
          <TouchableOpacity
            style={[styles.joinButton, pendingSquads[item.id] === 'pending' ? styles.pendingButton : {}]}
            onPress={() => handleJoin(item.id)}
            disabled={pendingSquads[item.id] === 'pending'}
          >
            {pendingSquads[item.id] === 'pending' ? (
              <Text style={styles.joinButtonText}>Pending</Text>
            ) : (
              <>
                {pendingSquads[item.id] && <ActivityIndicator size="small" color="#fff" />}
                <Text style={styles.joinButtonText}>Join 🚀</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.progressBar}>
          <View style={styles.progressBarContainer}>
            <Animated.View
              style={[
                styles.progressBarFill,
                {
                  width: `${progressPercentage}%`,
                  backgroundColor: progressPercentage >= 66 ? '#4CAF50' : progressPercentage >= 33 ? 'orange' : 'red',
                },
              ]}
            />
          </View>
        </View>
        <View style={styles.tiersContainer}>
          <Text style={styles.tiers}>Premium: {item.points}</Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.rankContainer}>
            <Text style={styles.rank}>Rank: {index + 1}</Text>
          </TouchableOpacity>
          <Text style={styles.award}>Award: {item.award}</Text>
          <Text style={styles.status}>{statusText}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ opacity: animValue }}>
        {loading ? (
                <View style={styles.loadingContainer}>
                    <LottieView
                      source={require('../../assets/lottie/rotateLoad.json')} 
                      autoPlay
                      loop
                      style={styles.lottie}
                    />
                </View>    
            ) : error ? (
                <View style={styles.errorContainer}>
                    <LottieView
                      source={require('../../assets/lottie/errorLottie.json')} // Replace with your error animation file
                      autoPlay
                      loop
                      style={styles.lottie}
                    />
                    <Text style={styles.errorMessage}>Oops! Something went wrong.</Text>
                </View>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
},
errorMessage: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
},
loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff', // Adjust as needed
},
lottie: {
  width: width * 0.3, // Adjust size as needed
  height: height * 0.3,
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
  tiersContainer:{
    alignItems: 'flex-end'
  },
  rank: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    width: 40,
  },
  rankContainer: {
    padding: 5,
    backgroundColor: 'orange',
    borderWidth: 1,
    borderRadius: 13,
    marginHorizontal: 5,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 15,
  },
  squadName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  rank: {
    fontSize: 11,
    color: '#777',
    marginTop: 5,
  },
  
  squadHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,

  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  squadInfo: {
    flexDirection: 'column',
  },
  squadName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  squadDescription: {
    fontSize: 12,
    color: '#555',
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rank: {
    fontSize: 12,
    color: '#777',
    marginRight: 10,
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  award: {
    fontSize: 12,
    color: '#777',
    marginLeft: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tiers: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  status: {
    fontSize: 14,
    color: '#777',
  },
  joinButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: 'center',
    alignSelf: 'flex-end'
  },
  pendingButton: {
    backgroundColor: 'orange',
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LeaderboardScreen;
