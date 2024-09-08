import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Alert, Share, ScrollView, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { BarChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/core';


const GreenBankAccount = () => {
  const navigation = useNavigation();
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [ecoPoints, setEcoPoints] = useState(0);
  const [notifications, setNotifications] = useState(['Welcome to your Green Bank Account!', 'You earned 5 eco points for your last deposit!']);
  const [userId] = useState('ID123456');

  const handleDeposit = () => {
    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount to deposit.');
      return;
    }
    setBalance(prevBalance => prevBalance + depositAmount);
    setEcoPoints(prevPoints => prevPoints + Math.floor(depositAmount / 10)); // Earn points
    setTransactions(prev => [...prev, { type: 'Deposit', amount: depositAmount }]);
    setNotifications(prev => [...prev, `You deposited $${depositAmount.toFixed(2)}`]);
    setAmount('');
  };

  const handleWithdraw = () => {
    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0 || withdrawAmount > balance) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount to withdraw.');
      return;
    }
    setBalance(prevBalance => prevBalance - withdrawAmount);
    setEcoPoints(prevPoints => prevPoints + Math.floor(withdrawAmount / 10)); // Earn points
    setTransactions(prev => [...prev, { type: 'Withdrawal', amount: withdrawAmount }]);
    setNotifications(prev => [...prev, `You withdrew $${withdrawAmount.toFixed(2)}`]);
    setAmount('');
  };

  ;

  const renderTransactionItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <Text style={styles.transactionText}>{item.type}: ${item.amount.toFixed(2)}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.profileIcon} />
        <Text style={styles.profileId}>User ID: {userId}</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <FontAwesome name="cog" size={20} color="#2e7d32" />
        </TouchableOpacity>
      </View>

      <Text style={styles.header}>Green Bank Account 💳💎</Text>
      <Text style={styles.balance}>Balance: KES {balance.toFixed(2)}</Text>
      <Text style={styles.ecoPoints}>Green Points: {ecoPoints}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleDeposit}>
          <FontAwesome name="plus" size={20} color="#fff" />
          <Text style={styles.buttonText}>Deposit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleWithdraw}>
          <FontAwesome name="minus" size={20} color="#fff" />
          <Text style={styles.buttonText}>Withdraw</Text>
        </TouchableOpacity>
      </View>


      <FlatList
        data={transactions}
        renderItem={renderTransactionItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.transactionList}
      />

      <Text style={styles.notificationsHeader}>Notifications</Text>
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.notificationText}>{item}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.notificationList}
      />

      <Text style={styles.resourcesHeader}>Eco-Friendly Tips</Text>
      <Text style={styles.resourceText}>1. Use reusable bags.</Text>
      <Text style={styles.resourceText}>2. Reduce water usage.</Text>
      <Text style={styles.resourceText}>3. Choose public transport or bike.</Text>

      <Text style={styles.chartHeader}>Transaction Overview</Text>
      <BarChart
        data={{
          labels: transactions.map((_, index) => `T${index + 1}`),
          datasets: [
            {
              data: transactions.map(item => item.amount),
            },
          ],
        }}
        width={340}
        height={220}
        chartConfig={{
          backgroundColor: '#e0f7ea',
          backgroundGradientFrom: '#e0f7ea',
          backgroundGradientTo: '#e0f7ea',
          color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          strokeWidth: 2,
        }}
        style={styles.chart}
      />

      <Text style={styles.carbonFootprintHeader}>Carbon Footprint Calculator</Text>
      <Text style={styles.carbonFootprintText}>Estimate your carbon footprint based on your activities.</Text>
      <TouchableOpacity style={styles.calculatorButton} onPress={()=> navigation.goBack() }>
        <Text style={styles.calculatorButtonText}>Calculate Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffff',
    width: 404,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#c8e6c9',
    borderRadius: 5,
    marginBottom: 20,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  profileId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    flex: 1,
  },
  settingsButton: {
    padding: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2e7d32',
  },
  balance: {
    fontSize: 20,
    marginBottom: 10,
    color: '#388e3c',
  },
  ecoPoints: {
    fontSize: 18,
    marginBottom: 20,
    color: '#4caf50',
  },
  input: {
    height: 40,
    borderRadius: 11,
    paddingHorizontal: 10,
    marginBottom: 15,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 17,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
 
  transactionHistoryHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2e7d32',
  },
  transactionList: {
    paddingBottom: 20,
  },
  transactionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  transactionText: {
    fontSize: 16,
  },
  notificationsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2e7d32',
  },
  notificationList: {
    paddingBottom: 20,
  },
  notificationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  notificationText: {
    fontSize: 16,
    color: '#555',
  },
  resourcesHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2e7d32',
  },
  resourceText: {
    fontSize: 16,
    color: '#555',
  },
  chartHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#2e7d32',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  carbonFootprintHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#2e7d32',
  },
  carbonFootprintText: {
    fontSize: 16,
    color: '#555',
  },
  calculatorButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    width: 150,
    left: 90
  },
  calculatorButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default GreenBankAccount;
