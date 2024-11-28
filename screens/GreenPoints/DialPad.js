import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions, Animated,Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from "../../GlobalStyles";
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';

const { width } = Dimensions.get('window');

const DialPad = () => {
  const [amount, setAmount] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handlePress = useCallback((value) => {
    setAmount((prev) => prev + value);
  }, []);

  const handleProceed = useCallback((enteredAmount) => {
    navigation.navigate('Payment', { amount: enteredAmount });
  }, [navigation]);

  const handleDelete = useCallback(() => {
    setAmount((prev) => prev.slice(0, -1));
  }, []);

  const handleCheckPress = useCallback(() => {
    if (amount === '') {
      Alert.alert('Amount Required', 'Please enter an amount before proceeding.', [{ text: 'OK' }]);
    } else {
      handleProceed(amount);
    }
  }, [amount, handleProceed]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ ...styles.animatedContainer, opacity: fadeAnim }}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Enter Amount</Text>
        </View>

        <View style={styles.rechargeContainer}>
          <Text style={styles.rechargeText}>Recharge Your Wallet and earn more GCPs!</Text>
          <Text style={styles.rechargeText1}>KES {amount} for Self</Text>
        </View>

        <View style={styles.displayContainer}>
          <Text style={styles.amountText}>KES: {amount}</Text>
          <FontAwesome6 name="delete-left" size={24} color="black" onPress={handleDelete} />
        </View>

        <View style={styles.padContainer}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((num, index) => (
            <TouchableOpacity key={index} style={styles.padButton} onPress={() => handlePress(num)}>
              <Text style={styles.padText}>{num}</Text>
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity 
            style={[styles.checkedButton, amount === '' ? styles.disabledButton : null]} 
            onPress={handleCheckPress}
            disabled={amount === ''}
            accessibilityLabel="Proceed with the entered amount"
          >
            <AntDesign name="checkcircle" size={55} color={amount !== '' ? 'green' : 'gray'} />
          </TouchableOpacity>
        </View>

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
    padding: '5%', // Responsive padding
  },
  animatedContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '10%', // Responsive padding
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
    width: '98%',
    paddingHorizontal: '5%', // Responsive padding
    paddingVertical: '3%', // Responsive padding
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
  },
  backButton: {
    marginRight: '5%', // Responsive margin
  },
  headerText: {
    fontSize: width < 400 ? 18 : 20, // Responsive font size
    color: 'white',
    fontWeight: 'bold',
    marginLeft: '10%', // Responsive margin
  },
  rechargeContainer: {
    alignItems: 'center',
    marginVertical: '5%', // Responsive margin
  },
  rechargeText: {
    fontSize: width < 400 ? 14 : 16, // Responsive font size
    color: 'orange',
    marginBottom: '2%', // Responsive margin
  },
  rechargeText1: {
    fontSize: width < 400 ? 14 : 16, // Responsive font size
    color: 'black',
    marginBottom: '2%', // Responsive margin
  },
  displayContainer: {
    marginBottom: '5%', // Responsive margin
    paddingHorizontal: '5%', // Responsive padding
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountText: {
    fontSize: width < 400 ? 30 : 36, // Responsive font size
    fontWeight: 'bold',
    color: 'green',
    marginRight: '2%', // Responsive margin
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
    backgroundColor: '#F5F5F5',
    marginBottom: '3%', // Responsive margin
    marginRight: '2%', // Responsive margin
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    marginVertical: '2%', // Responsive margin
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  padText: {
    fontSize: width < 400 ? 20 : 24, // Responsive font size
    color: '#000',
  },
  checkedButton: {
    width: '27%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    marginVertical: '2%', // Responsive margin
  },
  disabledButton: {
    opacity: 0.5,
  },
  footerText: {
    textAlign: 'center',
    marginTop: '5%', // Responsive margin
    color: '#777',
    fontSize: width < 400 ? 11 : 13, // Responsive font size
  },
  browseButton: {
    marginTop: '5%', // Responsive margin
    paddingVertical: '3%', // Responsive padding
    paddingHorizontal: '5%', // Responsive padding
    backgroundColor: 'green',
    borderRadius: 15,
  },
  browseText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: width < 400 ? 16 : 18, // Responsive font size
  },
});

export default DialPad;
