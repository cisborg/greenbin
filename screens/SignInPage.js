import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";

const SignInPage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.signInPage}>
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
      <View style={styles.welcomeMessage}>
        <Text style={[styles.greenbin, styles.greenbinFlexBox]}>GreenBin!</Text>
        <Text style={[styles.welcomeTo, styles.welcomeToTypo]}>Welcome to</Text>
      </View>
      <Pressable
        style={styles.loginBtn}
        onPress={() => navigation.navigate("HomePageExistingUser")}
      >
        <View style={[styles.loginBtnChild, styles.text2Position]} />
        <Text style={[styles.getStarted, styles.welcomeToTypo]}>Login</Text>
      </Pressable>
      <Text
        style={[styles.welcomeAgainPlease, styles.greenbinFlexBox]}
      >{`We Value You!
Proceed to log in...`}</Text>
      
      <View style={[styles.passwordInp, styles.inpLayout]}>
        <View style={styles.emailInpChild} />
        <View style={styles.emailInpItem} />
        <Text style={styles.dhnaanjayTypo} />
      </View>
     
      <View
        style={styles.dontHaveAnContainer}
        
      >
        <Text style={[styles.text, styles.textTypo]}>
          <Text style={styles.dontHaveAn}>Don’t have an account ?</Text>
          <Text style={styles.text1}>{` `}</Text>
          <Text onPress={() => navigation.navigate("RegisterPage")} style={styles.register}>Register</Text>
        </Text>
      </View>
      
      <Image
        style={styles.loginimgIcon}
        contentFit="cover"
        source={require("../assets/loginimg.png")}
      />
      
      <Text style={[styles.text3, styles.text3Typo]} >************</Text>
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
  greenbinFlexBox: {
    textAlign: "center",
    position: "absolute",
  },
  welcomeToTypo: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    textAlign: "center",
    position: "absolute",
  },
  text2Position: {
    left: "0%",
    position: "absolute",
  },
  inpLayout: {
    height: 49,
    width: 364,
    left: 13,
    backgroundColor: Color.colorWhite,
    position: "absolute",
  },
  dhnaanjayTypo: {
    textAlign: "left",
    color: Color.colorGray_200,
    left: "6.04%",
    top: "37.96%",
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    position: "absolute",
  },
  textTypo: {
    fontSize: FontSize.size_sm,
    textAlign: "center",
  },
  text3Typo: {
    left: 40,
    textAlign: "left",
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
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
  greenbin: {
    top: 7,
    left: 0,
    fontSize: FontSize.size_29xl,
    color: "green",
    height: 56,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    width: 275,
  },
  welcomeTo: {
    left: 127,
    color: Color.colorGray_800,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    top: 0,
  },
  welcomeMessage: {
    top: 97,
    left: 80,
    height: 63,
    width: 229,
    position: "absolute",
  },
  loginBtnChild: {
    backgroundColor: Color.colorLimegreen_100,
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    left: "0%",
    borderRadius: Border.br_base,
    width: "100%",
  },
  getStarted: {
    height: "50%",
    width: "39.01%",
    top: "25.09%",
    left: "30.22%",
    fontSize: FontSize.size_lg,
    color: Color.colorWhite,
  },
  loginBtn: {
    top: 637,
    left: 34,
    width: 322,
    height: 53,
    borderRadius: Border.br_base,
    position: "absolute",
  },
  welcomeAgainPlease: {
    top: 190,
    left: 77,
    fontSize: FontSize.size_mini,
    width: 236,
    height: 51,
    color: Color.colorGray_600,
    fontFamily: FontFamily.poppinsRegular,
  },
  emailInpChild: {
    borderRadius: Border.br_81xl,
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderWidth: 1,
    backgroundColor: Color.colorWhite,
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  emailInpItem: {
    height: "200%",
    width: "27.47%",
    top: "-60%",
    right: "25.55%",
    bottom: "-40%",
    left: "46.98%",
    position: "absolute",
    overflow: "hidden",
  },
  dhnaanjayPanasare: {
    display: "none",
  },
  emailInp: {
    top: 508,
  },
  passwordInp: {
    top: 573,
  },
  dontHaveAn: {
    color: Color.colorGray_600,
  },
  text1: {
    color: Color.colorDarkcyan,
  },
  register: {
    color: Color.colorDarkturquoise,
  },
  text: {
    width: 268,
    height: 28,
    fontFamily: FontFamily.poppinsRegular,
  },
  dontHaveAnContainer: {
    left: 31,
    top: 693,
    position: "absolute",
  },
  loginimgIcon: {
    top: 280,
    left: 28,
    width: 334,
    height: 265,
    position: "absolute",
  },
  vectorIcon: {
    height: "42.86%",
    width: "6.2%",
    top: "46.43%",
    bottom: "10.71%",
    left: "93.8%",
    right: "0%",
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
    left: "78.31%",
    bottom: "0%",
  },
  text2: {
    top: "42.86%",
    color: Color.colorBlack,
    left: "0%",
    position: "absolute",
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
  },
  notification: {
    left: 18,
    width: 355,
    height: 28,
    top: 0,
    position: "absolute",
  },
  dhnaanjay: {
    top: 521,
    color: "#242020",
  },
  text3: {
    top: 587,
    color: Color.colorBlack,
  },
  signInPage: {
    backgroundColor: Color.colorWhitesmoke,
    flex: 1,
    height: 844,
    overflow: "hidden",
    width: "100%",
  },
});

export default SignInPage;
