import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet,Image, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { FontFamily, Color } from '../GlobalStyles';

const ChangePassword = () => {
 const navigation = useNavigation();
  const [userId, setUserId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = () => {
    if (newPassword === confirmPassword) {
      // Implement password change logic here
      Alert.alert('Success', 'Password changed successfully!');
      navigation.goBack(); // Go back to previous screen after successful password change
    } else {
      Alert.alert('Error', 'Passwords do not match.');
    }
  };

  return (
    <View style={styles.container}>
    <Image source={require('../assets/seated.webp')} style={{ borderRadius: 20, marginBottom: 20, width: 300, height: 250, left: 50}} contentFit = 'cover' />
      <Text style={styles.title}>Change Password</Text>
      <TextInput
        style={styles.input}
        placeholder="User ID"
        placeholderTextColor={Color.colorGray_100}
        value={userId}
        onChangeText={setUserId}
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
         <TouchableOpacity style={styles.proceed} onPress={handleChangePassword} >
            <Text style={styles.proceedButtonText}>Change Password</Text>
        </TouchableOpacity>
   
     </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    width: 404,
    backgroundColor: Color.colorWhite
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderRadius: 15,
    marginBottom: 15,
    paddingHorizontal: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

  },
  proceed: {
    backgroundColor: 'white',
    shadowColor: '#000',
    left: 100,
    marginTop: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    alignContent: 'center',
    width: 180,
    height: 45,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  proceedButtonText: {
    color: Color.colorLimegreen_200,
    fontWeight: 'bold',
  },
});

export default ChangePassword;
