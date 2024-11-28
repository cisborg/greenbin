import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View,  Dimensions, Platform,StatusBar ,Animated } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import LottieView from 'lottie-react-native';
import JoinUsScreen from "../AboutApp/JoinUs";
import { Color, FontFamily } from "../../GlobalStyles";
import LeaderboardScreen from "../Squads/SquadsAward";
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserLeaderboard } from '../../redux/actions/leaderboard'; // Adjust path as necessary

const Tab = createMaterialTopTabNavigator();
const { width, height } = Dimensions.get('window');

const LeaderBoard = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12, fontFamily: FontFamily.poppinsMedium, fontWeight: '700' },
        tabBarIndicatorStyle: { backgroundColor: 'green' },
        tabBarStyle: { backgroundColor: '#f5f5f5', textTransform: 'none' },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Leaderboard" component={LeaderboardContent} />
      <Tab.Screen name="SquadsAward" component={LeaderboardScreen} />
      <Tab.Screen name="Join Us" component={JoinUsScreen} />
    </Tab.Navigator>
  );
};

const LeaderboardContent = () => {
  const dispatch = useDispatch();
  const { userLeaderboard = [], loading, error, isFetchingMore } = useSelector(state => state.leaderboard);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const loadMoreRef = useRef(false);

  const loadMoreUsers = useCallback(() => {
    if (!loadMoreRef.current && !isFetchingMore) {
      loadMoreRef.current = true;
      dispatch(fetchUserLeaderboard(userLeaderboard.length));
      setTimeout(() => (loadMoreRef.current = false), 1000); // Prevent rapid calls
    }
  }, [dispatch, isFetchingMore, userLeaderboard.length]);

  const fetchLeaderboard = useCallback(() => {
    dispatch(fetchUserLeaderboard());
  }, [dispatch]);
  
  useEffect(() => {
    fetchLeaderboard();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fetchLeaderboard, fadeAnim]);
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require('../../assets/lottie/burst.json')}
          autoPlay
          loop
          style={styles.loadingAnimation}
        />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {error || "An unexpected error occurred. Please try again later."}
        </Text>
      </View>
    );
  }
  

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      {/* Top 3 Users */}
      <View style={styles.topUsersContainer}>
        {userLeaderboard.slice(0, 3).map((user, index) => (
          <UserTop
            key={`top-${index}`}
            position={(index + 1).toString()}
            name={user.username}
            score={user.points.toString()}
            image={user.profilePicture ? { uri: user.profilePicture } : require("../../assets/defaultUserImage.png")}
            crown={user.crown}
            squad={user.squadName}
            award={user.awardType}
            isCenter={index === 0}
          />
        ))}
      </View>

      {/* Other Users (FlatList for better performance) */}
      <FlatList
        data={userLeaderboard.slice(3)} // All users except the top 3
        keyExtractor={(item, index) => `user-${item.username}-${index + 4}`}
        renderItem={({ item, index }) => (
          <UserRow
            position={(index + 4).toString()}
            name={item.username}
            score={item.points.toString()}
            image={item.profilePicture ? { uri: item.profilePicture } : require("../../assets/defaultUserImage.png")}
            squad={item.squadName}
            award={item.awardType}
          />
        )}
        onEndReached={loadMoreUsers} // Fetch more data when the end of the list is reached
        onEndReachedThreshold={0.5} // Trigger `onEndReached` when 50% away from the bottom
        ListFooterComponent={
          isFetchingMore && (
            <View style={styles.loadingContainer}>
              <LottieView
                source={require("../../assets/lottie/rotatingBalls.json")}
                autoPlay
                loop
                style={styles.loadingAnimation}
              />
            </View>
          )
        }
      />
    </Animated.View>
  );
};

// Top Users Component
const UserTop = ({ position, name, score, image, crown, squad, award, isCenter }) => (
  <View style={[styles.userTop, isCenter && styles.userTopCenter, position === "1" && styles.userTopFirst]}>
    <FastImage source={image} style={styles.userTopImage} />
    {crown && <FontAwesome6 name="crown" size={24} color="orange" style={styles.crownIcon} />}
    <Text style={styles.userTopName}>{name}</Text>
    <Text style={styles.userTopScore}>{score}</Text>
    <Text style={styles.userSquad}>{squad}</Text>
    <Text style={styles.userAward}>{award}</Text>
  </View>
);

// Other Users Component
const UserRow = ({ position, name, score, image, squad, award }) => (
  <View style={styles.userRow}>
    <Text style={styles.userPosition}>{position}</Text>
    <FastImage source={image} style={styles.userImage} />
    <View style={styles.userDetails}>
      <Text style={styles.userName}>{name}</Text>
      <Text style={styles.userSquad}>{squad}</Text>
      <Text style={styles.userAward}>{award}</Text>
    </View>
    <Text style={styles.userScore}>{score}</Text>
  </View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 15,
    width: width * 0.98,
    height: height * 0.98,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  leaderboardContent: {
    padding: 14,
    backgroundColor: '#fff'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  loadingAnimation: {
    width: 150,
    height: 150,
  },
  topUsersContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
    marginTop: '18%',
  },
  otherUsersContainer: {
    width: width * 0.92,
  },
  userTop: {
    alignItems: "center",
    marginHorizontal: 10,
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    maxWidth: width * 0.25, // Responsive width
  },
  userTopCenter: {
    marginTop: -30,
    backgroundColor: "#f5f5f5",  // Slightly different color to highlight center
    transform: [{ scale: 1.2 }],  // Scale up the center user
  },
  userTopFirst: {
    marginTop: '-5%',
    backgroundColor: "#f4f4f4",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4
  },
  userTopImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  crownIcon: {
    position: "absolute",
    top: '-1%',
    left: '50%',
  },
  userTopName: {
    color: "green",
    fontFamily: FontFamily.poppinsSemiBold,
    marginTop: 5,
  },
  userTopScore: {
    color: 'orange',
    fontFamily: FontFamily.poppinsLight,
  },
  userSquad: {
    color: "gray",
    fontFamily: FontFamily.poppinsRegular,
    marginTop: 3,
    fontSize: 12,
  },
  userAward: {
    color: "green",
    marginTop: 3,
    textAlign: "flex-start",
    fontSize: 11,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
    marginVertical: 5,
    borderRadius: 17,
    elevation: 1,
  },
  userPosition: {
    color: "black",
    fontSize: 16,
    fontFamily: FontFamily.poppinsSemiBold,
    width: 30,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontFamily: FontFamily.poppinsMedium,
    color: "black",
    fontWeight: '600',
    fontSize: 15,

  },
  userScore: {
    color: "green",
    fontFamily: FontFamily.poppinsLight,
  },
});

export default LeaderBoard;
