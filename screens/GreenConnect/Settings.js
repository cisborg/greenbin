import React, {  useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';  // For handling safe areas
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { Color } from '../../GlobalStyles';  // Ensure this is defined

const settingsOptions = [
  { id: '1', title: 'Check Eligibility', description: 'GreenBin offers soft loan inputs to spirited entrepreneurs!', screen: 'getPremium' },
  { id: '2', title: 'Register Idea Safari', description: 'Travel with us today we got you! Check your Eligibility', screen: 'getPremium' },
  { id: '3', title: 'Terms and Conditions', description: 'Familiarize with our app terms,policies regarding the use of our app', screen: 'LegalScreen' },
  { id: '4', title: 'Rate App', description: 'Give us feedback by rating our app', screen: 'AppRating' },
  { id: '5', title: 'Register as Vendor', description: 'Earn more boosters green gifts once you are vendor!', screen: 'VendorRegister' },
  { id: '6', title: 'Get to Know Nature Diversity GreenBin', description: 'Learn about our niche', screen: 'AboutUs' },

];

const SettingsScreen = () => { 
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current; // For fade animation

  useEffect(() => {
    // Animate the screen to fade in when it's mounted
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,  // Animation duration
      useNativeDriver: true,
    }).start();
  }, []);

  // Navigate to the selected screen
  const handleSettingPress = (screen) => {
    navigation.navigate(screen);  // Ensure these screens are defined in the navigator
  };

  const renderSettingItem = ({ item }) => (
    <TouchableOpacity style={styles.settingItem} onPress={() => handleSettingPress(item.screen)}>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{item.title}</Text>
        <Text style={styles.settingDescription}>{item.description}</Text>
      </View>
      <AntDesign name="right" size={20} color="#888" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        
        <FlatList
          data={settingsOptions}
          renderItem={renderSettingItem}
          keyExtractor={item => item.id}
          style={styles.settingsList}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: Color.colorWhite,  // Ensure Color.colorWhite is defined
  },
  container: {
    flex: 1,
    padding: 5,
  },
  settingsList: {
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingDescription: {
    fontSize: 14,
    color: '#777',
  },
});

export default SettingsScreen;
