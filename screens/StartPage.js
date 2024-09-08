import React, { useRef, useEffect } from "react";
import { Image, Animated, StyleSheet, Text, View, Easing, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { FontFamily, Border, FontSize, Color } from "../GlobalStyles";

const StartPage = () => {
  const navigation = useNavigation();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animatedValues = useRef([1, 2, 3, 4, 5,6].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Looping wave animation for the image
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 5000,
        easing: Easing.bounce,
        useNativeDriver: true,
      })
    ).start();

    // Looping bubble animations
    const createBubbleAnimation = (animatedValue, delay) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 2000,
            delay,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animatedValues.forEach((animatedValue, index) => {
      createBubbleAnimation(animatedValue, index * 500);
    });
  }, [animatedValue, animatedValues]);

  // Interpolating the animated value to create a wave-like effect
  const waveInterpolation = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["0deg", "-10deg", "0deg"],
  });

  const translateYInterpolation = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -10, 0],
  });

  // Interpolations for each bubble's movement, opacity, and initial position
  const bubbles = animatedValues.map((animatedValue, index) => {
    let initialY;
    if (index < 2) {
      initialY = 800; // from bottom
    } else if (index < 4) {
      initialY = 300; // from middle
    } else {
      initialY = -150; // from top
    }
    
    return {
      translateY: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [initialY, initialY - 300],
      }),
      opacity: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      }),
      left: index * 70 + 50,
    };
  });

  return (
    <View style={styles.startPage}>
      {bubbles.map((bubbleStyle, index) => (
        <Animated.View
          key={index}
          style={[
            styles.bubble,
            {
              transform: [{ translateY: bubbleStyle.translateY }],
              opacity: bubbleStyle.opacity,
              left: bubbleStyle.left,
            },
          ]}
        />
      ))}

      <Animated.Image
        style={[
          styles.startimgIcon,
          {
            transform: [
              { rotate: waveInterpolation },
              { translateY: translateYInterpolation },
            ],
          },
        ]}
        contentFit="cover"
        source={require("../assets/startimg.png")}
      />

      <Text style={[styles.greenbin, styles.textTypo]}>Nature Diversity</Text>
      <Text style={[styles.manageYourWaste, styles.getStartedTypo]}>
        Connect & Join our Green Economic Model today!
      </Text>

      <TouchableOpacity
        style={styles.getStartedBtn}
        onPress={() => navigation.navigate("RegisterPage")}
      >
        <Text style={styles.cardText}>Get Started</Text>
      </TouchableOpacity>
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
  getStartedText: {
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
  greenbin: {
    top: 147,
    left: 5,
    fontSize: FontSize.size_13xl,
    color: Color.colorGray_500,
    width: 400,
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
    top: 590,
    left: 30,
    fontSize: FontSize.size_base,
    color: Color.colorGray_800,
    fontWeight: '400',
  },
  getStartedBtn: {
    backgroundColor: "white",
    shadowColor: "#000",
    left: 80,
    top: 650,
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    alignContent: "center",
    width: 230,
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  cardText: {
    color: Color.colorLimegreen_200,
    fontWeight: '700',
    fontSize: 18,
    fontFamily: FontFamily.manropeBold,
  },
  vectorIcon: {
    height: "42.86%",
    width: "6.2%",
    top: "46.43%",
    bottom: "10.71%",
    left: "97.8%",
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
  startPage: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    height: 844,
    overflow: "hidden",
    width: 404,
  },
  bubble: {
    width: 30,
    height: 30,
    backgroundColor: "lightblue",
    borderRadius: 15,
    position: "absolute",
  },
});

export default StartPage;
