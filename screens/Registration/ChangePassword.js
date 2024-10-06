import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Platform, Alert, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Color } from '../../GlobalStyles';

const { width } = Dimensions.get('window'); // Get screen width

const ChangePassword = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateUserId = (id) => {
    const phoneRegex = /^[0-9]{10}$/; // Adjust regex based on your requirements
    return phoneRegex.test(id);
  };

  const handleChangePassword = () => {
    if (!validateUserId(userId)) {
      Alert.alert('Error', 'Invalid phone number. Please enter a valid phone number.');
      return;
    }

    if (newPassword === '') {
      Alert.alert('Error', 'New password cannot be empty.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    // Implement password change logic here
    Alert.alert('Success', 'Password changed successfully!');
    navigation.goBack(); // Go back to previous screen after successful password change
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/seated.webp')} 
        style={styles.image} 
        resizeMode='cover' 
      />
      <Text style={styles.title}>Change Password</Text>
      <TextInput
        style={styles.input}
        placeholder="User ID (Phone Number)"
        placeholderTextColor={Color.colorGray_100}
        value={userId}
        onChangeText={setUserId}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        placeholderTextColor={Color.colorGray_100}
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        placeholderTextColor={Color.colorGray_100}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.proceed} onPress={handleChangePassword}>
        <Text style={styles.proceedButtonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Responsive width
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  image: {
    borderRadius: 20,
    marginBottom: 20,
    width: width * 0.8, // Responsive width
    height: 250,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 45, // Slightly taller for better touch experience
    borderRadius: 15,
    marginBottom: 19,
    paddingHorizontal: 15,
    width: '100%', // Responsive width
    backgroundColor: Color.colorWhite, // Ensure a solid background
    elevation: 3, // Only for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  proceed: {
    backgroundColor: Color.colorLimegreen_200,
    marginTop: 10,
    width: '80%', // Responsive width
    height: 45,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  proceedButtonText: {
    color: Color.colorWhite,
    fontWeight: 'bold',
  },
});

export default ChangePassword;
