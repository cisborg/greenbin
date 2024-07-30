import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icons } from '@expo/vector-icons';
import { Color, FontFamily } from "../GlobalStyles";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CardScroll = () => {
  const cards = [
    { id: 1, image: require('../assets/smartdev.avif') },
    { id: 2, image: require('../assets/samrt.jpg') },
    { id: 3,  image: require('../assets/again.jpg') },
    // Add more cards as needed
  ];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.cardScrollContainer}>
      {cards.map(card => (
        <View key={card.id} style={styles.card}>
          <Image source={ card.image } style={styles.cardImage} />
          <Text style={styles.cardTitle}>{card.title}</Text>
          <Text style={styles.cardDescription}>{card.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.flestart}>
          <Text style={styles.headerText}>Hey,Geff</Text>
          <Text style={styles.prepaidText}>0765538193</Text>
        </View>

        <TouchableOpacity style={styles.manageAcc}>
          <Text style={styles.manageAccText} onPress={() => navigation.navigate("manageAccount")}>Manage Account</Text>
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
          <Text style={styles.balanceAmount}>506.20</Text>
          <Text style={styles.balanceLabel}>MB</Text>
          <Text style={styles.balanceType}>Data Balance</Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BuyBundles')}>
          <Text style={styles.buttonText}>Buy Bundles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SelfRecharge')}>
          <Text style={styles.buttonText}>Self Recharge</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.balanceBox1}>
        <Text style={styles.greenMoney}>Green Money</Text>
        <Text style={styles.moneyBalance}>KES XXXXXX</Text>
      </View>

      {/* Horizontal Scrollable Cards Section */}
      <CardScroll />

      
        <View style={styles.quickActionsTitle}>
          <Text style={styles.ActionText}>Quick Actions</Text>
          <Text style={styles.ActionText1}>View All</Text>
        </View>
        <View style={styles.navigationContainer}>
          <View style={styles.navigationRow}>
            {['4G/5G WiFi', 'Buy Credit', 'Crypto', 'Buy Goods'].map((action, index) => (
              <TouchableOpacity key={index} style={styles.navButton} onPress={() => navigation.navigate(action)}>
                <Text style={styles.navButtonText}>{action}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.navigationRow}>
            {['Withdraw Cash', 'Send Money', 'G0 GAMES'].map((action, index) => (
              <TouchableOpacity key={index} style={styles.navButton} onPress={() => navigation.navigate(action)}>
                <Text style={styles.navButtonText}>{action}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
    width: 404,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "green",
  },
  prepaidText: {
    fontSize: 16,
    color: 'grey',
  },
  manageAcc: {
    marginTop: 5,
  },
  flestart: {
    flexWrap: true,
  },
  manageAccText: {
    fontSize: 15,
    color: 'blue',
    textDecorationLine: 'underline',
    left: 0,
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  balanceBox: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  balanceBox1: {
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    
    backgroundColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  balanceAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  balanceLabel: {
    fontSize: 16,
    color: 'red',
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
    backgroundColor: "#e0e0e0",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: Color.colorGainsboro,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
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
  },
  moneyBalance: {
    fontSize: 16,
    color: 'black',
    marginBottom: 20,
  },
  quickActions: {
    marginTop: 20,
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
    FontFamily: FontFamily.manropeSemiBold,
    fontWeight: 'bold',
  },
  ActionText1: {
    fontSize: 18,
    color: 'blue',
    FontFamily: FontFamily.poppinsSemiBold,
  },
  navigationContainer: {
    marginTop: 20,
    marginBottom: 230,
  },
  navigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  navButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'lightgray',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  cardScrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light background with opacity
    borderRadius: 18,
    marginBottom: 25,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    width: "100%",
    height: 200,
    alignSelf: 'center',
    resizeMode: "stretch",
  },
  card: {
    width: 180, // Adjust width as needed
    marginRight: 15,
    height: 90,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Card background with opacity
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    alignContent: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    transform: [
      {perspective: 800},
      {rotateY: '7deg'},
      {rotateX: '7deg'},
      
      
    ]
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    paddingBottom: 0,
    marginBottom: 5,
    overflow: 'hidden',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default HomeScreen;
