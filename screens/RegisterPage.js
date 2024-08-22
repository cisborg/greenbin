import * as React from "react";
import { Image, TextInput } from "react-native";
import { StyleSheet, Text, View, Pressable,TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";

const RegisterPage = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleChangePassword = () => {
    if (password === confirmPassword) {
      // Implement password change logic here
      Alert.alert('Registered  Successfully!');
      navigation.navigate("SignInPage"); // Go back to previous screen after successful password change
    } else {
      Alert.alert('Error', 'Passwords do not match.');
    }
  };

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
        source={require("../assets/greenCi.png")}
      />
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>User ID</Text>
        <TextInput
          style={styles.inputField}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Enter ID Number"
          placeholderTextColor={Color.colorGray_100}
          keyboardType="phone-input"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.inputField}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter Password"
          placeholderTextColor={Color.colorGray_100}
          keyboardType="phone-pad"
          secureTextEntry
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Promo Code</Text>
        <TextInput
          style={styles.inputField}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Enter promo code"
          keyboardType="phone-pad"
          placeholderTextColor={Color.colorGray_100}
          secureTextEntry
        />
      </View>

      <View style={styles.termsContainer}>
        <TouchableOpacity onPress={()=> navigation.navigate('LegalScreen')}>
          <Text style={styles.termsText}>I accept the terms & conditions</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.getStartedBtn}
        onPress={() => navigation.navigate("SignInPage")}
      >
        <Text style={styles.cardText}>Register</Text>
      </TouchableOpacity>

      <Pressable style={styles.alreadyHaveAnContainer}>
        <Text style={styles.text}>
          Already have an account? 
          <TouchableOpacity onPress={()=> handleChangePassword}>
            <Text style={styles.signIn}> Sign In</Text>
          </TouchableOpacity>
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
  inputContainer: {
    top: 150,
    marginBottom: 20,
    paddingHorizontal: 20,
    width: 350, // Make the input container full width
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
    borderRadius: Border.br_base,
    borderWidth: 1,
    borderColor: 'lightgray',
    justifyContent: "center",
    paddingHorizontal: 10,
    fontSize: FontSize.size_base,
    width: '100%', // Make the input field full width
    borderRadius: 13,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  termsContainer: {
    marginVertical: 15,
    alignItems: "center",
    top: 130
  },
  termsText: {
    color: Color.colorGray_600,
    fontSize: FontSize.size_base,
    textAlign: "center",
  },
  welcomeMessage: {
    position: "absolute",
    top: 80,
    left: 100,
  },
  getStartedBtn: {
    backgroundColor: Color.colorLimegreen_200,
    shadowColor: "#000",
    left: 5,
    top: 130,
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    alignContent: "center",
    width: 190,
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  cardText: {
    color: "white",
    fontWeight: 700,
    fontSize: 18,
    fontFamily: FontFamily.manropeBold,
  },
 
  alreadyHaveAnContainer: {
    marginTop: 20,
    alignItems: "center",
    top: 110
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
    height: 153,
    position: "absolute",
  },
  shapesIcon1: {
    height: "20.5%",
    width: "41.26%",
    top: "84.24%",
    right: "-18.97%",
    bottom: "-4.74%",
    left: "58.72%",
  },
  bayerIcon: {
    top: 190,
    left: 90,
    width: 240,
    height: 240,
    borderRadius: 50,
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
    width: 404,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RegisterPage;
