import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Animated, SafeAreaView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons'; 
import LottieView from 'lottie-react-native';
import { Color,FontFamily } from '../../GlobalStyles';
import { useNavigation } from '@react-navigation/core';

const ManageAccountScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Start fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Simulate loading for 2 seconds
    const timer = setTimeout(() => setIsLoading(false), 2000);

    return () => clearTimeout(timer);
  }, [fadeAnim]);

  const menuItems = [
    { 
      title: 'View Balance', 
      description: 'View your green bank account balance', 
      icon: <MaterialIcons name="account-balance" size={24} color="green" />,
      screen: 'GreenBank' 
    },
    { 
      title: 'Donate Green Points', 
      description: 'Donate points and earn a vacation', 
      icon: <Ionicons name="add-circle-outline" size={24} color="green" />,
      screen: 'DonatePoints' 
    },
    { 
      title: 'Unlock App Premium', 
      description: 'Get exclusive access to pilot GreenBin', 
      icon: <FontAwesome name="unlock" size={24} color="green" />,
      screen: 'getPremium' 
    },
    { 
      title: 'About Us', 
      description: 'Review the features and documentation of green app!', 
      icon: <MaterialIcons name="miscellaneous-services" size={24} color="green" />,
      screen: 'AboutUs' 
    },
  ];

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView 
          source={require('../../assets/lottie/rotatingBalls.json')} // Replace with the path to your Lottie JSON file
          autoPlay 
          loop 
          style={styles.lottieAnimation}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ ...styles.headerContainer, opacity: fadeAnim }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircle" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Manage Account</Text>
      </Animated.View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.screen)}
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
            source={require("../../assets/again.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: '1%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 10,
    paddingLeft: 17
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  lottieAnimation: {
    width: 150,
    height: 150,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '800',
    color: 'green',
    fontFamily: FontFamily.poppinsBold,
    marginLeft: 35,
  },
  scrollViewContent: {
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
  menuItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 18,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTextContainer: {
    marginLeft: 10,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  menuDescription: {
    fontSize: 13,
    color: '#666',
  },
  imageContainer: {
    marginTop: 40,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1
  },
  image: {
    width: '100%',
    height: 200, // Adjust height as needed
    borderRadius: 20,
  },
});

export default ManageAccountScreen;
