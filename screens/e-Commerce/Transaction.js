import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  Animated,
  SafeAreaView, 
  KeyboardAvoidingView,
  StyleSheet,
  Platform, 
  StatusBar
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Color } from '../../GlobalStyles';

const TransactionScreen = ({ navigation }) => {
  const [generalPoints, setGeneralPoints] = useState({
    VISA: 23571,
    GreenPoints: 340000,
    GreenBank: 150000
  });
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [recipientNumber, setRecipientNumber] = useState('');
  const [amountToSend, setAmountToSend] = useState('');
  const [amountToReceive, setAmountToReceive] = useState('');
  const [totalDeducted, setTotalDeducted] = useState(0);
  const [showSendInput, setShowSendInput] = useState(false);
  const [showReceiveInput, setShowReceiveInput] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [opacity] = useState(new Animated.Value(0));
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(false);
  const [recentRecipients, setRecentRecipients] = useState([]);

  const cardTypes = ['VISA', 'GreenPoints', 'GreenBank'];

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleCardSelection = (index) => {
    setActiveCardIndex(index);
  };

  const handleSendPoints = () => {
    const currentCard = cardTypes[activeCardIndex];
    const sendAmount = parseInt(amountToSend, 10);

    if (!recipientNumber || isNaN(sendAmount) || sendAmount <= 0 || recipientNumber.length < 10 || recipientNumber.length > 11) {
      alert('Invalid input');
      return;
    }

    if (sendAmount > generalPoints[currentCard]) {
      alert('Insufficient balance');
      return;
    }

    // Update general points
    setGeneralPoints(prevState => ({
      ...prevState,
      [currentCard]: prevState[currentCard] - sendAmount
    }));

    // Update total deducted
    setTotalDeducted(prevTotal => prevTotal + sendAmount);

    // Update recent recipients
    setRecentRecipients(prevRecipients => {
      const newRecipient = { id: 1, mobile: recipientNumber, amount: sendAmount };
      return [newRecipient, ...prevRecipients.slice(0, 1)]; // Keep only the latest 2
    });

    // Reset input fields
    setAmountToSend('');
    setRecipientNumber('');
    setShowSendInput(false); // Hide send input after sending
  };

  const handleReceivePoints = () => {
    const receiveAmount = parseInt(amountToReceive, 10);
    const currentCard = cardTypes[activeCardIndex];

    if (isNaN(receiveAmount) || receiveAmount <= 0) {
      alert('Invalid receive amount');
      return;
    }

    if (receiveAmount > generalPoints[currentCard]) {
      alert('Insufficient balance');
      return;
    }

    setGeneralPoints(prevState => ({
      ...prevState,
      [currentCard]: prevState[currentCard] - receiveAmount
    }));

    setTotalDeducted(prevTotal => prevTotal + receiveAmount);
    setAmountToReceive('');
    setShowReceiveInput(false); // Hide receive input after receiving
  };

  const handleAddUser = () => {
    setIsAddingUser(true);
    setTimeout(() => {
      setIsAddingUser(false);
      alert('User added successfully!');
    }, 2000);
  };

  const handleSubscriptionClick = () => {
    setIsLoadingSubscription(true);
    setTimeout(() => {
      setIsLoadingSubscription(false);
      navigation.navigate('getPremium');
    }, 500);
  };

  const calculateProgress = () => {
    return (totalDeducted / 1000000) * 100; // Assume 1,000,000 is the max value
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoiding}>
        <Animated.View style={{ opacity }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back-circle-sharp" size={28} color="green" />
            </TouchableOpacity>
            <View style={{ flexDirection: 'column' }}> 
              <Text style={styles.headerText}>Hello, Jude!</Text>
              <Text style={styles.dateText}>Monday, 24 April</Text>
            </View>
          </View>
          
          {/* Card Section */}
          <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>My Cards</Text>
            <View style={styles.cardRow}>
              {cardTypes.map((card, index) => (
                <TouchableOpacity key={index} onPress={() => handleCardSelection(index)}>
                  <View style={[styles.card, index === activeCardIndex ? styles.activeCard : styles.inactiveCard]}>
                    <Text style={styles.cardType}>{card}</Text>
                    <Text style={styles.cardBalance}>GCP {Math.max(generalPoints[card], 0).toFixed(2)}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.dotContainer}>
              {cardTypes.map((_, index) => (
                <View key={index} style={[styles.dot, index === activeCardIndex ? styles.activeDot : styles.inactiveDot]} />
              ))}
            </View>
          </View>

          {/* Send/Receive Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity onPress={() => { setShowSendInput(true); setShowReceiveInput(false); }} style={styles.actionButton}>
              <FontAwesome name="send" size={26} color="green" />
              <Text>Send Cash</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { setShowReceiveInput(true); setShowSendInput(false); }} style={styles.actionButton}>
              <Ionicons name="download" size={24} color="green" />
              <Text>Receive Cash</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleAddUser} style={styles.actionButton}>
              {isAddingUser ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                <>
                  <Ionicons name="add" size={24} color="green" />
                  <Text>Add</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Send Input Section */}
          {showSendInput && (
            <View style={styles.inputContainer}>
              <TextInput 
                placeholder="Recipient Mobile/Account Number" 
                keyboardType="number-pad" 
                value={recipientNumber} 
                onChangeText={setRecipientNumber} 
                style={styles.input} 
                placeholderTextColor='gray'
              />
              <TextInput 
                placeholder="Amount to Send" 
                keyboardType="numeric" 
                value={amountToSend} 
                onChangeText={(text) => {
                  // Validate input to prevent symbols
                  const sanitizedText = text.replace(/[^0-9]/g, '');
                  setAmountToSend(sanitizedText);
                }} 
                placeholderTextColor='gray'
                style={styles.input} 
              />
              <TouchableOpacity onPress={handleSendPoints} style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Send Now</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Receive Input Section */}
          {showReceiveInput && (
            <View style={styles.inputContainer}>
              <TextInput 
                placeholder="Amount to Receive" 
                keyboardType="numeric" 
                value={amountToReceive} 
                onChangeText={(text) => {
                  // Validate input to prevent symbols
                  const sanitizedText = text.replace(/[^0-9]/g, '');
                  setAmountToReceive(sanitizedText);
                }} 
                placeholderTextColor='gray'
                style={styles.input} 
              />
              <TouchableOpacity onPress={handleReceivePoints} style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Receive Now</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Income Section with Circular Progress */}
          <View style={styles.progressContainer}>
            <View style={styles.blueContainer}>
              <Text style={styles.incomeText}>Daily Expenses</Text>
              <CircularProgress
                value={calculateProgress()}
                maxValue={100}
                radius={60}
                activeStrokeColor="green"
                inActiveStrokeColor="#e0e0e0"
              />
              <Text style={styles.incomeValue}>GP{totalDeducted.toFixed(2)}</Text>
            </View>

            {/* Recent Recipients */}
            <View style={styles.recipient}>
              <View style={styles.recentRecipientsContainer}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={styles.recentRecipientsTitle}>Recent Recipients</Text>
                  <FontAwesome name="send" size={18} color="orange" />
                </View>

                {/* Show only the latest 2 recipients */}
                {recentRecipients.map((item) => (
                  <View key={item.id} style={styles.recipientContainer}>
                    <Text style={{ color: 'blue', fontSize: 12 }}>{item.mobile}</Text>
                    <Text style={{ color: 'green', fontSize: 11 }}>Sent: GCP {item.amount}</Text>
                  </View>
                ))}
              </View>
              {/* Subscription Button */}
              <TouchableOpacity onPress={handleSubscriptionClick} style={styles.subscriptionButton}>
                {isLoadingSubscription ? (
                  <ActivityIndicator size="small" color="#ffff" />
                ) : (
                  <Text style={styles.subscriptionButtonText}>Subscription</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
    marginBottom: 20,
    left: 20
  },
  headerText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  dateText: {
    fontSize: 14, 
    color: 'gray',
    left: 20,
    marginTop: -10,
  },
  cardContainer: { 
    marginHorizontal: 15,
    margin: 20,
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderRadius: 17,
    shadowColor: '#000',
    padding: 8
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    marginHorizontal: 15,
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowColor: '#000',
    shadowRadius: 3,
    borderRadius: 17,
    padding: 8
  },
  cardTitle: { 
    fontSize: 20, 
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginHorizontal: 4
  },
  activeCard: { 
    backgroundColor: Color.colorLimegreen_200,
  },
  inactiveCard: {
    backgroundColor: 'lightgray',
  },
  cardType: {
    fontSize: 16, 
    fontWeight: 'bold',
    color: '#000',
  },
  cardBalance: {
    fontSize: 14,
    color: '#000',
  },
  dotContainer: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'green',
  },
  inactiveDot: { 
    backgroundColor: 'gray',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 20,
    marginHorizontal: 15,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 3,
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginHorizontal: 15,
  },
  inputContainer: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  input: {
    padding: 10, 
    borderRadius: 12,
    marginVertical: 5,
    shadowOffset: {width: 0,height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  },
  confirmButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  blueContainer: {
    backgroundColor: 'lightblue',
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    marginRight: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  recipient: {
    flexDirection: 'column',
    marginLeft: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  incomeText: { 
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 7,
  },
  incomeValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  recentRecipientsContainer: {
    marginVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    padding: 20,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    width: '100%',
    shadowRadius: 3,
    marginHorizontal: 5
  },
  recentRecipientsTitle: { 
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'green',
    marginRight: 15
  },
  recipientContainer: { 
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 14,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  subscriptionButton: {
    backgroundColor: 'pink',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  subscriptionButtonText: {
    color: '#fff', 
    fontSize: 16,
  },
});

export default TransactionScreen;
