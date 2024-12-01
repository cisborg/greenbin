import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

const assets = [
  { name: 'Vouchers', value: 10, icon: require('../../assets/voucher.jpeg' ) },
  { name: 'Tiers', value: 5, icon: require('../../assets/tiers.jpeg') },
  { name: 'Gifts', value: 3, icon: require('../../assets/gifts.jpeg') },
  { name: 'Awards', value: 2, icon: require('../../assets/awards.jpeg') },
  { name: 'Coins', value: 1000, icon: require('../../assets/circular_economy.png') },
];

const AssetCard = ({ name, value, icon }) => (
  <LinearGradient
    colors={['#ffcc00', '#ff6600', '#ff0000']}
    style={styles.card}
  >
    <FastImage source={icon} style={styles.icon} resizeMode={FastImage.resizeMode.contain} />
    <Text style={styles.assetName}>{name}</Text>
    <Text style={styles.assetValue}>{value}</Text>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Trade Credits</Text>
    </TouchableOpacity>
  </LinearGradient>
);

const AssetsScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate loading for 2 seconds
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require('../../assets/lottie/rotateLoad.json')} // Add your Lottie animation file here
          autoPlay
          loop
          style={styles.loadingAnimation}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {assets.map((asset, index) => (
        <AssetCard
          key={index}
          name={asset.name}
          value={asset.value}
          icon={asset.icon}
        />
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  loadingAnimation: {
    width: 40,
    height: 40,
  },
  card: {
    borderRadius: 10,
    padding: Dimensions.get('window').width * 0.05,
    marginBottom: 20,
    alignItems: 'center',
  },
  icon: {
    width: Dimensions.get('window').width * 0.15,
    height: Dimensions.get('window').width * 0.15,
    marginBottom: 10,
  },
  assetName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  assetValue: {
    fontSize: 16,
    color: '#fff',
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 14,
    backgroundColor: '#fff',
  },
  buttonText: {
    color: '#ff6600',
    fontWeight: 'bold',
  },
});

export default AssetsScreen;
