import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { acceptCode } from '../../redux/actions/authentication'; // Import your action creator
import Toast from '../../helpers/Toast';


const GreenBankCodeScreen = () => {
    const [code, setCode] = useState(Array(8).fill(''));
    const [hasCode, setHasCode] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch(); // Initialize dispatch
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('info');

    const handleChange = (text, index) => {
        const newCode = [...code];
        newCode[index] = text.replace(/[^0-9]/g, '');
        setCode(newCode);

        if (text && index < 7) {
            this[`input_${index + 1}`].focus();
        }
    };

    const handleAddCode = () => {
        navigation.navigate('RegisterBankCode');
    };

    const handleSubmit = () => {
        const fullCode = code.join('');
        if (fullCode.length < 8) {
            showToast('Please enter a complete 8-digit code.');
            return;
        }    
        // Dispatch the action to accept the code
        dispatch(acceptCode(fullCode)); // Dispatching the action with the full code

        // Navigate to the Green Bank screen
        navigation.navigate('GreenBank');
    };

    const toggleHasCode = () => {
        setHasCode(!hasCode);
        if (!hasCode) {
            setCode(Array(8).fill(''));
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

            <FastImage source={require('../../assets/success.png')} style={styles.productImage} resizeMode={FastImage.resizeMode.cover} />

            <Text style={styles.title}>Enter your Green Bank Code</Text>

            <View style={styles.toggleContainer}>
                <Text style={styles.toggleText}>Do you already have a Green Bank code?</Text>
                <TouchableOpacity onPress={toggleHasCode} style={styles.btn}>
                    <Text style={styles.toggleButton}>{hasCode ? 'No' : 'Yes'}</Text>
                </TouchableOpacity>
            </View>
            {hasCode && (
                <View style={styles.inputContainer}>
                    {code.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={input => { this[`input_${index}`] = input; }}
                            style={styles.input}
                            placeholder="0"
                            keyboardType="numeric"
                            maxLength={1}
                            value={digit}
                            onChangeText={text => handleChange(text, index)}
                        />
                    ))}
                </View>
            )}
            {hasCode && (
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            )}
            {!hasCode && (
                <TouchableOpacity style={styles.addCodeButton} onPress={handleAddCode}>
                    <Text style={styles.addCodeText}>Add Code</Text>
                </TouchableOpacity>
            )}
            <Text style={styles.footer}>All rights reserved. Your security is sovereign.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  toggleText: {
    fontSize: 16,
    marginRight: 10,
  },
  toggleButton: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 14,
    textAlign: 'center',
    fontSize: 24,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 12,
    marginBottom: 30,
    alignSelf: 'center',
    
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 14,
  },
  btn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'green',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  addCodeButton: {
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 14,
    width: '40%',
    backgroundColor: 'green',
    alignSelf: 'center',
  },
  addCodeText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
  },
});

export default GreenBankCodeScreen;
