import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, StyleSheet, Image } from 'react-native';
import moment from 'moment';
import { Color } from '../GlobalStyles';

import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // For icons (including the green 'add' icon and 'back' icon)

const TransactionScreen = () => {
  const navigation = useNavigation();
  const [generalPoints, setGeneralPoints] = useState(1286);
  const [transactions, setTransactions] = useState([
    { id: 1, to: 'Jin', type: 'Work', amount: -59, date: '2024-09-12' },
    { id: 2, to: 'Google', type: 'Salary', amount: 859, date: '2024-10-10' },
    { id: 3, to: 'Michelle', type: 'Business', amount: -479, date: '2024-09-07' },
  ]);

  const [amountToSend, setAmountToSend] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const sendPoints = (user) => {
    const amount = parseInt(amountToSend, 10);

    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Invalid amount', 'Please enter a valid number');
      return;
    }

    if (amount > generalPoints) {
      Alert.alert('Insufficient points', 'You do not have enough points to send.');
      return;
    }

    setGeneralPoints(generalPoints - amount);

    const newTransaction = {
      id: transactions.length + 1,
      to: user,
      type: 'Transfer',
      amount: -amount,
      date: moment().format('YYYY-MM-DD'),
    };

    setTransactions([newTransaction, ...transactions]);

    setAmountToSend('');
    setSelectedUser(null);

    Alert.alert('Success', `You've sent ${amount} points to ${user}`);
  };

  return (
    <View style={styles.container}>
      {/* Back button and Title in flex direction row */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle" size={32} color="green" />
        </TouchableOpacity>
        <Text style={styles.title}>Transactions Repository</Text>
      </View>

      <Text style={styles.generalBalance}>
        General balance: <Text style={styles.balanceAmount}>{generalPoints} GCPs</Text>
      </Text>

      {/* Large Image */}
      <Image
        style={styles.largeImage}
        source={{ uri: 'https://example.com/large-image-placeholder.png' }} // Placeholder
      />

      {/* Profiles with the Add icon next to the last user */}
      <ScrollView horizontal style={styles.profileScroll}>
        {['Watson', 'Sofia', 'Toni', 'Moni'].map((user, index) => (
          <TouchableOpacity
            key={index}
            style={styles.profileContainer}
            onPress={() => setSelectedUser(user)}
          >
            <Image style={styles.profilePicture} source={{ uri: 'https://example.com/profile-placeholder.png' }} />
            <Text style={styles.profileName}>{user}</Text>
            {index === 3 && (
              <TouchableOpacity style={styles.addUserIcon}>
                <Ionicons name="add-circle" size={38} color="green" />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedUser && (
        <View style={styles.sendContainer}>
          <Text style={styles.sendingToText}>Sending points to {selectedUser}</Text>
          <TextInput
            value={amountToSend}
            onChangeText={setAmountToSend}
            placeholder="Enter amount"
            keyboardType="numeric"
            style={styles.inputField}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => sendPoints(selectedUser)}
          >
            <Text style={styles.sendButtonText}>Send Points</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Transactions List in a minimized scroll view */}
      <ScrollView style={styles.transactionScroll}>
        {transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionItem}>
            <View style={styles.transactionRow}>
              <Text style={styles.transactionText}>To: {transaction.to}</Text>
              <Text style={styles.transactionText}>Type: {transaction.type}</Text>
              <Text style={styles.transactionAmount}>{transaction.amount}</Text>
            </View>
            <Text style={styles.transactionDate}>{transaction.date}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 20,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  generalBalance: {
    marginTop: 10,
    fontSize: 18,
  },
  balanceAmount: {
    fontWeight: 'bold',
    color: 'orange',
  },
  largeImage: {
    width: '100%',
    height: 150,
    marginVertical: 20,
    resizeMode: 'contain',
  },
  profileScroll: {
    marginVertical: 20,
  },
  profileContainer: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
  },
  profileName: {
    marginTop: 5,
    fontSize: 16,
  },
  addUserIcon: {
    marginTop: -60,
    alignItems: 'center',
    left: 150
  },
  sendContainer: {
    marginVertical: 20,
  },
  sendingToText: {
    fontSize: 18,
    marginBottom: 10,
  },
  inputField: {
    borderBottomWidth: 1,
    padding: 10,
    fontSize: 18,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  sendButton: {
    backgroundColor: '#28a745',
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
  },
  transactionScroll: {
    marginTop: 20,
    height: 200, // Minimize scrollview height
  },
  transactionItem: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionText: {
    fontSize: 16,
    flex: 1,
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    flex: 1,
    textAlign: 'right',
  },
  transactionDate: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
});

export default TransactionScreen;
