import React, { useState, useEffect } from "react";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
  Platform,
  SafeAreaView,
  Animated,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize } from "../../GlobalStyles";

const { width } = Dimensions.get('window'); // Get screen width

const SignInPage = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0)); // Animation state
  const [isLoading, setIsLoading] = useState(false); // Loading state for spinner
  const userId = ""; // Example user ID
  const presetPassword = `ND${userId}`; // Preset password is "ND38009105"

  // Animate on screen mount
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800, // 800ms fade-in effect
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = () => {
    if (password.trim() === "") {
      Alert.alert("Security Check", "Please enter the correct password.");
    } else if (password === presetPassword) {
      setIsLoading(true); // Show spinner
      setTimeout(() => {
        setIsLoading(false); // Hide spinner after 2 seconds
        navigation.navigate("Main"); // Navigate to the home screen
      }, 1000); // Simulate loading time
    } else {
      Alert.alert("Error", "Incorrect password. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
          <View style={styles.topContainer}>
            
            <Text style={styles.welcomeText}>
              Ecodigital Solutions for Greener Future!
            </Text>
          </View>
          <Image
            style={styles.loginImage}
            contentFit="cover"
            source={require("../../assets/connect.webp")}
          />

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

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.getStartedBtn}
              onPress={handleLogin}
              disabled={isLoading} // Disable button when loading
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.cardText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={() => navigation.navigate('ChangePassword')}
          >
            <Text style={[styles.forgotPasswordText, { color: 'green' }]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.colorWhite,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  topContainer: {
    flex: 0.05, // Adjust to make space for other elements
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: FontSize.size_5xl,
    color: Color.colorGray_600,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'center',
    top: 150,
    fontWeight: '900'
  },
  inputContainer: {
    flex: 0.2, // Space for input field
    justifyContent: 'center',
    paddingHorizontal: 20,
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
    paddingHorizontal: 10,
    fontSize: FontSize.size_base,
    borderRadius: 13,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  getStartedBtn: {
    backgroundColor: Color.colorLimegreen_200,
    width: '80%',
    top: 30,
    height: 47,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 21,
    shadowColor: '#000',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardText: {
    color: "#fff",
    fontWeight: '700',
    fontSize: 18,
    fontFamily: FontFamily.manropeBold,
  },
  forgotPasswordContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 20
  },
  forgotPasswordText: {
    fontSize: FontSize.size_sm,
    textAlign: "center",
  },
  loginImage: {
    flex: 0.05,
    width: '70%',
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 50
  },
  
  
});

export default SignInPage;
