import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Animated, Modal, ActivityIndicator, Alert } from 'react-native';
import Paystack from 'react-native-paystack-webview';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Color, FontFamily } from '../../GlobalStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { cashDeposit } from '../../redux/actions/payments'; // Import your action creators

const PrepaidRechargeScreen = () => {
  const [amount, setAmount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [gatewayMessage, setGatewayMessage] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const { amount: routeAmount } = route.params;
  const paystackWebViewRef = useRef();  // Paystack ref

  const animation = useRef(new Animated.Value(0)).current;

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.greenPay.loading); // Get loading state from Redux
  const error = useSelector((state) => state.greenPay.error); // Get error state from Redux

  useEffect(() => {
    setAmount(routeAmount);
    Animated.timing(animation, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [routeAmount]);

  const handlePaystackSuccess = () => {
    setGatewayMessage("Payment successful!");
    // Dispatch cash deposit action with the amount
    dispatch(cashDeposit(amount))
      .then(() => {
        // Navigate to success screen or show a message
        navigation.navigate('BuyBundleSuccessful');
      })
      .catch((err) => {
        setGatewayMessage("Error processing cash deposit.");
        Alert.alert(err); // Log the error for debugging

      });
    
    setModalVisible(false);
  };

  const handlePaystackCancel = () => {
    setGatewayMessage("Payment canceled!");
    setModalVisible(false);
  };

  const handlePaystackError = (error) => {
    setGatewayMessage("Payment failed! Please try again.");
    Alert.alert(error); // Log the error for debugging
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={{ ...styles.container, opacity: animation }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.Head}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: '-3%', marginRight: '10%' }}>
              <AntDesign name="leftcircle" size={23} color="black" />
            </TouchableOpacity>
            <Text style={styles.header}>Select Payment Option</Text>
          </View>

          {gatewayMessage ? (
            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>{gatewayMessage}</Text>
            </View>
          ) : null}

          <View style={styles.contHeader}>
            <Text style={styles.title}>Prepaid Recharge for Self</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.payableAmount}>Deposit Amount</Text>
              <Text style={styles.amount}>KES {amount}</Text>
            </View>
          </View>

          <View style={styles.paymentMethod}>
            <Text style={styles.methodHeader}>PROCEED TO PAY</Text>

            <View style={styles.GreenBalance}>
              <Text style={styles.greenText1}>Your Equivalent KES is GCPs BALANCE/10.25!</Text>
              <View style={styles.fit}>
                <Text style={styles.greenText}>GCPs Balance: {amount}</Text>
              </View>
              <Text style={styles.airtimeInfo}>
                Get <Text style={styles.text}>25% extra Airtime</Text> on Recharge using Green Money
              </Text>
              <Text style={styles.extraAirtime}>Extra green points of 10.5 KES will be credited to 767549104.</Text>
              <Text style={styles.extraAirtime}>Dial *256*2# to check bonus balance</Text>
            </View>

            <Text style={styles.additionalPaymentMethod}>CHOOSE PAYMENT METHOD</Text>

            {/* Paystack Payment Integration */}
            <Paystack
              paystackKey="pk_test_911c928d90c6ab4337e99c30c4566d8bdf43f77f"  // Replace with your Paystack public key
              billingEmail="orachadongo@gmail.com"  // Optional email
              amount={amount * 100}  // Paystack requires amount in kobo (for KES, multiply by 100)
              onCancel={handlePaystackCancel}  // Handle cancellations
              onSuccess={handlePaystackSuccess}  // Handle successful transactions
              onError={handlePaystackError}  // Handle failed transactions
              ref={paystackWebViewRef}  // Ref for initiating payment
            />
            
            {/* Pay button to initiate the transaction */}
            <TouchableOpacity onPress={() => paystackWebViewRef.current.startTransaction()}>
              <View style={styles.proceedButton}>
                <Text style={styles.proceedButtonText}>Green Pay</Text>
              </View>
            </TouchableOpacity>

            {loading && (
              <Modal transparent={true} animationType="fade">
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <ActivityIndicator size="small" color="green" />
                    <Text style={styles.modalText}>Processing payment...</Text>
                  </View>
                </View>
              </Modal>
            )}

            {error && (
              <Text style={styles.errorText}>{error}</Text>
            )}
          </View>

          <View style={styles.bottom}>
            <Text style={styles.secureCheckout}>Secure Checkout Guaranteed 100%</Text>
            <AntDesign name="checkcircle" size={27} color="green" />
          </View>
        </ScrollView>
      </Animated.View>

      <Modal transparent={true} animationType="fade" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="small" color="green" />
            <Text style={styles.modalText}>Initiating payment of KES {amount}...</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 5,

  },

  header: {
    fontSize: 18,
    marginBottom: 8,
    fontFamily: FontFamily.poppinsSemiBold,
    color: 'green',
    marginLeft: 30,
  },
  messageContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f8d7da',
    borderRadius: 14,
  },
  Head: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: '3%'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    marginTop: -140, // Adjust as needed
    width: '80%', // Width of the modal
    borderRadius: 14, // Rounded corners
    left: 30
  },
  modalContent: {
    backgroundColor: 'white', // Background color of the content
    borderRadius: 14, // Rounded corners for the content
    padding: 20, // Padding inside the content
    alignItems: 'center', // Center items horizontally
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3, // Shadow radius
    elevation: 3, // Shadow for Android
  },
  modalText: {
    marginTop: 10, // Space above the text
    fontSize: 16, // Font size of the text
    color: 'black', // Text color
  },  
 
  title: {
    fontSize: 18,
    marginBottom: 15,
    fontFamily: FontFamily.poppinsSemiBold,
  },
  gatewayStatus: {
    color : 'orange',
    left: '5%',
    marginTop: 4,
    marginBottom: 8,
    fontWeight: 'bold'
  },
  amountContainer: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  payableAmount: {
    fontSize: 14,
    color: 'black',
    fontFamily: FontFamily.poppinsSemiBold,
  },
  amount: {
    fontSize: 22,
    color: 'green',
    fontWeight: 'bold',
    marginLeft: 30,
    marginTop: -2,
  },
  contHeader: {
    marginBottom: 15,
    borderRadius: 14,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  text: {
    color: 'green',
    fontWeight: 'bold',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentMethod: {
    marginBottom: 25,
    borderRadius: 14,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  methodHeader: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  GreenBalance: {
    marginVertical: 8,
  },
  greenText: {
    fontSize: 16,
    color: Color.colorBlack,
    fontFamily: FontFamily.manropeSemiBold,
    paddingTop: 4,
  },
  greenText1: {
    fontSize: 12,
    color: Color.colorCrimson,
    fontFamily: FontFamily.manropeSemiBold,
    width: 300,
  },
  
 
  proceedButton: {
   backgroundColor: '#FFFFFF',
   borderRadius: 14,
   paddingVertical: 10,
   paddingHorizontal: 10,
   marginTop: 8,
   marginBottom: 8,
   alignItems: 'center',
   shadowOffset: { width: 0, height: 2 },
   shadowColor: '#000',
   shadowOpacity: 0.25,
   shadowRadius: 3,
   elevation: 1,
   width: '35%',
   left: '30%'
 
  },
  proceedButtonText: {
    color: 'green',
    fontWeight: 'bold',
  },
  airtimeInfo: {
    fontSize: 12,
    color: Color.colorGray_500,
  },
  extraAirtime: {
    fontSize: 10,
    color: Color.colorGray_500,
  },
  secureCheckout: {
    fontWeight: 'bold',
    marginRight: 15,
  },
  additionalPaymentMethod: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
  },
 
  
  emailInput: {
    height: 40,
    borderRadius: 12,
    paddingHorizontal: 8,
    marginTop: 8,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 5,
  },
  gatewayContainer: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Color.colorGray_100,
    borderRadius: 15,
    padding: 12,
    marginTop: 10
  },
  gatewayHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    fontFamily: FontFamily.poppinsSemiBold,
    marginBottom: 12,
  },
});

export default PrepaidRechargeScreen;
