import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
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

      <Text style={[styles.welcomeAgainPlease, styles.greenbinFlexBox]}>
        We Value You! Proceed to log in...
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.inputField}
          value={password}
          onChangeText={setPassword}
          placeholder="**********"
          secureTextEntry
        />
      </View>

      <View style={styles.dontHaveAnContainer}>
        <Text style={[styles.text, styles.textTypo]}>
          <Text style={styles.dontHaveAn}>Don’t have an account?</Text>
          <Text style={styles.text1}>{` `}</Text>
          <Text onPress={() => navigation.navigate("RegisterPage")} style={styles.register}>
            Register
          </Text>
        </Text>
      </View>

      <Image
        style={styles.loginimgIcon}
        contentFit="cover"
        source={require("../assets/loginimg.png")}
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
  label: {
    fontSize: FontSize.size_base,
    color: Color.colorGray_800,
    fontFamily: FontFamily.poppinsBold,
    marginBottom: 5,
  },
  inputField: {
    height: 50,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_base,
    borderWidth: 1,
    borderColor: Color.colorGray_300,
    justifyContent: "center",
    paddingHorizontal: 10,
    fontSize: FontSize.size_base,
    width: 330,
    
  },
 
  input: {
    height: "100%",
    paddingHorizontal: 10,
    fontSize: FontSize.size_base,
    color: Color.colorGray_200,
  },
  inputContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    top: 520,
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
    left: 98,
    width: 200,
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
  dontHaveAnContainer: {
    left: 31,
    top: 693,
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
    backgroundColor: Color.colorWhitesmoke,
    flex: 1,
    height: 844,
    overflow: "hidden",
    width: 400,
  },
});

export default SignInPage;
