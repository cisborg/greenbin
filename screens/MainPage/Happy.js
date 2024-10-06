import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image, ScrollView, Platform, Dimensions, Animated, SafeAreaView, StatusBar } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import JoinUsScreen from "../AboutApp/JoinUs";  // Assuming you have this file for the "Join Us" screen
import LeaderboardScreen from "../Squads/SquadsAward";  // Assuming you have this file for the Squads Award screen (if needed)
import { FontFamily, Color } from "../../GlobalStyles";

const Tab = createMaterialTopTabNavigator();
const { width } = Dimensions.get('window');

// Main component rendering the top tab navigation
const LeaderBoard = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12, fontFamily: FontFamily.poppinsMedium, fontWeight: '700' },
        tabBarIndicatorStyle: { backgroundColor: 'green' }, // Custom tab indicator color
        tabBarStyle: { backgroundColor: '#f5f5f5', textTransform: 'none' }, // Custom tab bar background
        tabBarActiveTintColor: 'green',  // Active tab color
        tabBarInactiveTintColor: 'gray', // Inactive tab color
      }}
    >
      <Tab.Screen name="Leaderboard" component={LeaderboardContent} />
      <Tab.Screen name="SquadsAward" component={LeaderboardScreen} />
      <Tab.Screen name="Join Us" component={JoinUsScreen} />
    </Tab.Navigator>
  );
};

// Top-level content with fade-in animation
const LeaderboardContent = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity is 0

  useEffect(() => {
    // Fade in effect on screen mount
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500, // Duration of the animation
      useNativeDriver: true, // Better performance with native driver
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.ScrollView style={[styles.leaderboardContent, { opacity: fadeAnim }]}>
      {/* Top 3 Users */}
      <View style={styles.topUsersContainer}>
        <UserTop
          key={`top-2`}
          position="2"
          name="Yunus"
          score="1397"
          image={require("../../assets/man.avif")}
          crown={false}
          squad="Green Builder"
          award="Trip to Paris"
        />
        <UserTop
          key={`top-1`}
          position="1"
          name="Svetlana"
          score="1463"
          image={require("../../assets/women.avif")}
          crown
          squad="Nature Kenya"
          award="Scholarship Award"
          isCenter={true}  // Center this top user
        />
        <UserTop
          key={`top-3`}
          position="3"
          name="Raquel"
          score="1351"
          image={require("../../assets/anotherMan.avif")}
          crown={false}
          squad="Eco Warriors"
          award="Hotel Reservation"
        />
      </View>

      {/* Other Users */}
      <View style={styles.otherUsersContainer}>
        {[
          { position: "4", name: "Andrea", score: "1296", squad: "Smarty Homes", award: "Bronze Medal", image: require("../../assets/man.avif") },
          { position: "5", name: "Kristina", score: "1257", squad: "Eco Community Clean", award: "Certificate of Recognition", image: require("../../assets/anotherMan.avif") },
          { position: "6", name: "Dayana", score: "1186", squad: "Green Wastes", award: "Participation Award", image: require("../../assets/women.avif") },
          { position: "7", name: "Vitaly", score: "1103", squad: "Digital Green", award: "Certificate of Appreciation", image: require("../../assets/women.avif") },
          { position: "8", name: "Marek", score: "1099", squad: "Green Guardians", award: "Honorable Mention", image: require("../../assets/man.avif") }
        ].map((user) => (
          <UserRow
            key={`user-${user.name}-${user.position}`}
            position={user.position}
            name={user.name}
            score={user.score}
            image={user.image}  // Unique profile image for each user
            squad={user.squad}
            award={user.award}
          />
        ))}
      </View>
    </Animated.ScrollView>
  );
};

// Component to display the top users
const UserTop = ({ position, name, score, image, crown, squad, award, isCenter }) => (
  <View style={[styles.userTop, isCenter && styles.userTopCenter, position === "1" && styles.userTopFirst]}>
    <Image source={image} style={styles.userTopImage} />
    {crown && <FontAwesome6 name="crown" size={24} color="yellow" style={styles.crownIcon} />}
    <Text style={styles.userTopName}>{name}</Text>
    <Text style={styles.userTopScore}>{score}</Text>
    <Text style={styles.userSquad}>{squad}</Text>
    <Text style={styles.userAward}>{award}</Text>
  </View>
);

// Component to display the other users
const UserRow = ({ position, name, score, image, squad, award }) => (
  <View style={styles.userRow}>
    <Text style={styles.userPosition}>{position}</Text>
    <Image source={image} style={styles.userImage} />
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
    padding: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  leaderboardContent: {
    marginTop: 20,
    padding: 14,
    backgroundColor: '#fff'
  },
  topUsersContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
    marginTop: 70,
  },
  otherUsersContainer: {
    width: '100%',
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
    marginTop: -30,
    backgroundColor: "#f4f4f4",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  },
  userTopImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  crownIcon: {
    position: "absolute",
    top: -15,
    left: 45,
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
