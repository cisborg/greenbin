import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import Toast from 'react-native-toast-message';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Camera, useCodeScanner, useCameraDevices } from 'react-native-vision-camera';
import LottieView from 'lottie-react-native';
import FastImage from 'react-native-fast-image'; // Import FastImage
import Carousel from 'react-native-reanimated-carousel'; // Import the reanimated carousel

// Sample bin images (replace with your images)
const binImages = {
  basic: require('../../assets/beauty.png'),
  standard: require('../../assets/basket.png'),
  premium: require('../../assets/bikes.png'),
};

const GreenBin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [binType, setBinType] = useState('basic');
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [scanVisible, setScanVisible] = useState(false); // QR scanner visibility
  const [qrData, setQrData] = useState(null); // For storing scanned QR data
  const [isPurchase, setIsPurchase] = useState(true); // Toggle for Purchase vs Lease/Rent
  const [cameraPermission, setCameraPermission] = useState(null);

  const devices = useCameraDevices();
  const device = devices.back; // or devices.front for front camera

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

  useEffect(() => {
    // Simulate a loading delay for demonstration
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the time as needed
  }, []);

  // Camera permission request function
  const requestCameraPermission = async () => {
    const status = await Camera.requestCameraPermission();
    setCameraPermission(status === 'authorized');
    return status === 'authorized';
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
      text2: `Payment of GCPs ${amount} for bin ${binID} completed successfully.`,
    });
  };
  
  // Display the QR Data
  {qrData && (
    <View style={styles.qrDataContainer}>
      <Text>Bin ID: {qrData.binID}</Text>
      <Text>User ID: {qrData.userID}</Text>
      <Text>Amount: GCPs{qrData.amount}</Text>
    </View>
  )}
  
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      if (codes.length) {
        setScanVisible(false);
        onScanSuccess(codes[0].data); // Pass scanned code data
      }
    },
  });
 
  
  const renderBinItem = ({ item }) => (
    <TouchableOpacity onPress={() => setBinType(item.type)} style={[styles.binOption, binType === item.type && styles.selectedOption]}>
     <FastImage source={binImages[item.type]} style={styles.binImage} resizeMode={FastImage.resizeMode.cover} /> 
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView source={require('../../assets/lottie/rotatingBalls.json')} autoPlay loop />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Manage Your Waste with GreenBin 🍀</Text>

      <Carousel
        loop
        width={350}
        height={150}
        data={binOptions}
        renderItem={renderBinItem}
        scrollAnimationDuration={1000}
      />

      <Text style={styles.binDetails}>
      {`Selected Bin: ${binType.toUpperCase()} - Price: ${binOptions.find(b => b.type === binType)?.price ?? ''}, Rewards: ${binOptions.find(b => b.type === binType)?.gcpReward ?? ''} GCPs`}
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
        <TouchableOpacity onPress={handlePurchase} style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Confirm Purchase</Text>
        </TouchableOpacity>
          
         
      )}

      {!isPurchase && (
        <>
          <Text style={styles.leasingHeader}>Choose your Leasing Options Plan 🎉</Text>
          <Text style={styles.leasingDetails}>
            {`Down Payment: GCPs ${binOptions.find(b => b.type === binType).downPayment}`}
          </Text>
          <View style={styles.subscriptionSection}>
            {subscriptionOptions.map((sub) => (
              <TouchableOpacity key={sub.type} onPress={() => setSelectedSubscription(sub.type)} style={[styles.subscriptionCard, selectedSubscription === sub.type && styles.selectedSubscription]}>
                <Text style={styles.subscriptionText}>{sub.type}</Text>
                <Text style={styles.subscriptionPrice}>GCPs {sub.price}</Text>
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
            <Text style={styles.paymentText}>check mark your payment option here and earn more GCPs on payment validation</Text>
            <BouncyCheckbox
              text="Credit Card / Green Bank"
              checked={paymentMethod === 'CreditCard'}
              onPress={() => setPaymentMethod('CreditCard')}
              containerStyle={styles.checkBox}
            />
          </View>
          <TouchableOpacity style={styles.confirmButton} onPress={handleLeasePayment}>
            <Text style={styles.confirmButtonText}>Confirm Lease Payment</Text>
          </TouchableOpacity>
        </>
      )}

      <Text style={styles.leasingHeader}>Waste Collect Pay 🔥</Text>

      <TouchableOpacity style={styles.qrButton} onPress={openQRScanner}>
        <Icon name="qr-code-scanner" size={24} color="white" />
        <Text style={styles.confirmButtonText}>Scan QR Code</Text>
      </TouchableOpacity>

      <Modal visible={scanVisible} 
        animationType="slide"
        onRequestClose={() => setScanVisible(false)}>
        {cameraPermission ? (
         <Camera
         style={{ flex: 1 }}
         device={device} // Make sure you’ve selected a camera device
         isActive={scanVisible} // Only active if scan modal is visible
         codeScanner={codeScanner} // Attach the scanner here
       >
         <View style={styles.scanOverlay}>
           <Text style={styles.scanText}>Scan QR code to initiate collection payment</Text>
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
  header: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#2e7d32', marginVertical: 20 },
  binOption: { 
    alignItems: 'center',
    padding: 10,
    marginBottom: 15,
    borderColor: '#ddd', 
    borderRadius: 23, 
    width: '100%',
    elevation: 1, 
    shadowOffset: { width: 1, height: 2 }, 
   },
  selectedOption: { borderWidth: 1, borderColor: '#2e7d32', borderRadius: 23 },
  binImage: { width: '100%', height: '100%', marginBottom: 5 },
  binText: { fontSize: 16, color: '#333' },
  binDetails: { fontSize: 16, textAlign: 'center', color: 'green', marginBottom: 15 },
  subscriptionSection: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  toggleSection: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 10, 
    paddingHorizontal: 5
  },
  toggleButton: {
    backgroundColor: '#fff', 
    paddingHorizontal: 20, 
    paddingVertical: 10,
    borderRadius: 13, 
    borderColor: '#ddd', 
    elevation: 2, 
    shadowOffset: { width: 1, height: 3 }
  },
  toggleButtonText: {
    color: '#2e7d32', 
    fontSize: 14, 
    fontWeight: 'bold', 
    textTransform: 'uppercase'
  },
  subscriptionCard: { 
    width: '30%', 
    padding: 10, 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    alignItems: 'center', 
    borderColor: '#ddd', 
    elevation: 4, 
    shadowOffset: { width: 1, height: 3 } 
  },
  selectedSubscription: { borderColor: '#2e7d32', backgroundColor: 'green', elevation: 3 },
  subscriptionText: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  subscriptionPrice: { fontSize: 14, color: '#555' },
  paymentSection: { marginVertical: 10,flexDirection: 'column', alignItems: 'flex-start' },
  checkBox: { backgroundColor: '#fff', borderColor: '#fff', marginVertical: 15, paddingBottom: 10 },
  qrButton: { 
    backgroundColor: '#2e7d32', 
    marginVertical: 5, 
    borderRadius: 15, 
    paddingVertical: 5,
    alignItems: 'center' 
  },
  paymentText:{
    fontSize: 13,
    color: 'green',
    padding: 5
  },
  confirmButton: { 
    backgroundColor: '#2e7d32', 
    marginVertical: 15, 
    alignItems: 'center', 
    borderRadius: 15,
    elevation: 3, 
    paddingVertical: 10,
    shadowOffset: { width: 1, height: 3 }
  },
  confirmButtonText: {
    color: '#fff', 
    fontSize: 14, 
    fontWeight: 'bold', 
  },
  scanText: { fontSize: 16, color: 'white', textAlign: 'center', padding: 10 },
  leasingHeader: { color: 'green', fontSize: 15, marginBottom: 5 , alignSelf: 'center' },
  leasingDetails: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanOverlay: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 16,
  },
 
});

export default GreenBin;


