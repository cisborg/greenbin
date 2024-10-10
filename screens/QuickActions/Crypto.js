import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Platform, StatusBar, TouchableOpacity, Alert, FlatList, Modal } from 'react-native';
import { Color } from '../../GlobalStyles';
import { useNavigation } from '@react-navigation/core';

const WalletScreen = () => {
  const navigation = useNavigation();
  const [greenPoints, setGreenPoints] = useState(100);
  const [cryptoBalance, setCryptoBalance] = useState(0);
  const [conversionRate, setConversionRate] = useState(0.01);
  const [amount, setAmount] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    fetchConversionRate();
  }, []);

  useEffect(() => {
    filterTransactions();
  }, [searchQuery, transactions]);

  const fetchConversionRate = async () => {
    // Simulating a fetch request
    setConversionRate(0.01);
  };

  const convertToCrypto = () => {
    const pointsToConvert = parseFloat(amount);
    if (pointsToConvert <= greenPoints && pointsToConvert > 0) {
      const cryptoAmount = pointsToConvert * conversionRate;
      setCryptoBalance(cryptoBalance + cryptoAmount);
      setGreenPoints(greenPoints - pointsToConvert);
      addTransaction('Converted to Crypto', cryptoAmount.toFixed(4));
      setAmount('');
    } else {
      Alert.alert('Error', 'Insufficient green points or invalid amount.');
    }
  };

  const convertToPoints = () => {
    const cryptoToConvert = parseFloat(amount);
    if (cryptoToConvert <= cryptoBalance && cryptoToConvert > 0) {
      const pointsAmount = cryptoToConvert / conversionRate;
      setGreenPoints(greenPoints + pointsAmount);
      setCryptoBalance(cryptoBalance - cryptoToConvert);
      addTransaction('Converted to Points', pointsAmount.toFixed(2));
      setAmount('');
    } else {
      Alert.alert('Error', 'Insufficient crypto balance or invalid amount.');
    }
  };

  const depositGreenPoints = () => {
    const pointsToDeposit = parseFloat(depositAmount);
    if (pointsToDeposit > 0) {
      setGreenPoints(greenPoints + pointsToDeposit);
      addTransaction('Deposited Green Points', pointsToDeposit.toFixed(2));
      setDepositAmount('');
    } else {
      Alert.alert('Error', 'Invalid deposit amount.');
    }
  };

  const addTransaction = (type, amount) => {
    const newTransaction = {
      type,
      amount,
      date: new Date().toLocaleString(),
    };
    setTransactions([...transactions, newTransaction]);
  };

  const filterTransactions = () => {
    const filtered = transactions.filter(transaction =>
      transaction.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTransactions(sortTransactions(filtered));
  };

  const sortTransactions = (transactions) => {
    return transactions.sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const openTransactionDetail = (transaction) => {
    setSelectedTransaction(transaction);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTransaction(null);
  };

  const renderTransactionItem = ({ item }) => (
    <TouchableOpacity style={styles.transactionCard} onPress={() => openTransactionDetail(item)}>
      <Text style={styles.transactionType}>{item.type}</Text>
      <Text style={styles.transactionAmount}>{item.amount}</Text>
      <Text style={styles.transactionDate}>{item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Crypto Wallet</Text>

      <View style={styles.card}>
        <Text style={styles.balance}>Green Points: {greenPoints}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.balance}>Crypto Balance: {cryptoBalance.toFixed(4)} Crypto</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter Amount to Convert"
        placeholderTextColor={Color.colorGray_100}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={convertToCrypto}>
          <Text style={styles.buttonText}>Convert to Crypto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={convertToPoints}>
          <Text style={styles.buttonText}>Convert to Points</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Deposit Green Points"
        placeholderTextColor={Color.colorGray_100}
        value={depositAmount}
        onChangeText={setDepositAmount}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button1} onPress={()=> navigation.goBack()}>
        <Text style={styles.buttonText}>Deposit</Text>
      </TouchableOpacity>

      <Text style={styles.conversionRate}>Conversion Rate: 1 Green Point = {conversionRate} Crypto</Text>

      <TextInput
        style={styles.input}
        placeholder="Search Transactions"
        placeholderTextColor={Color.colorGray_100}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <TouchableOpacity style={styles.sortButton} onPress={toggleSortOrder}>
        <Text style={styles.sortButtonText}>Sort: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}</Text>
      </TouchableOpacity>

      <Text style={styles.transactionHeader}>Transaction History</Text>
      <FlatList
        data={filteredTransactions}
        renderItem={renderTransactionItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.transactionList}
      />

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          {selectedTransaction && (
            <>
              <Text style={styles.modalHeader}>Transaction Details</Text>
              <Text style={styles.modalText}>Type: {selectedTransaction.type}</Text>
              <Text style={styles.modalText}>Amount: {selectedTransaction.amount}</Text>
              <Text style={styles.modalText}>Date: {selectedTransaction.date}</Text>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
  },
  balance: {
    fontSize: 20,
    fontWeight: '600',
    color: 'green',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 9,
    padding: 15,
    marginVertical: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    alignItems: 'center',
  },
  button1: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'green',
  },
  conversionRate: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 18,
    color: '#2c3e50',
  },
  transactionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginVertical: 10,
  },
  transactionList: {
    flex: 1,
  },
  transactionCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  transactionAmount: {
    fontSize: 14,
    color: '#95a5a6',
  },
  transactionDate: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 5,
  },
  sortButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  sortButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 20,
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    marginVertical: 5,
  },
  closeButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 8,
    padding: 10,
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default WalletScreen;
