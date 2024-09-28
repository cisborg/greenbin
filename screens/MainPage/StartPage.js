import React, { useRef, useEffect } from "react";
import { Image, Animated, StyleSheet, Text, View, Easing, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { FontFamily, Border, FontSize, Color } from "../../GlobalStyles";

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const StartPage = () => {
  const navigation = useNavigation();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animatedValues = useRef([1, 2, 3, 4, 5, 6].map(() => new Animated.Value(0))).current;

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
      initialY = height; // from bottom
    } else if (index < 4) {
      initialY = height / 2; // from middle
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
      left: index * (width / 10) + 50, // Responsive left position
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
        source={require("../../assets/startimg.png")}
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
  startPage: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    height: height,
    overflow: "hidden",
  },
  bubble: {
    width: width * 0.08, // Responsive width
    height: width * 0.08, // Responsive height
    backgroundColor: "lightgreen",
    borderRadius: (width * 0.08) / 2, // Responsive border radius
    position: "absolute",
  },
  startimgIcon: {
    top: height * 0.27, // Responsive top
    left: width * 0.1, // Responsive left
    width: width * 0.85, // Responsive width
    height: height * 0.4, // Responsive height
    position: "absolute",
  },
  greenbin: {
    top: height * 0.17, // Responsive top
    left: 5,
    fontSize: FontSize.size_13xl,
    color: Color.colorGray_500,
    width: width * 0.9, // Responsive width
    height: 56,
    position: "absolute",
  },
  manageYourWaste: {
    top: height * 0.7, // Responsive top
    left: 30,
    fontSize: FontSize.size_base,
    color: Color.colorGray_800,
    fontWeight: '400',
  },
  getStartedBtn: {
    backgroundColor: "white",
    shadowColor: "#000",
    left: width * 0.2, // Responsive left
    top: height * 0.8, // Responsive top
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    alignContent: "center",
    width: width * 0.6, // Responsive width
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
  textTypo: {
    textAlign: "center",
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
  },
});

export default StartPage;
