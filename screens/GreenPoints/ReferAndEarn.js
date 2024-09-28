import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  ActivityIndicator,
  Platform,
  Animated,
  SafeAreaView,
  Share,  // Import Share API
} from "react-native";
import { FontAwesome, Entypo, Ionicons } from '@expo/vector-icons';
import { Color } from "../../GlobalStyles";
import { useNavigation } from "@react-navigation/core";
import * as Clipboard from 'expo-clipboard';

const ReferAndEarn = () => {
  const [processing, setProcessing] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const promoCode = "PROMO2024"; // Example promo code

  // Fade-in animation on screen mount
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, []);

  const rewards = [
    { id: '1', title: 'Pizza Gift', description: 'Get a delicious pizza gift after referring 20 friends!' },
    { id: '2', title: 'KES 400 Cash', description: 'Earn KES 400 cash after referring 10 friends!' },
    { id: '3', title: 'KES 500 Cash', description: 'Earn KES 500 cash after referring 15 friends!' },
    { id: '4', title: 'Green Bank Deposit', description: 'Earn KES 400 cash deposited in your Green Bank plus add-ons!' },
  ];

  // Function to handle sharing the referral code
  const handleRefer = async () => {
    try {
      // Compose the message for sharing
      const message = `Join GreenBin and earn rewards! Use my promo code: ${promoCode} to get 200 MB data bundles on your first registration. Check out more rewards in the app!`;

      // Trigger native share options
      const result = await Share.share({
        message,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared successfully!');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing referral:', error.message);
      Alert.alert('Error', 'Failed to share the referral. Please try again.');
    }
  };

  // Function to copy promo code
  const copyPromoCode = async () => {
    await Clipboard.setStringAsync(promoCode);
    Alert.alert("Promo Code Copied!", "You can now share it with your friends.");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorWhite }}>
      {/* Back Button and Title in the Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Refer & Earn</Text>
      </View>

      {/* Modal to show the spinner */}
      <Modal visible={processing} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color={Color.colorLimegreen_200} />
            <Text style={styles.modalText}>Processing...</Text>
          </View>
        </View>
      </Modal>

      {/* Animated View for Fade-In Effect */}
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Text style={styles.subtitle}>Invite your friends to GreenBin and earn rewards!</Text>
        
        <View style={styles.rewardsContainer}>
          <Text style={styles.rewardsTitle}>Unlock Rewards! 🎉</Text>
          <FlatList
            data={rewards}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.rewardCard}>
                <FontAwesome name="gift" size={24} color="green" />
                <View style={styles.rewardDetails}>
                  <Text style={styles.rewardTitle}>{item.title}</Text>
                  <Text style={styles.rewardDescription}>{item.description}</Text>
                </View>
              </View>
            )}
          />
        </View>

        <View style={styles.referralInfo}>
          <Text style={styles.referralText}>Your Friend Earns:</Text>
          <Text style={styles.friendReward}>200 MB Data Bundles</Text>
          <Text style={styles.friendDescription}>When they install the app and register!</Text>
        </View>

        <View style={styles.promoCodeContainer}>
          <Text style={styles.promoCodeTitle}>Your Promo Code:</Text>
          <Text style={styles.promoCode}>{promoCode}</Text>
          <TouchableOpacity style={styles.copyButton} onPress={copyPromoCode} activeOpacity={0.7}>
            <Text style={styles.copyButtonText}>Copy Promo Code</Text>
          </TouchableOpacity>
        </View>

        {/* Refer & Earn Button to open Share options */}
        <TouchableOpacity style={styles.referButton} onPress={handleRefer} activeOpacity={0.7}>
          <Text style={styles.buttonText}>Refer & Earn</Text>
          <Entypo name="share" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By clicking Refer & Earn you agree to accept the Terms & Conditions
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    elevation: 2,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  rewardsContainer: {
    marginBottom: 20,
  },
  rewardsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#000',
          shadowOffset: { width: 1, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }
      : {
          elevation: 4,
        }),
  },
  rewardDetails: {
    marginLeft: 10,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rewardDescription: {
    fontSize: 14,
    color: '#777',
  },
  referralInfo: {
    backgroundColor: '#e9ecef',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  referralText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  friendReward: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  friendDescription: {
    fontSize: 14,
    color: '#555',
  },
  promoCodeContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#000',
          shadowOffset: { width: 1, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }
      : {
          elevation: 4,
        }),
  },
  promoCodeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  promoCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  copyButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  copyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  referButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 10,
  },
  termsText: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default ReferAndEarn;
