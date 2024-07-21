import * as React from "react";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/core";

const EventsInformationPage = () => {
  const navigation = useNavigation()
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
      <View style={[styles.event3Parent, styles.menuBarIconPosition]}>
        <View style={[styles.event3, styles.event3Layout]}>
          <Text
            style={[styles.wasteTechnologyKenya, styles.textTypo]}
          >{`Waste Technology Kenya Expo 2024
13th-15th September 2024`}</Text>
          <Image
            style={[styles.event3Child, styles.event3Layout]}
            contentFit="cover"
            source={require("../assets/rectangle-57.png")}
          />
        </View>
        <View style={[styles.event2, styles.eventLayout]}>
          <Text
            style={[styles.cleanKenyaShow, styles.cleanKenyaShowTypo]}
          >{`Clean Kenya Show (CKS)
13th-15th September 2024`}</Text>
          <Image
            style={[styles.event3Child, styles.event3Layout]}
            contentFit="cover"
            source={require("../assets/rectangle-57.png")}
          />
        </View>
        <View style={[styles.event1, styles.eventLayout]}>
          <Text
            style={[styles.skrapEventNjoro, styles.cleanKenyaShowTypo]}
          >{`Skrap Event Njoro, Nakuru
1st September 2024`}</Text>
          <Image
            style={[styles.event3Child, styles.event3Layout]}
            contentFit="cover"
            source={require("../assets/rectangle-571.png")}
          />
        </View>
        <Text style={[styles.locationNairobiKenya, styles.newsInfoTypo]}>
          Location: Nairobi,Kenya
        </Text>
        <View style={styles.tabs} 
        >
        
          <View style={[styles.rectangleParent, styles.rectangleLayout]} >
            <View style={[styles.groupChild, styles.groupLayout]} />
            <Text style={[styles.events, styles.newsTypo]}>Events</Text>
          </View>
        
          <View style={[styles.rectangleGroup, styles.rectangleLayout]}>
            <View style={[styles.groupItem, styles.groupLayout]} />
            <Text style={[styles.news, styles.newsTypo]}>News</Text>
          </View>
        </View>
        <Pressable >

          <Text style={[styles.newsInfo, styles.newsInfoTypo]} 
          onPress={() => navigation.navigate("ChallengePage")}
        >{`News & Info`}</Text>

        </Pressable>
      </View>
      <Image
        style={[styles.menuBarIcon, styles.menuBarIconPosition]}
        contentFit="cover"
        source={require("../assets/menu-bar.png")}
      />
      
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
  menuBarIconPosition: {
    width: 390,
    left: 0,
    bottom: 0,
    
    position: "relative",
  },
  event3Layout: {
    width: 354,
    position: "absolute",
  },
  textTypo: {
    textAlign: "center",
    fontWeight: "700",
    color: Color.colorBlack,
    position: "absolute",
  },
  eventLayout: {
    height: 206,
    width: 354,
    position: "absolute",
  },
  cleanKenyaShowTypo: {
    top: 162,
    textAlign: "center",
    color: Color.colorBlack,
    fontFamily: FontFamily.manropeBold,
    fontWeight: "700",
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  newsInfoTypo: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    textAlign: "center",
    position: "absolute",
  },
  rectangleLayout: {
    width: 87,
    height: 42,
    top: 0,
    position: "absolute",
  },
  groupLayout: {
    borderRadius: Border.br_3xs,
    width: 87,
    height: 42,
    top: 0,
    left: 0,
    position: "absolute",
  },
  newsTypo: {
    textAlign: "left",
    top: 10,
    fontFamily: FontFamily.manropeBold,
    fontWeight: "700",
    fontSize: FontSize.size_base,
    position: "absolute",
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
  wasteTechnologyKenya: {
    top: 166,
    left: 43,
    fontFamily: FontFamily.manropeBold,
    fontSize: FontSize.size_base,
    textAlign: "center",
    fontWeight: "700",
  },
  event3Child: {
    height: 155,
    top: 0,
    left: 0,
  },
  event3: {
    top: 627,
    height: 210,
    left: 18,
  },
  cleanKenyaShow: {
    left: 77,
  },
  event2: {
    top: 407,
    left: 18,
  },
  skrapEventNjoro: {
    left: 70,
  },
  event1: {
    top: 181,
    left: 19,
  },
  locationNairobiKenya: {
    top: 144,
    left: 54,
    fontSize: FontSize.size_mini,
    color: Color.colorDarkslategray,
    width: 282,
    height: 35,
  },
  groupChild: {
    backgroundColor: "#528265",
  },
  events: {
    left: 16,
    color: Color.colorWhite,
  },
  rectangleParent: {
    left: 0,
  },
  groupItem: {
    backgroundColor: Color.colorWhite,
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderWidth: 1,
  },
  news: {
    left: 23,
    color: Color.colorBlack,
    top: 10,
  },
  rectangleGroup: {
    left: 105,
  },
  tabs: {
    top: 89,
    left: 100,
    width: 192,
    height: 42,
    position: "absolute",
  },
  newsInfo: {
    left: 181,
    fontSize: FontSize.size_13xl,
    color: Color.colorGray_800,
    width: 198,
    height: 39,
    top: 0,
  },
  event3Parent: {
    top: 51,
    height: 719,
  },
  menuBarIcon: {
    top: 770,
    height: 74,
  },
  vectorIcon: {
    height: "42.86%",
    width: "6.2%",
    top: "46.43%",
    right: "0%",
    bottom: "10.71%",
    left: "93.8%",
  },
  vectorIcon1: {
    height: "60.71%",
    width: "6.48%",
    top: "35.71%",
    right: "7.61%",
    bottom: "3.57%",
    left: "85.92%",
  },
  vectorIcon2: {
    height: "67.86%",
    width: "5.63%",
    top: "32.14%",
    right: "16.06%",
    bottom: "0%",
    left: "78.31%",
  },
  text: {
    top: "42.86%",
    left: "0%",
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.poppinsBold,
    textAlign: "center",
    fontWeight: "700",
  },
  notification: {
    width: 355,
    height: 28,
    top: 0,
    left: 18,
    position: "absolute",
  },
  eventsInformationPage: {
    backgroundColor: Color.colorWhitesmoke,
    flex: 1,
    width: "100%",
    height: 844,
    overflow: "hidden",
  },
});

export default EventsInformationPage;
