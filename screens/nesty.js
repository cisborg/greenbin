import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import { FontFamily, Border, Color, FontSize } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/core";
import Carousel from 'react-native-snap-carousel';

const { width: windowWidth } = Dimensions.get('window');

const ChallengePage = () => {
  const navigation = useNavigation();
  
  // Sample data for challenges
  const challenges = [
    { title: "Plant 5 trees or plants", status: "START", image: require("../assets/image-1.png") },
    { title: "Harvest Rain Water (10L)", status: "STARTED", image: require("../assets/rain1.png") },
    { title: "Recycle 10 Plastic Bottles", status: "STARTED", image: require("../assets/circle-left1.png") },
  ];

  const renderChallengeItem = ({ item }) => (
    <View style={styles.challengeBox}>
      <Image style={styles.challengeImage} contentFit="cover" source={item.image} />
      <Text style={styles.challengeTitle}>{item.title}</Text>
      <Text style={styles.challengeStatus}>{item.status}</Text>
      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText}>START</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.challengePage}>
      <Image
        style={styles.shapesIcon}
        contentFit="cover"
        source={require("../assets/shapes.png")}
      />
      {/* Carousel for challenges */}
      <Carousel
        data={challenges}
        renderItem={renderChallengeItem}
        sliderWidth={windowWidth}
        itemWidth={windowWidth * 0.8}
        layout={"default"}
      />
      {/* Completed Challenges Section */}
      <Text style={styles.completedChallenges}>Completed challenges:</Text>
      {/* Add other components here as needed */}
      <Text style={styles.challenges} onPress={() => navigation.navigate('ProfilePage')}>
        Challenges!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  challengePage: {
    backgroundColor: Color.colorWhitesmoke,
    flex: 1,
    width: "100%",
    height: 844,
    overflow: "hidden",
    alignItems: 'center',
  },
  shapesIcon: {
    top: -52,
    left: -54,
    width: 235,
    height: 173,
    position: "absolute",
  },
  challengeBox: {
    backgroundColor: Color.colorDarkolivegreen,
    borderRadius: Border.br_base,
    width: '100%',
    padding: 20,
    alignItems: 'center',
  },
  challengeImage: {
    width: 100,
    height: 100,
  },
  challengeTitle: {
    fontSize: FontSize.size_lg,
    color: Color.colorWhite,
    fontFamily: FontFamily.poppinsSemiBold,
    marginVertical: 10,
  },
  challengeStatus: {
    fontSize: FontSize.size_base,
    color: Color.colorWhite,
  },
  startButton: {
    backgroundColor: Color.colorCrimson,
    padding: 10,
    borderRadius: 5,
  },
  startButtonText: {
    color: Color.colorWhite,
    fontWeight: 'bold',
  },
  completedChallenges: {
    marginTop: 20,
    fontSize: FontSize.size_5xl,
    color: Color.colorGray_800,
    fontFamily: FontFamily.poppinsSemiBold,
    textAlign: 'center',
  },
});

export default ChallengePage;
