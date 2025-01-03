import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView,FlatList, TouchableOpacity, SafeAreaView, Animated, Modal, Alert } from 'react-native';
import {Paystack} from 'react-native-paystack-webview';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Color, FontFamily } from '../../GlobalStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { cashDeposit } from '../../redux/actions/payments'; // Import your action creators
import Toast from '../../helpers/Toast'; // Adjust the import path
import Config from 'react-native-config';
import LottieView from 'lottie-react-native';

// images importation

// Import your images
import mpesa from '../../assets/mpesa.png'; // Adjust the path as necessary
import airtelMoney from '../../assets/airtel.png'; // Adjust the path as necessary
import kcb from '../../assets/kcb.jpg'; // Adjust the path as necessary
import ncba from '../../assets/ncba.jpg'; // Adjust the path as necessary
import equity from '../../assets/equity.jpg'; // Adjust the path as necessary
import dtb from '../../assets/dtb.png'; // Adjust the path as necessary
import bitcoin from '../../assets/binance.png'; // Adjust the path as necessary
import standard from '../../assets/chartered.jpg'; // Adjust the path as necessary
import cooperative from '../../assets/cop.jpeg'; // Adjust the path as necessary
import paypal from '../../assets/paypa.png'; // Adjust the path as necessary
import visa from '../../assets/visa.png'; // Adjust the path as necessary
import mastercard from '../../assets/mastercard.jpeg'; // Adjust the path as necessary




import FastImage from 'react-native-fast-image';

const banks = [
  { id: '1', name: 'KCB', logo: kcb },
  { id: '2', name: 'NCBA', logo: ncba },
  { id: '3', name: 'Equity', logo: equity },
  { id: '4', name: 'DTB', logo: dtb },
  { id: '5', name: 'Standard', logo: standard },
  { id: '6', name: 'Cooperative', logo: cooperative },
];

