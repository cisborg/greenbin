import * as React from "react";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/core";
import { TouchableHighlight } from "react-native-gesture-handler";

const EventsInformationPage = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.eventsInformationPage}>
      <Image
        style={styles.shapesIcon}
        contentFit="cover"
        source={require("../assets/shapes.png")}
      />
      <Image
        style={[styles.shapesIcon1, styles.vectorIconLayout]}
        contentFit="cover"
        source={require("../assets/shapes.png")}
      />
      <Pressable style={styles.newsInfoContainer}>
        <Text
          style={[styles.newsInfo, styles.newsInfoTypo]}
          onPress={() => navigation.navigate("ChallengePage")}
        >
          {`News & Info`}
        </Text>
      </Pressable>

      {/* Search Bar */}
      <View style={styles.Barr}>
        <TextInput
          style={styles.searchBarr}
          placeholder="Search For Top Events Expos & News"
          placeholderTextColor={Color.colorGray_100}
        />
      </View>

      {/* Scrollable Events Section */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Pressable>
        <View style={styles.event3Parent}>
          
            <View style={styles.eventContainer}>
            
              <Image
                style={styles.eventImage}
                contentFit="cover"
                source={require("../assets/rectangle-57.png")}
              />
              <Text style={styles.wasteTechnologyKenya}>
                {`Waste Technology Kenya Expo 2024\n13th-15th Sept 2024\n Nakuru`}
              </Text>
            </View>
         
          <View style={styles.eventContainer}>
            
            <Image
              style={styles.eventImage}
              contentFit="cover"
              source={require("../assets/rectangle-57.png")}
            />
            <Text style={styles.cleanKenyaShow}>
              {`Clean Kenya Show (CKS)\n13th-15th September 2024`}
            </Text>
          </View>
          <View style={styles.eventContainer}>
            
            <Image
              style={styles.eventImage}
              contentFit="cover"
              source={require("../assets/rectangle-571.png")}
            />
            <Text style={styles.cleanKenyaShow}>
              {`Clean Kenya Show (CKS)\n13th-15th September 2024`}
            </Text>
          </View>
          <View style={styles.eventContainer}>
            
            <Image
              style={styles.eventImage}
              contentFit="cover"
              source={require("../assets/rectangle-57.png")}
            />
            <Text style={styles.cleanKenyaShow}>
              {`Clean Kenya Show (CKS)\n13th-15th September 2024`}
            </Text>
          </View>
          <View style={styles.eventContainer}>
            
            <Image
              style={styles.eventImage}
              contentFit="cover"
              source={require("../assets/rectangle-571.png")}
            />
            <Text style={styles.skrapEventNjoro}>
              {`Skrap Event Njoro, Nakuru\n1st September 2024`}
            </Text>
          </View>
          <View style={styles.eventContainer}>
            
            <Image
              style={styles.eventImage}
              contentFit="cover"
              source={require("../assets/rectangle-57.png")}
            />
            <Text style={styles.skrapEventNjoro}>
              {`Exhibition Event Mombasa, Kenya\n1st September 2024`}
            </Text>
          </View>
        </View>
        </Pressable>
      </ScrollView>

      {/* News & Info Button */}
      
    </View>
  );
};

const styles = StyleSheet.create({
  vectorIconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  event3Parent: {
    padding: 10,
  },
  eventContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    height: 190,
  },
  wasteTechnologyKenya: {
    padding: 10,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_mini,
    textAlign: "center",
    fontWeight: "700",
  },
  cleanKenyaShow: {
    padding: 10,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_mini,
    textAlign: "center",
    fontWeight: "700",
  },
  skrapEventNjoro: {
    padding: 20,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_mini,
    textAlign: "center",
    fontWeight: "700",
  },
  eventImage: {
    height: 120,
    width: 404,
    paddingLeft: 20,
    paddingRight: 20,
  },
  Barr: {
    width: 390, // Adjusted width for phone screen
    marginBottom: 130,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    margin: 10,
    top: 100,
  },
  searchBarr: {
    height: 35,
    paddingHorizontal: 10,
    fontSize: 14,
    color: '#333',
  },
  shapesIcon: {
    top: -52,
    left: -54,
    width: 235,
    height: 173,
    position: "absolute",
  },
  shapesIcon1: {
    height: "20.5%",
    width: "60.26%",
    top: "84.24%",
    right: "-18.97%",
    bottom: "-4.74%",
    left: "58.72%",
  },
  eventsInformationPage: {
    backgroundColor: Color.colorWhitesmoke,
    flex: 1,
    width: 404,
  },
  newsInfoContainer: {
    alignItems: 'center', // Center the News & Info text
    marginVertical: 10,
    marginHorizontal: 20,
  },
  newsInfoTypo: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    textAlign: "center",
    fontSize: FontSize.size_5xl,
    color: Color.colorLimegreen_100,
    letterSpacing: 0.5,
    top: 50,
    left: 100,
  },
});

export default EventsInformationPage;
