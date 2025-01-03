import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Animated,
  Dimensions,
  RefreshControl,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getAllVendors } from '../../redux/actions/vendorAction';
import { Color } from '../../GlobalStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
import FastImage from 'react-native-fast-image';
import AntDesign from '@expo/vector-icons/AntDesign';
import { connectToVendor } from '../../redux/actions/authentication';

const { width, height } = Dimensions.get('window');

const VendorList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState('');
  const [approvedVendors, setApprovedVendors] = useState({});
  const [loading, setLoading] = useState({}); // Local loading state for button
  const [fadeAnim] = useState(new Animated.Value(0));
  const [refreshing, setRefreshing] = useState(false);
  const  vendors= useSelector((state) => state.vendor.vendors);
  const  apiLoading = useSelector((state) => state.vendor.loading);
  const error = useSelector((state) => state.vendor.error); 
  const currentUserProfile = useSelector((state) => state.auth.selectedUser);


  useEffect(() => {
    const fetchVendors = async () => {
      await dispatch(getAllVendors());
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    };
    fetchVendors();
  }, [dispatch]);

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(getAllVendors()).finally(() => {
      setRefreshing(false);
    });
  };

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.job.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConnect = async (id) => {
    setLoading(prev => ({ ...prev, [id]: true })); // Set loading for the specific vendor
    try {
      await dispatch(connectToVendor(id));

      setApprovedVendors(prev => {
        const currentConnections = prev[id]?.connections || [];
        const updatedConnections = [
          { image: currentUserProfile.image, name: currentUserProfile.name },
          ...currentConnections
        ].slice(0, 3);

        return {
          ...prev,
          [id]: {
            ...prev[id],
            connections: updatedConnections,
            connectionsCount: updatedConnections.length,
          },
        };
      });
    } catch (error) {
      Alert.alert('Error connecting to vendor:', error);
    } finally {
      setLoading(prev => ({ ...prev, [id]: false })); // Reset loading for the specific vendor
    }
  };

  const handleProfileNavigation = (id) => {
    navigation.navigate('VendorsProfilePage', { vendorId: id });
  };

  const renderConnections = (connections) => (
    <View style={styles.connectionsContainer}>
      {connections.map((connection, index) => (
        <FastImage
          key={index}
          source={{ uri: connection.image }}
          style={[styles.connectionImage, { zIndex: connections.length - index }]}
        />
      ))}
      <Text style={styles.connectionsCount}>{connections.length} connectors</Text>
    </View>
  );

  const renderItem = ({ item }) => {
    const isLoading = loading[item.id]; // Check if the specific vendor is loading
    return (
      <View style={styles.card}>
        <View style={styles.infoContainer}>
          <FastImage source={{ uri: item.image }} style={styles.profileImage} resizeMode={FastImage.resizeMode.cover} />
          <View style={styles.userInfo}>
            <Text style={styles.name}>{item.name}</Text>
            <AntDesign name="checkcircle" size={10} color="green" />
          </View>
          <Text style={styles.job}>{item.job}</Text>
          <Text style={styles.description}>{item.description}</Text>
          {renderConnections(item.connections)}

          <TouchableOpacity
            style={[styles.followButton, approvedVendors[item.id] ? styles.approvedButton : styles.connectButton]}
            onPress={() => approvedVendors[item.id] ? handleProfileNavigation(item.id) : handleConnect(item.id)}
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="white" style={styles.spinner} />
            ) : (
              <Text style={styles.followButtonText}>
                {approvedVendors[item.id] ? 'Approved' : 'Connect'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {apiLoading ? (
        <View style={styles.loadingContainer}>
          <LottieView
            source={require('../../assets/lottie/bouncing_check.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <LottieView
            source={require('../../assets/lottie/errorLottie.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
          <Text style={styles.errorMessage}>Oops! Something went wrong.</Text>
        </View>
      ) : (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="green" />
            </TouchableOpacity>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name, job, or location..."
              value={searchQuery}
              placeholderTextColor={Color.colorGray_100}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity onPress={() => navigation.navigate('VendorsFollowed')}>
              <MaterialIcons name="group-add" size={30} color="green" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={filteredVendors}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
          />
        </Animated.View>
      )}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android'? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    padding: '2%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  userInfo:{
    flexDirection: 'row',
    justifyContent:'center',
    marginTop: 10,
  },
  list: {
    paddingBottom: 20,
    paddingRight: 5,
  },
  card: {
    backgroundColor: '#ffff',
    borderRadius: 22,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    maxWidth: '100%',
    justifyContent:'center',
    alignContent: 'center',
  },
  infoContainer: {
    flex: 1,
    padding: 10,
    left: 10,
    top: 70,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  job: {
    fontSize: 13,
    color: '#666666',
    marginLeft: 60,
  },
  description: {
    fontSize: 12,
    color: '#666666',
    marginVertical: 5,
    marginLeft: 60,
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
    marginTop: 10,
},
loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff', // Adjust as needed
},
lottie: {
  width: width * 0.3, // Adjust size as needed
  height: height * 0.3,
},
  followButton: {
    shadowColor: '#000',
    marginTop: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    alignItems: 'center',
    width: 80,
    height: 30,
    borderRadius: 12,
    justifyContent: 'center',
    top: '-69%',
    left: '72%',
  },
  connectButton: {
    backgroundColor: 'green',
  },
  approvedButton: {
    backgroundColor: 'orange',
  },
  followButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  searchInput: {
    borderRadius: 13,
    paddingHorizontal: 12,
    height: 37,
    borderColor: 'gray',
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 23,
    width: '70%',
    backgroundColor: '#f2f2f2',
  },
  connectionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    left: '10%',
    bottom: 15,
    marginVertical: 13
  },
  connectionImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    position: 'absolute',
    left: 0,
  },
  connectionsCount: {
    fontSize: 12,
    color: 'green',
    marginLeft: 40,
  },
  spinner: {
    position: 'absolute',
  },
});

export default VendorList;
