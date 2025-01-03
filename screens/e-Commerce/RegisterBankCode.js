import React, { useRef, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Toast from '../../helpers/Toast'; // Import the Toast component
import { registerCode } from '../../redux/actions/authentication';

const RegisterCode = ({ isRegistered }) => {
  const bottomSheetRef = useRef(null);
  const dispatch = useDispatch();
  const snapPoints = ['25%'];
  const navigation = useNavigation();

  // State for input fields
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // State for Toast
  const [toast, setToast] = useState({ message: '', type: '', visible: false });

  const showToast = (message, type) => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000);
  };

  const handleSubmit = async () => {
    if (!email.trim() || !phoneNumber.trim()) {
      showToast('Please fill in all fields.', 'error');
      return;
    }

    const userData = { email: email.trim(), phoneNumber: phoneNumber.trim() };

    try {
      const response = await dispatch(registerCode(userData));
      if (response && response.bankCode) {
        showToast(`Your bank code is: ${response.bankCode}`, 'success');
        bottomSheetRef.current?.close();
      } else {
        throw new Error('Bank code not found.');
      }
    } catch (error) {
      showToast(error.message || 'Registration failed.', 'error');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {toast.visible && <Toast message={toast.message} type={toast.type} />}
      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
        <View style={styles.contentContainer}>
          {isRegistered ? (
            <TouchableOpacity
              style={styles.registeredButton}
              onPress={() => navigation.navigate('CodeAccept')}
            >
              <Text style={styles.registeredText}>Already Registered</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TextInput
                style={styles.input}
                placeholder="User Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </BottomSheet>
    </View>
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
