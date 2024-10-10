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
  StatusBar,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions/authActions'; 
import { FontFamily, Color, FontSize } from "../../GlobalStyles";

const { width, height } = Dimensions.get('window');

const SignInPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const userId = "20";
  const presetPassword = `ND${userId}`;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = async () => {
    if (password.trim() === "") {
      Alert.alert("Security Check", "Please enter the correct password.");
    } else if (password === presetPassword) {
      setIsLoading(true);
      try {
        // await dispatch(loginUser(userId)); // Uncomment to dispatch login action
        setIsLoading(false);
        navigation.navigate("Main"); 
      } catch (error) {
        setIsLoading(false);
        Alert.alert("Error", "Failed to log in. Please try again.");
      }
    } else {
      Alert.alert("Error", "Incorrect password. Please try again.");
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

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.inputField}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="login with password..."
                  placeholderTextColor={Color.colorGray_100}
                  secureTextEntry={!showPassword}
                  accessibilityLabel="Password Input"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Text style={styles.togglePasswordText}>
                    {showPassword ? "Hide" : "Show"}
                  </Text>
                </TouchableOpacity>
              </View>
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
              onPress={() => navigation.navigate('ChangePassword')}
              disabled={isLoading}
            >
              <Text style={[styles.forgotPasswordText, { color: 'green' }]}>
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: width * 0.05, // Responsive padding
    marginTop: 30,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.02, // Responsive margin
  },
  welcomeText: {
    fontSize: width * 0.05, // Responsive font size
    color: Color.colorGray_600,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'center',
    fontWeight: '900',
    marginBottom: height * 0.05, // Responsive margin
  },
  loginImage: {
    width: width * 0.8,
    height: height * 0.25, // Responsive height
    alignSelf: 'center',
    marginBottom: height * 0.03, // Responsive margin
  },
  inputContainer: {
    justifyContent: 'center',
    paddingHorizontal: width * 0.05, // Responsive padding
  },
  label: {
    fontSize: width * 0.04, // Responsive font size
    color: 'green',
    fontFamily: FontFamily.poppinsBold,
    marginBottom: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputField: {
    height: height * 0.06, // Responsive height
    backgroundColor: Color.colorWhite,
    paddingHorizontal: 10,
    fontSize: width * 0.04, // Responsive font size
    borderRadius: 13,
    elevation: 3,
    marginBottom: height * 0.02, // Responsive margin
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flex: 1,
  },
  togglePasswordText: {
    color: 'green',
    marginLeft: 10,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  getStartedBtn: {
    backgroundColor: 'green',
    width: '80%',
    height: height * 0.06, // Responsive height
    marginTop: height * 0.02, // Responsive margin
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
    fontSize: width * 0.045, // Responsive font size
    fontFamily: FontFamily.manropeBold,
  },
  forgotPasswordContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02, // Responsive margin
  },
  forgotPasswordText: {
    fontSize: width * 0.04, // Responsive font size
  },
});

export default SignInPage;
