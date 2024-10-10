import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, StyleSheet, Alert, Share, StatusBar } from 'react-native';
import { Color } from '../../GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';


const Checkout = ({ route }) => {
  const navigation = useNavigation();
  const [paymentMethod, setPaymentMethod] = React.useState('requestFriend');
  const [points, setPoints] = React.useState(20000); // Example available points
  const [amountToUse, setAmountToUse] = React.useState('');
  const [greenBankCode, setGreenBankCode] = React.useState('');
  const [discountApplied, setDiscountApplied] = React.useState(false);
  const [senderName, setSenderName] = React.useState('');
  const [mobileNumber, setMobileNumber] = React.useState('');
  const [emailAddress, setEmailAddress] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [totalPrice, setTotalPrice] = React.useState(18960); // Example total price


  const handlePayment = () => {
    // Validate user input based on the selected payment method
    if (paymentMethod === 'requestFriend') {
      if (!/^[a-zA-Z ]+$/.test(senderName)) {
        Alert.alert('Invalid Name', 'Please enter a valid name with letters only.');
        return;
      }
      if (!/^\d{10}$/.test(mobileNumber)) {
        Alert.alert('Invalid Mobile Number', 'Please enter a valid 10-digit mobile number.');
        return;
      }
      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailAddress)) {
        Alert.alert('Invalid Email', 'Please enter a valid email address.');
        return;
      }
    } else if (paymentMethod === 'greenPoints') {
      const amount = parseInt(amountToUse, 10);
      if (isNaN(amount) || amount > points || amount <= 0) {
        Alert.alert('Invalid Amount', 'Please enter a valid amount of points to use.');
        return;
      }
      if (amount > totalPrice) {
        Alert.alert('Points Exceeded', 'The amount of points exceeds the total price.');
        return;
      }
      setPoints(points - amount); // Deduct used points
    } else if (paymentMethod === 'greenBank') {
      if (!/^\d{10}$/.test(greenBankCode)) {
        Alert.alert('Invalid Code', 'Please enter a valid 10-digit Green Bank code.');
        return;
      }
    }
    setLoading(true); // Start loading
    
    // Timeout to simulate a loading period
    setTimeout(() => {
        // Navigate to the payment confirmation screen
        navigation.navigate('paymentConfirmed');
        setLoading(false); // Stop loading
    }, 400); // 300ms timeout
  };

  const togglePaymentMethod = (method) => {
    setPaymentMethod(method);
    if (method === 'requestFriend') {
      setSenderName('');
      setMobileNumber('');
      setEmailAddress('');
    }
    if (method !== 'greenPoints') {
      setAmountToUse(''); // Reset points input when switching payment methods
    }
    if (method !== 'greenBank') {
      setGreenBankCode(''); // Reset Green Bank code when switching payment methods
    }
  };

  const renderPaymentDetails = () => {
    switch (paymentMethod) {
      case 'requestFriend':
        return (
          <>
            <Text style={styles.label}>Sender's Name</Text>
            <TextInput
              style={styles.inputField}
              value={senderName}
              onChangeText={setSenderName}
              placeholder="Enter your name"
              placeholderTextColor={Color.colorGray_100}
            />
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
              style={styles.inputField}
              value={mobileNumber}
              onChangeText={setMobileNumber}
              placeholder="Enter your mobile number"
              keyboardType="numeric"
              placeholderTextColor={Color.colorGray_100}
            />
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.inputField}
              value={emailAddress}
              onChangeText={setEmailAddress}
              placeholder="Enter your email"
              keyboardType="email-address"
              placeholderTextColor={Color.colorGray_100}
            />
          </>
        );
      case 'greenPoints':
        return (
          <>
            <Text style={styles.label}>Available Points: {points}</Text>
            <Text style={styles.label}>Enter Amount of Points to Use</Text>
            <TextInput
              style={styles.inputField}
              keyboardType="numeric"
              value={amountToUse}
              onChangeText={setAmountToUse}
              placeholder="Enter points"
              placeholderTextColor={Color.colorGray_100}
            />
            {discountApplied && <Text style={styles.discountText}>Voucher Applied!</Text>}
            <TouchableOpacity
              style={styles.applyDiscountButton}
              onPress={() => setDiscountApplied(!discountApplied)}
            >
              <Text style={styles.applyDiscountButtonText}>
                {discountApplied ? 'Voucher Applied' : 'Apply Voucher'}
              </Text>
            </TouchableOpacity>
          </>
        );
      case 'greenBank':
        return (
          <>
            <Text style={styles.label}>Enter Your Green Bank Code (10 Digit Code)</Text>
            <TextInput
              style={styles.inputField}
              value={greenBankCode}
              onChangeText={setGreenBankCode}
              placeholder="Enter your code"
              keyboardType="numeric"
              placeholderTextColor={Color.colorGray_100}
            />
            <Text style={styles.promoText}>Pay for one more product and get a free delivered pizza!</Text>
          </>
        );
      default:
        return null;
    }
  };

  const shareOrder = async () => {
    try {
      await Share.share({
        message: `I've requested you to pay for my order worth GCPs ${totalPrice}. Sender: ${senderName}, Mobile: ${mobileNumber}, Email: ${emailAddress}.`,
      });
      Alert.alert("Request Shared!", "You've shared your payment request!");
    } catch (error) {
      Alert.alert("Error", "Failed to share the payment request.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Checkout</Text>
        <TouchableOpacity style={styles.button1} onPress={() => navigation.goBack()}>
          <Text style={{ color: 'green', fontSize: 14, fontWeight: '500' }}>Go Back</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.totalPrice}>Total: GCPs 18960</Text>

      <Text style={styles.label}>Select Payment Method</Text>
      <View style={styles.paymentOptions}>
        <TouchableOpacity
          style={[styles.paymentButton, paymentMethod === 'requestFriend' && styles.selectedButton]}
          onPress={() => togglePaymentMethod('requestFriend')}
        >
          <Text style={styles.paymentButtonText}>Request a Friend to Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentButton, paymentMethod === 'greenPoints' && styles.selectedButton]}
          onPress={() => togglePaymentMethod('greenPoints')}
        >
          <Text style={styles.paymentButtonText}>Green Points</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentButton, paymentMethod === 'greenBank' && styles.selectedButton]}
          onPress={() => togglePaymentMethod('greenBank')}
        >
          <Text style={styles.paymentButtonText}>Green Bank</Text>
        </TouchableOpacity>
      </View>

      {renderPaymentDetails()}

          <TouchableOpacity style={styles.payButton} onPress={handlePayment} disabled={loading}>
        {loading ? (
            <ActivityIndicator color="white" />
        ) : (
            <Text style={styles.payButtonText}>Green Pay</Text>
        )}
    </TouchableOpacity>


      <View style={styles.shareContainer}>
        <Text style={styles.shareTitle}>Share My Green Pay</Text>
        <Text style={styles.shareDescription}>
          Share your payment request to earn green vouchers for future purchases!
        </Text>
        <TouchableOpacity style={styles.shareButton} onPress={shareOrder}>
          <Text style={styles.shareButtonText}>Share Request</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>
        We will send your order details to your email/sms after successful payment.
      </Text>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
    fontWeight: '500',
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button1: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    maxWidth: 110,
    maxHeight: 40,
    left: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    borderColor: '#ddd',
  },
  selectedButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 15,
  },
  paymentButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  inputField: {
    borderRadius: 12,
    borderColor: 'green',
    paddingHorizontal: 12,
    paddingVertical: 2,
    fontSize: 16,
    marginBottom: 15,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
    height: 40,
    marginTop: 7,
  },
  expiryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expiryInputContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  payButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  shareContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  shareTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  shareDescription: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#555',
  },
  shareButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 14,
    alignItems: 'center',
    width: '80%',
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});

export default Checkout;
