import React, { useState, useEffect } from 'react';
import { View, Text,
      TextInput,
      Platform, FlatList,
      ActivityIndicator, Alert,
      StyleSheet, TouchableOpacity, 
      Animated,
      SafeAreaView,
      KeyboardAvoidingView, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // For Dropdown
import { useNavigation } from '@react-navigation/native'; // For Back Navigation
import { Color } from '../../GlobalStyles';
import AntDesign from '@expo/vector-icons/AntDesign';
import Lottie from 'lottie-react-native'; // Import Lottie
import { useDispatch, useSelector } from 'react-redux';
import { updateBalance, updateTokenBalance } from '../../redux/actions/bankGreen'; 
import { deposit, withdraw } from '../../redux/actions/payments';
import { fetchBalance, fetchTokenBalance } from '../../redux/actions/bankGreen'; // Import the actions
import { Swipeable } from 'react-native-gesture-handler'; // For swipe functionality

const TOKEN_RATE = 1.0042; // Token rate for paying green tax 
const GreenBankAccount = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.balance.balance);
  const tokenBalance = useSelector((state) => state.balance.tokenBalance); 
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState({ deposit: false, withdraw: false, transfer: false, screen: true }); // Add screen loading state
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState(''); // For Transfer
  const [showTransferInputs, setShowTransferInputs] = useState(false); // Toggle transfer inputs
  const [transferPurpose, setTransferPurpose] = useState('fees'); // Transfer purpose dropdown
  const [screenAnimation] = useState(new Animated.Value(0)); // For Screen mount animation

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchBalance());
      await dispatch(fetchTokenBalance());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);
  // 1. Toggle transfer inputs
  const toggleTransferInputs = () => {
    setShowTransferInputs(!showTransferInputs);
  };

  useEffect(() => {
    const fetchData = async () => {
      // Simulate a network request
      setLoading((prev) => ({ ...prev, screen: true }));
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
      setLoading((prev) => ({ ...prev, screen: false }));
    };

    fetchData();
  }, []);
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
        
        // Dispatch deposit action
        dispatch(deposit(depositAmount));
        
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
          dispatch(withdraw(withdrawAmount)); // Dispatch withdrawal action
        } else {
          // Deduct from both bank balance and green points
          const remaining = withdrawAmount - balance;
          dispatch(withdraw(balance)); // Withdraw available balance
          const newTokenBalance = tokenBalance - remaining / TOKEN_RATE; // Deduct remaining from green points
          dispatch(updateTokenBalance(newTokenBalance)); // Update token balance in Redux
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
          const newBalance = balance - transferAmount; // Deduct from bank balance if enough
          dispatch(updateBalance(newBalance)); // Update balance in Redux
        } else {
          const remaining = transferAmount - balance;
          dispatch(updateBalance(0)); // Bank balance becomes 0
          const newTokenBalance = tokenBalance - remaining / TOKEN_RATE; // Deduct remaining from green points
          dispatch(updateTokenBalance(newTokenBalance)) // Update token balance in Redux
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

  // 7. Handle clear all transactions
  const clearAllTransactions = () => {
    Alert.alert('Clear All Transactions', 'Are you sure you want to delete all transaction history?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear All', onPress: () => setTransactions([]) }
    ]);
  };

  // 8. Handle swipe-to-delete for individual transaction
  const deleteTransaction = (transactionId) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction.id !== transactionId)
    );
  };

  // Screen style interpolation
  const screenStyle = {
    opacity: screenAnimation,
    transform: [{ scale: screenAnimation.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }) }]
  };

  // Render delete button when swiping left
  const renderDeleteButton = (transactionId) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => deleteTransaction(transactionId)}>
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        {loading.screen ? (
          <View style={styles.loadingContainer}>
            <Lottie source={require('../../assets/lottie/bouncing_check.json')} autoPlay loop style={styles.lottie} />
          </View>
        ) : (
        <Animated.View style={[styles.animatedContainer, screenStyle]}>
          {/* Header with Back Navigation */}
          <View style={styles.header}>
            <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.goBack()}>
              <AntDesign name="leftcircle" size={22} color="green" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}> GreenBank Account   🌍</Text>
           
          </View>

          {/* Display Static Balance */}
          <View style={styles.balanceContainer}>
            <Text style={styles.balance}>Balance: GCPs {balance.toFixed(2)}</Text>
            <Text style={styles.tokenBalance}>Bootstrap Tokens: {tokenBalance.toFixed(2)} pts</Text>
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
              <Swipeable
                renderRightActions={() => renderDeleteButton(item.id)}>
                <View style={[styles.transactionItem, item.type === 'Deposit' ? styles.depositSidebar : styles.defaultSidebar]}>
                  <View style={styles.transactionDetails}>
                    <Text style={styles.transactionType}>{item.type}</Text>
                    <Text style={styles.transactionAmount}>GP {item.amount.toFixed(2)}</Text>
                    <View style={styles.transactionMeta}>
                      <Text style={styles.transactionDate}>{item.date}</Text>
                      <Text style={styles.transactionTime}>{item.time}</Text>
                    </View>
                    <Text style={[styles.transactionStatus, item.status === 'Completed' ? styles.completed : styles.pending]}>{item.status}</Text>
                  </View>
                </View>
              </Swipeable>
            )}
          />

          {/* Clear All Button */}
          {transactions.length > 0 && (
            <TouchableOpacity style={styles.clearAllButton} onPress={clearAllTransactions}>
              <Text style={styles.clearAllText}>Clear All Transactions</Text>
            </TouchableOpacity>
          )}

          {/* Footer */}
          <Text style={styles.footnote}>🌍 GreenBank - The Future of Eco-friendly Banking</Text>
        </Animated.View>
         )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Styles (Updated)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '2%', // Reduced padding
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  lottie: {
    width: '100%', // Reduced width
    height: 200, // Reduced height
  },
  loadingContainer: {
    flex: 1,
    top: 40
  },
 
  animatedContainer: {
    flex: 1,
    padding: 5, // Reduced padding
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Reduced margin
    marginTop: -40, // Reduced margin
  },
  headerTitle: {
    fontSize: 20, // Reduced font size
    fontWeight: '600',
    color: '#000',
  },
  balanceContainer: {
    marginBottom: 10, // Reduced margin
  },
  balance: {
    fontSize: 20, // Reduced font size
    fontWeight: '600',
    color: '#2e7d32',
  },
  tokenBalance: {
    fontSize: 16, // Reduced font size
    color: '#2e7d32',
  },
  totalPoints: {
    fontSize: 16, // Reduced font size
    color: '#00695c',
    fontWeight: '500',
  },
  input: {
    padding: 10, // Reduced padding
    borderRadius: 13, // Slightly reduced border radius
    marginBottom: 8, // Reduced margin
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  picker: {
    height: 35, // Reduced height
    width: '100%',
    marginBottom: 8, // Reduced margin
    borderRadius: 20, // Slightly reduced border radius
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10, // Reduced margin
  },
  button: {
    flex: 1,
    marginHorizontal: 5, // Reduced margin
    backgroundColor: '#2e7d32',
    padding: 10, // Reduced padding
    alignItems: 'center',
    borderRadius: 15, // Slightly reduced border radius
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500', // Reduced font weight
    alignSelf: 'center',
  },
  transferToggleText: {
    color: '#00695c',
    fontSize: 16, // Reduced font size
    fontWeight: '500', // Reduced font weight
    marginBottom: 8, // Reduced margin
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16, // Reduced font size
    fontWeight: '500', // Reduced font weight
    color: '#000',
    marginBottom: 8, // Reduced margin
  },
  transactionItem: {
    backgroundColor: '#fff',
    padding: 10, // Reduced padding
    marginVertical: 5, // Reduced margin
    borderRadius: 10, // Slightly reduced border radius
  },
  depositSidebar: {
    borderLeftColor: '#f57c00', // Orange for deposits
    borderLeftWidth: 4,
  },
  defaultSidebar: {
    borderLeftColor: '#2e7d32', // Green for others
    borderLeftWidth: 4,
  },
  transactionDetails: {
    flexDirection: 'column',
  },
  transactionMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionType: {
    fontSize: 16, // Reduced font size
    fontWeight: '500', // Reduced font weight
    color: 'green',
  },
  transactionAmount: {
    fontSize: 16, // Reduced font size
    color: '#000',
  },
  transactionDate: {
    fontSize: 12, // Reduced font size
    color: '#888',
  },
  transactionTime: {
    fontSize: 12, // Reduced font size
    color: '#888',
  },
  transactionStatus: {
    fontSize: 14, // Reduced font size
    fontWeight: '600', // Reduced font weight
  },
  completed: {
    color: '#2e7d32',
  },
  pending: {
    color: '#fbc02d',
  },
  deleteButton: {
    backgroundColor: '#f44336', // Red delete button
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: 14,
    height: '100%',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  clearAllButton: {
    backgroundColor: '#f57c00', // Orange clear button
    padding: 10, // Slightly increased padding
    borderRadius: 10, // Slightly increased border radius
    alignItems: 'center',
    marginTop: 10, // Add margin for spacing
  },
  clearAllText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16, // Consistent font size
  },
  footnote: {
    fontSize: 12, // Reduced font size
    color: '#00695c',
    marginTop: 20, // Reduced margin
    textAlign: 'center',
  },
});

export default GreenBankAccount;
