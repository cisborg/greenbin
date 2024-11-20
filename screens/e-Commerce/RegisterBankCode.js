import React, { useRef, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { registerCode } from '../../redux/actions/authentication'; // Import your registration action

const RegisterCode = ({ isRegistered }) => {
  const bottomSheetRef = useRef(null);
  const dispatch = useDispatch();
  const snapPoints = ['50%', '90%'];

  // State for input fields
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async () => {
    // Validate input fields
    if (!email || !phoneNumber) {
      Toast.show({
        text1: 'Input Error',
        text2: 'Please fill in all fields.',
        type: 'error',
        position: 'bottom',
      });
      return;
    }

    // Create user data object
    const userData = {
      email,
      phoneNumber,
    };

    try {
      const response = await dispatch(registerCode(userData)); // Dispatch the register action
      const bankCode = response.bankCode; // Assuming the response contains the bank code

      // Show toast message with the fetched bank code
      Toast.show({
        text1: 'Registration Successful',
        text2: `Your bank code is: ${bankCode}`,
        type: 'success',
        position: 'bottom',
      });

      // Optionally close the BottomSheet after submission
      bottomSheetRef.current?.close();
    } catch (error) {
      console.error('Registration failed:', error);
      // Optionally show an error toast
      Toast.show({
        text1: 'Registration Failed',
        text2: error.message,
        type: 'error',
        position: 'bottom',
      });
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
    >
      <View style={styles.contentContainer}>
        {isRegistered ? (
          <TouchableOpacity style={styles.registeredButton} disabled>
            <Text style={styles.registeredText}>Already Registered</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="User Email"
              keyboardType="email-address"
              value={email} // Bind the input value to state
              onChangeText={setEmail} // Update state on change
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={phoneNumber} // Bind the input value to state
              onChangeText={setPhoneNumber} // Update state on change
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  registeredButton: {
    backgroundColor: '#28a745', // Green color for the registered button
    borderRadius: 14,
    padding: 15,
    alignItems: 'center',
    marginBottom: 16,
  },
  registeredText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default RegisterCode;
