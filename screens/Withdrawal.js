import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Picker, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Color } from '../GlobalStyles';

// Header Component
const Header = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerTitle}>Withdrawal</Text>
  </View>
);

// Balance Section Component
const BalanceSection = ({ balance }) => (
  <View style={styles.balanceSection}>
    <Text style={styles.balanceLabel}>Current GCPs Balance</Text>
    <Text style={styles.balanceAmount}>{balance}</Text>
  </View>
);

// Withdrawal Amount Input Component
const WithdrawalAmountInput = ({ value, onChange }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>Amount to Withdraw</Text>
    <TextInput
      style={styles.inputField}
      keyboardType="numeric"
      value={value}
      onChangeText={onChange}
    />
  </View>
);

// Withdrawal Method Selector Component
const WithdrawalMethodSelector = ({ selectedMethod, onSelect }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>Select Withdrawal Method</Text>
    <Picker
      selectedValue={selectedMethod}
      onValueChange={onSelect}
      style={styles.picker}
    >
      <Picker.Item label="Green Mobile Bank" value="bank" />
      <Picker.Item label="Green Points" value="greenPoints" />
      {/* Add more options as needed */}
    </Picker>
  </View>
);

// Green Bank Code Input Component
const GreenBankCodeInput = ({ value, onChange }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>Enter Green Bank Code</Text>
    <TextInput
      style={styles.inputField}
      value={value}
      onChangeText={onChange}mmmmm
      placeholder="10-digit code"
      placeholderTextColor={Color}
      keyboardType="numeric"
    />
  </View>
);

// Withdrawal Button Component
const WithdrawalButton = ({ onPress }) => (
  <View style={styles.buttonContainer}>
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>Withdraw</Text>
    </TouchableOpacity>
  </View>
);

// Transaction History Component
const TransactionHistory = ({ transactions }) => (
  <View style={styles.historyContainer}>
    <Text style={styles.historyTitle}>Transaction History</Text>
    <FlatList
      data={transactions}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.transactionItem}>
          <Text style={styles.transactionDate}>{item.date}</Text>
          <Text style={styles.transactionAmount}>{item.amount}</Text>
        </View>
      )}
    />
  </View>
);

// Main Withdrawal Screen Component
const WithdrawalScreen = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = React.useState('');
  const [method, setMethod] = React.useState('greenPoints');
  const [greenBankCode, setGreenBankCode] = React.useState('');
  const [transactions, setTransactions] = React.useState([
    { id: '1', date: '2024-08-10', amount: 'GCPs 1000.00' },
    { id: '2', date: '2024-08-08', amount: 'GCPs 500.00' },
    { id: '3', date: '2024-08-04', amount: 'GCPs 350.00' },
    // Add more sample transactions as needed
  ]);

  const handleWithdrawal = () => {
    // Handle withdrawal logic
    if (method === 'bank' && greenBankCode.length !== 10) {
      alert('Please enter a valid 10-digit Green Bank code.');
      return;
    }
    // Proceed with withdrawal logic
    navigation.navigate('WithdrawalSuccess');
  };

  return (
    <View style={styles.container}>
      <Header />
      <BalanceSection balance="14000.00" />
      <WithdrawalAmountInput value={amount} onChange={setAmount} />
      <WithdrawalMethodSelector selectedMethod={method} onSelect={setMethod} />
      {method === 'bank' && (
        <GreenBankCodeInput value={greenBankCode} onChange={setGreenBankCode} />
      )}
      <Text style={styles.promoText}>Withdraw more and get a free delivered pizza!</Text>
      <WithdrawalButton onPress={handleWithdrawal} />
      <TransactionHistory transactions={transactions} />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 20,
    overflow: 'hidden',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  balanceSection: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  inputContainer: {
    padding: 16,
  },
  inputLabel: {
    marginBottom: 8,
    fontSize: 16,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    height: 35,
  },
  buttonContainer: {
    padding: 16,
  },
  button: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
    width: 150,
    left: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    color: 'green',
    fontSize: 18,
  },
  historyContainer: {
    padding: 16,
  },
  historyTitle: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  transactionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  transactionDate: {
    fontSize: 14,
    color: '#555',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  promoText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF5722',
    marginVertical: 10,
  },
});

export default WithdrawalScreen;
