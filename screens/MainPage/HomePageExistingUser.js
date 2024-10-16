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
  StatusBar,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Color, FontFamily } from "../../GlobalStyles"; // Assuming your GlobalStyles file has required styles
import { FlashList } from "@shopify/flash-list";
import { BallIndicator } from 'react-native-indicators'; // Import BallIndicator

const challenges = [
  { id: "1", title: "EcoBikes", icon: require("../../assets/bikes.png") },
  { id: "2", title: "GreenBins", icon: require("../../assets/greenBin.png") },
  { id: "3", title: "New Arrivals", icon: require("../../assets/NewArrivals.png") },
  { id: "4", title: "MoleBio", icon: require("../../assets/genetic.png") },
  { id: "5", title: "Beauty & Care", icon: require("../../assets/visa.png") },
  { id: "6", title: "Phones", icon: require("../../assets/mpesa.png") },
  { id: "7", title: "TVs", icon: require("../../assets/Television.png") },
  { id: "8", title: "Shoes", icon: require("../../assets/Shoes.png") },
  { id: "9", title: "Appliances", icon: require("../../assets/Appliance.png") },
  { id: "10", title: "Trees", icon: require("../../assets/Treee.png") },
];

const banners = [
  { uri: "https://your-image-url.com/greenFriday.png" },
  { uri: "https://your-image-url.com/greenPoints.png" },
  { uri: "https://your-image-url.com/Bags.png" },
  { uri: "https://your-image-url.com/connect.png" },
];


const { width,height } = Dimensions.get("window");

export default function HomePageExistingUser() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredChallenges, setFilteredChallenges] = React.useState(challenges);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const [loading, setLoading] = React.useState(true); // Loading state

  const initialVendorState = challenges.reduce((acc, challenge) => {
    acc[challenge.id] = { connecting: false, connected: false };
    return acc;
  }, {});

  const [vendorConnectState, setVendorConnectState] = React.useState(initialVendorState);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = challenges.filter((challenge) =>
      challenge.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredChallenges(filtered);
  };

  const handleConnectPress = (vendorId) => {
    setVendorConnectState((prevState) => ({
      ...prevState,
      [vendorId]: { connecting: true, connected: false },
    }));

    setTimeout(() => {
      setVendorConnectState((prevState) => ({
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
      fadeAnim.setValue(1); // Reset opacity for the next banner
    });
  };

  React.useEffect(() => {
    const interval = setInterval(animateBanner, 4000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const renderDots = () => (
    <View style={styles.dotContainer}>
      {banners.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            { backgroundColor: index === currentIndex ? "green" : "gray" },
          ]}
        />
      ))}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <BallIndicator color='green' />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.homePageExistingUser}>
          {/* Banner Container */}
          <View style={styles.bannerContainer}>
            <Animated.Image
              source={banners[currentIndex]}
              style={[styles.bannerImage, { opacity: fadeAnim }]}
              resizeMode="cover"
            />
            {renderDots()}
          </View>

          {/* Vendors Section */}
          <Text style={styles.vendorsYouFollow}>Recommended For You</Text>
          <FlashList
            horizontal
            data={[
              { id: "1", name: "Leakey Jokes", icon: require("../../assets/vendorimg.png"), profession: "Tree Vendor" },
              { id: "2", name: "Hassan Tbag", icon: require("../../assets/vendorimg1.png"), profession: "Smart Techy" },
              { id: "3", name: "Hassan Tbag", icon: require("../../assets/vendorimg1.png"), profession: "Smart Health" },
            ]}
            renderItem={({ item }) => {
              const { connecting, connected } = vendorConnectState[item.id] || {};
              return (
                <View style={styles.vendorDetails}>
                  <Image style={styles.vendorImgIcon} source={item.icon} />
                  <Text style={styles.vendorName}>{item.name}</Text>
                  <Text style={styles.vendorProfession}>{item.profession}</Text>

                  <TouchableOpacity
                    style={[
                      styles.connectButton,
                      connected ? styles.approvedButton : styles.connectBlueButton,
                      { opacity: connected ? 1 : 0.8 },
                    ]}
                    onPress={() => {
                      if (connected) {
                        navigation.navigate("VendorsProfilePage", {
                          username: item.name,
                          usericon: item.icon,
                          userprofession: item.profession,
                        });
                      } else {
                        handleConnectPress(item.id);
                      }
                    }}
                    disabled={connecting}
                  >
                    {connecting ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Text style={styles.buttonText}>{connected ? "Approved" : "Connect"}</Text>
                    )}
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.vendorFrame}
            estimatedItemSize={8}
            ListFooterComponent={() => (
              <TouchableOpacity
                style={styles.addVendorButton}
                onPress={() => navigation.navigate("VendorList")}
              >
                <AntDesign name="pluscircle" size={35} color="green" />
              </TouchableOpacity>
            )}
          />

          <View style={styles.about}>
            <Text>GreenBin is an EcoGreen App simulator of a virtualized real-world green circular economy model</Text>
          </View>

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
              data={filteredChallenges.slice(0, 18)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.challengeBox}
                  onPress={() => navigation.navigate("Products")}
                >
                  <View style={styles.challengeBoxChild} />
                  <Image style={styles.rainIcon} source={item.icon} />
                  <Text style={styles.challengeText}>{item.title}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              numColumns={4}
              estimatedItemSize={20}
            />
          </View>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  homePageExistingUser: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 10,
  },
  loadingContainer: {
    top: '50%',
  },
  bannerContainer: {
    height: 140,
    width: width * 0.99,
    marginVertical: 10,
    borderRadius: 25,
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
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
  vendorFrame: {
    paddingHorizontal: 10, // Only padding-related styles
    backgroundColor: "transparent", 
  },
  vendorDetails: {
    width: 140,
    height: 180,
    borderRadius: 21,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginBottom: 10
  },
  vendorImgIcon: {
    width: 70,
    height: 70,
    marginBottom: 5,
  },
  vendorName: {
    fontFamily: FontFamily.manropeBold,
    fontSize: 14,
    marginBottom: 2,
  },
  vendorProfession: {
    fontFamily: FontFamily.manropeMedium,
    fontSize: 12,
    marginBottom: 5,
  },
  connectButton: {
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  connectBlueButton: {
    backgroundColor: "green",
  },
  approvedButton: {
    backgroundColor: "orange",
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
  },
  addVendorButton: {
    width: 140,
    justifyContent: "center",
    alignItems: "center",
    height: 180,
    marginLeft: -25,
  },
  about: {
    borderRadius: 13,
    backgroundColor: "#f9f9f9",
    paddingVertical: 8,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
    marginBottom: 15,
    marginTop: 15,
  },
  searchBarContainer: {
    marginTop: 15,
  },
  searchBar: {
    borderRadius: 12,
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 20,
    height: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
  },
  challengeFrame: {
    flex: 1,
    marginTop: 15,
  },
  challengeBox: {
    width: 80,
    height: 95,
    marginRight: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  challengeBoxChild: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
  },
  rainIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  challengeText: {
    fontSize: 12,
    fontFamily: FontFamily.manropeBold,
    textAlign: "center",
  },
});
