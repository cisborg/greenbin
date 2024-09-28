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
      duration: 500,
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
    }, 400);
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="leftcircle" size={30} color="black" />
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
              <Text style={styles.gatewayHeader}>PAYMENT GATEWAY</Text>
              <View style={styles.Pics}> 
                <TouchableOpacity onPress={() => handleGatewayClick('Visa')}>
                  <Image source={require("../../assets/visa.png")} contentFit="cover" style={styles.pics} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleGatewayClick('M-Pesa')}>
                  <Image source={require("../../assets/mpesa.png")} contentFit="cover" style={styles.pics} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleGatewayClick('PayPal')}>
                  <Image source={require("../../assets/paypa.png")} contentFit="cover" style={styles.pics} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleGatewayClick('Binance')}>
                  <Image source={require("../../assets/binance.png")} contentFit="cover" style={styles.pics} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleGatewayClick('Amazon')}>
                  <Image source={require("../../assets/amazon.png")} contentFit="cover" style={styles.pics} />
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
              <TouchableOpacity>
                <View style={styles.proceed}>
                  <Pressable style={styles.proceedButton} onPress={handleProceedEmail}>
                    <Text style={styles.proceedButtonText}>Proceed</Text>
                  </Pressable>
                </View>
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
    padding: 20,
  },
  container: {
    flex: 1,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorLimegreen_200,
    marginLeft: 40,
  },
  Head: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 15,
  },
  pics: {
    width: 40,
    height: 30,
    margin: 5,
  },
  fit: {
    flexDirection: 'row',
    marginBottom: 14,
  },
 
  Pics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontFamily: FontFamily.poppinsSemiBold,
  },
  amountContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  payableAmount: {
    fontSize: 16,
    color: Color.colorGray_700,
    fontFamily: FontFamily.poppinsSemiBold,
  },
  amount: {
    fontSize: 25,
    color: Color.colorLimegreen_200,
    fontWeight: 'bold',
    marginLeft: 40,
    marginTop: -2,
  },
  contHeader: {
    marginBottom: 20,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
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
    marginBottom: 30,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  methodHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  prepaidInfo: {
    fontSize: 16,
    marginVertical: 10,
  },
  GreenBalance: {
    marginVertical: 10,
  },
  greenText: {
    fontSize: 17,
    color: Color.colorBlack,
    fontFamily: FontFamily.manropeSemiBold,
    paddingTop: 5,
  },
  greenText1: {
    fontSize: 14,
    color: Color.colorCrimson,
    fontFamily: FontFamily.manropeSemiBold,
    width: 300,
  },
  
  proceedButton: {
    backgroundColor: Color.colorGreen,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  proceed: {
    backgroundColor: 'white',
    shadowColor: '#000',
    left: 105,
    marginTop: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    alignContent: 'center',
    width: 100,
    height: 25,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  proceedButtonText: {
    color: Color.colorLimegreen_200,
    fontWeight: 'bold',
  },
  airtimeInfo: {
    fontSize: 14,
    color: Color.colorGray_500,
  },
  extraAirtime: {
    fontSize: 12,
    color: Color.colorGray_500,
  },
  secureCheckout: {
    fontWeight: 'bold',
    marginRight: 20,
  },
  additionalPaymentMethod: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  mpesaContainer: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: Color.colorGray_100,
    borderRadius: 10,
    padding: 15,
  },
  mpesaHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.colorLimegreen_200,
    fontFamily: FontFamily.poppinsSemiBold,
  },
  mpesaInput: {
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.colorGray_100,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  emailInput: {
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.colorGray_100,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  gatewayContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Color.colorGray_100,
    borderRadius: 10,
    padding: 15,
  },
  gatewayHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.colorLimegreen_200,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginTop: 10,
    fontSize: 16,
  },
  gatewayStatus: {
    fontSize: 12,
    color: 'orange',
    marginTop: 10,
    marginBottom: 5,
    alignSelf: 'center',
  },
});

export default PrepaidRechargeScreen;