const globalpay = [
  { id: '1', name: 'Paypal', logo: paypal },
  { id: '2', name: 'Visa', logo: visa },
  { id: '3', name: 'Mastercard', logo: mastercard },
  { id: '4', name: 'Bitcoin', logo: bitcoin },

];
const PrepaidRechargeScreen = () => {
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const { amount: routeAmount = 0 } = route.params || {};
  const [amount, setAmount] = useState(routeAmount);
  const navigation = useNavigation();
  const paystackWebViewRef = useRef();  // Paystack ref
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info');
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

  const multiplyBy100 = (amount) => {
    return amount * 10.25;
  };
  const newAmount = multiplyBy100(amount);

  const handlePaystackSuccess = () => {
    showToast("Payment successful!", 'success');
    // Dispatch cash deposit action with the amount
    dispatch(cashDeposit(amount))
      .then(() => {
        // Navigate to success screen or show a message
        navigation.navigate('BuyBundleSuccessful');
      })
      .catch((err) => {
        showToast("Error processing cash deposit.",'error');
        Alert.alert(err); // Log the error for debugging

      });
    
  };


  const handlePayButtonPress = () => {
    setModalVisible(true); // Show the modal
    // Start Paystack transaction after a short delay
    setTimeout(() => {
      paystackWebViewRef.current.startTransaction(); // Start Paystack transaction
    }, 3000); // Adjust the delay as needed
  };

  const renderBankItem = ({ item }) => (
    <View style={styles.bankItem}>
        <FastImage 
            source={item.logo} 
            style={styles.paymentImage} 
            priority={FastImage.priority.high} 
        />
        <Text style={styles.paymentLabel}>{item.name}</Text>
    </View>
);
const renderGlobalItem = ({ item }) => (
  <View style={styles.bankItem}>
      <FastImage 
          source={item.logo} 
          style={styles.paymentImage} 
          priority={FastImage.priority.high} 
      />
      <Text style={styles.paymentLabel}>{item.name}</Text>
  </View>
);
const showToast = (message, type = 'info') => {
  setToastMessage(message);
  setToastType(type); // Dynamically update the type
  setToastVisible(true);
  setTimeout(() => setToastVisible(false), 3000); // Auto-hide after 3 seconds
};

  const handlePaystackCancel = () => {
    showToast("Payment canceled!", 'info');
    setModalVisible(true); // Show the modal

  };

  const handlePaystackError = () => {
    showToast("Payment failed! Please try again.",'error');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    {toastVisible && <Toast message={toastMessage} type={toastType} onClose={() => setToastVisible(false)} />}

      <Animated.View style={{ ...styles.container, opacity: animation }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.Head}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: '-3%', marginRight: '10%' }}>
              <AntDesign name="leftcircle" size={23} color="black" />
            </TouchableOpacity>
            <Text style={styles.header}>Select Payment Option</Text>
          </View>

          <View style={styles.contHeader}>
            <Text style={styles.title}>Green Money Recharge 🎊</Text>
            <Text style={styles.payableAmount}>Hey, David</Text>

            <View style={styles.amountContainer}>
              <Text style={styles.payableAmount}>Deposit Amount</Text>
              <Text style={styles.amount}>KES {amount}</Text>
            </View>
            <Text style={styles.smallpay}>Earn more GCPs on deposits, purchases and more!</Text>

          </View>

          <View style={styles.paymentMethod}>
            <Text style={styles.methodHeader}>PROCEED TO PAY</Text>

            <View style={styles.GreenBalance}>
              <Text style={styles.greenText1}>Your Equivalent KES is GCPs BALANCE/10.25!</Text>
              <View style={styles.fit}>
                <Text style={styles.greenText}>GCPs Balance: {newAmount}</Text>
              </View>
              <Text style={styles.airtimeInfo}>
                Get <Text style={styles.text}>25% extra Airtime</Text> on Recharge using Green Money
              </Text>
              <Text style={styles.extraAirtime}>Extra green points of 10.5 KES will be credited to your green wallet.</Text>
              <Text style={styles.extraAirtime}>Dial *344*2# to check bonus balance</Text>
            </View>

            <Text style={styles.additionalPaymentMethod}>CHOOSE PAYMENT METHOD</Text>
            <Text style={styles.descriptionText}>
              To use the Paystack payment option, select your preferred payment method from the options available In Paystack menu. You can choose M-Pesa, Airtel Money, any Kenyan bank, Bitcoin, or various global banks. Once selected, initiate deposit.If successful, you will receive a notification confirming your transaction.
           </Text>

             {/* Mobile Money Section */}
             <View style={styles.section}>
                <Text style={styles.sectionTitle}>Mobile Money 💸</Text>
                <View style={styles.paymentOptions}>
                  <View>
                    <FastImage 
                          source={mpesa} 
                          style={styles.paymentImage} 
                          priority={FastImage.priority.high} 
                      />
                      <Text style={styles.paymentLabel}>M-Pesa</Text>
                  </View>
                    <View style={styles.mobile}>
                      <FastImage 
                          source={airtelMoney} 
                          style={styles.paymentImage} 
                          priority={FastImage.priority.high} 
                      />
                      <Text style={styles.paymentLabel}>Airtel Money</Text>
                    </View>
                   
                </View>
            </View>


            {/* Banks Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Ecogreen Bank Deposits 🪴</Text>
                <FlatList
                    data={banks}
                    renderItem={renderBankItem}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContainer}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Crypto and Global Pay 🍀</Text>
                <FlatList
                    data={globalpay}
                    renderItem={renderGlobalItem}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContainer}
                />
            </View>
           

          
            <View >
             <Paystack
                paystackKey={Config.PAYSTACK_PUBLIC_KEY} 
                buttonText="Green Pay" 
                billingEmail="orachadongo@gmail.com"  // Optional email
                amount={amount * 100}
                onCancel={handlePaystackCancel}  // Handle cancellations
                onSuccess={handlePaystackSuccess}  // Handle successful transactions
                onError={handlePaystackError}  // Handle failed transactions
                ref={paystackWebViewRef}  // Ref for initiating payment
              />
            </View>
           
            
            {/* Pay button to initiate the transaction */}
            <TouchableOpacity style={styles.proceedButton} onPress={handlePayButtonPress}>
                <Text style={styles.proceedButtonText}>Green Pay</Text>
            </TouchableOpacity>

            {loading && (
              <Modal visible={modalVisible} transparent={true} animationType="fade">
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <LottieView
                    source={require('../../assets/lottie/burst.json')}
                    autoPlay
                    loop
                    style={styles.lottieAnimation}
                  />
                  <Text style={styles.title}>
                    Processing your payment....
                  </Text>
                  <Text style={styles.modalText}>
                    Thank you for supporting our efforts in making a greener planet through Paystack!
                  </Text>
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
  descriptionText: {
    marginVertical: 5,
    fontSize: 11,
    color: 'gray',
    textAlign: 'left',
},
section: {
    marginVertical: 15,
},
sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
},
paymentOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap', // Allow wrapping for better layout
},
lottieAnimation: {
  width: 200,
  height: 200,
},

modalText: {
  fontSize: 14,
  textAlign: 'center',
  color: '#333',
  marginBottom: 10,
},

flatListContainer: {
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
},

paymentImage: {
    width: 30,
    height: 30,
    marginBottom: 5,
    borderRadius: 10,
},
paymentLabel: {
    fontSize: 12,
    textAlign: 'center',
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
  mobile: {
    marginLeft: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

smallpay: {
  fontSize: 11,
  color: 'blue'
},
bankItem: {
  marginRight: 37,
},
  modalContainer: {
    flex: 1,
    backgroundColor: 'white', // Black background with 50% transparency
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%', 
    height: '50%'
  },
  modalContent: {
    borderRadius: 14, // Rounded corners for the content
    padding: 20, // Padding inside the content
    alignItems: 'center', // Center items horizontally
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3, // Shadow radius
  },
  modalText: {
    marginTop: 10, // Space above the text
    fontSize: 12, // Font size of the text
    color: 'black', // Text color
  },  
 
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: FontFamily.poppinsSemiBold,
    color: 'green',
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
    color: 'orange',
    fontWeight: 'bold',
    marginLeft: 30,
    marginTop: -2,
  },
  contHeader: {
    marginBottom: 15,
    borderRadius: 16,
    padding: 12,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
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
   elevation: 2,
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
    marginTop: 14,
  },
 
});

export default PrepaidRechargeScreen;
