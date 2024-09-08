import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView } from 'react-native';
import { FontFamily, Color } from '../GlobalStyles'; // Ensure you have your GlobalStyles configured
import { TouchableOpacity } from 'react-native-gesture-handler';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image } from "expo-image";

import { useNavigation ,useRoute } from '@react-navigation/core';

const PrepaidRechargeScreen = () => {
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [email, setEmail] = useState('');

  const navigation = useNavigation();

  const route = useRoute();
  const { amount } = route.params; // Assuming the previous screen passed 'amount' as a param

  const handleProceedEmail = () => {
    console.log('Proceeding with email:', email);
  };
  const handleProceedMpes = () => {
    console.log('Proceeding with M-PESA number:', mpesaNumber);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.Head}>
        <TouchableOpacity>
          <AntDesign name="leftcircle" size={30} color="black" onPress={() => navigation.goBack()} />
        </TouchableOpacity>
        <Text style={styles.header}>Select Payment Option</Text>
      </View>

      <View style={styles.contHeader}>
        <Text style={styles.title}>Prepaid Recharge for Self</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.payableAmount}>Payable Amount</Text>
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
            Get <Text style={styles.text}>25% extra Airtime</Text>  on Recharge using Green Money
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
          />
          <TouchableOpacity>
            <View style={styles.proceed}>
              <Pressable style={styles.proceedButton} onPress={handleProceedMpes}>
                <Text style={styles.proceedButtonText}>Proceed</Text>
              </Pressable>
            </View>
          </TouchableOpacity>
          <Text style={styles.airtimeInfo}>
            Get <Text style={styles.text}>7% extra Green Points</Text>  on Recharge above 1000.0 KES using Mpesa.
          </Text>
        </View>

        <View style={styles.gatewayContainer}>
          <Text style={styles.gatewayHeader}>PAYMENT GATEWAY</Text>
          
          <Text style={styles.gatewayPoweredBy}>Powered by KCB</Text>
          
            <View style={styles.Pics}> 
              <TouchableOpacity>
              <Image source={require("../assets/visa.png")}  contentFit="cover"  style={styles.pics} />
              </TouchableOpacity>

              <TouchableOpacity>
               <Image source={require("../assets/mpesa.png")}  contentFit="cover"  style={styles.pics} />
              </TouchableOpacity>

              <TouchableOpacity>
               <Image source={require("../assets/paypa.png")} contentFit="cover"  style={styles.pics} />
              </TouchableOpacity>

              <TouchableOpacity>
                <Image source={require("../assets/binance.png")}  contentFit="cover"  style={styles.pics} />
              </TouchableOpacity>

              <TouchableOpacity>
                <Image source={require("../assets/amazon.png")} contentFit="cover"  style={styles.pics} />
              </TouchableOpacity>
            </View>
          

          <TextInput
            style={styles.emailInput}
            placeholder="Enter Email Id"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor={Color.colorGray_100}
          />
          <TouchableOpacity>
            <View style={styles.proceed}>
              <Pressable style={styles.proceedButton} onPress={handleProceedEmail}>
                <Text style={styles.proceedButtonText}>Proceed</Text>
              </Pressable>
            </View>
          </TouchableOpacity>
          <Text style={styles.airtimeInfo}>
            Get <Text style={styles.text}>5% extra Green Points</Text>  on Recharge above 1000.0 KES using Debit/Credit Cards & Other Mobile Money Wallets
          </Text>
        </View>

        <View style={styles.gatewayContainer}>
          <Text style={styles.gatewayPoweredBy}>Powered by Green Banking</Text>
          <TextInput
            style={styles.emailInput}
            placeholder="Enter Email Id"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor={Color.colorGray_100}
          />
          <TouchableOpacity>
            <View style={styles.proceed}>
              <Pressable style={styles.proceedButton} onPress={handleProceedEmail}>
                <Text style={styles.proceedButtonText}>Proceed</Text>
              </Pressable>
            </View>
          </TouchableOpacity>
          <Text style={styles.airtimeInfo}>
            Get <Text style={styles.text}>5% extra Green Points</Text>  on Recharge above 1000.0 KES using Debit/Credit Cards & Other Mobile Money Wallets
          </Text>
        </View>
      </View>

      <View style={styles.bottom}>
        <Text style={styles.secureCheckout}>
            Secure Checkout Guaranteed 100%
        </Text>
        <Image source={require("../assets/checked.png")} contentFit='cover' style={styles.pics1}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: Color.colorWhite,
    width: 404,
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
    marginBottom:14
  },
  pics1: {
    width: 40,
    height: 30,
    marginTop: 12,
    marginLeft: 10
  },
  pics2: {
    width: 40,
    height: 30,
    marginTop: 12,
    marginLeft: 40
  },
  Pics: {
    flexDirection: 'row',
    justifyContent:'space-around',
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
    left: 45
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
    paddingTop: 5
  },
  greenText1: {
    fontSize: 14,
    color: Color.colorCrimson,
    fontFamily: FontFamily.manropeSemiBold,
    width: 300
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
    fontFamily: FontFamily.poppinsSemiBold
  },
  mpesaInput: {
    height: 40,
    borderRadius: 8,
    paddingLeft: 10,
    marginVertical: 10,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 40,
  },
  gatewayContainer: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: Color.colorGray_100,
    borderRadius: 10,
    padding: 15,
  },
  gatewayHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  gatewayPoweredBy: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color: Color.colorLimegreen_200,
    fontFamily: FontFamily.poppinsSemiBold,
  },
  emailInput: {
    borderRadius: 8,
    paddingLeft: 10,
    marginVertical: 10,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 40,
  },
 
  secureCheckout: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    color: Color.colorBlack,
  },
});

export default PrepaidRechargeScreen;
