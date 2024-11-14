import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TextInput,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native"; // Import LottieView
import FastImage from "react-native-fast-image";

const { width } = Dimensions.get("window");

const FollowedVendorsScreen = ({ navigation }) => {
  const [vendors, setVendors] = useState([
    {
      id: 1,
      name: "John Doe",
      profession: "Graphic Designer",
      description: "Creating stunning visuals for brands.",
      profilePic: "https://example.com/profile1.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      profession: "Web Developer",
      description: "Building responsive and user-friendly websites.",
      profilePic: "https://example.com/profile2.jpg",
    },
    {
      id: 3,
      name: "Alice Johnson",
      profession: "Digital Marketer",
      description: "Expert in SEO and social media marketing.",
      profilePic: "https://example.com/profile3.jpg",
    },
  ]);

  const [loadingStates, setLoadingStates] = useState({});
  const [isScreenLoading, setIsScreenLoading] = useState(true); // Screen loading state
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simulate loading before displaying content
    const timer = setTimeout(() => setIsScreenLoading(false), 1000); // Adjust time as needed
    return () => clearTimeout(timer);
  }, []);

  const handleUnfollow = (vendorId) => {
    setLoadingStates((prev) => ({ ...prev, [vendorId]: true }));

    setTimeout(() => {
      setVendors((prev) => prev.filter((vendor) => vendor.id !== vendorId));
      setLoadingStates((prev) => ({ ...prev, [vendorId]: false }));
    }, 400);
  };

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.profession.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isScreenLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <LottieView
          source={require("../../assets/lottie/rotatingBalls.json")} // Path to your Lottie animation file
          autoPlay
          loop
          style={styles.lottie}
        />
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
          <Text style={styles.emptyMessage}>
            No vendors found. Please follow some vendors!
          </Text>
        ) : (
          filteredVendors.map((vendor) => (
            <Animated.View key={vendor.id} style={styles.card}>
              <TouchableOpacity style={styles.vendorInfo}>
                <FastImage
                  source={{ uri: vendor.profilePic }}
                  style={styles.profilePic}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <View style={styles.details}>
                  <Text style={styles.vendorName}>{vendor.name}</Text>
                  <Text style={styles.vendorProfession}>
                    {vendor.profession}
                  </Text>
                  <Text style={styles.vendorDescription}>
                    {vendor.description}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleUnfollow(vendor.id)}
                style={[
                  styles.unfollowButton,
                  loadingStates[vendor.id] ? styles.loadingButton : null,
                ]}
              >
                {loadingStates[vendor.id] ? (
                  <LottieView
                    source={require("../../assets/lottie/rotateLoad.json")} // Reuse the animation for the unfollow button if desired
                    autoPlay
                    loop
                    style={styles.buttonLottie}
                  />
                ) : (
                  <Text style={styles.buttonText}>Unfollow</Text>
                )}
              </TouchableOpacity>
            </Animated.View>
          ))
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "1%",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#ffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
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
  searchInput: {
    flex: 1,
    marginLeft: 10,
    borderRadius: 16,
    padding: 10,
    backgroundColor: "#f5f5f5",
    shadowColor: "#000",
    fontSize: 14,
    color: "#333",
    marginRight: "4%",
  },
  content: {
    margin: 5,
  },
  emptyMessage: {
    textAlign: "center",
    fontSize: 18,
    color: "darkgrey",
    marginTop: "20%",
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 14,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: width * 0.98,
  },
  vendorInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  details: {
    flexDirection: "column",
  },
  vendorName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  vendorProfession: {
    fontSize: 13,
    color: "gray",
  },
  vendorDescription: {
    fontSize: 11,
    color: "darkgray",
  },
  unfollowButton: {
    backgroundColor: "green",
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-4%",
  },
  loadingButton: {
    backgroundColor: "orange",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default FollowedVendorsScreen;
