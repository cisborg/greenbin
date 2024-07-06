import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";

const RegisterPage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.registerPage}>
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
        <Text style={styles.greenbin}>GreenBin</Text>
        <Text style={[styles.welcomeTo, styles.welcomeToTypo]}>Welcome to</Text>
      </View>
      <Pressable
        style={styles.registerBtn}
        onPress={() => navigation.navigate("HomePageExistingUser")}
      >
        <View style={[styles.registerBtnChild, styles.childPosition]} />
        <Text style={[styles.getStarted, styles.welcomeToTypo]}>Register</Text>
      </Pressable>
      <Text
        style={[styles.howYouManage, styles.iAcceptTheTypo]}
      >{`How you manage your waste?
If not, then start from now.`}</Text>
      <View style={styles.fullNameInp}>
        <View style={[styles.fullNameInpChild, styles.childPosition]} />
        <View style={styles.fullNameInpItem} />
        <Text style={[styles.dhnaanjayPanasare, styles.textTypo1]}>
          dhnaanjay panasare
        </Text>
      </View>
      <View style={[styles.emailIdInp, styles.inpLayout]}>
        <View style={[styles.fullNameInpChild, styles.childPosition]} />
        <View style={styles.fullNameInpItem} />
        <Text style={[styles.dhnaanjayPanasare1, styles.dhnaanjayTypo]}>
          dhnaanjay panasare
        </Text>
      </View>
      <View style={[styles.passwordInp, styles.inpLayout]}>
        <View style={[styles.fullNameInpChild, styles.childPosition]} />
        <View style={styles.fullNameInpItem} />
        <Text style={[styles.dhnaanjayPanasare1, styles.dhnaanjayTypo]}>
          dhnaanjay panasare
        </Text>
      </View>
      <View style={[styles.contactNoInp, styles.inpLayout]}>
        <View style={[styles.fullNameInpChild, styles.childPosition]} />
        <View style={styles.fullNameInpItem} />
        <Text style={[styles.dhnaanjayPanasare1, styles.dhnaanjayTypo]}>
          dhnaanjay panasare
        </Text>
      </View>
      <View style={[styles.locationInp, styles.inpLayout]}>
        <View style={[styles.fullNameInpChild, styles.childPosition]} />
        <View style={styles.fullNameInpItem} />
        <Text style={styles.dhnaanjayTypo} />
      </View>
      <View
        style={[styles.iAcceptTheTermsConditionParent, styles.groupChildLayout]}
      >
        <Text
          style={[styles.iAcceptThe, styles.iAcceptTheTypo]}
        >{`I accept the terms & conditions`}</Text>
        <View style={[styles.groupChild, styles.groupChildLayout]} />
      </View>
      <Pressable
        style={styles.alreadyHaveAnContainer}
        onPress={() => navigation.navigate("SignInPage")}
      >
        <Text style={[styles.text, styles.textTypo]}>
          <Text style={styles.alreadyHaveAn}>Already have an account ?</Text>
          <Text style={styles.text1}>{` `}</Text>
          <Text style={styles.signIn}>Sign In</Text>
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
        <Text style={[styles.text2, styles.textTypo]}>{`9:40 `}</Text>
      </View>
      <Text style={[styles.dhanajnjay33gmalcom, styles.textTypo1]}>
        dhanajnjay33@gmal’com
      </Text>
      <Text style={[styles.text3, styles.textTypo1]}>***********9</Text>
      <Text style={[styles.text4, styles.textTypo1]}>**********</Text>
      <Text style={[styles.kurlaKamgarNagar, styles.textTypo1]}>
        kurla kamgar nagar
      </Text>
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
  welcomeToTypo: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    textAlign: "center",
    position: "absolute",
  },
  childPosition: {
    left: "0%",
    position: "absolute",
  },
  iAcceptTheTypo: {
    width: 236,
    fontSize: FontSize.size_mini,
    color: Color.colorGray_600,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "center",
    position: "absolute",
  },
  textTypo1: {
    textAlign: "left",
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    position: "absolute",
  },
  inpLayout: {
    height: 49,
    width: 364,
    backgroundColor: Color.colorWhite,
    left: 13,
    position: "absolute",
  },
  dhnaanjayTypo: {
    top: "37.96%",
    textAlign: "left",
    color: Color.colorGray_200,
    left: "6.04%",
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    position: "absolute",
  },
  groupChildLayout: {
    height: 21,
    position: "absolute",
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
    fontSize: FontSize.size_29xl,
    color: Color.colorGray_500,
    height: 56,
    textAlign: "center",
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    left: 0,
    width: 229,
    position: "absolute",
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
  registerBtnChild: {
    backgroundColor: Color.colorLimegreen_100,
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    left: "0%",
    width: "100%",
    borderRadius: Border.br_base,
  },
  getStarted: {
    height: "50%",
    width: "39.01%",
    top: "25.09%",
    left: "30.22%",
    fontSize: FontSize.size_lg,
    color: Color.colorWhite,
  },
  registerBtn: {
    top: 627,
    width: 322,
    height: 53,
    borderRadius: Border.br_base,
    left: 34,
    position: "absolute",
  },
  howYouManage: {
    top: 190,
    left: 77,
    height: 51,
  },
  fullNameInpChild: {
    borderRadius: Border.br_81xl,
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderWidth: 1,
    backgroundColor: Color.colorWhite,
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    left: "0%",
    width: "100%",
  },
  fullNameInpItem: {
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
    top: "38%",
    color: Color.colorGray_200,
    left: "6.04%",
    textAlign: "left",
  },
  fullNameInp: {
    top: 271,
    height: 50,
    width: 364,
    left: 13,
    backgroundColor: Color.colorWhite,
    position: "absolute",
  },
  dhnaanjayPanasare1: {
    display: "none",
  },
  emailIdInp: {
    top: 337,
  },
  passwordInp: {
    top: 402,
  },
  contactNoInp: {
    top: 467,
  },
  locationInp: {
    top: 532,
  },
  iAcceptThe: {
    top: 1,
    left: 30,
    height: 19,
  },
  groupChild: {
    width: 21,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_base,
    top: 0,
    left: 0,
    height: 21,
  },
  iAcceptTheTermsConditionParent: {
    top: 593,
    width: 266,
    left: 57,
  },
  alreadyHaveAn: {
    color: Color.colorGray_600,
  },
  text1: {
    color: Color.colorDarkcyan,
  },
  signIn: {
    color: Color.colorDarkturquoise,
  },
  text: {
    width: 268,
    height: 28,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_sm,
  },
  alreadyHaveAnContainer: {
    left: 35,
    top: 683,
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
    fontSize: FontSize.size_sm,
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
  dhanajnjay33gmalcom: {
    top: 351,
    color: "#1a1717",
    width: 218,
    left: 34,
  },
  text3: {
    top: 420,
    color: "#211e1e",
    left: 57,
  },
  text4: {
    top: 480,
    left: 44,
    color: "#272222",
    width: 86,
    height: 24,
  },
  kurlaKamgarNagar: {
    top: 543,
    color: "#171616",
    left: 34,
  },
  registerPage: {
    backgroundColor: Color.colorWhitesmoke,
    flex: 1,
    height: 844,
    overflow: "hidden",
    width: "100%",
  },
});

export default RegisterPage;
