import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet,Linking, Image, TouchableOpacity,Platform,StatusBar, Dimensions, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useDispatch } from 'react-redux';
import { sendResetPassword } from '../../redux/actions/authentication';
import { Color } from '../../GlobalStyles';
import Toast from '../../helpers/Toast'; // Adjust the import path

const { width, height } = Dimensions.get('window');

const ChangePassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [token, setToken] = useState(''); // To handle token from the link
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info');

  // Deep link handling for token autofill
  useEffect(() => {
    const handleDeepLink = (event) => {
        const data = Linking.parse(event.url);
        if (data.queryParams?.token) {
            setToken(data.queryParams.token); // Autofill the token
        }
    };

    const subscription = Linking.addListener('url', handleDeepLink);

    return () => {
        subscription.remove(); // Remove the listener
    };
}, []);


  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password);

  const handleChangePassword = async () => {
    if (!token) {
      showToast('Invalid or missing reset token. Please try again.', 'error');
      return;
    }

    if (!validateEmail(email)) {
      showToast('Invalid email. Please enter a valid email address.', 'error');
      return;
    }

    if (!validatePassword(newPassword)) {
      showToast('Password must contain at least 8 characters, 1 uppercase letter, 1 symbol, and 1 number.', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      // Update to use token and new password
      await dispatch(sendResetPassword({ email, token, newPassword }));
      showToast('Password changed successfully!', 'success');
      setTimeout(() => navigation.goBack(), 3000);
    } catch (error) {
      showToast('Failed to change password. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  return (
    <View style={styles.container}>
      {toastVisible && <Toast message={toastMessage} type={toastType} onClose={() => setToastVisible(false)} />}
      <Image 
        source={require('../../assets/seated.webp')} 
        style={styles.image} 
        resizeMode="cover" 
      />
      <Text style={styles.title}>Change Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={Color.colorGray_100}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Token"
        placeholderTextColor={Color.colorGray_100}
        value={token}
        onChangeText={setToken} // Allow manual entry for fallback
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
