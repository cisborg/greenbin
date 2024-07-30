import * as React from "react";
import { Image, TextInput } from "react-native";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import { TouchableOpacity } from "react-native-gesture-handler";

const RegisterPage = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={styles.registerPage}>
      <Image
        style={styles.shapesIcon}
        source={require("../assets/shapes.png")}
      />
      <Image
        style={[styles.shapesIcon1, styles.vectorIconLayout]}
        source={require("../assets/shapes.png")}
      />
      
      <View style={styles.welcomeMessage}>
        <Text style={styles.greenText}>GreenBin</Text>
        <Text style={styles.howYouManage}>Turn Your Wastes to Wonders?</Text>

      </View>

      
      <Image
        style={styles.bayerIcon}
        source={require("../assets/monoline.png")}
      />
      
      
      <View style={styles.inputContainer1}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.inputField}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Your Phone Number"
          placeholderTextColor={Color.colorGray_100}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.inputField}
          value={password}
          onChangeText={setPassword}
          placeholder="**********"
          placeholderTextColor={Color.colorGray_100}
          secureTextEntry
        />
      </View>

      <View style={styles.termsContainer}>
        <TouchableOpacity>
          <Text style={styles.termsText}>I accept the terms & conditions</Text>
        </TouchableOpacity>
      </View>

      <Pressable
        style={styles.registerBtn}
        onPress={() => navigation.navigate("SignInPage")}
      >
        <Text style={styles.registerBtnText}>Register</Text>
      </Pressable>

      <Pressable style={styles.alreadyHaveAnContainer}>
        <Text style={styles.text}>
          Already have an account? 
          <Text style={styles.signIn} onPress={() => navigation.navigate("SignInPage")}> Sign In</Text>
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
  welcomeToTypo: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    textAlign: "center",
    position: "absolute",
  },
  inputContainer1: {
    marginBottom: 20,
    paddingHorizontal: 20,
    top: 150,
    paddingTop: 50,
  },
  inputContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 150,
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
  termsContainer: {
    marginVertical: 15,
    alignItems: "center",
  },
  termsText: {
    color: Color.colorGray_600,
    fontSize: FontSize.size_base,
    textAlign: "center",
  },
  welcomeMessage : {
    position: "absolute",
    top: 80,
    left: 100,
  },
  registerBtn: {
    backgroundColor: Color.colorLimegreen_100,
    borderRadius: Border.br_base,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    width: 150,
  },
  registerBtnText: {
    color: Color.colorWhite,
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.poppinsBold,
  },
  alreadyHaveAnContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  text: {
    fontSize: FontSize.size_sm,
    color: Color.colorGray_600,
  },
  signIn: {
    color: Color.colorDarkturquoise,
    fontWeight: "bold",
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
  bayerIcon: {
    top: 190,
    left: 90,
    width: 220,
    height: 220,
    borderRadius: 25,
    position: "absolute",
  },
  greenText: {
    color: "green",
    top: 18,
    fontSize: FontSize.size_29xl,
    height: 56,
    textAlign: "left",
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    left: 0,
    width: 245,
    position: "absolute",
    alignSelf: "flex-start",
  },
  howYouManage: {
    marginTop: 0,
    top: 4,
    left: 60,
    height: 40,
    fontFamily: FontFamily.manropeBold,
    fontWeight: "800",
    fontSize: FontSize.size_base,
    position: "relative",
    width: 300,
  },
  registerPage: {
    backgroundColor: Color.colorWhitesmoke,
    flex: 1,
    height: "100%",
    width: 400,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RegisterPage;
