import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";

const SignInPage = () => {
  const navigation = useNavigation();
  const [password, setPassword] = React.useState("");

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
      
      <Text style={[styles.welcomeAgainPlease, styles.greenbinFlexBox]}>
        Ecodigital Solutions for Greener Future!
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.inputField}
          value={password}
          onChangeText={setPassword}
          placeholder="login with password..."
          placeholderTextColor={Color.colorGray_100}
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        style={styles.getStartedBtn}
        onPress={() => navigation.navigate("Main")}
      >
        <Text style={styles.cardText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.dontHaveAnContainer}>
        <Text style={[styles.text, styles.textTypo]}>
          <Text style={styles.dontHaveAn}>Don’t have an account?</Text>
          <Text style={styles.text1}>{` `}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("RegisterPage")}>
            <Text style={styles.register}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
            <Text style={{ color: 'green' }}>Forgot Password?</Text>
          </TouchableOpacity>
        </Text>
      </View>

      <Image
        style={styles.loginimgIcon}
        contentFit="cover"
        source={require("../assets/connect.webp")}
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
  greenbinFlexBox: {
    textAlign: "center",
    position: "absolute",
  },
  label: {
    fontSize: FontSize.size_base,
    color: Color.colorLimegreen_200,
    fontFamily: FontFamily.poppinsBold,
    marginBottom: 5,
  },
  inputField: {
    height: 40,
    backgroundColor: Color.colorWhite,
    justifyContent: "center",
    paddingHorizontal: 10,
    fontSize: FontSize.size_base,
    width: 330,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    top: 570,
  },
  getStartedBtn: {
    backgroundColor: Color.colorLimegreen_200,
    shadowColor: "#000",
    left: 120,
    top: 590,
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    alignContent: "center",
    width: 150,
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  cardText: {
    color: "white",
    fontWeight: '700',
    fontSize: 18,
    fontFamily: FontFamily.manropeBold,
  },
  textTypo: {
    fontSize: FontSize.size_sm,
    textAlign: "center",
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
  welcomeAgainPlease: {
    top: 190,
    left: 77,
    fontSize: FontSize.size_mini,
    width: 236,
    height: 51,
    color: Color.colorGray_600,
    fontFamily: FontFamily.poppinsRegular,
  },
  dontHaveAnContainer: {
    left: 50,
    top: 750,
    position: "absolute",
  },
  loginimgIcon: {
    top: 250,
    left: 28,
    width: 334,
    height: 265,
    position: "absolute",
    borderRadius: 30,
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
  signInPage: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    height: 844,
    overflow: "hidden",
  },
});

export default SignInPage;
