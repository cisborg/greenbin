import * as React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";

const ProfilePage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.profilePage}>
      <View style={[styles.profilePageChild, styles.childPosition]} />
      <Text style={[styles.hiDhananjay, styles.textTypo]}>Hi,Josh Doe</Text>
      <Image
        style={styles.profileImgIcon}
        contentFit="cover"
        source={require("../assets/profile-img.png")}
      />
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
      
      <Pressable
        style={styles.signOut}
        onPress={() => navigation.navigate("StartPage")}
      >
        <Text style={styles.signOut1}>Sign Out?</Text>
      </Pressable>
      <View style={[styles.rectangleParent, styles.groupLayout]}>
        <View style={[styles.groupChild, styles.groupLayout]} />
        <Text style={[styles.challengePoints1000, styles.textClr]}>
          GCPs Balance: +1530 
        </Text>
      </View>
      <View style={[styles.rectangleGroup, styles.groupLayout]}>
        <View style={[styles.groupChild, styles.groupLayout]} />
        <Text
          style={[styles.helpSupport, styles.helpSupportTypo]}
        >{`GCPs LeaderBoard`}</Text>
        <Image
          style={[styles.vectorIcon3, styles.vectorIconLayout]}
          contentFit="cover"
          source={require("../assets/vector3.png")}
        />
      </View>
      <View style={[styles.rectangleContainer, styles.groupLayout]}>
        <View style={[styles.groupChild, styles.groupLayout]} />
        <Text
          style={[styles.securityPrivacy, styles.helpSupportTypo]}
        >{`Security & Privacy`}</Text>
        <Image
          style={[styles.vectorIcon4, styles.vectorIconLayout]}
          contentFit="cover"
          source={require("../assets/vector4.png")}
        />
      </View>
      <View style={[styles.groupView, styles.groupLayout]}>
        <View style={[styles.groupChild, styles.groupLayout]} />
        <Text style={[styles.securityPrivacy, styles.helpSupportTypo]}>
          Find Green Connects
        </Text>
      </View>
      <Text style={styles.yourProfile}>Your Profile</Text>
      <Image
        style={styles.userLightIcon}
        contentFit="cover"
        source={require("../assets/user-light.png")}
      />
      <Image
        style={styles.profilePeopleImg}
        contentFit="cover"
        source={require("../assets/profile-people-img.png")}
      />
      <Pressable style={styles.image2} onPress={() => navigation.goBack()}>
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/image-2.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  childPosition: {
    left: 0,
    top: 0,
  },
  textTypo: {
    textAlign: "center",
    fontFamily: FontFamily.poppinsBold,
  },
  vectorIconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  textClr: {
    color: Color.colorBlack,
    fontWeight: "700",
    position: "absolute",
  },
  groupLayout: {
    height: 63,
    width: 354,
    position: "absolute",
  },
  helpSupportTypo: {
    fontFamily: FontFamily.manropeSemiBold,
    top: 17,
    fontWeight: "600",
    textAlign: "left",
    color: Color.colorBlack,
    fontSize: FontSize.size_xl,
    position: "absolute",
  },
  profilePageChild: {
    backgroundColor: Color.colorLimegreen_200,
    width: 390,
    height: 294,
    position: "absolute",
  },
  hiDhananjay: {
    top: 230,
    left: 119,
    color: Color.colorWhite,
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    fontSize: FontSize.size_xl,
    position: "absolute",
  },
  profileImgIcon: {
    top: 101,
    left: 135,
    width: 120,
    height: 118,
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
    textAlign: "center",
    fontFamily: FontFamily.poppinsBold,
  },
  notification: {
    width: 355,
    height: 28,
    left: 18,
    top: 0,
    position: "absolute",
  },
  signOut1: {
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorDarkturquoise,
    textAlign: "left",
  },
  signOut: {
    left: 17,
    top: 925,
    alignItems: "center",
    position: "absolute",
  },
  groupChild: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorLightgray,
    left: 0,
    top: 0,
  },
  challengePoints1000: {
    top: 18,
    fontFamily: FontFamily.manropeBold,
    textAlign: "left",
    left: 18,
    fontSize: FontSize.size_xl,
    color: Color.colorBlack,
  },
  rectangleParent: {
    top: 320,
    left: 19,
    width: 354,
  },
  helpSupport: {
    left: 67,
  },
  vectorIcon3: {
    height: "38.41%",
    width: "6.84%",
    top: "30.16%",
    right: "87.23%",
    bottom: "31.43%",
    left: "5.93%",
  },
  rectangleGroup: {
    top: 399,
    left: 19,
    width: 354,
  },
  securityPrivacy: {
    left: 66,
  },
  vectorIcon4: {
    height: "39.68%",
    width: "6.61%",
    top: "26.98%",
    right: "87.18%",
    bottom: "33.33%",
    left: "6.21%",
  },
  rectangleContainer: {
    top: 478,
    left: 19,
    width: 354,
  },
  groupView: {
    top: 558,
    left: 19,
    width: 354,
  },
  yourProfile: {
    top: 47,
    left: 187,
    fontSize: FontSize.size_5xl,
    fontFamily: FontFamily.poppinsSemiBold,
    color: "rgba(255, 255, 255, 0.86)",
    width: 186,
    height: 39,
    fontWeight: "600",
    textAlign: "center",
    position: "absolute",
    paddingBottom: "10px",
  },
  userLightIcon: {
    top: 577,
    left: 41,
    borderRadius: Border.br_4xl,
    width: 24,
    height: 24,
    position: "absolute",
  },
  profilePeopleImg: {
    top: 647,
    left: 25,
    
    width: 350,
    height: 261,
    
    position: "relative",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  image2: {
    left: 1,
    top: 33,
    width: 79,
    height: 79,
    position: "absolute",
  },
  profilePage: {
    backgroundColor: Color.colorWhitesmoke,
    flex: 1,
    height: 844,
    overflow: "hidden",
    width: "100%",
  },
});

export default ProfilePage;
