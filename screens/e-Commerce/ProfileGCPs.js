import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView,ActivityIndicator, Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMobiTiers, fetchDonationTiers, fetchAirtimeBought } from '../../redux/actions/userTiers'; // Import actions
import { fetchBalance } from '../../redux/actions/bankGreen'; // Import actions
import { withdraw } from '../../redux/actions/payments';
import AntDesign from '@expo/vector-icons/AntDesign';
import LottieView from 'lottie-react-native'; // Import Lottie
import FastImage from 'react-native-fast-image';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Color } from "../../GlobalStyles";


const CardScroll = () => {
  const greenFriday = require('../../assets/greenFriday.png');
  const greenPoints = require('../../assets/greenPoints.png');
  const bags = require('../../assets/Bags.png');
  const connect = require('../../assets/connect.png');

  
  const cards = [
    { id: 1, image: { uri: greenFriday } },
    { id: 2, image: { uri: greenPoints } },
    { id: 3, image: { uri: bags } },
    { id: 4, image: { uri: connect } },
  ];

  const [randomCards, setRandomCards] = useState([]);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    animatedValue.setValue(0);
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: true,
      })
    ).start();
  };

  const randomizeCards = () => {
    const shuffledCards = [...cards].sort(() => 0.5 - Math.random());
    setRandomCards(shuffledCards.slice(0, 3));
  };

  const animatedStyle = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
    }),
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [10, 0],
        }),
      },
    ],
  };

  useEffect(() => {
    randomizeCards();
    startAnimation();
    const interval = setInterval(randomizeCards, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardScrollContainer}>
      {randomCards.map(card => (
        <TouchableOpacity key={card.id} >
          <Animated.View style={[styles.cardContainer, animatedStyle]}>
            <FastImage source={card.image} style={styles.cardImage} resizeMode={FastImage.resizeMode.cover} />
          </Animated.View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const mobiTiers = useSelector((state) => state.balance.mobiTiers);
  const balance = useSelector((state) => state.balance);
  const donationTiers = useSelector((state) => state.balance.donationTiers);
  const airtimeBought = useSelector((state) => state.balance.airtimeBought);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchMobiTiers());
      await dispatch(fetchDonationTiers());
      await dispatch(fetchBalance()); // Fetch balance after fetching tiers and airtime bought status
      await dispatch(fetchAirtimeBought());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const handleWithdraw = () => {
    setIsWithdrawing(true);

    setTimeout(() => {
      setIsWithdrawing(false);
      dispatch(withdraw());
    }, 3000);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require('../../assets/lottie/modernised.json')} // Adjust path to your Lottie file
          autoPlay 
          loop 
          style={styles.lottie} // Optional: add styles if needed
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <AntDesign name="leftcircle" size={23} color="black" onPress={() => navigation.goBack()} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Welcome, User</Text>
        <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('manageAccount')}>
          <Text style={styles.button1Text}>Account</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Airtime</Text>
          <Text style={styles.statNumber}>{airtimeBought}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{mobiTiers}</Text>
          <Text style={styles.statLabel}>Mobi Tiers</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{donationTiers}</Text>
          <Text style={styles.statLabel}>Donation Tiers</Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BuyBundles')}>
          <Text style={styles.buttonText}>Bundles Spots</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DialPad')}>
          <Text style={styles.buttonText}>Self Recharge</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.welcome}>Welcome to GreenPay, Earn more GCPs!</Text>
      <View style={[styles.statBox, { flex: 2, backgroundColor: '#008000', borderRadius: 8 }]}>
        <View style={styles.greenPay}>
          <Text style={[styles.statLabel, { color: 'green' }]}>GreenPay</Text>
          <TouchableOpacity style={styles.wallet} onPress={()=>navigation.navigate('CodeAccept')}>
            <Text style={styles.walletText}>Save</Text>
          </TouchableOpacity>
        </View>
          <Text style={[styles.statNumber, { fontSize: 24, fontWeight: 'bold', color: '#fff' }]}>GCPs {balance}</Text>
          <TouchableOpacity
            style={[styles.withdrawButton, { backgroundColor: isWithdrawing ? '#FFA500' : '#008000' }]}
            onPress={handleWithdraw}
            disabled={isWithdrawing}
          >
            {isWithdrawing ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={[styles.withdrawButtonText, { color: isWithdrawing ? '#fff' : '#008000' }]}>Withdraw</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={[styles.separator, { height: '80%' }]} />

        <View style={[styles.statBox, { flex: 1 }]}>
          <View style={styles.statLabelContainer}>
            <FontAwesome name="arrow-up" size={18} color="#008000" />
            <Text style={[styles.statNumber, { fontSize: 18, fontWeight: 'bold' }]}>GCPs 1,180</Text>
          </View>
          <Text style={styles.statLabel}>Money In</Text>
        </View>

        <View style={[styles.separator, { height: '80%' }]} />

        <View style={[styles.statBox, { flex: 1 }]}>
          <View style={styles.statLabelContainer}>
            <MaterialIcons name="arrow-downward" size={18} color="#FF0000" />
            <Text style={[styles.statNumber, { fontSize: 18, fontWeight: 'bold' }]}>GCPs 360</Text>
          </View>
          <Text style={styles.statLabel}>Money Out</Text>
        </View>
      </View>

      <CardScroll />

      <View style={styles.quickActionsTitle}>
        <Text style={styles.ActionText}>Quick Actions</Text>
        <TouchableOpacity>
          <Text style={styles.ActionText1}>All Offers</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navigationContainer}>
        <View style={styles.navigationRow}>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Wifi')}>
            <FontAwesome name="wifi" size={24} color='green' />
            <Text style={styles.navButtonText}>GreenNet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('greenBin')}>
            <AntDesign name="creditcard" size={24} color='green' />
            <Text style={styles.navButtonText}>GreenBin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Insurance')}>
            <FontAwesome name="bitcoin" size={24} color='green' />
            <Text style={styles.navButtonText}>Insurance</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('BuyGoods')}>
            <FontAwesome name="shopping-cart" size={24} color='green' />
            <Text style={styles.navButtonText}>Buy Goods</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.navigationRow}>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('getPremium')}>
            <MaterialIcons name="health-and-safety" size={24} color='green' />
            <Text style={styles.navButtonText}>HealthGreen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Transaction')}>
            <FontAwesome name="send" size={24} color='green' />
            <Text style={styles.navButtonText}>Transactions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('GoGames')}>
            <FontAwesome name="gamepad" size={24} color='green' />
            <Text style={styles.navButtonText}>Go Games</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    padding: 8,
    marginTop: '1%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Optional: set background color
  },
  lottie: {
    width: 100, // Adjust size as needed
    height: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerText: {
    fontSize: 15,
    fontWeight: 'bold',
    color:'green'
  },
  greenPay:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5,
  },
  wallet: {
    backgroundColor: 'green',
    padding: 3,
    width: 25,
    height: 20,
    alignSelf: 'flex-end',
    borderRadius: 12,
  },
  walletText:{
    color: 'white',
    fontSize: 7,
    textAlign: 'center',
  },
  welcome:{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 10,
    color: 'green'
  },
  statsContainer: {
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#ffff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
    shadowColor: '#000',
  },
  statBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green', // White text for label
    marginBottom: 5,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black', // White text for label
  },
  separator: {
    height: '100%',
    width: 1,
    backgroundColor: '#D8D8D8', // Grey divider
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  statLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  separator: {
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  withdrawButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  withdrawButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button1: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 8,
    elevation: 1,
    maxWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button1Text: {
    color:'green',
    fontSize: 14,
    fontWeight: '600',
  },
 
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    marginTop: 25,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#f9f9f9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowColor: '#000',
    margin: 10,
    elevation: 1,

  },
  buttonText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
  },
  quickActionsTitle: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  ActionText: {
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
  },
  ActionText1: {
    fontSize: 16,
    color: Color.colorLimegreen_100,
  },
  navigationContainer: {
    marginTop: 10,
  },
  navigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    
  },
  navButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: '#f9f9f9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    margin: 5,
    shadowColor: '#000',
  },
  navButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'black',
    marginTop: 5,
  },
  cardScrollContainer: {
    paddingVertical: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    marginBottom: 15,
    maxHeight: 130,
    marginTop: 15
  },
  cardContainer: {
    width: 150,
    height: 100,
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: 10,
  },
  cardImage: {
    width: '100%',
    height: '90%',
    borderRadius: 17,
    resizeMode: 'contain'
  },
});

export default HomeScreen;
