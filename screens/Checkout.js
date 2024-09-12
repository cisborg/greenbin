import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Share } from 'react-native';
import { Color } from '../GlobalStyles';
import { useNavigation } from '@react-navigation/native';

const Checkout = ({ route }) => {
  const navigation = useNavigation();
  const { totalPrice } = route.params;
  const [paymentMethod, setPaymentMethod] = React.useState('creditCard');
  const [points, setPoints] = React.useState(100); // Example available points
  const [amountToUse, setAmountToUse] = React.useState('');
  const [greenBankCode, setGreenBankCode] = React.useState('');
  const [discountApplied, setDiscountApplied] = React.useState(false);

  const handlePayment = () => {
    let finalAmount = totalPrice;

    if (paymentMethod === 'greenPoints') {
      const amount = parseInt(amountToUse, 10);
      if (isNaN(amount) || amount > points || amount <= 0) {
        Alert.alert('Invalid Amount', 'Please enter a valid amount of points to use.');
        return;
      }
      finalAmount -= amount; // Subtract points from total price
      setPoints(points - amount); // Deduct used points
    }

    if (paymentMethod === 'greenBank') {
      if (greenBankCode.length !== 10) {
        Alert.alert('Invalid Code', 'Please enter a valid 10-digit Green Bank code.');
        return;
      }
      // You can add logic here to check the validity of the Green Bank code
      Alert.alert(`Payment Successful`, `You have paid GCPs ${finalAmount} using Green Bank code: ${greenBankCode}.`);
      setGreenBankCode('');
    }

    Alert.alert(`Payment Successful`, `You have paid GCPs ${finalAmount} using ${paymentMethod}.`);
    setAmountToUse('');
  };

  const togglePaymentMethod = (method) => {
    setPaymentMethod(method);
    if (method !== 'greenPoints') {
      setAmountToUse(''); // Reset points input when switching payment methods
    }
    if (method !== 'greenBank') {
      setGreenBankCode(''); // Reset Green Bank code when switching payment methods
    }
  };

  const renderPaymentDetails = () => {
    switch (paymentMethod) {
      case 'creditCard':
        return (
          <>
            <Text style={styles.label}>Card Number</Text>
            <TextInput style={styles.inputField} placeholder="**** **** **** ****" placeholderTextColor={Color.colorGray_100} />
            <Text style={styles.label}>Cardholder Name</Text>
            <TextInput style={styles.inputField} placeholder="John Doe" placeholderTextColor={Color.colorGray_100} />
            <View style={styles.expiryContainer}>
              <View style={styles.expiryInputContainer}>
                <Text style={styles.label}>Expiry Date</Text>
                <TextInput style={styles.inputField} placeholder="MM / YYYY" placeholderTextColor={Color.colorGray_100}/>
              </View>
              <View style={styles.expiryInputContainer}>
                <Text style={styles.label}>CVV</Text>
                <TextInput style={styles.inputField} placeholder="***" placeholderTextColor={Color.colorGray_100}/>
              </View>
            </View>
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
              placeholder="Check excess points in Greenbank"
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
              placeholder="#20 -add- -phone number #ignore 07 "
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
        message: `Check out my order worth GCPs ${totalPrice}! Use this link to earn green vouchers for your next purchase!`,
      });
      Alert.alert("Order Shared!", "You've shared your order and earned additional vouchers!");
    } catch (error) {
      Alert.alert("Error", "Failed to share the order.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Checkout</Text>
        <TouchableOpacity style={styles.button1} onPress={() => navigation.goBack()}>
          <Text style={{ color: Color.colorLimegreen_200, fontSize: 14, fontWeight: '500' }}>Go Back</Text>
        </TouchableOpacity>
      </View>
     
      <Text style={styles.totalPrice}>Total: GCPs {totalPrice}</Text>

      <Text style={styles.label}>Select Payment Method</Text>
      <View style={styles.paymentOptions}>
        <TouchableOpacity
          style={[styles.paymentButton, paymentMethod === 'creditCard' && styles.selectedButton]}
          onPress={() => togglePaymentMethod('creditCard')}
        >
          <Text style={styles.paymentButtonText}>Credit Card</Text>
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

      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Pay for the Order</Text>
      </TouchableOpacity>

      <View style={styles.shareContainer}>
        <Text style={styles.shareTitle}>Share Your Order</Text>
        <Text style={styles.shareDescription}>
          Share your order to earn green vouchers for future purchases!
        </Text>
        <TouchableOpacity style={styles.shareButton} onPress={shareOrder}>
          <Text style={styles.shareButtonText}>Share Order</Text>
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
    justifyContent: 'flex-start',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 20,
    overflow: 'hidden',
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
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 40,
    marginTop: 8,
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
    borderRadius: 8,
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
    borderRadius: 8,
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
    color: '#777',
  },
});

export default Checkout;
