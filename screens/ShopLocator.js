import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert, Platform, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation} from '@react-navigation/core'
import { Color } from '../GlobalStyles';

const shops = [
  {
    id: '1',
    name: 'Green Grocer',
    description: 'Organic fruits and vegetables',
    location: { lat: -1.2920, lng: 36.8219 },
    vendors: ['Fresh Farm', 'Bio Market'],
    rating: 4.5,
    logo: 'https://example.com/Bags.png',
    distance: '1.2 km',
    hours: '8:00 AM - 8:00 PM'
  },
  {
    id: '2',
    name: 'Eco Mart',
    description: 'Sustainable household products',
    location: { lat: -1.2921, lng: 36.8217 },
    vendors: ['Eco Life', 'Green World'],
    rating: 4.2,
    logo: 'https://example.com/greenFriday.png',
    distance: '0.9 km',
    hours: '9:00 AM - 6:00 PM'
  },
  {
    id: '3',
    name: 'Nature’s Basket',
    description: 'Locally sourced groceries',
    location: { lat: -1.2923, lng: 36.8220 },
    vendors: ['Organic Valley', 'Local Harvest'],
    rating: 4.8,
    logo: require('../assets/icon.png'),
    distance: '1.5 km',
    hours: '7:00 AM - 7:00 PM'
  },
];

const ConnectToShops = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [filteredShops, setFilteredShops] = useState([]);
  const navigation = useNavigation();

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

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
        filterShops(latitude, longitude);
      },
      (error) => {
        console.error('Error getting location:', error);
        Alert.alert('Error', 'Unable to get location. Please enable location services.');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const filterShops = (latitude, longitude) => {
    const nearbyShops = shops.filter(shop => {
      const distance = calculateDistance(latitude, longitude, shop.location.lat, shop.location.lng);
      console.log(`${shop.name}: ${distance} km`);
      return distance <= 12; // 7 km radius
    });
    console.log('Nearby Shops:', nearbyShops);
    setFilteredShops(nearbyShops);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const degreesToRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  const renderShopCard = ({ item }) => (
    <View style={styles.shopContainer}>
      <Image source={{ uri: item.logo }} style={styles.logo} />
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
        <TouchableOpacity style={styles.connectButton}>
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
      {filteredShops.length > 0 ? (
        <FlatList
          data={filteredShops}
          renderItem={renderShopCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.shopList}
        />
      ) : (
        <Text style={styles.noShopsText}>No shops found within 12 km.</Text>
      )}
      <TouchableOpacity style={styles.returnButton} onPress={()=> navigation.goBack()}>
        <Text style={{color:Color.colorLimegreen_200}}>Go Back</Text>
        </TouchableOpacity>
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
    marginBottom: 10,
    color: Color.colorLimegreen_200
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  returnButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
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
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
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
    borderRadius: 14,
    borderWidth: 1,
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  shopDescription: {
    fontSize: 14,
    color: '#666',
  },
  shopHours: {
    fontSize: 12,
    color: '#888',
    marginVertical: 4,
  },
  shopDistance: {
    fontSize: 12,
    color: '#888',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#333',
  },
  vendorsHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  vendorItem: {
    fontSize: 12,
    color: '#333',
  },
  connectButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  connectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noShopsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ConnectToShops;
