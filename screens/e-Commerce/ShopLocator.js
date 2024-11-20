import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Platform, PermissionsAndroid, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { useDispatch,useSelector } from 'react-redux'; // Import useDispatch
import { getNearbyShops } from '../../redux/actions/shop'; 
import { Color } from '../../GlobalStyles';
import FastImage from 'react-native-fast-image';

const { width } = Dimensions.get('window');

const ConnectToShops = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const shops = useSelector(state => state.shops); 
  const navigation = useNavigation();
  const dispatch = useDispatch(); // Get the dispatch function

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    } else {
      getCurrentLocation();
    }
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location to find nearby shops.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        Alert.alert('Permission denied', 'Location permission is required to find nearby shops.');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required to find nearby shops.');
        return;
      }
  
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setCurrentLocation({ lat: latitude, lng: longitude });

      // Dispatch the getNearbyShops action with the current location
      dispatch(getNearbyShops({ lat: latitude, lng: longitude }));
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', `Unable to get location: ${error.message}. Please enable location services.`);
    }
  };

  const renderShopCard = ({ item }) => (
    <View style={styles.shopContainer}>
      <FastImage
        source={typeof item.logo === 'string' ? { uri: item.logo } : item.logo} 
        style={styles.logo} 
        resizeMode={FastImage.resizeMode.cover}
        onError={() => console.error('Image loading error')}
      />
      <View style={styles.shopDetails}>
        <Text style={styles.shopName}>{item.name}</Text>
        <Text style={styles.shopDescription}>{item.description}</Text>
        <Text style={styles.shopHours}>Hours: {item.hours}</Text>
        <Text style={styles.shopDistance}>Distance: {item.distance}</Text>
        <View style={styles.ratingContainer}>
          <FontAwesome name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        <Text style={styles.vendorsHeader}>Vendors:</Text>
        <FlatList
          data={item.vendors}
          renderItem={({ item }) => <Text style={styles.vendorItem}>{item}</Text>}
          keyExtractor={(vendor, index) => index.toString()}
        />
        <TouchableOpacity style={styles.connectButton} onPress={()=> navigation.goBack()}>
          <Text style={styles.connectButtonText}>Shop Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connect to Local Green Shops</Text>
      <Text style={styles.subtitle}>
        Your current location: {currentLocation ? `${currentLocation.lat}, ${currentLocation.lng}` : 'Fetching...'}
      </Text>
      {shops.length > 0 ? (
        <FlatList
          data={shops}
          renderItem={renderShopCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noShopsText}>No nearby shops found.</Text>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: '5%', // Responsive padding
  },
  title: {
    fontSize: width < 400 ? 16 : 17, // Responsive font size
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'green',
  },
  subtitle: {
    fontSize: width < 400 ? 12 : 14, // Responsive font size
    marginBottom: 20,
  },
  returnButton: {
    position: 'absolute',
    bottom: 20,
    elevation: 1,
    left: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 2,
    },
  },
  shopList: {
    paddingBottom: 20,
  },
  shopContainer: {
    flexDirection: 'row',
    padding: '5%', // Responsive padding
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 18,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  shopDetails: {
    flex: 1,
    marginLeft: 10,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 20,
    borderWidth: 1,
  },
  shopName: {
    fontSize: width < 400 ? 16 : 17, // Responsive font size
    fontWeight: 'bold',
  },
  shopDescription: {
    fontSize: width < 400 ? 14 : 15, // Responsive font size
    color: '#666',
  },
  shopHours: {
    fontSize: width < 400 ? 12 : 14, // Responsive font size
    color: '#888',
    marginVertical: 4,
  },
  shopDistance: {
    fontSize: width < 400 ? 12 : 14, // Responsive font size
    color: '#888',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: width < 400 ? 14 : 14, // Responsive font size
    color: '#333',
  },
  vendorsHeader: {
    fontSize: width < 400 ? 14 : 15, // Responsive font size
    fontWeight: 'bold',
    marginTop: 10,
  },
  vendorItem: {
    fontSize: width < 400 ? 12 : 13, // Responsive font size
    color: '#333',
  },
  connectButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 14,
    marginTop: 10,
    alignItems: 'center',
  },
  connectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noShopsText: {
    fontSize: width < 400 ? 16 : 17, // Responsive font size
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ConnectToShops;
