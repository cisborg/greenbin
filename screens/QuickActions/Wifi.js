import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Animated,
  Alert,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/core";
import { FontFamily, Color } from "../../GlobalStyles"; // Ensure you have your GlobalStyles configured

const { width, height } = Dimensions.get("window"); // Get device width & height for responsive styles

const WiFiScreen = () => {
  const navigation = useNavigation();
  const [wifiNumber, setWifiCode] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isValidWifi, setIsValidWifi] = useState(true); // Input validation flag for WiFi
  const [isValidMobile, setIsValidMobile] = useState(true); // Input validation flag for Mobile
  const [isLoading, setIsLoading] = useState(false); // Loading state for the button

  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for animation

  // Animation on mount
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Fully visible
      duration: 500, // 500ms for smooth animation
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // Input validation for WiFi Code (must be 8 digits)
  const validateWifiCode = (code) => {
    const isValid = /^\d{8}$/.test(code); // Must be exactly 8 digits
    setIsValidWifi(isValid);
    setWifiCode(code);
  };

  // Input validation for Mobile Number (must be 10 or 11 digits)
  const validateMobileNumber = (number) => {
    const isValid = /^\d{10,11}$/.test(number); // 10 or 11 digits for mobile number
    setIsValidMobile(isValid);
    setMobileNumber(number);
  };

  const isButtonDisabled =
    !wifiNumber || !mobileNumber || !isValidWifi || !isValidMobile || isLoading; // Disable button if any field is empty or invalid

  // Simulate registration process with a delay, then navigate to WiFiSuccessful
  const handleRegister = () => {
    if (!isValidWifi) {
      Alert.alert("Invalid WiFi Code", "WiFi Code must be exactly 8 digits.");
      return;
    }
    if (!isValidMobile) {
      Alert.alert(
        "Invalid Mobile Number",
        "Mobile Number must be 10 or 11 digits."
      );
      return;
    }

    // Show loading spinner and simulate network request delay
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false); // Hide spinner after delay
      navigation.navigate("WifiPlan"); // Navigate to WifiSuccessful screen
    }, 2000); // Simulate 2-second registration process
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Header with Back Button */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="leftcircle" size={30} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Green 4G/5G WiFi</Text>
          </View>

          {/* Main Content */}
          <View style={styles.content}>
            <Text style={styles.subHeader}>WiFi Mobile Code</Text>
            <TextInput
              style={[styles.input, !isValidWifi && styles.invalidInput]} // Style red border if invalid
              value={wifiNumber}
              placeholder="Enter wifi code"
              onChangeText={validateWifiCode}
              keyboardType="numeric"
              placeholderTextColor={Color.colorGray_100}
            />
            {!isValidWifi && (
              <Text style={styles.errorText}>WiFi code must be 8 digits.</Text>
            )}

            <Text style={styles.note}>
              Note: Your Router/MiFi SIMCARD is your WiFi mobile code which is
              an 8-digit code.
            </Text>

            {/* Mobile Number Input */}
            <Text style={styles.subHeader}>Mobile Number</Text>
            <TextInput
              style={[styles.input, !isValidMobile && styles.invalidInput]} // Style red border if invalid
              placeholder="Enter your mobile number"
              value={mobileNumber}
              onChangeText={validateMobileNumber}
              keyboardType="numeric"
              placeholderTextColor={Color.colorGray_100}
            />
            {!isValidMobile && (
              <Text style={styles.errorText}>
                Mobile number must be 10 or 11 digits.
              </Text>
            )}

            <Text style={styles.note}>
              Note: This is your primary mobile number where you will receive a
              6-digit one-time password (OTP).
            </Text>

            {/* Terms Agreement */}
            <View style={styles.checkboxContainer}>
              <Text style={styles.termsConditions}>
                I've already purchased a Router/MiFi Device
              </Text>
            </View>

            {/* Register Button */}
            <TouchableOpacity
              style={[
                styles.registerButton,
                isButtonDisabled && styles.disabledButton,
              ]}
              onPress={handleRegister}
              disabled={isButtonDisabled}
              activeOpacity={0.8} // Active opacity for better feedback
            >
              {/* Show Activity Indicator while loading */}
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.registerButtonText}>Register</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    padding: "5%", // Padding as a percentage for responsive design
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "green",
    padding: "4%", // Padding percentage for responsiveness
    borderRadius: 10,
    marginBottom: "5%",
  },
  headerTitle: {
    fontSize: width * 0.05, // 5% of screen width
    color: "white",
    marginLeft: 10,
    fontWeight: "bold",
  },
  content: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: "6%", // Padding for responsive layout
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
  },
  subHeader: {
    fontSize: width * 0.045, // Responsive font size based on screen width
    marginBottom: 5,
    fontWeight: "bold",
    color: Color.dad,
  },
  input: {
    height: 45,
    borderRadius: 17,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#ffff",
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  invalidInput: {
    borderColor: "red", // Red border for invalid input
  },
  errorText: {
    fontSize: width * 0.03, // Responsive font size for error text
    color: "red",
    marginBottom: 10,
  },
  note: {
    fontSize: width * 0.035, // Responsive note text
    color: "#666",
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxText: {
    fontSize: width * 0.035, // Responsive text
    color: "#333",
  },
  termsConditions: {
    fontSize: width * 0.035,
    color: "#E63946",
    fontWeight: "bold",
    marginLeft: 5,
  },
  registerButton: {
    backgroundColor: "green",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    alignSelf: "center",
    width: width * 0.85, // Responsive button width
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "#ddd", // Gray out button if disabled
  },
  registerButtonText: {
    color: "white",
    fontSize: width * 0.04, // Responsive font size
    fontWeight: "bold",
  },
});

export default WiFiScreen;
