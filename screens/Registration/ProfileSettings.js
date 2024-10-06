import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Switch,
  Alert,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily } from "../../GlobalStyles";

const ProfileSettings = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [twoStepVerification, setTwoStepVerification] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const fadeAnim = useState(new Animated.Value(0))[0]; // Fade animation state

  // Email Validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Name Validation (string)
  const validateName = (name) => {
    return /^[a-zA-Z0-9_]+$/.test(name);
  };

  // Phone Number Validation (strict 10-digit)
  const validatePhoneNumber = (number) => {
    return /^\d{10}$/.test(number);
  };

  const handleSaveProfile = () => {
    if (!validateName(username)) {
      Alert.alert("Invalid Username", "Username should only contain letters and numbers.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert("Invalid Phone Number", "Please enter a valid 10-digit phone number.");
      return;
    }

    Alert.alert("Profile Updated", "Your profile settings have been saved.");
    navigation.goBack();
  };

  const handleDeleteAccount = () => {
    Alert.alert("Delete Account", "Are you sure you want to delete your account?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          Alert.alert("Account Deleted", "Your account has been deleted.");
          navigation.navigate("Start"); // Navigate to start page after deletion
        },
      },
    ]);
  };

  const pickProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfilePicture(result.uri);
    }
  };

  const pickCoverImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setCoverImage(result.uri);
    }
  };

  // Screen animation effect on mount
  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "You need to grant camera roll permissions to use this feature.");
      }
    };

    requestPermission();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"} />
      <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Profile Settings</Text>

          <TouchableOpacity onPress={pickCoverImage} style={styles.coverImageContainer}>
            {coverImage ? (
              <Image source={{ uri: coverImage }} style={styles.coverImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <FontAwesome name="image" size={50} color="#888" />
                <Text style={styles.imagePlaceholderText}>Tap to select a cover image</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={pickProfileImage} style={styles.imageContainer}>
            {profilePicture ? (
              <Image source={{ uri: profilePicture }} style={styles.profileImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <FontAwesome name="user-circle" size={50} color="#888" />
                <Text style={styles.imagePlaceholderText}>Tap to select a profile picture</Text>
              </View>
            )}
          </TouchableOpacity>

          <TextInput
            style={[styles.input, !validateName(username) && { borderColor: 'red' }]}
            placeholder="Username"
            placeholderTextColor={Color.colorGray_100}
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            style={[styles.input, !validateEmail(email) && { borderColor: 'red' }]}
            placeholder="Email"
            placeholderTextColor={Color.colorGray_100}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="About"
            placeholderTextColor={Color.colorGray_100}
            value={about}
            onChangeText={setAbout}
            multiline
            numberOfLines={3}
          />

          <TextInput
            style={[styles.input, !validatePhoneNumber(phoneNumber) && { borderColor: 'red' }]}
            placeholder="Phone Number"
            placeholderTextColor={Color.colorGray_100}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />

          <View style={styles.notificationContainer}>
            <Text style={styles.notificationText}>Enable Two-Step Verification</Text>
            <Switch
              value={twoStepVerification}
              onValueChange={setTwoStepVerification}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={twoStepVerification ? "#f5dd4b" : "#f4f3f4"}
            />
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveProfile}
            disabled={!validateName(username) || !validateEmail(email) || !validatePhoneNumber(phoneNumber)}
          >
            <Text style={styles.buttonText}>Save Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
            <Text style={styles.buttonText}>Delete Account</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

// Fetch screen width for responsiveness
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.colorWhite,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Color.colorWhite,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5
  },
  title: {
    fontSize: screenWidth < 350 ? 22 : 28, // Responsive title font size
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  coverImageContainer: {
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    overflow: "hidden",
    elevation: 5,
    backgroundColor: "#f0f0f0",
    width: "100%",
    height: 130,
  },
  coverImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    position: "absolute",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 50,
    overflow: "hidden",
    elevation: 5,
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginTop: -50, // Overlap the profile image
  },
  profileImage: {
    width: screenWidth < 350 ? 80 : 100, // Responsive image size
    height: screenWidth < 350 ? 80 : 100,
    borderRadius: 50,
  },
  imagePlaceholder: {
    alignItems: "center",
    justifyContent: "center",
    width: screenWidth < 350 ? 80 : 100,
    height: screenWidth < 350 ? 80 : 100,
  },
  imagePlaceholderText: {
    color: "#888",
    marginTop: 5,
  },
  input: {
    width: "95%",
    borderRadius: 14,
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowColor: "#000",
    elevation: 3,
    marginBottom: 10,
    padding: 15,
    marginBottom: 20,
    fontFamily: FontFamily.sFProDisplayRegular,
    color: "#333",
  },
  notificationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  notificationText: {
    fontSize: 16,
    color: "#333",
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3,
    shadowColor: "#000",
    elevation: 1,
    width: "95%",
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3,
    shadowColor: "#000",
    elevation: 1,
    width: "95%",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProfileSettings;
