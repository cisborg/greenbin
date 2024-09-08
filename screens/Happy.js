import * as React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import LeaderboardScreen from "./SquadsAward";
import JoinUsScreen from "./JoinUs";
import { FontFamily, FontSize, Color } from "../GlobalStyles";

const Tab = createMaterialTopTabNavigator();

const LeaderBoard = () => {
  return (
    <View style={styles.container}>
      <LeaderboardContent />
    </View>
  );
};

const LeaderboardContent = () => (
  <ScrollView style={styles.leaderboardContent}>
    {/* Top 3 Users */}
    <View style={styles.topUsersContainer}>
      <UserTop 
        position="2" 
        name="Yunus" 
        score="1397" 
        image={require("../assets/man.avif")} 
        crown={false} 
        squad="Green Builder" 
        award="Trip to Paris"
      />
      <UserTop 
        position="1" 
        name="Svetlana" 
        score="1463" 
        image={require("../assets/women.avif")} 
        crown 
        squad="Nature Kenya" 
        award="Scholarship Award"
      />
      <UserTop 
        position="3" 
        name="Raquel" 
        score="1351" 
        image={require("../assets/anotherMan.avif")} 
        crown={false} 
        squad="Eco Warriors" 
        award="Hotel Reservation"
      />
    </View>

    {/* Other Users */}
    <View style={{ width: 403}}>
    <UserRow 
      position="4" 
      name="Andrea" 
      score="1296" 
      image={require("../assets/man.avif")} 
      squad="Smarty Homes" 
      award="Bronze Medal"
    />
    <UserRow 
      position="5" 
      name="Kristina" 
      score="1257" 
      image={require("../assets/anotherMan.avif")} 
      squad="Eco Community Clean" 
      award="Certificate of Recognition"
    />
    <UserRow 
      position="6" 
      name="Dayana" 
      score="1186" 
      image={require("../assets/anotherMan.avif")} 
      squad="Green Wastes" 
      award="Participation Award"
    />
    <UserRow 
      position="7" 
      name="Vitaly" 
      score="1103" 
      image={require("../assets/anotherWoman.avif")} 
      squad="Digital Green" 
      award="Certificate of Appreciation"
    />
    <UserRow 
      position="8" 
      name="Marek" 
      score="1099" 
      image={require("../assets/man.avif")} 
      squad="Green Gurdians" 
      award="Honorable Mention"
    />
    </View>
  </ScrollView>
);

const UserTop = ({ position, name, score, image, crown, squad, award }) => (
  <View style={[styles.userTop, position === "1" && styles.userTopFirst]}>
    <Image source={image} style={styles.userTopImage} />
    {crown && <FontAwesome6 name="crown" size={24} color="yellow" style={styles.crownIcon} />}
    <Text style={styles.userTopName}>{name}</Text>
    <Text style={styles.userTopScore}>{score}</Text>
    <Text style={styles.userSquad}>{squad}</Text>
    <Text style={styles.userAward}>{award}</Text>
  </View>
);

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
    backgroundColor: "white",
    width: 407
  },
  leaderboardContent: {
    marginTop: 20,
  },
  topUsersContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
    marginTop: 70,
  },
  userTop: {
    alignItems: "center",
    marginHorizontal: 10,
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    maxWidth: 120
  },
  userTopFirst: {
    marginTop: -30,
    backgroundColor: "#e0e0e0", // Slightly darker color for first place
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
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
    fontSize: 10
  },
  userAward: {
    color: "darkorange",
    marginTop: 3,
    textAlign: "center",
    fontSize: 8
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    marginVertical: 5,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
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
    color: "green",
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: 15
  },
  userSquad: {
    color: Color.colorGray_200,
    fontFamily: FontFamily.poppinsRegular,
    marginTop: 2,
    fontSize: 13
  },
  userAward: {
    color: 'gray',
    fontFamily: FontFamily.poppinsRegular,
    marginTop: 2,
    fontSize: 11
  },
  userScore: {
    color: Color.colorLimegreen_200,
    fontFamily: FontFamily.poppinsSemiBold,
  },
});

const AppNavigator = () => {
  return (
    <Tab.Navigator screenOptions={tabStyles}>
      <Tab.Screen name="Leaderboard" component={LeaderBoard} />
      <Tab.Screen name="SquadsAward" component={LeaderboardScreen} />
      <Tab.Screen name="JoinUs" component={JoinUsScreen} />
    </Tab.Navigator>
  );
};

const tabStyles = {
  tabBarStyle: {
    backgroundColor: '#f0f0f0',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 3,
    elevation: 4,
    borderRadius: 15,
    height: 50,
    width: 407
  },
  tabBarLabelStyle: {
    fontWeight: '500',
    fontSize: 14,
    textTransform: 'none',
    color: Color.colorGray_200,
  },
  tabBarIndicatorStyle: {
    backgroundColor: Color.colorLimegreen_100,
    height: 3,
    borderRadius: 5,
  },
};

export default function Home() {
  return (
    <AppNavigator />
  );
}
