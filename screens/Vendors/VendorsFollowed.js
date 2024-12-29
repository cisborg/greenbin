import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, SafeAreaView, Dimensions, TextInput, FlatList,StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native'; 
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import AntDesign from '@expo/vector-icons/AntDesign';
import { fetchFollowedVendors, deleteVendor } from '../../redux/actions/vendorAction'; // Adjust the import path

const { width } = Dimensions.get('window');

const VendorCard = ({ vendor, onUnfollow, isLoading }) => (
  <Animated.View style={styles.card}>
    <TouchableOpacity style={styles.vendorInfo}>
      <FastImage source={{ uri: vendor.profilePic }} style={styles.profilePic} resizeMode={FastImage.resizeMode.cover} />
      <View style={styles.details}>
        <View style={styles.userInfo}>
          <Text style={styles.vendorName}>{item.name}</Text>
          <AntDesign name="checkcircle" size={10} color="green" />
        </View>
        <Text style={styles.vendorProfession}>{vendor.profession}</Text>
        <Text style={styles.vendorDescription}>{vendor.description}</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity 
      onPress={onUnfollow} 
      style={[styles.unfollowButton, isLoading ? styles.loadingButton : null]}
    >
      {isLoading ? (
        <LottieView
          source={require('../../assets/lottie/rotateLoad.json')}
          autoPlay
          loop
          style={styles.buttonLottie}
        />
      ) : (
        <Text style={styles.buttonText}>Unfollow</Text>
      )}
    </TouchableOpacity>
  </Animated.View>
);

const FollowedVendorsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { followedVendors, loading, error } = useSelector(state => ({ 
  followedVendors: state.vendor.followedVendors, loading: state.vendor.loading, error: state.vendor.error })); // Adjust according to your state structure
  const userId = useSelector(state => state.auth.id);
  const [searchTerm, setSearchTerm] = React.useState("");

  useEffect(() => {
    dispatch(fetchFollowedVendors(userId));
  }, [dispatch, userId]);

  const handleUnfollow = (vendorId) => {
    dispatch(deleteVendor(vendorId)); // Dispatch unfollow action
  };

  const filteredVendors = followedVendors.filter(vendor => 
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    vendor.profession.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <LottieView
          source={require('../../assets/lottie/rotatingBalls.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorMessage}>Error fetching vendors: {error.message}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-sharp" size={24} color="green" />
        </TouchableOpacity>
        <TextInput 
          style={styles.searchInput} 
          placeholder="Search vendors by name or profession" 
          value={searchTerm} 
          onChangeText={setSearchTerm} 
          placeholderTextColor="#888"
        />
      </View>
      <View style={styles.content}>
        {filteredVendors.length === 0 ? (
          <Text style={styles.emptyMessage}>No vendors found. Please follow some vendors!</Text>
        ) : (
          <FlatList
            data={filteredVendors}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <VendorCard 
                vendor={item} 
                onUnfollow={() => handleUnfollow(item.id)} 
                isLoading={loading} // Adjust if you want individual loading states
              />
            )}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '1%',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#ffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10

  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  lottie: {
    width: 150,
    height: 150,
  },
  buttonLottie: {
    width: 20,
    height: 20,
  },
  userInfo:{
    flexDirection: 'row',
    justifyContent:'center',
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    borderRadius: 16,
    padding: 10,
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    fontSize: 14,
    color: '#333',
    marginRight: '4%',
  },
  content: {
    margin: 5
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 18,
    color: 'darkgrey',
    marginTop: '20%',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 14,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: width * 0.98,
  },
  vendorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  details: {
    flexDirection: 'column',
  },
  vendorName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  vendorProfession: {
    fontSize: 13,
    color: 'gray',
  },
  vendorDescription: {
    fontSize: 11,
    color: 'darkgray',
  },
  unfollowButton: {
    backgroundColor: 'green',
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-4%'
  },
  loadingButton: {
    backgroundColor: 'orange',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default FollowedVendorsScreen;
