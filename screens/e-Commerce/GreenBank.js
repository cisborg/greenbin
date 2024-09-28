import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Platform,FlatList, ActivityIndicator, Alert, StyleSheet, ScrollView, TouchableOpacity, Animated, SafeAreaView, KeyboardAvoidingView, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // For Dropdown
import { useNavigation } from '@react-navigation/native'; // For Back Navigation
import { Color } from '../../GlobalStyles';

const TOKEN_RATE = 0.25; // Token rate for converting green points to dollars
const GreenBankAccount = () => {
  const navigation = useNavigation();
  const [balance, setBalance] = useState(1000); // Initial bank balance
  const [tokenBalance, setTokenBalance] = useState(500); // Token balance (green points)
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState({ deposit: false, withdraw: false, transfer: false });
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState(''); // For Transfer
  const [showTransferInputs, setShowTransferInputs] = useState(false); // Toggle transfer inputs
  const [transferPurpose, setTransferPurpose] = useState('fees'); // Transfer purpose dropdown
  const [screenAnimation] = useState(new Animated.Value(0)); // For Screen mount animation

  // 1. Toggle transfer inputs
  const toggleTransferInputs = () => {
    setShowTransferInputs(!showTransferInputs);
  };

  // 2. Calculate total points (Balance + Green Points)
  const calculateTotalPoints = () => {
    return balance + tokenBalance * TOKEN_RATE;
  };

  // 3. Handle Deposit (Green Points only)
  const handleDeposit = () => {
    if (validateAmount()) {
      setLoading({ ...loading, deposit: true });
      setTimeout(() => {
        const depositAmount = parseFloat(amount);
        addTransaction('Deposit', depositAmount, 'Approved', 'green-points');
        setTokenBalance((prev) => prev + depositAmount);
        setLoading({ ...loading, deposit: false });
        setAmount('');
      }, 1000); // Simulate delay for processing
    }
  };

  // 4. Handle Withdraw (to M-Pesa or Bank)
  const handleWithdraw = () => {
    const totalPoints = calculateTotalPoints();

    if (validateAmount() && parseFloat(amount) <= totalPoints) {
      setLoading({ ...loading, withdraw: true });
      setTimeout(() => {
        const withdrawAmount = parseFloat(amount);
        if (withdrawAmount <= balance) {
          // Deduct from bank balance if enough
          setBalance((prev) => prev - withdrawAmount);
        } else {
          // Deduct from both bank balance and green points
          const remaining = withdrawAmount - balance;
          setBalance(0); // Bank balance becomes 0
          setTokenBalance((prev) => prev - remaining / TOKEN_RATE); // Deduct remaining from green points
        }
        addTransaction('Withdraw', withdrawAmount, 'Completed', 'mpesa/bank');
        setLoading({ ...loading, withdraw: false });
        setAmount('');
      }, 1000); // Simulate delay for processing
    } else {
      Alert.alert('Invalid Withdraw Amount', 'Amount exceeds available balance or is invalid.');
    }
  };

  // 5. Handle Transfer (with account number and purpose)
  const handleTransfer = () => {
    const totalPoints = calculateTotalPoints();

    if (validateAmount() && accountNumber && parseFloat(amount) <= totalPoints) {
      setLoading({ ...loading, transfer: true });
      setTimeout(() => {
        const transferAmount = parseFloat(amount);
        if (transferAmount <= balance) {
          setBalance((prev) => prev - transferAmount); // Deduct from bank balance if enough
        } else {
          const remaining = transferAmount - balance;
          setBalance(0); // Bank balance becomes 0
          setTokenBalance((prev) => prev - remaining / TOKEN_RATE); // Deduct remaining from green points
        }
        addTransaction('Transfer', transferAmount, 'Completed', 'bank/mpesa');
        setLoading({ ...loading, transfer: false });
        setAmount('');
        setAccountNumber('');
      }, 1000); // Simulate delay for processing
    } else {
      Alert.alert('Invalid Transfer', 'Please enter a valid account number and amount.');
    }
  };

  // Add new transaction with dynamic status and source
  const addTransaction = (type, amount, status, source) => {
    const newTransaction = {
      id: transactions.length + 1,
      type,
      amount,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      status,
      source
    };
    setTransactions([newTransaction, ...transactions]);
  };

  // Validate the amount input (positive numbers only)
  const validateAmount = () => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid positive number.');
      return false;
    }
    return true;
  };

  // 6. Animate the screen when it mounts
  useEffect(() => {
    Animated.timing(screenAnimation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true
    }).start();
  }, []);

  // Screen style interpolation
  const screenStyle = {
    opacity: screenAnimation,
    transform: [{ scale: screenAnimation.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }) }]
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        {/* Animated Screen Mount */}
        <Animated.View style={[styles.animatedContainer, screenStyle]}>
          {/* Header with Back Navigation */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>🌍 GreenBank Account</Text>
          </View>

          {/* Display Static Balance */}
          <View style={styles.balanceContainer}>
            <Text style={styles.balance}>Balance: GCPs {balance.toFixed(2)}</Text>
            <Text style={styles.tokenBalance}>Bootstrap Maturated Tokens: {tokenBalance.toFixed(2)} pts</Text>
            <Text style={styles.totalPoints}>Total: GCPs {calculateTotalPoints().toFixed(2)}</Text>
          </View>

          {/* Amount Input */}
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={amount}
            placeholder="Enter Amount"
            onChangeText={setAmount}
          />

          {/* Transfer Section */}
          <TouchableOpacity onPress={toggleTransferInputs}>
            <Text style={styles.transferToggleText}>Transfer to Bank or M-Pesa</Text>
          </TouchableOpacity>

          {showTransferInputs && (
            <>
              <TextInput
                style={styles.input}
                value={accountNumber}
                placeholder="Enter Account Number"
                onChangeText={setAccountNumber}
                placeholderTextColor={Color.colorGray_100}
              />

              <Picker
                selectedValue={transferPurpose}
                style={styles.picker}
                onValueChange={(itemValue) => setTransferPurpose(itemValue)}>
                <Picker.Item label="School Fees" value="fees" />
                <Picker.Item label="Bills Payment" value="bills" />
                <Picker.Item label="Utilities" value="utilities" />
              </Picker>
            </>
          )}

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            {/* Transfer Button with Spinner */}
            <TouchableOpacity style={styles.button} onPress={handleTransfer} disabled={loading.transfer}>
              {loading.transfer ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Transfer</Text>}
            </TouchableOpacity>

            {/* Deposit Button with Spinner */}
            <TouchableOpacity style={styles.button} onPress={handleDeposit} disabled={loading.deposit}>
              {loading.deposit ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Deposit Green Points</Text>}
            </TouchableOpacity>

            {/* Withdraw Button with Spinner */}
            <TouchableOpacity style={styles.button} onPress={handleWithdraw} disabled={loading.withdraw}>
              {loading.withdraw ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Withdraw</Text>}
            </TouchableOpacity>
          </View>

          {/* Transaction History */}
          <Text style={styles.subTitle}>Transaction History</Text>
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={[styles.transactionItem, item.type === 'Deposit' ? styles.depositSidebar : styles.defaultSidebar]}>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionType}>{item.type}</Text>
                  <Text style={styles.transactionAmount}>${item.amount.toFixed(2)}</Text>
                  <View style={styles.transactionMeta}>
                    <Text style={styles.transactionDate}>{item.date}</Text>
                    <Text style={styles.transactionTime}>{item.time}</Text>
                  </View>
                  <Text style={[styles.transactionStatus, item.status === 'Completed' ? styles.completed : styles.pending]}>{item.status}</Text>
                </View>
              </View>
            )}
          />

          {/* Footer */}
          <Text style={styles.footnote}>🌍 GreenBank - The Future of Eco-friendly Banking</Text>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Styles (Updated)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android'? StatusBar.currentHeight : 0,

  },
  animatedContainer: {
    flex: 1,
    padding: 10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backIcon: {
    fontSize: 24,
    color: '#000',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  balanceContainer: {
    marginBottom: 20,
  },
  balance: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2e7d32',
  },
  tokenBalance: {
    fontSize: 18,
    color: '#2e7d32',
    marginTop: 5,
  },
  totalPoints: {
    fontSize: 18,
    color: '#00695c',
    fontWeight: '600',
    marginTop: 5,
  },
  input: {
    padding: 10,
    borderRadius: 14,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  picker: {
    height: 40,
    width: '100%',
    marginBottom: 10,
    borderRadius: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#2e7d32',
    padding: 12,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  transferToggleText: {
    color: '#00695c',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
  },
  transactionItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 14,
    borderLeftWidth: 4,
  },
  depositSidebar: {
    borderLeftColor: '#f57c00', // Orange for deposits
  },
  defaultSidebar: {
    borderLeftColor: '#2e7d32', // Green for others
  },
  transactionDetails: {
    flexDirection: 'column',
  },
  transactionMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '600',
    color: Color.colorLimegreen_200
  },
  transactionAmount: {
    fontSize: 16,
    color: '#000',
  },
  transactionDate: {
    fontSize: 12,
    color: '#888',
  },
  transactionTime: {
    fontSize: 12,
    color: '#888',
  },
  transactionStatus: {
    fontSize: 14,
    fontWeight: '700',
  },
  completed: {
    color: '#2e7d32',
  },
  pending: {
    color: '#fbc02d',
  },
  footnote: {
    fontSize: 14,
    color: '#00695c',
    marginTop: 30,
    textAlign: 'center',
  },
});

export default GreenBankAccount;
