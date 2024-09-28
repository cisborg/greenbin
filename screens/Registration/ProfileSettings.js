import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Switch, Alert, ScrollView, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily } from "../../GlobalStyles";


const ProfileSettings = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("JohnDoe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [about, setAbout] = useState("This is my about section.");
  const [profilePicture, setProfilePicture] = useState(null);
  const [theme, setTheme] = useState("light");
  const [twoStepVerification, setTwoStepVerification] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("123-456-7890");

  const handleSaveProfile = () => {
    Alert.alert("Profile Updated", "Your profile settings have been saved.");
    navigation.goBack();
  };

  const handleDeleteAccount = () => {
    Alert.alert("Delete Account", "Are you sure you want to delete your account?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => Alert.alert("Account Deleted", "Your account has been deleted.") }
    ]);
  };

  const pickImage = async () => {
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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Profile Settings</Text>

      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
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
        style={styles.input}
        placeholder="Username"
        placeholderTextColor= {Color.colorGray_100}
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor= {Color.colorGray_100}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="About"
        placeholderTextColor= {Color.colorGray_100}
        value={about}
        onChangeText={setAbout}
        multiline
        numberOfLines={3}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor= {Color.colorGray_100}
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

      <View style={styles.themeContainer}>
        <Text style={styles.themeText}>App Theme: {theme}</Text>
        <TouchableOpacity style={styles.themeButton} onPress={() => setTheme(theme === "light" ? "dark" : "light")}>
          <Text style={styles.themeButtonText}>Toggle Theme</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 20,
    overflow: 'hidden',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 100,
    overflow: 'hidden',
    elevation: 5,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#e0e0e0',
  },
  imagePlaceholderText: {
    marginTop: 5,
    textAlign: 'center',
    color: '#888',
  },
  input: {
    height: 40,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    elevation: 2,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
  },
  themeContainer: {
    marginBottom: 20,
  },
  themeText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 15
  },
  themeButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 14,
    alignItems: 'center',
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: '#28A745',
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginVertical: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileSettings;
