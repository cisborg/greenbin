import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color, FontFamily } from "../../GlobalStyles";
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Animated } from 'react-native';

const { width } = Dimensions.get('window');

const DialPad = () => {
  const [amount, setAmount] = useState('');  // State to hold the entered amount
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity is 0
  const navigation = useNavigation();

  useEffect(() => {
    // Animate the view on mount
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handlePress = (value) => {
    setAmount((prev) => prev + value);
  };

  const handleProceed = (enteredAmount) => {
    navigation.navigate('Payment', { amount: enteredAmount });
  };

  const handleDelete = () => {
    setAmount((prev) => prev.slice(0, -1));
  };

  const handleCheckPress = () => {
    if (amount === '') {
      Alert.alert(
        'Amount Required',
        'Please enter an amount before proceeding.',
        [{ text: 'OK' }]
      );
    } else {
      handleProceed(amount);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ ...styles.animatedContainer, opacity: fadeAnim }}>
        
        {/* Top Header with Back Button and Title */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Enter Amount</Text>
        </View>

        {/* Prepaid Recharge Text */}
        <View style={styles.rechargeContainer}>
          <Text style={styles.rechargeText}>Recharge Your Wallet and earn more GCPs!</Text>
          <Text style={styles.rechargeText1}>KES {amount} for Self</Text>
        </View>

        {/* Display area */}
        <View style={styles.displayContainer}>
          <Text style={styles.amountText}>KES: {amount}</Text>
          <FontAwesome6 name="delete-left" size={24} color="black" onPress={handleDelete} />
        </View>

        {/* Number pad */}
        <View style={styles.padContainer}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((num, index) => (
            <TouchableOpacity key={index} style={styles.padButton} onPress={() => handlePress(num)}>
              <Text style={styles.padText}>{num}</Text>
            </TouchableOpacity>
          ))}
          
          {/* Check Button */}
          <TouchableOpacity 
            style={[styles.checkedButton, amount === '' ? styles.disabledButton : null]} 
            onPress={handleCheckPress}
            disabled={amount === ''}
          >
            <AntDesign name="checkcircle" size={55} color={amount !== '' ? Color.colorLimegreen_200 : 'gray'} />
          </TouchableOpacity>
        </View>

        {/* Browse Plans Button */}
        <TouchableOpacity style={styles.browseButton} onPress={() => navigation.navigate('BuyBundles')}>
          <Text style={styles.browseText}>Browse Plans</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          We will send you 10% of your deposits above 500 to your greenBank after the successful deposits.
        </Text>
        <Text style={styles.footerText}>
          The more large deposits you make the more percentage your account grows, the more you qualify for loans!
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 20,
  },
  animatedContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.colorLimegreen_200,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  backButton: {
    marginRight: 15,
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 80,
  },
  rechargeContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  rechargeText: {
    fontSize: 18,
    color: 'orange',
    marginBottom: 5,
  },
  rechargeText1: {
    fontSize: 18,
    color: 'black',
    marginBottom: 5,
  },
  displayContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'green',
    marginRight: 10,
  },
  padContainer: {
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  padButton: {
    width: '25%',
    height: 60,
    marginBottom: 12,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  padText: {
    fontSize: 24,
    color: '#000',
  },
  checkedButton: {
    width: '27%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    marginVertical: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#777',
  },
  browseButton: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: Color.colorLimegreen_200,
    borderRadius: 15,
  },
  browseText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: FontFamily.poppinsSemiBold,
  },
});

export default DialPad;
