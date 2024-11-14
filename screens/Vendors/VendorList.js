import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  StatusBar,
  Platform,
  ActivityIndicator,
  Animated,
  Dimensions,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color } from "../../GlobalStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import LottieView from "lottie-react-native";
import FastImage from "react-native-fast-image"; // Import FastImage

const { width } = Dimensions.get("window");

const VendorList = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [approvedVendors, setApprovedVendors] = useState({});
  const [loading, setLoading] = useState({});
  const [fadeAnim] = useState(new Animated.Value(0));
  const [refreshing, setRefreshing] = useState(false);
  const [isScreenLoading, setIsScreenLoading] = useState(true);

  const peopleToFollow = [
    {
      id: "1",
      name: "Tim Tebow",
      job: "Tree Vendor",
      location: "Nairobi",
      description:
        "Selling All kinds of Trees, 5x NYT Best-Selling Author, 2x National Champion, Heisman Trophy...",
      followers: "Followed by Michael Nyagha, Grace and 19 others you know",
      connections: [
        "https://example.com/connector1.jpg",
        "https://example.com/connector2.jpg",
        "https://example.com/connector3.jpg",
      ],
      image: "https://example.com/profile1.jpg", // Add a profile image URL
    },
    // Other sample data
  ];

  useEffect(() => {
    setTimeout(() => {
      setIsScreenLoading(false);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 2000);
  }, [fadeAnim]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const filteredPeople = peopleToFollow.filter(
    (person) =>
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.job.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConnect = (id) => {
    setLoading((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setLoading((prev) => ({ ...prev, [id]: false }));
      setApprovedVendors((prev) => ({ ...prev, [id]: true }));
    }, 500);
  };

  const handleProfileNavigation = (id) => {
    navigation.navigate("VendorsProfilePage", { vendorId: id });
  };

  const renderConnections = (connections) => (
    <View style={styles.connectionsContainer}>
      {connections.length > 0 &&
        connections.map((uri, index) => (
          <FastImage
            key={index}
            source={{ uri }}
            style={[
              styles.connectionImage,
              { zIndex: connections.length - index },
            ]}
          />
        ))}
      <Text style={styles.connectionsCount}>
        {(connections.length / 1000).toFixed(1)}k connectors{" "}
      </Text>
    </View>
  );

  const renderItem = ({ item }) => {
    const isLoading = loading[item.id];
    return (
      <View style={styles.card}>
        <View style={styles.infoContainer}>
          <FastImage
            source={{ uri: item.image }}
            style={styles.profileImage}
            resizeMode={FastImage.resizeMode.cover}
          />{" "}
          {/* Use FastImage */}
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.job}>{item.job}</Text>
          <Text style={styles.description}>{item.description}</Text>
          {renderConnections(item.connections)}
          <TouchableOpacity
            style={[
              styles.followButton,
              approvedVendors[item.id]
                ? styles.approvedButton
                : styles.connectButton,
            ]}
            onPress={() =>
              approvedVendors[item.id]
                ? handleProfileNavigation(item.id)
                : handleConnect(item.id)
            }
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator
                size="small"
                color="white"
                style={styles.spinner}
              />
            ) : (
              <Text style={styles.followButtonText}>
                {approvedVendors[item.id] ? "Approved" : "Connect"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {isScreenLoading ? (
        <View style={styles.loadingContainer}>
          <LottieView
            source={require("../../assets/lottie/bouncing_check.json")}
            autoPlay
            loop
            style={styles.loadingAnimation}
          />
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
            <TouchableOpacity
              onPress={() => navigation.navigate("VendorsFollowed")}
            >
              <MaterialIcons name="group-add" size={30} color="green" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={filteredPeople}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
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
    backgroundColor: "#f5f5f5",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    padding: "2%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  loadingAnimation: {
    width: 200,
    height: 200,
  },
  list: {
    paddingBottom: 20,
    paddingRight: 5,
  },
  card: {
    backgroundColor: "#ffff",
    borderRadius: 22,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: "row",
    maxWidth: "100%",
    justifyContent: "center",
    alignContent: "center",
  },
  coverImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "lightgray",
    marginTop: 5,
    left: 5,
  },
  infoContainer: {
    flex: 1,
    padding: 10,
    left: 10,
    top: 70,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333333",
    marginTop: 20,
    marginLeft: 60,
  },
  job: {
    fontSize: 13,
    color: "#666666",
    marginLeft: 60,
  },
  description: {
    fontSize: 12,
    color: "#666666",
    marginVertical: 5,
    marginLeft: 60,
  },
  followers: {
    fontSize: 11,
    color: "#666666",
    marginVertical: 3,
    marginLeft: 60,
  },
  followButton: {
    shadowColor: "#000",
    marginTop: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    alignItems: "center",
    width: 80,
    height: 30,
    borderRadius: 12,
    justifyContent: "center",
    top: "-69%",
    left: "72%",
  },
  connectButton: {
    backgroundColor: "green",
  },
  approvedButton: {
    backgroundColor: "orange",
  },
  followButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 12,
  },
  header: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  searchInput: {
    borderRadius: 13,
    paddingHorizontal: 12,
    height: 37,
    borderColor: "gray",
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 23,
    width: "70%",
    backgroundColor: "#f2f2f2",
  },
  connectionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    left: "10%",
    bottom: 15,
    marginVertical: 13,
  },
  connectionImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "lightgray",
    position: "absolute",
    left: 0,
  },
  connectionsCount: {
    fontSize: 12,
    color: "green",
    marginLeft: 40,
  },
  spinner: {
    position: "absolute",
  },
});

export default VendorList;
