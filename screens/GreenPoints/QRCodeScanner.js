import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { updateOrderStatus } from '../../redux/actions/purchases';

const QRCodeScanner = ({ route, navigation }) => {
  const { orderId } = route.params;
  const dispatch = useDispatch();
  const devices = useCameraDevices();
  const device = devices.back; // Use the back camera
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const requestCameraPermission = async () => {
      const permission = await Camera.requestCameraPermission();
      if (permission === 'denied') {
        Alert.alert('Camera permission is required to scan QR codes.');
      }
    };

    requestCameraPermission();
  }, []);

  const handleQRCodeScan = (event) => {
    if (!scanned) {
      setScanned(true);
      const { codeStringValue } = event; // Get the scanned QR code value
  
      // Example: Check if the scanned code is valid (you can customize this logic)
      if (codeStringValue) {
        // Update order status to 'delivered'
        dispatch(updateOrderStatus(orderId, 'delivered'));
  
        Alert.alert('Success', 'Order status updated to delivered!', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('ProductRating', { orderId }); // Navigate to rating screen with codeStringValue
            },
          },
        ]);
      } else {
        Alert.alert('Error', 'Invalid QR code scanned.');
      }
    }
  };  

  if (device == null) return <Text>Loading camera...</Text>;

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        device={device}
        isActive={true}
        onBarcodeScanned={handleQRCodeScan} // Handle scanned QR code
      >
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Scan Order Code</Text>
        </TouchableOpacity>
      </Camera>
    </View>
  );
};

export default QRCodeScanner;
