import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform,FlatList, PermissionsAndroid, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { Color } from '../../GlobalStyles';
import { getNearbyShops } from '../../redux/actions/shop'; 

const { width } = Dimensions.get('window');

const ConnectToShops = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [showMapView, setShowMapView] = useState(true); // Toggle between map and list
  const shops = useSelector(state => state.shops);
  const dispatch = useDispatch();
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
      Alert.alert(err);
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

      dispatch(getNearbyShops({ lat: latitude, lng: longitude })); // Fetch nearby shops
    } catch (error) {
      Alert('Error', `Unable to get location: ${error.message}. Please enable location services.`);
    }
  };

  const renderShopMarker = (shop) => (
    <Marker
      key={shop.id}
      coordinate={{ latitude: shop.latitude, longitude: shop.longitude }}
      title={shop.name}
      description={shop.description}
    />
  );

  const renderShopCard = ({ item }) => (
    <View style={styles.shopContainer}>
      <Text style={styles.shopName}>{item.name}</Text>
      <Text style={styles.shopDescription}>{item.description}</Text>
      <Text style={styles.shopDistance}>Distance: {item.distance}</Text>
      <TouchableOpacity style={styles.connectButton} onPress={() => navigation.goBack()}>
        <Text style={styles.connectButtonText}>Shop Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Ellipsis Button */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setShowMapView(!showMapView)} // Toggle view
      >
        <FontAwesome name="ellipsis-v" size={24} color="black" />
      </TouchableOpacity>

      {/* Map View */}
      {showMapView ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: currentLocation ? currentLocation.lat : 0,
            longitude: currentLocation ? currentLocation.lng : 0,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {/* User Location Marker */}
          {currentLocation && (
            <Marker
              coordinate={{ latitude: currentLocation.lat, longitude: currentLocation.lng }}
              title="Your Location"
              pinColor="blue"
            />
          )}
          {/* Shop Markers */}
          {shops.map(renderShopMarker)}
        </MapView>
      ) : (
        // List View
        <>
          <Text style={styles.title}>Nearby Shops</Text>
          {shops.length > 0 ? (
            <FlatList
              data={shops}
              renderItem={renderShopCard}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.listContainer}
            />
          ) : (
            <Text style={styles.noShopsText}>No nearby shops found.</Text>
          )}
        </>
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
  menuButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    padding: 10,
  },
  map: { flex: 1 },

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
  listContainer: { paddingBottom: 20 },

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
 
  shopDistance: {
    fontSize: width < 400 ? 12 : 14, // Responsive font size
    color: '#888',
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
