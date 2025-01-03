import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Platform,
  Alert,
  SafeAreaView,
  Share,
} from "react-native";
import { FontAwesome, Entypo, Ionicons } from '@expo/vector-icons';
import { Color } from "../../GlobalStyles";
import { useNavigation } from "@react-navigation/core";
import * as Clipboard from 'expo-clipboard';
import Lottie from 'lottie-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getReferralCode } from '../../redux/actions/authentication';
import { fetchCouponGifts } from '../../redux/actions/rewards'; // Import the new action

const ReferAndEarn = () => {
  const [processing, setProcessing] = useState(true);
  
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  const userId = useSelector(state => state.auth.userId); 
  const referralCode = useSelector(state => state.auth.selectedUser.referralCode);
  const referralCount = useSelector(state => state.rewards.referralCount);

  const rewards = [
    { id: '1', title: 'Pizza Gift', description: 'Get a delicious pizza gift after referring 30 friends!', threshold: 30 },
    { id: '2', title: 'KES 200 Cash', description: 'Earn KES 200 cash after referring 10 friends!', threshold: 10 },
    { id: '3', title: 'KES 300 Cash', description: 'Earn KES 300 cash after referring 15 friends!', threshold: 15 },
    { id: '4', title: 'Green Bank Deposit', description: 'Earn KES 400 cash deposited in your Green Bank plus add-ons after referring 30 friends!', threshold: 30 },
  ];

  useEffect(() => {
    if (userId) {
      dispatch(getReferralCode(userId));
      dispatch(fetchCouponGifts(userId)); // Fetch eligible rewards via dispatch
    }
    
    const timer = setTimeout(() => {
      setProcessing(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [dispatch, userId]);

  
  const handleRefer = useCallback(async () => {
    try {
      const message = `Join GreenBin and earn rewards! Use my promo code: ${referralCode} to get 500 points award on your first registration. Check out more rewards in the app!`;
      const result = await Share.share({ message });

      if (result.action === Share.sharedAction) {
        Alert.alert('Shared successfully!');
      } else if (result.action === Share.dismissedAction) {
        Alert.alert('Share dismissed');
      }
    } catch (error) {
      Alert.alert('Error sharing referral:', error.message);
    }
  }, [referralCode]);

  const copyPromoCode = useCallback(async () => {
    await Clipboard.setStringAsync(referralCode);
    Alert.alert("Promo Code Copied!", "You can now share it with your friends.");
  }, [referralCode]);

  const renderRewardCard = ({ item }) => {
    if (referralCount < item.threshold) return null;

    return (
      <View style={styles.rewardCard}>
        <FontAwesome name="gift" size={24} color="green" />
        <View style={styles.rewardDetails}>
          <Text style={styles.rewardTitle}>{item.title}</Text>
          <Text style={styles.rewardDescription}>{item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorWhite, paddingTop: 33 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Refer & Earn</Text>
      </View>

      {processing ? (
        <Lottie 
          source={require('../../assets/lottie/gift.json')}
          autoPlay 
          loop 
          style={styles.lottie} 
        />
      ) : (
        <View style={styles.container}>
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
            <Text style={styles.friendReward}>500 award green points</Text>
            <Text style={styles.friendDescription}>When they install the app and register!</Text>
          </View>

          <View style={styles.promoCodeContainer}>
            <Text style={styles.promoCodeTitle}>Your Promo Code:</Text>
            <Text style={styles.promoCode}>{referralCode}</Text>
            <TouchableOpacity style={styles.copyButton} onPress={copyPromoCode} activeOpacity={0.7}>
              <Text style={styles.copyButtonText}>Copy Promo Code</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.referButton} onPress={handleRefer} activeOpacity={0.7}>
            <Text style={styles.buttonText}>Refer & Earn</Text>
            <Entypo name="share" size={24} color="black" />
          </TouchableOpacity>

          <Text style={styles.termsText}>
            By clicking Refer & Earn, you agree to our terms and conditions.
          </Text>
        </View>
      )}

     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5F5F5',
  },
  lottie: {
    width: '100%',
    height: 100,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    borderColor: '#ddd',
    backgroundColor: 'green',
    elevation: 1,
    margin: 10,
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
  },
  copyButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  copyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  referButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    marginRight: 5,
  },
  termsText: {
    fontSize: 12,
    color: '#777',
    marginTop: 10,
    textAlign: 'center',
  },
 
});

export default ReferAndEarn;
