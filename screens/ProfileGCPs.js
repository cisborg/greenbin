import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Animated } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Color, FontFamily } from "../GlobalStyles";
import { useRoute } from '@react-navigation/native';

const CardScroll = () => {
  const cards = [
    { id: 1, image: require('../assets/greenFriday.png') },
    { id: 2, image: require('../assets/greenPoints.png') },
    { id: 3, image: require('../assets/Bags.png') },
    { id: 4, image: require('../assets/connect.png') },

    // Add more cards as needed
  ];

  const [randomCards, setRandomCards] = useState([]);
  const animatedValue = useRef(new Animated.Value(0)).current;

  // this is the Function that starts the animation
  const startAnimation = () => {
    animatedValue.setValue(0);
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 3000, // Duration of the animation that ive set
        useNativeDriver: true,
      })
    ).start();
  };

  const randomizeCards = () => {
    const shuffledCards = [...cards].sort(() => 0.5 - Math.random());
    setRandomCards(shuffledCards.slice(0, 3)); // I am Displaying 3 random cards
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
          outputRange: [10, 0], // Moving up slightly
        }),
      },
    ],
  };

  useEffect(() => {
    randomizeCards();
    startAnimation();
    const interval = setInterval(randomizeCards, 3000); // Changing these cards every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardScrollContainer}>
      {randomCards.map(card => (
        <TouchableOpacity key={card.id} onPress={() => onCardPress(card.id)}>
        <Animated.View style={[styles.cardContainer, animatedStyle]}>
          <Image source={card.image} style={styles.cardImage} />
        </Animated.View>
      </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const HomeScreen = ({ navigation }) => {
  const route = useRoute()
  const { name , bal} = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <AntDesign name="leftcircle" size={24} color="black" onPress={() => navigation.goBack()} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Welcome, {name}</Text>
        <TouchableOpacity style={styles.button1} onPress={()=> navigation.navigate('manageAccount')}>
          <Text style={{color: Color.colorLimegreen_200, fontSize: 14, fontWeight: '500'}}>Account</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.balanceContainer}>
        <View style={styles.balanceBox}>
          <Text style={styles.balanceAmount}>0.01</Text>
          <Text style={styles.balanceLabel}>KES</Text>
          <Text style={styles.balanceType}>Airtime Balance</Text>
        </View>
        <View style={styles.balanceBox}>
          <Text style={styles.balanceAmount}>0</Text>
          <Text style={styles.balanceLabel}>Mins</Text>
          <Text style={styles.balanceType}>Voice Balance</Text>
        </View>
        <View style={styles.balanceBox}>
          <Text style={styles.balanceAmount}>520.20</Text>
          <Text style={styles.balanceLabel}>MB</Text>
          <Text style={styles.balanceType}>Data Balance</Text>
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
          <Text style={styles.greenMoney}>Green Carbon Points!</Text>
        </View>
        <Text style={styles.moneyBalance}>GCPS Wallet:  {bal}!</Text>
        <Text style={styles.moneyBalance1}>Your Equivalent KES is GCPs BALANCE/10.25</Text>
      </View>

      {/* Horizontal Scrollable Cards Section */}
      <CardScroll />

      <View style={styles.quickActionsTitle}>
        <Text style={styles.ActionText}>Quick Actions</Text>
        <Text style={styles.ActionText1}>All Offers</Text>
      </View>

      <View style={styles.navigationContainer}>
        <View style={styles.navigationRow}>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Wifi')}>
            <FontAwesome name="wifi" size={24} color={Color.colorLimegreen_200} />
            <Text style={styles.navButtonText}>StarLink</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('BuyAirtime')}>
            <AntDesign name="creditcard" size={24} color={Color.colorLimegreen_200} />
            <Text style={styles.navButtonText}>Buy Airtime</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Crypto')}>
            <FontAwesome name="bitcoin" size={24} color={Color.colorLimegreen_200} />
            <Text style={styles.navButtonText}>Trading</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('BuyGoods')}>
            <FontAwesome name="shopping-cart" size={24} color={Color.colorLimegreen_200} />
            <Text style={styles.navButtonText}>Buy Goods</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.navigationRow}>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Withdrawal')}>
            <FontAwesome name="money" size={24} color={Color.colorLimegreen_200} />
            <Text style={styles.navButtonText}>Withdraw Points</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Transaction')}>
            <FontAwesome name="send" size={24} color={Color.colorLimegreen_200} />
            <Text style={styles.navButtonText}>Send Points</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('GoGames')}>
            <FontAwesome name="gamepad" size={24} color={Color.colorLimegreen_200} />
            <Text style={styles.navButtonText}>Go GAMES</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 20,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.colorLimegreen_200,
    marginLeft: -20
  },
  manageAcc: {
    marginTop: 5,
  },
  manageAccText: {
    fontSize: 15,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  balanceBox: {
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    margin: 5,
  },
  balanceBox1: {
    alignItems: 'flex-start',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  Container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 5,
  },
  balanceAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  balanceLabel: {
    fontSize: 16,
    color: 'green',
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
    maxWidth: 110,
    maxHeight: 40,
    left: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  balanceType: {
    fontSize: 14,
    color: 'black',
    fontFamily: FontFamily.manropeBold,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: 365,
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 15,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: FontFamily.manropeBold,
  },
  greenMoney: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: FontFamily.manropeSemiBold,
    color: 'black',
    marginLeft: 10,
    marginTop: 5,
  },
  moneyBalance: {
    fontSize: 18,
    color: Color.colorLimegreen_200,
    marginBottom: 10,
    fontFamily: FontFamily.manropeBold,
  },
  moneyBalance1: {
    fontSize: 12,
    color: Color.colorGray_100,
    marginBottom: 10,
    fontFamily: FontFamily.manropeBold,
  },
  quickActionsTitle: {
    marginBottom: 5,
    color: 'black',
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  ActionText: {
    fontSize: 18,
    color: 'black',
    fontFamily: FontFamily.manropeSemiBold,
    fontWeight: 'bold',
  },
  ActionText1: {
    fontSize: 18,
    color: Color.colorLimegreen_100,
    fontFamily: FontFamily.poppinsSemiBold,
  },
  navigationContainer: {
    marginTop: 20,
    marginBottom: 230,
  },
  navigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  navButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 17,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
    marginTop: 5
  },
  cardScrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    paddingTop: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light background with opacity
    borderRadius: 18,
    marginBottom: 20,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 0,
    elevation: 0,
    width: 365,
    height: 250,
    alignSelf: 'center',
  },
  cardImage: {
    width: 150,
    height: 85,
    borderRadius: 10,
    marginBottom: 0,
    marginTop: -73,
    marginLeft: 10,
    transform: [
      { perspective: 800 },
      { rotateY: '7deg' },
      { rotateX: '7deg' },
    ],
  },
});

export default HomeScreen;
