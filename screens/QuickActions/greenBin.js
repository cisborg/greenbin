import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import { Button } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Camera } from 'expo-camera';

// Sample bin images (replace with your images)
const binImages = {
  basic: require('../../assets/beauty.png'),
  standard: require('../../assets/basket.png'),
  premium: require('../../assets/bikes.png'),
};

const GreenBin = () => {
  const [binType, setBinType] = useState('basic');
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [scanVisible, setScanVisible] = useState(false); // QR scanner visibility
  const [qrData, setQrData] = useState(null); // For storing scanned QR data
  const [isPurchase, setIsPurchase] = useState(true); // Toggle for Purchase vs Lease/Rent
  const [cameraPermission, setCameraPermission] = useState(null);

  const binOptions = [
    { type: 'basic', price: 2000, gcpReward: 100, downPayment: 500 },
    { type: 'standard', price: 4500, gcpReward: 400, downPayment: 1000 },
    { type: 'premium', price: 10000, gcpReward: 800, downPayment: 2000 },
  ];

  const subscriptionOptions = [
    { type: 'Weekly', price: 500 },
    { type: 'Monthly', price: 1800 },
    { type: 'Quarterly', price: 5000 },
  ];

  // Camera permission request function
  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setCameraPermission(status === 'granted');
    return status === 'granted';
  };

  // Function to open QR scanner with permission check
  const openQRScanner = async () => {
    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      setScanVisible(true);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Camera Permission Denied',
        text2: 'Please enable camera permissions to use QR scanner.',
      });
    }
  };

  // Function to handle initial bin purchase
  const handlePurchase = () => {
    Toast.show({
      type: 'success',
      text1: 'Purchase Confirmed',
      text2: `You have purchased the ${binType.toUpperCase()} bin and earned ${binOptions.find(b => b.type === binType).gcpReward} GCPs!`,
    });
  };

  // Function to handle bin rental/lease payment
  const handleLeasePayment = () => {
    if (!paymentMethod || !selectedSubscription) {
      Toast.show({
        type: 'error',
        text1: 'Incomplete Selection',
        text2: 'Please select both a subscription and payment method to proceed.',
      });
      return;
    }
    Toast.show({
      type: 'success',
      text1: 'Lease Payment Confirmed',
      text2: `You have leased the ${binType.toUpperCase()} bin with a ${selectedSubscription} subscription.`,
    });
  };

  // Function to handle QR code scan for waste collection payment
  const onScanSuccess = (data) => {
    const [binID, userID, amount] = data.split(':');
    setQrData({ binID, userID, amount });
    setScanVisible(false);

    Toast.show({
      type: 'success',
      text1: 'Payment Success',
      text2: `Payment of $${amount} for bin ${binID} completed successfully.`,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Your Bin for Sustainability</Text>

      <View style={styles.binSection}>
        {binOptions.map((option) => (
          <TouchableOpacity key={option.type} onPress={() => setBinType(option.type)} style={[styles.binOption, binType === option.type && styles.selectedOption]}>
            <Image source={binImages[option.type]} style={styles.binImage} />
            <Text style={styles.binText}>{option.type.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.binDetails}>
        {`Selected Bin: ${binType.toUpperCase()} - Price: $${binOptions.find(b => b.type === binType).price}, Rewards: ${binOptions.find(b => b.type === binType).gcpReward} GCPs`}
      </Text>

      <View style={styles.toggleSection}>
        <TouchableOpacity 
          onPress={() => setIsPurchase(true)} 
          style={[styles.toggleButton, isPurchase && styles.selectedToggleButton]} 
          activeOpacity={0.6}
        >
          <Text style={styles.toggleButtonText}>Purchase Bin</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setIsPurchase(false)} 
          style={[styles.toggleButton, !isPurchase && styles.selectedToggleButton]} 
          activeOpacity={0.6}
        >
          <Text style={styles.toggleButtonText}>Lease/Rent Bin</Text>
        </TouchableOpacity>
      </View>

      {isPurchase && (
        <Button
          title="Confirm Purchase"
          onPress={handlePurchase}
          buttonStyle={styles.confirmButton}
        />
      )}

      {!isPurchase && (
        <>
          <Text style={styles.leasingHeader}>Leasing Options</Text>
          <Text style={styles.leasingDetails}>
            {`Down Payment: $${binOptions.find(b => b.type === binType).downPayment}`}
          </Text>
          <View style={styles.subscriptionSection}>
            {subscriptionOptions.map((sub) => (
              <TouchableOpacity key={sub.type} onPress={() => setSelectedSubscription(sub.type)} style={[styles.subscriptionCard, selectedSubscription === sub.type && styles.selectedSubscription]}>
                <Text style={styles.subscriptionText}>{sub.type}</Text>
                <Text style={styles.subscriptionPrice}>${sub.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.paymentSection}>
            <BouncyCheckbox
              text="Green Credit Points (GCP)"
              checked={paymentMethod === 'GCP'}
              onPress={() => setPaymentMethod('GCP')}
              containerStyle={styles.checkBox}
            />
            <BouncyCheckbox
              text="Credit Card / Green Bank"
              checked={paymentMethod === 'CreditCard'}
              onPress={() => setPaymentMethod('CreditCard')}
              containerStyle={styles.checkBox}
            />
          </View>
          <TouchableOpacity buttonStyle={styles.confirmButton} onPress={handleLeasePayment}>
            <Text>Confirm Lease Payment</Text>
          </TouchableOpacity>
        </>
      )}

      <Text style={styles.leasingHeader}>Waste Collect Pay</Text>

      <TouchableOpacity style={styles.qrButton} onPress={openQRScanner}>
        <Icon name="qr-code-scanner" size={24} color="white" />
        <Text style={styles.buttonText}>Scan QR Code</Text>
      </TouchableOpacity>

      <Modal visible={scanVisible} animationType="slide">
        {cameraPermission ? (
          <Camera
            style={{ flex: 1 }}
            onBarCodeScanned={({ data }) => onScanSuccess(data)}
            flashMode={Camera.FlashMode.off} // Correctly set flash mode
          >
            <View style={styles.scanOverlay}>
              <Text style={styles.scanText}>Scan bin's QR code to initiate collection payment</Text>
              <TouchableOpacity onPress={() => setScanVisible(false)}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18 }}>Camera permission is required.</Text>
            <TouchableOpacity onPress={() => requestCameraPermission()}>
              <Text style={{ color: 'blue' }}>Grant Permission</Text>
            </TouchableOpacity>
          </View>
        )}
      </Modal>

      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f7', paddingHorizontal: 15 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#2e7d32', marginVertical: 15 },
  binSection: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  binOption: { alignItems: 'center', padding: 10 },
  selectedOption: { borderWidth: 2, borderColor: '#2e7d32', borderRadius: 23 },
  binImage: { width: 60, height: 60, marginBottom: 5 },
  binText: { fontSize: 16, color: '#333' },
  binDetails: { fontSize: 16, textAlign: 'center', color: '#555', marginBottom: 15 },
  subscriptionSection: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  subscriptionCard: { 
    width: '30%', 
    padding: 10, 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#ddd', 
    elevation: 4, 
    shadowOffset: { width: 1, height: 3 } 
  },
  selectedSubscription: { borderColor: '#2e7d32', backgroundColor: 'green', elevation: 4 },
  subscriptionText: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  subscriptionPrice: { fontSize: 14, color: '#555' },
  paymentSection: { marginVertical: 10 },
  checkBox: { backgroundColor: '#fff', borderColor: '#fff', marginVertical: 10 },
  qrButton: { 
    backgroundColor: '#2e7d32', 
    marginVertical: 15, 
    borderRadius: 15, 
    alignItems: 'center' 
  },
  rewardText: { fontSize: 16, textAlign: 'center', color: '#388e3c', marginVertical: 10 },
  confirmButton: { 
    backgroundColor: '#2e7d32', 
    marginVertical: 15, 
    alignItems: 'center', 
    borderRadius: 15 
  },
  scanText: { fontSize: 16, color: 'white', textAlign: 'center', padding: 10 },
  cancelButton: { backgroundColor: 'red', margin: 10, alignItems: 'center', borderRadius: 15 },
  scanOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  leasingHeader: { color: 'green', fontSize: 14, marginBottom: 5 }
});

export default GreenBin;


