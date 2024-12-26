import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Camera } from 'react-native-vision-camera'; // Import Camera
import { useNavigation } from '@react-navigation/native';

const JoinListScreen = () => {
  const navigation = useNavigation();
  const [listCode, setListCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);

  const handleScanQRCode = () => {
    setCameraVisible(true); // Show camera when scanning
  };

  const handleAcceptCode = () => {
    setIsLoading(true);
    // Simulate a network request or processing time
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('Subscribed'); // Navigate to Subscribed.js
    }, 3000);
  };

  const onCodeScanned = (code) => {
    setCameraVisible(false); // Hide camera after scanning
    // You can also set the scanned code to the input field if needed
    setListCode(code);
    navigation.navigate('Subscribed'); // Automatically navigate to Subscribed.js
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Go green with green purchases</Text>
      <Text style={styles.instruction}>
        To join a list, click enter list code or scan QR code.
      </Text>
      <TextInput 
        style={styles.codeInput} 
        placeholder="Enter list code" 
        value={listCode}
        onChangeText={setListCode}
      />
      
      {/* Show Accept button only when the user starts typing */}
      {listCode.length > 0 && (
        <TouchableOpacity 
          style={styles.acceptButton} 
          onPress={handleAcceptCode}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.acceptButtonText}>Accept Code</Text>
          )}
        </TouchableOpacity>
      )}

      {/* QR Code Scanner Button */}
      <TouchableOpacity style={styles.scanButton} onPress={handleScanQRCode}>
        <Text style={styles.scanButtonText}>Scan QR Code</Text>
      </TouchableOpacity>

      {/* Camera Component */}
      {cameraVisible && (
        <Camera 
          style={styles.camera} 
          onCameraReady={() => Alert.alert('Camera is ready')}
          onCodeScanned={({ data }) => onCodeScanned(data)} // Handle QR code scan
          // Add additional camera props here
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  instruction: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  codeInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  acceptButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  acceptButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scanButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  scanButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default JoinListScreen;
