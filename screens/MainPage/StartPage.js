import React, { useRef, useEffect } from "react";
import { Image, Animated, StyleSheet, Text, View, Easing, TouchableOpacity, Dimensions, Platform } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { FontFamily, FontSize, Color } from "../../GlobalStyles";

const { width, height } = Dimensions.get('window');

const StartPage = () => {
  const navigation = useNavigation();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animatedValues = useRef([1, 2, 3, 4, 5, 6].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 5000,
        easing: Easing.bounce,
        useNativeDriver: true,
      })
    ).start();

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

  const waveInterpolation = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["0deg", "-10deg", "0deg"],
  });

  const translateYInterpolation = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -10, 0],
  });

  const bubbles = animatedValues.map((animatedValue, index) => {
    let initialY;
    if (index < 2) {
      initialY = height;
    } else if (index < 4) {
      initialY = height / 2;
    } else {
      initialY = -150;
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
      left: index * (width / 10) + 50,
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
      <Text style={styles.manageYourWaste}>
        Connect & Join our Green Economic Model today!
      </Text>

      <TouchableOpacity
        style={styles.getStartedBtn}
        onPress={() => navigation.navigate("SignInPage")}
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
    width: width * 0.08,
    height: width * 0.08,
    backgroundColor: "lightgreen",
    borderRadius: (width * 0.08) / 2,
    position: "absolute",
  },
  startimgIcon: {
    top: height * 0.27,
    left: width * 0.1,
    width: width * 0.85,
    height: height * 0.4,
    position: "absolute",
  },
  greenbin: {
    top: height * 0.17,
    left: 5,
    fontSize: FontSize.size_13xl,
    color: Color.colorGray_500,
    width: width * 0.9,
    height: 56,
    position: "absolute",
  },
  manageYourWaste: {
    top: height * 0.7,
    left: '4%',
    fontSize: 15,
    color: Color.colorGray_800,
    fontWeight: '400',
  },
  getStartedBtn: {
    backgroundColor: "white",
    shadowColor: "#000",
    left: width * 0.2,
    top: height * 0.8,
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    alignContent: "center",
    width: width * 0.6,
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  cardText: {
    color: 'green',
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

// Platform-specific styles
const platformStyles = StyleSheet.create({
  getStartedBtn: {
    ...Platform.select({
      ios: {
        // iOS specific styles
        backgroundColor: "lightblue",
      },
      android: {
        // Android specific styles
        backgroundColor: "lightgreen",
      },
    }),
  },
});

export default StartPage;
