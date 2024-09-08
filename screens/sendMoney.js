import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Color, FontFamily } from "../GlobalStyles";
import { useNavigation } from '@react-navigation/core';

export default function SendMoneyScreen() {
  const [comment, setComment] = useState('');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
       
        <Text style={styles.headerTitle}>Send Green Points </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.iconContainer}>
          <Icon name="person-outline" size={48} color="#333" />
          <Text style={styles.iconLabel}>Person</Text>
        </View>
        <View style={styles.tabContainer}>
          <Text style={styles.tabActive}>LOCAL</Text>
          <Text style={styles.tabInactive}>INTERNATIONAL</Text>
        </View>
      </View>

      <View style={styles.recipientDetails}>
        <Text style={styles.recipientTitle}>RECIPIENT DETAILS • 1</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Recipient Name or Number"
          placeholderTextColor="#999"
        />

        <Text style={styles.amountLabel}>Enter GCPs Amount</Text>
        <TextInput
          style={styles.inputAmount}
          placeholder=""
          placeholderTextColor="#000"
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.addRecipientBtn}>
          <Icon name="add-circle-outline" size={20} color='green' />
          <Text style={styles.addRecipientText}>ADD RECIPIENTS</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.commentInput}
          placeholder="Leave a save-our-earth Comment"
          placeholderTextColor="#999"
          value={comment}
          onChangeText={(text) => setComment(text)}
        />

        <TouchableOpacity
          style={[styles.proceedBtn, comment ? styles.proceedBtnActive : styles.proceedBtnInactive]}
          disabled={!comment} onPress={() => navigation.navigate('SendSuccessful')}
        >
          <Text style={styles.proceedText}>Proceed</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> navigation.goBack()}>
          <Text style={styles.goBackText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: 404
  },
  header: {
    backgroundColor: '#4caf50',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomRightRadius: 10,
    borderBottomStartRadius: 10
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    fontFamily: FontFamily.manropeSemiBold
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  tabActive: {
    color: 'green',
    fontWeight: 'bold',
  },
  tabInactive: {
    color: '#999',
  },
  recipientDetails: {
    padding: 20,
    backgroundColor: 'white',
  },
  recipientTitle: {
    color: '#555',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    borderRadius: 17
  },
  amountLabel: {
    color: '#555',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputAmount: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
    borderRadius: 17,
  },
  addRecipientBtn: {
    backgroundColor: 'white',
    shadowColor: '#000',
    left: 5,
    marginTop: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    flexDirection: 'row',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    alignContent: 'center',
    width: 200,
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  addRecipientText: {
    color: Color.colorLimegreen_200,
    fontWeight: 'bold',
    marginLeft: 5,
    fontFamily: FontFamily.manropeSemiBold
  },
  commentInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
    fontSize: 16,
    borderRadius: 18,
    marginBottom: 20,
  },
  proceedBtn: {
    padding: 15,
    borderRadius: 17,
    alignItems: 'center',
    width: 150,
    left: 220
  },
  proceedBtnInactive: {
    backgroundColor: '#ddd',
  },
  proceedBtnActive: {
    backgroundColor: '#4caf50',
  },
  proceedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  goBackText: {
    color: '#e53935',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    left: 5
  },
});
