import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image, Clipboard, Alert } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { Color } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/core";
import Entypo from '@expo/vector-icons/Entypo';

const ReferAndEarn = () => {
    const navigation = useNavigation();

  const [referralCount, setReferralCount] = React.useState(0);
  const rewards = [
    { id: '1', title: 'Pizza Gift', description: 'Get a delicious pizza gift after referring 20 friends!' },
    { id: '2', title: 'KES 400 Cash', description: 'Earn KES 400 cash after referring 10 friends!' },
    { id: '3', title: 'KES 500 Cash', description: 'Earn KES 500 cash after referring 15 friends!' },
    { id: '4', title: 'Green Bank Deposit', description: 'Earn KES 400 cash deposited in your Green Bank plus add-ons!' },


  ];

  const promoCode = "PROMO2024"; // Example promo code

  const handleRefer = () => {
    console.log('Refer a friend!');
  };

  const copyPromoCode = () => {
    Clipboard.setString(promoCode);
    Alert.alert("Promo Code Copied!", "You can now share it with your friends.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Refer & Earn</Text>
      <Text style={styles.subtitle}>Invite your friends to GreenBin and earn rewards!</Text>
      
      <View style={styles.rewardsContainer}>
        <Text style={styles.rewardsTitle}>Unlock Rewards! 🎉:</Text>
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
        <TouchableOpacity style={styles.copyButton} onPress={copyPromoCode}>
          <Text style={styles.copyButtonText}>Copy Promo Code</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.referButton} onPress={()=> navigation.goBack()}>
        <Text style={styles.buttonText}>Refer & Earn</Text>
        <Entypo name="share" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.termsText}>
        By clicking Refer & Earn you agree to accept the Terms & Conditions
      </Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
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
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 10,
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
    marginBottom: 10,
  },
  copyButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  referButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
    width: 160,
    left: 100,
    shadowColor: "#000",
    
    
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    alignContent: "center",
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  buttonText: {
    color: Color.colorLimegreen_200,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 2
  },
  termsText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
});

export default ReferAndEarn;
