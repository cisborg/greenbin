import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/core';
import { FontFamily, Color } from '../GlobalStyles'; // Ensure you have your GlobalStyles configured

const WiFiScreen = () => {
  const navigation = useNavigation();

  const [wifiNumber, setWifiCode] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const isButtonDisabled = !wifiNumber || !mobileNumber; // Disable button if any field is empty

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircle" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Green 4G/5G WiFi</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.subHeader}>WiFi Mobile Code</Text>
        <TextInput
          style={styles.input}
          value={wifiNumber}
          placeholder='Enter wifi code'
          onChangeText={setWifiCode}
          keyboardType='numeric'
          placeholderTextColor={Color.colorGray_100}
        />
        <Text style={styles.note}>
          Note: Your Router/ MiFi SIMCARD is your WiFi mobile code which is an 8-digit code.
        </Text>

        <Text style={styles.subHeader}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your mobile number"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          keyboardType="numeric"
          placeholderTextColor={Color.colorGray_100}
        />
        <Text style={styles.note}>
          Note: This is your primary mobile number where you will receive a 6-digit one-time password (OTP).
        </Text>

        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxText}>I agree</Text>
          <Text style={styles.termsConditions}>I've already purchased a Router/MiFi Device</Text>
        </View>

        <TouchableOpacity 
          style={[styles.registerButton, isButtonDisabled && styles.disabledButton]} 
          onPress={() => navigation.navigate('WifiPlan')} 
          disabled={isButtonDisabled}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 20,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.colorLimegreen_200,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    color: Color.colorLimegreen_200,
    fontFamily: FontFamily.manropeSemiBold,
  },
  input: {
    height: 40,
    borderRadius: 17,
    paddingHorizontal: 10,
    marginBottom: 15,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    
  },
  note: {
    fontSize: 12,
    color: '#666',
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxText: {
    fontSize: 14,
    color: '#333',
  },
  termsConditions: {
    fontSize: 14,
    color: '#E63946',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  registerButton: {
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
    width: 110,
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  disabledButton: {
    backgroundColor: '#ccc', // Change to a gray color when disabled
  },
  registerButtonText: {
    color: Color.colorLimegreen_200,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default WiFiScreen;
