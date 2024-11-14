import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  Platform,
  StatusBar,
  FlatList,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontFamily, FontSize, Color } from "../../GlobalStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import LottieView from "lottie-react-native"; // Import LottieView
import FastImage from "react-native-fast-image";

// ActionButton Component
const ActionButton = ({ onPress, iconSource, text }) => (
  <TouchableOpacity
    style={styles.buttonContainer}
    onPress={onPress}
    accessibilityLabel={text}
  >
    <FastImage
      style={styles.iconStyle}
      source={iconSource}
      resizeMode={FastImage.resizeMode.cover}
    />
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const { width } = Dimensions.get("window");

const VendorsProfilePage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { username, usericon, userprofession } = route.params;

  const screenAnim = React.useRef(new Animated.Value(0)).current;
  const [isLoading, setIsLoading] = React.useState(true); // Loading state

  React.useEffect(() => {
    // Animate the screen opacity and set loading to false after animation completes
    Animated.timing(screenAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setIsLoading(false)); // Set loading to false when animation finishes
  }, [screenAnim]);

  const handleNavigation = (screen, params = {}) => {
    navigation.navigate(screen, params);
  };

  const actionButtons = [
    {
      onPress: () => handleNavigation("callPage"),
      iconSource: require("../../assets/phone-fill.png"),
      text: "Call Vendor",
    },
    {
      onPress: () => handleNavigation("RateVendor"),
      iconSource: require("../../assets/group-share.png"),
      text: "Rate Vendor",
    },
    {
      onPress: () => handleNavigation("VendorChat", { name: username }),
      iconSource: require("../../assets/chat-alt-2-fill.png"),
      text: "Chat",
    },
    {
      onPress: () => handleNavigation("VendorProducts"),
      iconSource: require("../../assets/user-light.png"),
      text: "Products Repository",
    },
    {
      onPress: () => handleNavigation("ReportVendor"),
      iconSource: require("../../assets/Untitled.png"),
      text: "Report Vendor as scam",
    },
  ];

  if (isLoading) {
    // Show Lottie animation while loading
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require("../../assets/lottie/bouncing_check.json")} // Path to your Lottie JSON file
          autoPlay
          loop
          style={styles.loadingAnimation}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View
        style={[styles.vendorsProfilePage, { opacity: screenAnim }]}
      >
        <StatusBar barStyle="dark-content" />

        {/* Header with Vendor Name */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back-circle-outline"
              size={25}
              color="green"
            />
          </TouchableOpacity>
          <Text style={styles.heading}>{username}'s Profile</Text>
        </View>

        <View style={styles.container}>
          <FlatList
            data={actionButtons}
            renderItem={({ item }) => (
              <ActionButton
                onPress={item.onPress}
                iconSource={item.iconSource}
                text={item.text}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.buttonList}
          />
        </View>

        <View style={styles.vendorInfoContainer}>
          <FastImage
            source={usericon}
            style={styles.icon}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text style={styles.vendorName}>{username}</Text>
          <Text style={styles.vendorDescription}>{userprofession}</Text>
          <TouchableOpacity style={styles.removeFromVendorContainer}>
            <Text
              style={styles.removeFromVendorList}
              onPress={() => navigation.navigate("HomePageExistingUser")}
            >
              Remove from Vendor List?
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  vendorsProfilePage: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 5,
    overflow: "hidden",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingAnimation: {
    width: 150,
    height: 150,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: "5%",
  },
  heading: {
    fontSize: FontSize.size_xl,
    fontWeight: "700",
    color: "green",
    marginLeft: "20%",
  },
  container: {
    marginTop: 20,
    alignItems: "flex-start",
  },
  icon: {
    height: 80,
    width: 80,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: Color.colorGray_100,
    resizeMode: "cover",
    marginBottom: 8,
  },
  buttonContainer: {
    height: 63,
    width: width * 0.95, // Set all buttons to full width
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    marginVertical: 10,
    marginHorizontal: 8,
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // For Android shadow
  },
  buttonText: {
    fontSize: FontSize.size_lg,
    color: Color.colorBlack,
    fontWeight: "500",
    alignSelf: "center",
  },
  iconStyle: {
    height: 24,
    width: 24,
    marginRight: 20,
    alignSelf: "center",
  },
  vendorInfoContainer: {
    backgroundColor: "green",
    padding: 20,
    alignItems: "center",
    borderRadius: 22,
    marginTop: 30, // Adjusted to push it to the bottom
    width: "100%",
  },
  vendorName: {
    color: Color.colorWhite,

    fontWeight: "600",
    fontSize: FontSize.size_lg,
  },
  vendorDescription: {
    color: Color.colorWhite,

    marginTop: 2,
  },
  removeFromVendorList: {
    fontSize: FontSize.size_base,
    color: Color.colorDarkturquoise,

    textAlign: "left",
  },
  removeFromVendorContainer: {
    marginTop: 5,
  },
  buttonList: {
    alignItems: "center", // Centering the list items
  },
});

export default VendorsProfilePage;
