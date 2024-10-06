import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Animated,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  Platform,
  StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AntDesign from '@expo/vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';  // FastImage for vendor images
import { FontFamily, Color } from "../../GlobalStyles";  // Assuming your GlobalStyles file has required styles

const challenges = [
  { id: '1', title: 'EcoBikes', icon: require('../../assets/bikes.png') },
  { id: '2', title: 'GreenBins', icon: require('../../assets/greenBin.png') },
  { id: '3', title: 'New Arrivals', icon: require('../../assets/NewArrivals.png') },
  { id: '4', title: 'MoleBio', icon: require('../../assets/genetic.png') },
  { id: '5', title: 'Beauty & Care', icon: require('../../assets/visa.png') },
  { id: '6', title: 'Phones', icon: require('../../assets/mpesa.png') },
  { id: '7', title: 'TVs', icon: require('../../assets/Television.png') },
  { id: '8', title: 'Shoes', icon: require('../../assets/Shoes.png') },
  { id: '9', title: 'Appliances', icon: require('../../assets/Appliance.png') },
  { id: '10', title: 'Trees', icon: require('../../assets/Treee.png') },
];

const banners = [
  require('../../assets/greenFriday.png'),
  require('../../assets/greenPoints.png'),
  require('../../assets/Bags.png'),
  require('../../assets/connect.png'),
];

const { width } = Dimensions.get('window'); // Screen Width

