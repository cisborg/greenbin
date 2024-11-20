import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Dimensions, Platform,StatusBar,ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { sendResetPassword } from '../../redux/actions/userActions'; // Adjust the import path as necessary
import { Color } from '../../GlobalStyles';
import Toast from '../../helpers/Toast'; // Adjust the import path as necessary

const { width, height } = Dimensions.get('window');

const ChangePassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch(); // Initialize dispatch
  const [userId, setUserId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info');

  const validateUserId = (id) => {
    const phoneRegex = /^[0-9]{10}$/; // Adjust regex based on your requirements
    return phoneRegex.test(id);
  };

  const handleChangePassword = async () => {
    if (!validateUserId(userId)) {
      showToast('Invalid phone number. Please enter a valid phone number.', 'error');
      return;
    }

    if (newPassword === '') {
      showToast('New password cannot be empty.', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      // Dispatch the sendResetPassword action
      await dispatch(sendResetPassword(userId)); // Use the userId as email or modify as needed
      showToast('Password reset link sent successfully!', 'success');
      navigation.goBack();
    } catch (error) {
      showToast('Failed to send reset password link. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000); // Hide toast after 3 seconds
  };

  return (
    <View style={styles.container}>
      {toastVisible && <Toast message={toastMessage} type={toastType} onClose={() => setToastVisible(false)} />}
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
      <TouchableOpacity style={styles.proceed} onPress={handleChangePassword} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color={Color.colorWhite} />
        ) : (
          <Text style={styles.proceedButtonText}>Change Password</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: width * 0.05, // Responsive padding
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  image: {
    borderRadius: 20,
    marginBottom: height * 0.05, // Responsive margin
    width: width * 0.8,
    height: height * 0.3, // Responsive height
  },
  title: {
    fontSize: width * 0.06, // Responsive font size
    marginBottom: height * 0.02, // Responsive margin
    textAlign: 'center',
  },
  input: {
    height: height * 0.06, // Responsive height
    borderRadius: 15,
    marginBottom: height * 0.03, // Responsive margin
    paddingHorizontal: width * 0.04, // Responsive padding
    width: '100%',
    backgroundColor: Color.colorWhite,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  proceed: {
    backgroundColor: 'green',
    marginTop: height * 0.01, // Responsive margin
    width: '70%',
    height: height * 0.06, // Responsive height
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.02, // Responsive margin
  },
  proceedButtonText: {
    color: Color.colorWhite,
    fontWeight: 'bold',
    fontSize: width * 0.035, // Responsive font size
  },
});

export default ChangePassword;
