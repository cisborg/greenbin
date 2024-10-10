import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, TouchableOpacity, SafeAreaView, Animated, Modal, ActivityIndicator } from 'react-native';
import { FontFamily, Color } from '../../GlobalStyles';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image } from "expo-image";
import { useNavigation, useRoute } from '@react-navigation/native';

const PrepaidRechargeScreen = () => {
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [email, setEmail] = useState('');
  const [mpesaError, setMpesaError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [gatewayMessage, setGatewayMessage] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const { amount: routeAmount } = route.params;

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setAmount(routeAmount);
    Animated.timing(animation, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [routeAmount]);

  const handleProceedEmail = () => {
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    initiatePayment('email', email);
  };

  const handleProceedMpes = () => {
    if (!validateMpesaNumber(mpesaNumber)) {
      setMpesaError('Please enter a valid M-PESA number.');
      return;
    }
    setMpesaError('');
    initiatePayment('mpesa', mpesaNumber);
  };

  const initiatePayment = (method, identifier) => {
    setModalVisible(true);
    setLoading(true);
    
    // Simulate API call with a timeout to represent the payment process
    setTimeout(() => {
      console.log(`Initiating deposit of KES ${amount} using ${method}: ${identifier}`);
      setLoading(false);
      setModalVisible(false);
    }, 500);
  };

  const validateMpesaNumber = (number) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(number);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleGatewayClick = (gateway) => {
    setGatewayMessage(`Initiating payment via ${gateway}...`);
    setLoading(true);
    
    // Simulate API call with a timeout for the payment gateway
    setTimeout(() => {
      setLoading(false);
      setGatewayMessage(`Payment via ${gateway} initiated successfully`);
    }, 400);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={{ ...styles.container, opacity: animation }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.Head}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: '-3%', marginRight: '10%'}}>
              <AntDesign name="leftcircle" size={23} color="black" />
            </TouchableOpacity>
            <Text style={styles.header}>Select Payment Option</Text>
          </View>

          <View style={styles.contHeader}>
            <Text style={styles.title}>Prepaid Recharge for Self</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.payableAmount}>Deposit Amount</Text>
              <Text style={styles.amount}>KES {amount}</Text>
            </View>
          </View>

          <View style={styles.paymentMethod}>
            <Text style={styles.methodHeader}>PROCEED TO PAY</Text>
            <Text style={styles.prepaidInfo}>Jeff - PREPAID(767549104)</Text>

            <View style={styles.GreenBalance}>
              <Text style={styles.greenText1}>Your Equivalent KES is GCPs BALANCE/10.25!</Text>
              <View style={styles.fit}>
                <Text style={styles.greenText}>GCPs Balance: </Text>
              </View>
              
              <Text style={styles.airtimeInfo}>
                Get <Text style={styles.text}>25% extra Airtime</Text> on Recharge using Green Money
              </Text>
              <Text style={styles.extraAirtime}>
                Extra green points of 10.5 KES will be credited to 767549104.
              </Text>
              <Text style={styles.extraAirtime}>Dial *256*2# to check bonus balance</Text>
            </View>

            <Text style={styles.additionalPaymentMethod}>CHOOSE PAYMENT METHOD</Text>

            <View style={styles.mpesaContainer}>
              <Text style={styles.mpesaHeader}>M-PESA</Text>
              <TextInput
                style={styles.mpesaInput}
                placeholder="Enter Mpesa number here"
                value={mpesaNumber}
                onChangeText={setMpesaNumber}
                placeholderTextColor={Color.colorGray_100}
                keyboardType="numeric"
                onFocus={() => setMpesaError('')}
              />
              {mpesaError ? <Text style={styles.errorText}>{mpesaError}</Text> : null}
              <TouchableOpacity>
                <View style={styles.proceed}>
                  <Pressable style={styles.proceedButton} onPress={handleProceedMpes}>
                    <Text style={styles.proceedButtonText}>Proceed</Text>
                  </Pressable>
                </View>
              </TouchableOpacity>
              <Text style={styles.airtimeInfo}>
                Get <Text style={styles.text}>7% extra Green Points</Text> on Recharge above 1000.0 KES using Mpesa.
              </Text>
            </View>

            <View style={styles.gatewayContainer}>
              <Text style={styles.gatewayHeader}>OTHER PAYMENT GATEWAY</Text>
              <View style={styles.Pics}> 
                <TouchableOpacity onPress={() => handleGatewayClick('NCBA bank')}>
                  <Image source={require("../../assets/ncba.jpg")} contentFit="cover" style={styles.pics} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleGatewayClick('Equity Bank')}>
                  <Image source={require("../../assets/equity.jpg")} contentFit="cover" style={styles.pics} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleGatewayClick('DTB Bank')}>
                  <Image source={require("../../assets/dtb.png")} contentFit="cover" style={styles.pics} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleGatewayClick('Standard Chartered')}>
                  <Image source={require("../../assets/chartered.jpg")} contentFit="cover" style={styles.pics} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleGatewayClick('KCB bank')}>
                  <Image source={require("../../assets/kcb.jpg")} contentFit="cover" style={styles.pics} />
                </TouchableOpacity>
              </View>

              <TextInput
                style={styles.emailInput}
                placeholder="Enter Email Id"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor={Color.colorGray_100}
                keyboardType="email-address"
                onFocus={() => setEmailError('')}
              />
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
              <TouchableOpacity style={styles.proceedButton} onPress={handleProceedEmail}>
                    <Text style={styles.proceedButtonText}>Proceed</Text>
              </TouchableOpacity>
              {gatewayMessage ? <Text style={styles.gatewayStatus}>{gatewayMessage}</Text> : null}
              <Text style={styles.airtimeInfo}>
                Get <Text style={styles.text}>5% extra Green Points</Text> on Recharge above 1000.0 KES using Debit/Credit Cards & Other Mobile Money Wallets
              </Text>
            </View>
          </View>

          <View style={styles.bottom}>
            <Text style={styles.secureCheckout}>
              Secure Checkout Guaranteed 100%
            </Text>
            <AntDesign name="checkcircle" size={27} color="green" />
          </View>
        </ScrollView>
      </Animated.View>

      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
          >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="small" color={Color.colorGreen} />
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
    backgroundColor: Color.colorWhite,
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
  pics: {
    width: 35,
    height: 25,
    margin: 4,
  },
  fit: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  Pics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    color: Color.colorGray_700,
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
    color: Color.colorLimegreen_100,
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
  prepaidInfo: {
    fontSize: 14,
    marginVertical: 8,
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
  mpesaContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: Color.colorGray_100,
    borderRadius: 15,
    padding: 12,
  },
  mpesaHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    fontFamily: FontFamily.poppinsSemiBold,
  },
  mpesaInput: {
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
