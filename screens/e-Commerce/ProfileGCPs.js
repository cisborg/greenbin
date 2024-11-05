import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Animated } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Color } from "../../GlobalStyles";
import { useRoute } from '@react-navigation/native';
import Lottie from 'lottie-react-native'; // Import Lottie

const CardScroll = () => {
  const cards = [
    { id: 1, image: { uri: 'https://your-image-url.com/greenFriday.png' } },
    { id: 2, image: { uri: 'https://your-image-url.com/greenPoints.png' } },
    { id: 3, image: { uri: 'https://your-image-url.com/Bags.png' } },
    { id: 4, image: { uri: 'https://your-image-url.com/connect.png' } },
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
        <TouchableOpacity key={card.id} onPress={() => console.log(`Card ${card.id} pressed`)}>
          <Animated.View style={[styles.cardContainer, animatedStyle]}>
            <Image source={card.image} style={styles.cardImage} />
          </Animated.View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const HomeScreen = ({ navigation }) => {
  const route = useRoute();
  const { name, bal } = route.params;
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulate a loading delay, replace with actual data fetching if needed
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Lottie 
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
        <Text style={styles.headerText}>Welcome, {name}</Text>
        <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('manageAccount')}>
          <Text style={styles.button1Text}>Account</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Airtime</Text>
          <Text style={styles.statNumber}>200</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Mobi Tiers</Text>
          <Text style={styles.statNumber}>400</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Donation Tiers</Text>
          <Text style={styles.statNumber}>1200</Text>
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

      <View style={styles.balanceBox1}>
        <View style={styles.Container}>
          <FontAwesome6 name="mobile-retro" size={24} color="green" />
          <Text style={styles.greenMoney}>Green Carbon Points</Text>
        </View>
        <Text style={styles.moneyBalance}>GCPS Wallet: {bal}</Text>
        <Text style={styles.moneyBalance1}>Your Equivalent KES is GCPs BALANCE/10.25</Text>
      </View>

      <CardScroll />

      <View style={styles.quickActionsTitle}>
        <Text style={styles.ActionText}>Quick Actions</Text>
        <Text style={styles.ActionText1}>All Offers</Text>
      </View>

      <View style={styles.navigationContainer}>
        <View style={styles.navigationRow}>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Wifi')}>
            <FontAwesome name="wifi" size={24} color='green' />
            <Text style={styles.navButtonText}>StarLink</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('greenBin')}>
            <AntDesign name="creditcard" size={24} color='green' />
            <Text style={styles.navButtonText}>GreenBin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Crypto')}>
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
            <Text style={styles.navButtonText}>HealthSmart</Text>
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
  statsContainer: {
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#ffff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 5,
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
  
  balanceBox1: {
    alignItems: 'flex-start',
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 1, 
    marginTop: 10,
    shadowColor: '#000',
  },
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10
  },
  balanceLabel: {
    fontSize: 14,
    color: 'green',
    marginTop: 5
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
  balanceType: {
    fontSize: 12,
    fontWeight: '500',

    color: 'black',
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
  greenMoney: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10
  },
  moneyBalance: {
    fontSize: 14,
    color:'green',
    fontWeight: '500',
    marginBottom: 5,
  },
  moneyBalance1: {
    fontSize: 12,
    color: Color.colorGray_100,
    marginBottom: 10,
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
