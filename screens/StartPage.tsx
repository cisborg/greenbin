import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Border, FontSize, Color } from "../GlobalStyles";

const StartPage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.startPage}>
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
      <Text style={[styles.greenbin, styles.textTypo]}>GreenBin</Text>
      <Image
        style={styles.startimgIcon}
        contentFit="cover"
        source={require("../assets/startimg.png")}
      />
      <Text style={[styles.manageYourWaste, styles.getStartedTypo]}>
        Manage your waste effectively!
      </Text>
      <Pressable
        style={[styles.getStartedBtn, styles.getLayout]}
        onPress={() => navigation.navigate("RegisterPage")}
      >
        <View style={[styles.getStartedBtnChild, styles.textPosition]} />
        <Text style={[styles.getStarted, styles.getStartedTypo]}>
          Get Started
        </Text>
      </Pressable>
      <View style={styles.notification}>
        <Image
          style={[styles.vectorIcon, styles.vectorIconLayout]}
          contentFit="cover"
          source={require("../assets/vector.png")}
        />
        <Image
          style={[styles.vectorIcon1, styles.vectorIconLayout]}
          contentFit="cover"
          source={require("../assets/vector1.png")}
        />
        <Image
          style={[styles.vectorIcon2, styles.vectorIconLayout]}
          contentFit="cover"
          source={require("../assets/vector2.png")}
        />
        <Text style={[styles.text, styles.textPosition]}>{`9:40 `}</Text>
      </View>
      <Pressable
        style={[styles.getStartedBtn1, styles.getLayout]}
        onPress={() => navigation.navigate("RegisterPage")}
      >
        <View style={[styles.getStartedBtnChild, styles.textPosition]} />
        <Text style={[styles.getStarted, styles.getStartedTypo]}>
          Get Started
        </Text>
      </Pressable>
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
  textTypo: {
    textAlign: "center",
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
  },
  getStartedTypo: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    textAlign: "center",
    position: "absolute",
  },
  getLayout: {
    height: 53,
    width: 322,
    left: 34,
    borderRadius: Border.br_base,
    position: "absolute",
  },
  textPosition: {
    left: "0%",
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
    top: 147,
    left: 94,
    fontSize: FontSize.size_29xl,
    color: Color.colorGray_500,
    width: 229,
    height: 56,
    position: "absolute",
  },
  startimgIcon: {
    top: 229,
    left: 37,
    width: 318,
    height: 335,
    position: "absolute",
  },
  manageYourWaste: {
    top: 577,
    left: 67,
    fontSize: FontSize.size_base,
    color: Color.colorGray_800,
  },
  getStartedBtnChild: {
    height: "100%",
    top: "0%",
    backgroundColor: Color.colorLimegreen_100,
    bottom: "0%",
    right: "0%",
    borderRadius: Border.br_base,
    left: "0%",
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
  getStartedBtn: {
    top: 627,
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
  text: {
    top: "42.86%",
    fontSize: FontSize.size_sm,
    color: Color.colorBlack,
    textAlign: "center",
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
  },
  notification: {
    top: 0,
    left: 18,
    width: 355,
    height: 28,
    position: "absolute",
  },
  getStartedBtn1: {
    top: 395,
  },
  startPage: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    height: 844,
    overflow: "hidden",
    width: "100%",
  },
});

export default StartPage;
