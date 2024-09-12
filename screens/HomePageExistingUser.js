import * as React from "react";
import { StyleSheet, Text, View, FlatList, TextInput, Image, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler"; // <-- Added GestureHandlerRootView
import { FontFamily, Color, Border, FontSize } from "../GlobalStyles";
import AntDesign from '@expo/vector-icons/AntDesign';

const challenges = [
  { id: '1', title: 'EcoBikes', icon: require('../assets/bikes.png') },
  { id: '2', title: 'GreenBins', icon: require('../assets/greenBin.png') },
  { id: '3', title: 'New Arrivals', icon: require('../assets/NewArrivals.png') },
  { id: '4', title: 'MoleBio', icon: require('../assets/genetic.png') },
  { id: '5', title: 'Beauty & Care', icon: require('../assets/visa.png') },
  { id: '6', title: 'Phones', icon: require('../assets/mpesa.png') },
  { id: '7', title: 'TVs', icon: require('../assets/Television.png') },
  { id: '8', title: 'Shoes', icon: require('../assets/Shoes.png') },
  { id: '9', title: 'Appliances', icon: require('../assets/Appliance.png') },
  { id: '10', title: 'Trees', icon: require('../assets/Treee.png') },
];

const banners = [
  require('../assets/greenFriday.png'),
  require('../assets/greenPoints.png'),
  require('../assets/Bags.png'),
  require('../assets/connect.png'),
];


export default function HomePageExistingUser() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredChallenges, setFilteredChallenges] = React.useState(challenges);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = challenges.filter(challenge => 
      challenge.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredChallenges(filtered);
  };

  const renderVendorItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('VendorsProfilePage', {
      name: item.name,
      icon: item.icon,
      profession: item.profession,
    })}>
      <View style={styles.vendorDetails}>
        <Image style={styles.vendorImgIcon} contentFit="cover" source={item.icon} />
        <Text style={styles.vendorName}>{item.name}</Text>
        <Text style={styles.vendorProfession}>{item.profession}</Text>
        <TouchableOpacity style={styles.followed}>
          <Image style={styles.Small} contentFit="cover" source={item.small} />
          <Text style={styles.followers}> & {item.followers} others</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const animateBanner = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
      fadeAnim.setValue(1);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      animateBanner();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}> {/* Wrapping everything in GestureHandlerRootView */}
      <View style={styles.homePageExistingUser}>

        {/* Banner Section */}
        <View style={styles.bannerContainer}>
          <Animated.Image 
            source={banners[currentIndex]} 
            style={[styles.bannerImage, { opacity: fadeAnim }]} 
            resizeMode="cover" 
          />
        </View>

        <Text style={styles.vendorsYouFollow}>Vendors you follow:</Text>

        <View style={styles.noteMessage}>
          <Text style={styles.factAbout201}>
            Fact: About 2.01 billion tons of municipal solid waste is generated globally each year! 😊
          </Text>
        </View>

        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search Your Top Favorite Challenges"
            placeholderTextColor={Color.colorGray_100}
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        <View style={styles.vendorFrame}>
          <FlatList
            data={[
              { id: '1', name: 'Leakey Jokes', icon: require("../assets/vendorimg.png"), profession: 'Tree Vendor', small: require("../assets/man.avif"), followers: 200 },
              { id: '2', name: 'Hassan Tbag', icon: require("../assets/vendorimg1.png"), profession: 'Smart Technologies' , small: require("../assets/man.avif"), followers: `2k` },
              { id: '3', name: 'Hassan Tbag', icon: require("../assets/vendorimg1.png"), profession: 'Smart Health' , small: require("../assets/women.avif"), followers: `4k` },

            ]}
            renderItem={renderVendorItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          
          <View style={styles.addVendorBtn}>
            <TouchableOpacity onPress={() => navigation.navigate('VendorList')}>
              <AntDesign name="pluscircle" size={30} color="green" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.challengeFrame}>
          <FlatList 
            data={filteredChallenges} 
            renderItem={({ item }) => (
              <View style={styles.challengeBox}>
                <TouchableOpacity onPress={() => navigation.navigate('VendorProducts')}>
                  <View style={styles.challengeBoxChild} />
                  <Image style={styles.rainIcon} contentFit="cover" source={item.icon} />
                  <Text style={styles.challengeText}>{item.title}</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.id}
            numColumns={6}
            contentContainerStyle={{ flexWrap: 'wrap', alignItems: 'flex-start' }}
            showsHorizontalScrollIndicator={false}       
          />
        </View>
      </View>
    </GestureHandlerRootView> 
  );
}



const styles = StyleSheet.create({
  homePageExistingUser: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 20,
    overflow: 'hidden',
  },
  bannerContainer: {
    height: 180,
    overflow: 'visible',
    position: 'relative',
    borderRadius: 25,
    padding: 20,
    marginBottom: 15,
    top: 60,
    left: 6,
    width: 380,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Small: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderRadius: 40,
    marginTop: -2,
    marginRight: 4,
  },
  followed: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  followers: {
    color: Color.colorGray_100,
    fontSize: 12,
    left: -3
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    position: 'absolute',
  },
  vendorsYouFollow: {
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.manropeBold,
    color: Color.colorGray_800,
    fontWeight: 'bold',
    position: 'absolute',
    left: 13,
    top: 270,
  },
  searchBarContainer: {
    width: 365,
    padding: 10,
    borderRadius: 8,
    top: 430,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    left: 15,
  },
  searchBar: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  noteMessage: {
    height: 57,
    width: 365,
    position: "absolute",
    borderRadius: 13,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    top: 540,
    left: 17,
  },
  factAbout201: {
    fontSize: FontSize.size_sm,
    color: Color.colorGray_800,
    width: 354,
    height: 48,
    marginTop: 10,
    marginLeft: 10,
  },
  vendorFrame: {
    top: 400,
    left: 0,
    height: 80,
    width: "100%",
    position: "absolute",
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  vendorDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 5,
    justifyContent: 'center',
    marginBottom: 43,
    backgroundColor: Color.colorWhite,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    height: 160,
    width: 140,
    marginRight: 7
  },
  vendorImgIcon: {
    width: 105,
    height: 75,
    borderRadius: 18,
    marginLeft: 15,
  },
  vendorName: {
    fontSize: 13,
    fontFamily: FontFamily.manropeBold,
    color: Color.colorGray_800,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 5,
    marginRight: 4
  },
  vendorProfession: {
    fontSize: 11,
    fontFamily: FontFamily.manropeSemiBold,
    color: Color.colorLimegreen_200,
    textAlign: 'center',
    marginTop: -2,
  },
  addVendorBtn: {
    padding: 10,
    marginLeft: 3,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    top: -9,
  },
  challengeFrame: {
    height: 195,
    width: 370,
    position: "absolute",
    top: 710,
    left: 17,
  },
  challengeBox: {
    width: 75,
    height: 100,
    marginHorizontal: 10,
  },
  challengeBoxChild: {
    backgroundColor: 'white',
    borderRadius: Border.br_base,
    width: "100%",
    height: 80,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  challengeText: {
    top: 55,
    left: 5,
    marginLeft: -8,
    fontSize: 11,
    color: Color.colorGray_100,
    width: 80,
    height: 50,
    marginTop: 5,
    fontFamily: FontFamily.manropeBold,
    textAlign: "center",
    position: "absolute"
  },
  rainIcon: {
    top: -65,
    left: 15,
    width: 43,
    height: 40,
    marginBottom: 5,
  },
});

