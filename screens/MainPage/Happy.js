import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Platform,
  StatusBar,
  Animated,
  SafeAreaView,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import LottieView from "lottie-react-native";
import JoinUsScreen from "../AboutApp/JoinUs";
import LeaderboardScreen from "../Squads/SquadsAward";
import { FontFamily, Color } from "../../GlobalStyles";
import FastImage from "react-native-fast-image"; // Import FastImage

const Tab = createMaterialTopTabNavigator();
const { width, height } = Dimensions.get("window");

const LeaderBoard = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarIndicatorStyle: { backgroundColor: "green" },
        tabBarStyle: { backgroundColor: "#f5f5f5", textTransform: "none" },
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Leaderboard" component={LeaderboardContent} />
      <Tab.Screen name="SquadsAward" component={LeaderboardScreen} />
      <Tab.Screen name="Join Us" component={JoinUsScreen} />
    </Tab.Navigator>
  );
};

const LeaderboardContent = () => {
  const [loading, setLoading] = useState(true); // Add loading state
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Simulate a delay for loading (e.g., fetching data)
    setTimeout(() => setLoading(false), 2000); // Set loading to false after 2 seconds
  }, [fadeAnim]);

  // Show Lottie loading animation if loading is true
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require("../../assets/lottie/burst.json")} // Update path to your Lottie animation
          autoPlay
          loop
          style={styles.loadingAnimation}
        />
      </View>
    );
  }

  return (
    <Animated.ScrollView
      style={[styles.leaderboardContent, { opacity: fadeAnim }]}
    >
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
          isCenter={true}
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
          {
            position: "4",
            name: "Andrea",
            score: "1296",
            squad: "Smarty Homes",
            award: "Bronze Medal",
            image: require("../../assets/man.avif"),
          },
          {
            position: "5",
            name: "Kristina",
            score: "1257",
            squad: "Eco Community Clean",
            award: "Certificate of Recognition",
            image: require("../../assets/anotherMan.avif"),
          },
          {
            position: "6",
            name: "Dayana",
            score: "1186",
            squad: "Green Wastes",
            award: "Participation Award",
            image: require("../../assets/women.avif"),
          },
          {
            position: "7",
            name: "Vitaly",
            score: "1103",
            squad: "Digital Green",
            award: "Certificate of Appreciation",
            image: require("../../assets/women.avif"),
          },
          {
            position: "8",
            name: "Marek",
            score: "1099",
            squad: "Green Guardians",
            award: "Honorable Mention",
            image: require("../../assets/man.avif"),
          },
        ].map((user) => (
          <UserRow
            key={`user-${user.name}-${user.position}`}
            position={user.position}
            name={user.name}
            score={user.score}
            image={user.image}
            squad={user.squad}
            award={user.award}
          />
        ))}
      </View>
    </Animated.ScrollView>
  );
};

// Top Users Component
const UserTop = ({
  position,
  name,
  score,
  image,
  crown,
  squad,
  award,
  isCenter,
}) => (
  <View
    style={[
      styles.userTop,
      isCenter && styles.userTopCenter,
      position === "1" && styles.userTopFirst,
    ]}
  >
    <FastImage source={image} style={styles.userTopImage} />
    {crown && (
      <FontAwesome6
        name="crown"
        size={24}
        color="orange"
        style={styles.crownIcon}
      />
    )}
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  leaderboardContent: {
    padding: 14,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  loadingAnimation: {
    width: 150,
    height: 150,
  },
  topUsersContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
    marginTop: "18%",
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
    backgroundColor: "#f5f5f5", // Slightly different color to highlight center
    transform: [{ scale: 1.2 }], // Scale up the center user
  },
  userTopFirst: {
    marginTop: "-5%",
    backgroundColor: "#f4f4f4",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  userTopImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  crownIcon: {
    position: "absolute",
    top: "-1%",
    left: "50%",
  },
  userTopName: {
    color: "green",

    marginTop: 5,
  },
  userTopScore: {
    color: "orange",
  },
  userSquad: {
    color: "gray",

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
    color: "black",
    fontWeight: "600",
    fontSize: 15,
  },
  userScore: {
    color: "green",
  },
});

export default LeaderBoard;
