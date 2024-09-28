import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput,Platform, TouchableOpacity, Alert, FlatList, Modal } from 'react-native';
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
    const response = await fetch('https://api.example.com/conversion-rate');
    const data = await response.json();
    setConversionRate(data.rate);
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
    overflow: 'hidden',
    paddingTop: Platform.OS === 'android'? StatusBar.currentHeight : 0,

  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10
  },
  balance: {
    fontSize: 20,
    fontWeight: '600',
    color: Color.colorLimegreen_200,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: Color.colorLimegreen_200,
    borderRadius: 9,
    padding: 15,
    marginVertical: 10,
    fontSize: 16,
    width: 350,
    left: 40,
    height: 30
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    margin: 10,
    alignItems: 'center'
  },
  button1: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    margin: 10,
    width: 150,
    maxHeight: 40,
    left: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Color.colorLimegreen_200,
    fontSize: 14,
    fontWeight: 'bold',
  },
  conversionRate: {
    marginTop: 20,
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  transactionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginVertical: 10,
  },
  transactionList: {
    marginTop: 10,
  },
  transactionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2980b9',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '400',
    color: '#27ae60',
  },
  transactionDate: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  sortButton: {
    backgroundColor: '#ffffff',
    borderRadius: 13,
    padding: 15,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    alignItems: 'center',
    width: 200,
    left: 50
  },
  sortButtonText: {
    color: Color.colorLimegreen_200,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#e74c3c',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default WalletScreen;
