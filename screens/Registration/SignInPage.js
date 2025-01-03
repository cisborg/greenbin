import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  Animated,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/authentication";
import { FontFamily, Color } from "../../GlobalStyles";
import Icon from 'react-native-vector-icons/FontAwesome';

import Toast from '../../helpers/Toast';

const { width, height } = Dimensions.get("window");

const CustomInput = ({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}) => (
  <View style={styles.inputContainer}>
    <Icon name={icon} size={20} color="green" style={styles.icon} />
    <TextInput
      style={styles.textInput}
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
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info');

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = async () => {
    if (password.trim() === "" || email.trim() === "") {
      showToast('Both Email and Password Required! ', 'error');
      return;
    }

    setIsLoading(true);

    try {
      const response = await dispatch(loginUser({ email, password }));

      if (response?.token) {
        showToast('Welcome!, Enjoy GreenBin App', 'success');
        navigation.navigate("Main");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      showToast('Failed to login', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (message, type = 'info') => {
    setToastMessage(message);
    setToastType(type); // Dynamically update the type
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000); // Auto-hide after 3 seconds
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
                Promote Green Circular Economy 
              </Text>
            </View>
            <Image
              style={styles.loginImage}
              resizeMode="cover"
              source={require("../../assets/chartered.jpg")}
            />
            <CustomInput
              icon="envelope"
              placeholder="Enter Email"
              value={email}
              onChangeText={setEmail}
            />
              <CustomInput
                icon="lock"
                placeholder="Login with password..."
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />


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

            <View style={styles.dontHaveAnContainer}>
              <Text style={{ fontSize: 12 }}>Not Registered Yet?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("RegisterPage")}
              >
                <Text style={styles.register}>Register</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={() => navigation.navigate("ChangePassword")}
              disabled={isLoading}
            >
              <Text style={[styles.forgotPasswordText, { color: "green" }]}>Forgot Password?</Text>
            </TouchableOpacity>

            {toastVisible && (
              <Toast 
                message={toastMessage} 
                type={toastType} 
                onClose={() => setToastVisible(false)} 
              />
            )}
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
  textInput: {
    flex: 1, // Allow TextInput to take the remaining space
    height: 40, // Set a height to ensure consistency
    fontSize: 16, // Font size for the text
  },

  welcomeText: {
    fontSize: width * 0.05,
    color: 'green',
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
    paddingVertical: height * 0.03,
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    marginBottom: height * 0.02,
    marginHorizontal: "4%",
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "flex-start",
    height: height * 0.050,
    shadowColor: "#000",
  },

  dontHaveAnContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    alignSelf: "center",
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
  register: {
    color: "green",
    fontWeight: "500",
    marginLeft: 7,
  },
  forgotPasswordContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.01,
  },
  forgotPasswordText: {
    fontSize: width * 0.033,
  },
});

export default SignInPage;
