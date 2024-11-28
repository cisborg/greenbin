import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HelpfulTips = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [expandedIndex, setExpandedIndex] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const helpfulTips = [
    { title: 'Join a Squad for Rewards', description: 'Joining a squad can help you earn exclusive rewards and points for participation and activities.' },
    { title: 'Earn Greenpoints for Eco-Friendly Actions', description: 'You can earn Greenpoints by engaging in eco-friendly activities and sustainable purchases, which can later be redeemed for rewards or converted to cash.' },
    { title: 'Track Your Carbon Impact', description: 'Use the GCP calculator to track your Green Carbon Points and improve your eco-friendliness through activities like recycling and reducing your carbon footprint.' },
    { title: 'Redeem Greenpoints Before Expiration', description: 'Keep in mind that Greenpoints expire after 2 months of inactivity, so make sure to use them regularly.' },
    { title: 'Eco-Friendly Product Discounts', description: 'Greenpoints can be used for discounts on eco-friendly products and services within the app.' },
    { title: 'Support Local and Eco-Friendly Businesses', description: 'Purchase from local, sustainable businesses to reduce your carbon footprint and earn more points.' },
    { title: 'Refer Friends for Extra Rewards', description: 'Invite friends to join the app and use your referral code to earn bonus Greenpoints and rewards.' },
    { title: 'Stay Notified', description: 'Turn on notifications to stay updated on new eco-friendly events, offers, and rewards available through the app.' },
    { title: 'Improve Your GCP Score', description: 'Increase your GCP score by participating in more eco-friendly activities, like using public transport or shopping sustainably.' },
    { title: 'Redeem Bundle Packages for Savings', description: 'Subscribe to discounted bundle packages that offer savings on data and services while contributing to sustainability.' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Helpful Tips</Text>
        </View>

        <ScrollView style={styles.tipsContainer}>
          {helpfulTips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <TouchableOpacity onPress={() => toggleExpand(index)} style={styles.tipContainer}>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Ionicons 
                  name={expandedIndex === index ? "remove" : "add"} 
                  size={20} 
                  color="#4CAF50" 
                />
              </TouchableOpacity>
              {expandedIndex === index && (
                <Text style={styles.tipDescription}>{tip.description}</Text>
              )}
            </View>
          ))}
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    backgroundColor: '#4CAF50',
    borderBottomRadius: 3,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  tipsContainer: {
    padding: 16,
  },
  tipItem: {
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    elevation: 2,
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  tipDescription: {
    marginTop: 5,
    fontSize: 14,
    color: '#555',
  },
});

export default HelpfulTips;
