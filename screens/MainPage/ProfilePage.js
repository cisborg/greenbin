import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Animated } from "react-native";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const ProfilePage = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const targetData = {
    "Tree Planting": 1000,
    "Waste Recycle": 500,
    "Green Bins": 200,
  };

  const [completedData, setCompletedData] = useState({
    "Tree Planting": 800,
    "Waste Recycle": 350,
    "Green Bins": 50,
  });


  const calculateProgress = (completed, target) => {
    if (target === 0) return 0;
    return Math.min((completed / target) * 100, 100);
  };

  const calculateActivityPopulation = () => {
    return Object.keys(targetData).map((activity) => ({
      name: activity,
      population: calculateProgress(completedData[activity], targetData[activity]),
    }));
  };

  const activitiesData = calculateActivityPopulation();

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const [lastUpdatedMonth, setLastUpdatedMonth] = useState(currentMonth);
  const [activeCardIndex, setActiveCardIndex] = useState(0);


  useEffect(() => {
    if (currentMonth !== lastUpdatedMonth) {
      setCompletedData({
        "Tree Planting": 0,
        "Waste Recycle": 0,
        "Green Bins": 0,
      });
      setLastUpdatedMonth(currentMonth);
    }
  }, [currentMonth, lastUpdatedMonth]);

  const cardData = [
    {
      name: "Upload Product",
      icon: <FontAwesome name="user" size={24} color="white" />,
      screen: "VendorUpload",
    },
    {
      name: "Refer & Earn",
      icon: <FontAwesome name="gift" size={24} color="white" />,
      screen: "ReferAndEarn",
    },
    {
      name: "Help & Support",
      icon: <FontAwesome name="question-circle" size={24} color="orange" />,
      screen: "Support",
    },
    {
      name: "Green Survey",
      icon: <MaterialIcons name="settings" size={24} color="white" />,
      screen: "GreenSurvey",
    },
    {
      name: "Logout",
      icon: <MaterialIcons name="logout" size={24} color="white" />,
      screen: "SignInPage",
    },
  ];

  const CARDS_PER_VIEW = 3;

  const renderCards = () => {
    const startIndex = activeCardIndex * CARDS_PER_VIEW;
    const cardsToShow = cardData.slice(startIndex, startIndex + CARDS_PER_VIEW);

    return (
      <View style={styles.gradientCardsContainer}>
        {cardsToShow.map((card, index) => (
          <TouchableOpacity
            key={index}
            style={styles.gradientCard}
            onPress={() => navigation.navigate(card.screen)}
          >
            <LinearGradient
              colors={["#228B22", "#90EE90"]}
              style={styles.cardGradient}
            >
              {card.icon}
              <Text style={styles.cardText}>{card.name}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const topicIcons = {
    "Tree Planting": require("../../assets/Treee.png"),
    "Waste Recycle": require("../../assets/greenbayer.png"),
    "Green Bins": require("../../assets/greenBin.png"),
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.leftSection}>

            <FastImage style={styles.profileImg}
             source={require("../../assets/anotherMan.avif")}
             resizeMode={FastImage.resizeMode.contain}
             />   
             <Text style={styles.username}>Brian</Text>


            </View>

            <TouchableOpacity
              style={styles.settingsIcon}
              onPress={() => navigation.navigate("ProfileSettings")}
            >
              <MaterialIcons name="settings" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkInContainer}
              onPress={() => navigation.navigate("GreenCoins")}
            >
              <Text style={styles.checkInText}>Check-in &gt;</Text>
            </TouchableOpacity>

            {/* Icons Row for Wishlist, Followed Stores, Recently Viewed */}
            <View style={styles.iconRow}>
              <TouchableOpacity style={styles.iconItem} onPress={()=> navigation.navigate('SubscribedProducts')}> 
                <Ionicons name="heart-outline" size={22} color="white" />
                <Text style={styles.iconText}>Subscribed</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconItem}
                onPress={() => navigation.navigate("ShopLocator")}
              >
                <Ionicons name="storefront-outline" size={22} color="white" />
                <Text style={styles.iconText}>Green Shops</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconItem} onPress={()=> navigation.navigate('Assets')}> 
                <Ionicons name="eye-outline" size={22} color="white" />
                <Text style={styles.iconText}>My Assets</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.cardContainer}>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("ProfileGCPs")}>
            <FastImage style={styles.cardIcon} source={require("../../assets/checked.png")}
             resizeMode={FastImage.resizeMode.contain}/>   
             <Text style={styles.cardValue}>GCP 1400</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Happy")}>
              <FastImage style={styles.cardIcon} source={require("../../assets/stats_2500115.png")} 
              resizeMode={FastImage.resizeMode.contain} />  
             <Text style={styles.cardValue}>#12</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("CarbonCalculator", { activities: activitiesData } )}>
              <FastImage style={styles.cardIcon} source={require("../../assets/checked.png")}
              resizeMode={FastImage.resizeMode.contain}/>   
              <Text style={styles.cardTitle}>GCPs Calculator 🔐</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("GreenConnect")}>
              <FastImage style={styles.cardIcon} 
              source={require("../../assets/electric.png")} 
              resizeMode={FastImage.resizeMode.contain}
              /> 

              <Text style={styles.cardTitle}>Connect Green</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Win EcoGreen Promos Now! 🎉</Text>

          <View style={styles.progressBarContainer}>
            {Object.keys(targetData).map((topic, index) => (
              <View key={index} style={styles.topicContainer}>
                <View style={styles.topicContent}>
                <FastImage source={topicIcons[topic]} style={styles.topicIcon}
                resizeMode={FastImage.resizeMode.contain} />  
                <View style={styles.topicInfo}>
                    <Text style={styles.topicName}>{topic}</Text>
                    <View style={styles.progressBar}>
                      <LinearGradient
                        style={[
                          styles.progress,
                          {
                            width: `${calculateProgress(
                              completedData[topic],
                              targetData[topic]
                            )}%`,
                            backgroundColor:
                              calculateProgress(
                                completedData[topic],
                                targetData[topic]
                              ) >= 60
                                ? "green"
                                : "#ffbf1a",
                          },
                        ]}
                        colors={
                          calculateProgress(
                            completedData[topic],
                            targetData[topic]
                          ) >= 60
                            ? ["#0f0", "#0a0"]
                            : ["#ffbf1a", "#ff4080"]
                        }
                      />
                    </View>
                    <Text style={styles.achievementText}>
                      {`${calculateProgress(
                        completedData[topic],
                        targetData[topic]
                      )}% Achieved!`}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Quick Actions</Text>

          {renderCards()}

          <View style={styles.dotsContainer}>
            {Array(Math.ceil(cardData.length / CARDS_PER_VIEW))
              .fill()
              .map((_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setActiveCardIndex(index)}
                  style={[
                    styles.dot,
                    activeCardIndex === index
                      ? styles.activeDot
                      : styles.inactiveDot,
                  ]}
                />
              ))}
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 2,
    backgroundColor: "#fff",
    paddingTop: "4%",
  },
  scrollContainer: {
    paddingBottom: 20,
    margin: "2%",
  },
  headerContainer: {
    backgroundColor: "green", // Adjust background color similar to your image
    padding: 10,
    marginBottom: 15,
    borderRadius: 22,
    height: "23%",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
  settingsIcon: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  checkInContainer: {
    marginTop: 10,
    alignSelf: "flex-end",
    backgroundColor: "orange",
    padding: 5,
    left: 11,
    borderBottomLeftRadius: 18,
    borderTopLeftRadius: 18,
  },
  checkInText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 15,
  },
  iconItem: {
    alignItems: "center",
  },
  iconText: {
    color: "white",
    fontSize: 12,
    marginTop: 3,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    width: "100%",
    alignItems: "center",
    marginBottom: 8,
  },
  card: {
    width: "40%",
    padding: 5,
    marginVertical: 6,
    marginHorizontal: 1,
    backgroundColor: "#ffff",
    borderRadius: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 1,
  },
  cardIcon: {
    width: "24%",
    height: 32,
    marginBottom: 10,
    borderRadius: 14,
  },
  cardTitle: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16, // Adjusted for responsiveness
    fontWeight: "bold",
    color: "green",
    textAlign: "center",
    marginVertical: 7,
  },
  progressBarContainer: {
    marginBottom: -20,
  },
  topicContainer: {
    marginBottom: 20,
  },
  topicContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  topicIcon: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  topicInfo: {
    flex: 1,
  },
  topicName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    borderRadius: 5,
  },
  achievementText: {
    marginTop: 5,
    fontSize: 11,
    color: "#888",
  },
  gradientCardsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  gradientCard: {
    width: "30%",
    height: "70%",
    marginHorizontal: 5,
    marginBottom: -5,
  },
  cardGradient: {
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  cardText: {
    color: "white",
    fontSize: 10,
    fontWeight: "600",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "green",
  },
  inactiveDot: {
    backgroundColor: "#bbb",
  },
});

export default ProfilePage;
