import * as React from "react";
import { TextInput, Alert } from "react-native";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";

const OTPConfirmScreen = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = React.useState('');

  const handleConfirmOTP = () => {
    if (otp.length === 6) {
      Alert.alert('OTP Confirmed', 'Your OTP has been verified successfully!');
      navigation.navigate("HomePage"); // Navigate to the home page after confirmation
    } else {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP.');
    }
  };

  return (
    <View style={styles.otpContainer}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>We sent a 6-digit OTP to your registered phone number.</Text>

      <TextInput
        style={styles.otpInput}
        value={otp}
        onChangeText={setOtp}
        placeholder="Enter OTP"
        placeholderTextColor={Color.colorGray_100}
        keyboardType="numeric"
        maxLength={6}
      />

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOTP}>
        <Text style={styles.buttonText}>Confirm OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resendContainer} onPress={() => Alert.alert('Resend OTP', 'OTP has been resent!')}>
        <Text style={styles.resendText}>Resend OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: Color.colorWhite,
    overflow: 'hidden',
  },
  title: {
    fontSize: FontSize.size_29xl,
    fontFamily: FontFamily.poppinsBold,
    color: Color.colorLimegreen_200,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: FontSize.size_base,
    color: Color.colorGray_600,
    textAlign: 'center',
    marginBottom: 20,
  },
  otpInput: {
    height: 50,
    width: '100%',
    backgroundColor: Color.colorWhite,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: Border.br_base,
    paddingHorizontal: 10,
    fontSize: FontSize.size_base,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: Color.colorLimegreen_200,
    borderRadius: 18,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontWeight: 'bold',
    fontSize: 18,
  },
  resendContainer: {
    marginTop: 20,
  },
  resendText: {
    fontSize: FontSize.size_base,
    color: Color.colorLimegreen_200,
    textDecorationLine: 'underline',
  },
});

export default OTPConfirmScreen;
