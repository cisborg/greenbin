import React, { useEffect } from 'react';
import { View, Text, StyleSheet,Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import {
  fetchVouchers,
  fetchTiers,
  fetchCouponGifts,
  fetchGreenCarbonPoints,
  fetchCoins,
} from '../../redux/actions/rewards'; // Adjust the import as necessary

const assets = [
  { name: 'Vouchers', action: fetchVouchers, icon: require('../../assets/voucher.jpeg') },
  { name: 'Tiers', action: fetchTiers, icon: require('../../assets/tiers.jpeg') },
  { name: 'Coupon Gifts', action: fetchCouponGifts, icon: require('../../assets/gifts.jpeg') },
  { name: 'Green Carbon Points', action: fetchGreenCarbonPoints, icon: require('../../assets/awards.jpeg') },
  { name: 'Coins', action: fetchCoins, icon: require('../../assets/circular_economy.png') },
];

const AssetCard = ({ name, icon, value }) => (
  <LinearGradient colors={['#ffcc00', '#ff6600', '#ff0000']} style={styles.card}>
    <FastImage source={icon} style={styles.icon} resizeMode={FastImage.resizeMode.contain} />
    <View style={styles.assetsContainer}>
      <Text style={styles.assetName}>{name}</Text>
      <Text style={styles.assetValue}>{value}</Text> {/* Display the fetched value */}
    </View>
  </LinearGradient>
);

const AssetsScreen = () => {
  const dispatch = useDispatch();

  // Select asset counts from the Redux store
  const vouchersCount = useSelector((state) => state.rewards.vouchers);
  const tiersCount = useSelector((state) => state.rewards.totalTiers);
  const couponGiftsCount = useSelector((state) => state.rewards.couponGifts);
  const greenCarbonPointsCount = useSelector((state) => state.greenCarbonPoints);
  const coinsCount = useSelector((state) => state.rewards.coins);
  const loading = useSelector((state) => state.rewards.loading);
  const error = useSelector((state) => state.rewards.error);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchVouchers());
      await dispatch(fetchTiers());
      await dispatch(fetchCouponGifts());
      await dispatch(fetchGreenCarbonPoints());
      await dispatch(fetchCoins());
     
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require('../../assets/lottie/boxLoading.json')}
          autoPlay
          loop
          style={styles.loadingAnimation}
        />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>{error.message || 'An error occurred while fetching data.'}</Text>
      </View>
    );
  }


  return (
    <SafeAreaView style={styles.container}>
      {assets.map((asset, index) => (
        <AssetCard
          key={index}
          name={asset.name}
          icon={asset.icon}
          value={
            asset.name === 'Vouchers' ? vouchersCount :
            asset.name === 'Tiers' ? tiersCount :
            asset.name === 'Coupon Gifts' ? couponGiftsCount :
            asset.name === 'Green Carbon Points' ? greenCarbonPointsCount :
            coinsCount
          } // Display the corresponding count
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  assetsContainer: {
    flexDirection: 'column',
    marginLeft: 15,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
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
  

});

export default AssetsScreen;
