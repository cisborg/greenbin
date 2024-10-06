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
import { loginUser } from '../../redux/actions/authActions'; // Adjust the import path as necessary
import { FontFamily, Color, FontSize } from "../../GlobalStyles";

const { width } = Dimensions.get('window');

const SignInPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));
  const [isLoading, setIsLoading] = useState(false);
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
        // await dispatch(loginUser(userId)); // Dispatch login action
        setIsLoading(false);
        navigation.navigate("Main"); // Navigate only after successful login
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
        behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjusting behavior for iOS and Android
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0} // Adjusting offset for iOS
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled" // Ensure tapping outside dismisses keyboard
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
              <TextInput
                style={styles.inputField}
                value={password}
                onChangeText={setPassword}
                placeholder="login with password..."
                placeholderTextColor={Color.colorGray_100}
                secureTextEntry
                accessibilityLabel="Password Input"
              />
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
              disabled={isLoading}  // Disabled when loading
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
    paddingHorizontal: 20,
    marginTop: 30,
  },
  scrollViewContent: {
    flexGrow: 1, // Ensures content fills the screen
    justifyContent: 'center', // Centers content vertically
  },
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: FontSize.size_5xl,
    color: Color.colorGray_600,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'center',
    fontWeight: '900',
    marginBottom: 40,
  },
  loginImage: {
    width: width * 0.8,
    height: 200,
    alignSelf: 'center',
    marginBottom: 30,
  },
  inputContainer: {
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
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  getStartedBtn: {
    backgroundColor: Color.colorLimegreen_200,
    width: '80%',
    height: 47,
    marginTop: 20,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  forgotPasswordText: {
    fontSize: FontSize.size_sm,
    textAlign: "center",
  },
});

export default SignInPage;
