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
  StatusBar,
  Dimensions
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import CircularProgress from 'react-native-circular-progress-indicator';
import { ScrollView } from 'react-native-gesture-handler';
import Lottie from 'lottie-react-native'; // Import Lottie

const { width, height } = Dimensions.get('window');

const TransactionScreen = ({ navigation }) => {
  const [generalPoints, setGeneralPoints] = useState({
    GreenPoints: 340000,
    GreenBank: 150000
  });
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [recipientNumber, setRecipientNumber] = useState('');
  const [amountToSend, setAmountToSend] = useState('');
  const [amountToReceive, setAmountToReceive] = useState('');
  const [airtimeAmount, setAirtimeAmount] = useState('');
  const [showAirtimeInput, setShowAirtimeInput] = useState(false);
  const [totalDeducted, setTotalDeducted] = useState(0);
  const [showSendInput, setShowSendInput] = useState(false);
  const [showReceiveInput, setShowReceiveInput] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [opacity] = useState(new Animated.Value(0));
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(false);
  const [recentRecipients, setRecentRecipients] = useState([]);
  const [currentDate, setCurrentDate] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const cardTypes = ['GreenPoints', 'GreenBank'];

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const date = new Date();
    setCurrentDate(formatDate(date));

    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after a delay
    }, 2000); // Adjust the delay as needed
  }, []);

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
  
    // Update recent recipients with a unique ID
    setRecentRecipients(prevRecipients => {
      const newRecipient = { id: Date.now(), mobile: recipientNumber, amount: sendAmount };
      const updatedRecipients = [...prevRecipients, newRecipient];

      return updatedRecipients.length > 2 ? updatedRecipients.slice(1) : updatedRecipients;
    });
  
    // Reset input fields
    setAmountToSend('');
    setRecipientNumber('');
    setShowSendInput(false);
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
    setShowReceiveInput(false);
  };

  const handleAddUser = () => {
    setIsAddingUser(true);
    setShowAirtimeInput(true);
    setTimeout(() => {
      setIsAddingUser(false);
    }, 2000);
  };

  const handleAirtimePurchase = () => {
    const amount = parseInt(airtimeAmount, 10);
    if (isNaN(amount) || amount <= 0) {
      alert('Invalid airtime amount');
      return;
    }

    const currentCard = cardTypes[activeCardIndex];
    if (amount > generalPoints[currentCard]) {
      alert('Insufficient balance');
      return;
    }

    setGeneralPoints(prevState => ({
      ...prevState,
      [currentCard]: prevState[currentCard] - amount
    }));

    setAirtimeAmount('');
    setShowAirtimeInput(false);
  };

  const handleSubscriptionClick = () => {
    setIsLoadingSubscription(true);
    setTimeout(() => {
      setIsLoadingSubscription(false);
      navigation.navigate('getPremium');
    }, 500);
  };

  const calculateProgress = () => {
    return (totalDeducted / 1000000) * 100;
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Lottie 
          source={require('../../assets/lottie/rotateLoad.json')} // Specify the path to your Lottie file
          autoPlay
          loop
          style={styles.loadingAnimation}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
      <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoiding}>
        <Animated.View style={{ opacity }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back-circle-sharp" size={28} color="green" />
            </TouchableOpacity>
            <View style={{ flexDirection: 'column' }}> 
              <Text style={styles.headerText}>Hello, Jude!</Text>
              <Text style={styles.dateText}>{currentDate}</Text>
            </View>
          </View>
          
          {/* Card Section */}
          <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>My Green Pay Cards</Text>
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
            <TouchableOpacity onPress={() => { setShowSendInput(true); setShowReceiveInput(false); setShowAirtimeInput(false); }} style={styles.actionButton}>
              <FontAwesome name="send" size={26} color="green" />
              <Text>Send Cash</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { setShowReceiveInput(true); setShowSendInput(false); setShowAirtimeInput(false); }} style={styles.actionButton}>
              <Ionicons name="download" size={24} color="green" />
              <Text>Receive Cash</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { setShowReceiveInput(false); setShowSendInput(false); setShowAirtimeInput(true); }} style={styles.actionButton}>
              {isAddingUser ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                <>
                  <Ionicons name="add" size={24} color="green" />
                  <Text>Mobi Airtime</Text>
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
          
          {/* Airtime Input Section */}
          {showAirtimeInput && (
            <View style={styles.inputContainer}>
              <TextInput 
                placeholder="Amount of Airtime" 
                keyboardType="numeric" 
                value={airtimeAmount} 
                onChangeText={(text) => {
                  const sanitizedText = text.replace(/[^0-9]/g, '');
                  setAirtimeAmount(sanitizedText);
                }} 
                placeholderTextColor='gray'
                style={styles.input} 
              />
              <TouchableOpacity onPress={handleAirtimePurchase} style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Buy Airtime</Text>
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
                  <Text style={styles.recentRecipientsTitle}>Recents Recipients</Text>
                  <FontAwesome name="send" size={18} color="orange" />
                </View>

                {recentRecipients.map((item) => (
                  <View key={item.id} style={styles.recipientContainer}>
                    <Text style={{ color: 'blue', fontSize: 12 }}>{item.mobile}</Text>
                    <Text style={{ color: 'green', fontSize: 11 }}>Sent: GCP {item.amount}</Text>
                  </View>
                ))}
              </View>
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: 1,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingAnimation: {
    width: 150,
    height: 150,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
    marginBottom: 10,
    left: '2%'
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
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderRadius: 17,
    shadowColor: '#000',
    padding: 8,
    alignItems: 'center',
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
    marginHorizontal: 5,
    
    padding: 1
  },
  cardTitle: { 
    fontSize: 20, 
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 32,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.42,
    height: height * 0.15
  },
  activeCard: { 
    backgroundColor: 'green',
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
    marginVertical: 10,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingHorizontal: 10,
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
    elevation: 1
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
    justifyContent: 'flex-start',
    marginBottom: 5,
    alignItems: 'center',
    width: '50%',
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
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    marginBottom: 10,
    paddingVertical: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  recentRecipientsTitle: { 
    fontSize: 14,
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
    marginHorizontal: 5,
  },
  subscriptionButton: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 18,
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