export default function HomePageExistingUser() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredChallenges, setFilteredChallenges] = React.useState(challenges);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const fadeAnim = React.useRef(new Animated.Value(1)).current;

  const initialVendorState = challenges.reduce((acc, challenge) => {
    acc[challenge.id] = { connecting: false, connected: false };
    return acc;
  }, {});

  const [vendorConnectState, setVendorConnectState] = React.useState(initialVendorState);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = challenges.filter(challenge =>
      challenge.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredChallenges(filtered);
  };

  const handleConnectPress = (vendorId) => {
    setVendorConnectState(prevState => ({
      ...prevState,
      [vendorId]: { connecting: true, connected: false },
    }));

    setTimeout(() => {
      setVendorConnectState(prevState => ({
        ...prevState,
        [vendorId]: { connecting: false, connected: true },
      }));
    }, 1000);
  };

  const animateBanner = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
      fadeAnim.setValue(1);  // Reset opacity for the next banner
    });
  };

  React.useEffect(() => {
    const interval = setInterval(animateBanner, 4000);
    return () => clearInterval(interval);
  }, []);

  // Render dots for the banner
  const renderDots = () => (
    <View style={styles.dotContainer}>
      {banners.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            { backgroundColor: index === currentIndex ? 'green' : 'gray' },
          ]}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Animated.View style={[styles.homePageExistingUser, { opacity: fadeAnim }]}>
          {/* Animated Banner */}
          <View style={styles.bannerContainer}>
            <FastImage
              source={banners[currentIndex]}
              style={styles.bannerImage}
              resizeMode="cover"
            />
            {renderDots()}
          </View>

          {/* Vendors Section */}
          <Text style={styles.vendorsYouFollow}>Recommended For You</Text>
          <FlashList
            horizontal
            data={[
              { id: '1', name: 'Leakey Jokes', icon: require("../../assets/vendorimg.png"), profession: 'Tree Vendor' },
              { id: '2', name: 'Hassan Tbag', icon: require("../../assets/vendorimg1.png"), profession: 'Smart Techy' },
              { id: '3', name: 'Hassan Tbag', icon: require("../../assets/vendorimg1.png"), profession: 'Smart Health' },
            ]}
            renderItem={({ item }) => {
              const { connecting, connected } = vendorConnectState[item.id] || {};
              return (
                <View style={styles.vendorDetails}>
                  <FastImage style={styles.vendorImgIcon} source={item.icon} />
                  <Text style={styles.vendorName}>{item.name}</Text>
                  <Text style={styles.vendorProfession}>{item.profession}</Text>

                  <TouchableOpacity
                    style={[
                      styles.connectButton,
                      connected ? styles.approvedButton : styles.connectBlueButton,
                      { opacity: connected ? 1 : 0.8 }
                    ]}
                    onPress={() => {
                      if (connected) {
                        navigation.navigate('VendorsProfilePage', { username: item.name, usericon: item.icon, userprofession: item.profession });
                      } else {
                        handleConnectPress(item.id);
                      }
                    }}
                    disabled={connecting}
                  >
                    {connecting ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Text style={styles.buttonText}>
                        {connected ? 'Approved' : 'Connect'}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            style={styles.vendorFrame}
            estimatedItemSize={130}  // Optimized item size for performance
            ListFooterComponent={() => (
              <TouchableOpacity style={styles.addVendorButton} onPress={() => navigation.navigate('VendorList')}>
                <AntDesign name="pluscircle" size={35} color="green" />
              </TouchableOpacity>
            )}
          />

          {/* Search Bar */}
          <View style={styles.searchBarContainer}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search Your Top Favorite Challenges"
              placeholderTextColor={Color.colorGray_100}
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>

          {/* Challenges List */}
          <View style={styles.challengeFrame}>
            <FlashList
              data={filteredChallenges.slice(0, 18)} // Limiting the number of items to 18
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.challengeBox} onPress={() => navigation.navigate('VendorProducts')}>
                  <View style={styles.challengeBoxChild} />
                  <FastImage style={styles.rainIcon} source={item.icon} />
                  <Text style={styles.challengeText}>{item.title}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
              numColumns={4}  // Optimize grid layout
              estimatedItemSize={90}  // Set an estimated size for performance
            />
          </View>
        </Animated.View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  homePageExistingUser: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
  },
  bannerContainer: {
    height: 140,
    width: '100%',
    marginVertical: 10,
    borderRadius: 25,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  vendorsYouFollow: {
    fontFamily: FontFamily.manropeBold,
    fontWeight: "600",
    fontSize: 19,
    color: Color.colorGray_400,
    marginVertical: 10,
  },
  note: {
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 3,
    padding: 15,
    shadowColor: '#000',
    borderRadius: 13,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    marginTop: 10
  },
  vendorFrame: {
    marginVertical: 10,
  },
  vendorDetails: {
    width: 130,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 23,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 3,
    alignItems: 'center'
  },
  vendorImgIcon: {
    width: 60,
    height: 60,
    borderRadius: 35,
    marginBottom: 10,
  },
  vendorName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  vendorProfession: {
    fontSize: 12,
    color: Color.colorGray_200,
  },
  connectButton: {
    marginTop: 7,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: 'green',
    alignItems: 'center',
  },
  approvedButton: {
    backgroundColor: 'orange',
  },
  connectBlueButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  searchBarContainer: {
    marginTop: 5,
    marginBottom: 10,
    top: 20,
    elevation: 3,
  },
  searchBar: {
    borderColor: Color.colorGray_100,
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 40,
    fontFamily: FontFamily.manropeBold,
    paddingVertical: 10,
    backgroundColor: '#FFF',
  },
  challengeFrame: {
    marginTop: 40,
    
  },
  challengeBox: {
    width: width / 4 - 15,
    marginBottom: 15,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginHorizontal: 5, // Added margin for spacing between items
    marginVertical: 3,
  },
  challengeBoxChild: {
    height: 90,
    width: '100%',
    backgroundColor: '#ffff',
    borderRadius: 20,
    position: 'absolute',
    paddingHorizontal: 10,
    paddingLeft: 10
  },
  rainIcon: {
    height: 50,
    width: 50,
    marginBottom: 10,
  },
  challengeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  challengeListContainer: {
    paddingHorizontal: 10,
  },
  addVendorButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 75,
    marginLeft: 20
  },
  vendorSeparator: {
    width: 10,
  },
});
