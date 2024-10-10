import React, { useState, useEffect, useRef, useCallback } from "react";
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
  Share,
} from "react-native";
import { FontAwesome, Entypo, Ionicons } from '@expo/vector-icons';
import { Color } from "../../GlobalStyles";
import { useNavigation } from "@react-navigation/core";
import * as Clipboard from 'expo-clipboard';

const ReferAndEarn = () => {
  const [processing, setProcessing] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const promoCode = "PROMO2024";

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

  const handleRefer = useCallback(async () => {
    try {
      const message = `Join GreenBin and earn rewards! Use my promo code: ${promoCode} to get 200 MB data bundles on your first registration. Check out more rewards in the app!`;
      const result = await Share.share({ message });

      if (result.action === Share.sharedAction) {
        console.log('Shared successfully!');
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing referral:', error.message);
      Alert.alert('Error', 'Failed to share the referral. Please try again.');
    }
  }, [promoCode]);

  const copyPromoCode = useCallback(async () => {
    await Clipboard.setStringAsync(promoCode);
    Alert.alert("Promo Code Copied!", "You can now share it with your friends.");
  }, [promoCode]);

  const renderRewardCard = ({ item }) => (
    <View style={styles.rewardCard}>
      <FontAwesome name="gift" size={24} color="green" />
      <View style={styles.rewardDetails}>
        <Text style={styles.rewardTitle}>{item.title}</Text>
        <Text style={styles.rewardDescription}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorWhite , paddingTop: 33}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Refer & Earn</Text>
      </View>

      <Modal visible={processing} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color={Color.colorLimegreen_200} />
            <Text style={styles.modalText}>Processing...</Text>
          </View>
        </View>
      </Modal>

      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Text style={styles.subtitle}>Invite your friends to GreenBin and earn rewards!</Text>
        
        <View style={styles.rewardsContainer}>
          <Text style={styles.rewardsTitle}>Unlock Rewards! 🎉</Text>
          <FlatList
            data={rewards}
            keyExtractor={item => item.id}
            renderItem={renderRewardCard}
            initialNumToRender={2}
            windowSize={5}
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
    padding: 10,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    borderColor: '#ddd',
    backgroundColor: 'green',
    elevation: 1,
    margin: 10
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  rewardsContainer: {
    marginBottom: 15,
  },
  rewardsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#000',
          shadowOffset: { width: 1, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        }
      : {
          elevation: 1,
        }),
  },
  rewardDetails: {
    marginLeft: 8,
  },
  rewardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rewardDescription: {
    fontSize: 12,
    color: '#777',
  },
  referralInfo: {
    backgroundColor: '#e9ecef',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  referralText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  friendReward: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green',
  },
  friendDescription: {
    fontSize: 13,
    color: '#555',
  },
  promoCodeContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#000',
          shadowOffset: { width: 1, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        }
      : {
          elevation: 1,
        }),
  },
  promoCodeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  promoCode: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 10,
  },
  copyButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
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
    padding: 10,
    borderRadius: 14,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 5,
  },
  termsText: {
    fontSize: 10,
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
    padding: 15,
    borderRadius: 8,
  },
});

export default ReferAndEarn;
