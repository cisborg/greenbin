import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons'; // Import Ionicons
import { Color, FontFamily } from "../GlobalStyles";
import { useNavigation } from '@react-navigation/core';

const ManageAccountScreen = () => {
  const navigation = useNavigation();
  
  const menuItems = [
    { 
      title: 'View Balance', 
      description: 'View your green bank account balance', 
      icon: <MaterialIcons name="account-balance" size={24} color="green" />,
      screen: 'GreenBank' // Add screen name
    },
    { 
      title: 'Donate Green Points', 
      description: 'Donate points and earn a vacation', 
      icon: <Ionicons name="add-circle-outline" size={24} color="green" />,
      screen: 'DonatePoints' // Add screen name
    },
    
    { 
      title: 'Transaction History', 
      description: 'View transaction history', 
      icon: <MaterialCommunityIcons name="clipboard-list-outline" size={24} color="green" />,
      screen: 'Transaction' // Add screen name
    },
    { 
      title: 'Join Us', 
      description: 'Review Milestone Eligibility ', 
      icon: <MaterialIcons name="miscellaneous-services" size={24} color="green" />,
      screen: 'JoinUs' // Add screen name
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.Header}>
        <TouchableOpacity>
          <AntDesign name="leftcircle" size={24} color="black" onPress={() => navigation.goBack()} />
        </TouchableOpacity>
        <Text style={styles.header}>Manage Account</Text>
      </View>
      <ScrollView>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.screen)} // Navigate to the respective screen
          >
            <View style={styles.menuItemContent}>
              {item.icon}
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuDescription}>{item.description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Image Container */}
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/again.jpg")} // Replace with your image URL
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    width: 404,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Color.colorLimegreen_200,
    fontFamily: FontFamily.poppinsBold,
    marginLeft: 60
  },
  Header: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 20,
    paddingTop: 10,
  },
  menuItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTextContainer: {
    marginLeft: 10,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  menuDescription: {
    fontSize: 14,
    color: '#666',
  },
  imageContainer: {
    marginTop: 40,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    transform: [
      {perspective: 800},
      {rotateY: '7deg'},
      {rotateX: '7deg'},
    ]
  },
  image: {
    width: '100%',
    height: 200, // Adjust height as needed
    borderRadius: 20
  },
});

export default ManageAccountScreen;
