import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Animated } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

const ProfilePage = () => {
  const navigation = useNavigation();
  const username = "Josh";
  const cash = 1400;
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
    "Green Bins": 200
  };

  const [completedData, setCompletedData] = useState({
    "Tree Planting": 800,
    "Waste Recycle": 350,
    "Green Bins": 50
  });

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const [lastUpdatedMonth, setLastUpdatedMonth] = useState(currentMonth);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const calculateProgress = (completed, target) => {
    if (target === 0) return 0;
    return Math.min((completed / target) * 100, 100);
  };

  useEffect(() => {
    if (currentMonth !== lastUpdatedMonth) {
      setCompletedData({
        "Tree Planting": 0,
        "Waste Recycle": 0,
        "Green Bins": 0
      });
      setLastUpdatedMonth(currentMonth);
    }
  }, [currentMonth, lastUpdatedMonth]);

  const cardData = [
    { name: "Visit Shop", icon: <Ionicons name="location" size={24} color="white" />, screen: "EventForm" },
    { name: "Refer & Earn", icon: <FontAwesome name="gift" size={24} color="white" />, screen: "ReferAndEarn" },
    { name: "Help & Support", icon: <FontAwesome name="question-circle" size={24} color="orange" />, screen: "Support" },
    { name: "Profile Settings", icon: <MaterialIcons name="settings" size={24} color="white" />, screen: "ProfileSettings" },
    { name: "Logout", icon: <MaterialIcons name="logout" size={24} color="white" />, screen: "SignInPage" },
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
              colors={['#228B22', '#90EE90']}
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
          
          <View style={styles.coverImageContainer}>
            <Image style={styles.coverImage} source={require("../../assets/profile-img.png")} />
          </View>

          <View style={styles.header}>
            <Image style={styles.profileImg} source={require("../../assets/profile-img.png")} />
            <Text style={styles.greeting}>Hi, {username}</Text>
            <Text style={styles.greeting1}>I am an ecogreen patriot and circular economist!</Text>
          </View>

          <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("ProfileGCPs", { name: username, bal: cash })}>
              <Image style={styles.cardIcon} source={require("../../assets/checked.png")} />
              <Text style={styles.cardValue}>GCP {cash}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Happy")}>
              <Image style={styles.cardIcon} source={require("../../assets/stats_2500115.png")} />
              <Text style={styles.cardValue}>#333</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("CarbonCalculator")}>
              <Image style={styles.cardIcon} source={require("../../assets/menu.jpg")} />
              <Text style={styles.cardTitle}>GCPs Calculator 🔐</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("GreenConnect")}>
              <Image style={styles.cardIcon} source={require("../../assets/electric.png")} />
              <Text style={styles.cardTitle}>Connect Green</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Win EcoGreen Promos Now! 🎉</Text>

          <View style={styles.progressBarContainer}>
            {Object.keys(targetData).map((topic, index) => (
              <View key={index} style={styles.topicContainer}>
                <View style={styles.topicContent}>
                  <Image source={topicIcons[topic]} style={styles.topicIcon} />
                  <View style={styles.topicInfo}>
                    <Text style={styles.topicName}>{topic}</Text>
                    <View style={styles.progressBar}>
                      <LinearGradient
                        style={[
                          styles.progress,
                          {
                            width: `${calculateProgress(completedData[topic], targetData[topic])}%`,
                            backgroundColor: calculateProgress(completedData[topic], targetData[topic]) >= 60 ? 'green' : '#ffbf1a',
                          },
                        ]}
                        colors={calculateProgress(completedData[topic], targetData[topic]) >= 60 ? ["#0f0", "#0a0"] : ["#ffbf1a", "#ff4080"]}
                      />
                    </View>
                    <Text style={styles.achievementText}>
                      {`${calculateProgress(completedData[topic], targetData[topic])}% Achieved!`}
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
                    activeCardIndex === index ? styles.activeDot : styles.inactiveDot
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
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    paddingTop: '4%',
  },
  scrollContainer: {
    paddingBottom: 20,
    margin: 15
  },
  coverImageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginTop: 10,
    borderBottomRadius: 10,
    marginBottom: -25,
  },
  coverImage: {
    width: '90%',
    height: 90,
    borderRadius: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImg: {
    width: '23%',
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
    marginTop: -10,
  },
  greeting: {
    fontSize: 15, // Adjusted for responsiveness
    fontWeight: '600',
    color: 'green',
  },
  greeting1: {
    fontSize: 12,
    color: '#888',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'center',
    marginBottom: 8
  },
  card: {
    width: '45%',
    padding: 5,
    marginVertical: 6,
    marginHorizontal: 3,
    backgroundColor: '#fff',
    borderRadius: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 2,
  },
  cardIcon: {
    width: '24%',
    height: 35,
    marginBottom: 10,
    borderRadius: 14
  },
  cardTitle: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16, // Adjusted for responsiveness
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginVertical: 7,
  },
  progressBarContainer: {
    marginBottom: -20
  },
  topicContainer: {
    marginBottom: 20,
  },
  topicContent: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 5,
  },
  achievementText: {
    marginTop: 5,
    fontSize: 11,
    color: '#888',
  },
  gradientCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  gradientCard: {
    width: '30%',
    height: '70%',
    marginHorizontal: 5,
    marginBottom: -5
  },
  cardGradient: {
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  cardText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'green',
  },
  inactiveDot: {
    backgroundColor: '#bbb',
  },
});

export default ProfilePage;
