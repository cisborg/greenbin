import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
  Platform,
  SafeAreaView,
  Animated,
  ActivityIndicator,
  ScrollView,StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/authentication";
import { FontFamily, Color, FontSize } from "../../GlobalStyles";
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure to install react-native-vector-icons

const { width, height } = Dimensions.get("window");

const CustomInput = ({ icon, placeholder, value, onChangeText, secureTextEntry }) => (
  <View style={styles.inputContainer}>
    <Icon name={icon} size={20} color='green' style={styles.icon} />
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={Color.colorGray_100}
      secureTextEntry={secureTextEntry}
      accessibilityLabel={`${placeholder} Input`}
      accessibilityHint={`Enter your ${placeholder.toLowerCase()}`}
    />
  </View>
  
);

const SignInPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = async () => {
    if (password.trim() === "" || email.trim() === "") {
      setIsLoading(false);
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    
    setIsLoading(true); // Start loading when login is initiated

    try {
      console.log("Login credentials", { email, password });
      const response = await dispatch(loginUser({ email, password })); // Dispatch login action
      console.log("Login response from dispatcher", response);
      
      if (response?.token) {
        Alert.alert("Login Successful!", "You can now log in to your account.");
        navigation.navigate("Main");
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.log("Login error", error);
      Alert.alert("Error", "Failed to log in. Please try again.");
    } finally {
      setIsLoading(false); // End loading regardless of success or failure
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
            <View style={styles.topContainer}>
              <Text style={styles.welcomeText}>
                Ecodigital Solutions for Greener Future!
              </Text>
            </View>
            <Image
              style={styles.loginImage}
              resizeMode="cover"
              source={require("../../assets/connect.webp")}
            />
            <CustomInput
              icon="envelope"
              placeholder="Enter Email"
              value={email}
              onChangeText={setEmail}
            />
            <View style={styles.passwordContainer}>
              <CustomInput
                icon="lock"
                placeholder="Login with password..."
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.togglePasswordText}>
                  {showPassword ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.getStartedBtn}
                onPress={handleLogin}
                disabled={isLoading}
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
              onPress={() => navigation.navigate("ChangePassword")}
              disabled={isLoading}
            >
              <Text style={[styles.forgotPasswordText, { color: "green" }]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: width * 0.01,
    marginTop: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  topContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  icon: {
    marginRight: height * 0.02,
  },
  welcomeText: {
    fontSize: width * 0.05,
    color: Color.colorGray_600,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "center",
    fontWeight: "900",
    marginBottom: height * 0.05,
  },
  loginImage: {
    width: width * 0.8,
    height: height * 0.25,
    alignSelf: "center",
    marginBottom: height * 0.03,
  },
  inputContainer: {
    justifyContent: "center",
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    marginBottom: height * 0.02,
    marginHorizontal: '4%',
    borderRadius: 13,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: height * 0.051,
    shadowColor: "#000",
  },
  label: {
    fontSize: width * 0.04,
    color: "green",
    fontFamily: FontFamily.poppinsBold,
    marginBottom: 5,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  
  togglePasswordText: {
    color: "green",
    marginLeft: 10,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  getStartedBtn: {
    backgroundColor: "green",
    width: "80%",
    height: height * 0.06,
    marginTop: height * 0.02,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 21,
    shadowColor: "#000",
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
    fontWeight: "700",
    fontSize: width * 0.045,
    fontFamily: FontFamily.manropeBold,
  },
  forgotPasswordContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.02,
  },
  forgotPasswordText: {
    fontSize: width * 0.04,
  },
});

export default SignInPage;
