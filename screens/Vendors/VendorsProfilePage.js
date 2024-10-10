import * as React from "react";
import { Image, StyleSheet, Text, View, Animated, Dimensions, Platform, StatusBar, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontFamily, FontSize, Color } from "../../GlobalStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';

// ActionButton Component
const ActionButton = ({ onPress, iconSource, text }) => (
  <TouchableOpacity style={styles.buttonContainer} onPress={onPress} accessibilityLabel={text}>
    <Image style={styles.iconStyle} source={iconSource} />
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);
const { width } = Dimensions.get('window');

const VendorsProfilePage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { username, usericon, userprofession } = route.params;

  const screenAnim = React.useRef(new Animated.Value(0)).current;
  const [screenWidth, setScreenWidth] = React.useState(Dimensions.get('window').width);

  React.useEffect(() => {
    // Animation on screen mount
    Animated.timing(screenAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Listener for screen resize
    const onChange = ({ window }) => {
      setScreenWidth(window.width);
    };
    const subscription = Dimensions.addEventListener('change', onChange);

    return () => {
      subscription?.remove(); // Cleanup listener
    };
  }, [screenAnim]);

  const handleNavigation = (screen, params = {}) => {
    navigation.navigate(screen, params);
  };

  // List of action buttons
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.vendorsProfilePage, { opacity: screenAnim }]}>
        <StatusBar barStyle="dark-content" />

        {/* Header with Vendor Name */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-circle-outline" size={25} color="green" />
          </TouchableOpacity>
          <Text style={styles.heading}>{username}'s Profile</Text>
        </View>

        {/* Buttons and navigation options */}
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
            keyExtractor={(item, index) => index.toString()} // Use index as key
            contentContainerStyle={styles.buttonList} // Added to center the content
          />
        </View>

        {/* Vendor Profile Container at the bottom */}
        <View style={styles.vendorInfoContainer}>
          <Image source={usericon} style={styles.icon} />
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  vendorsProfilePage: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 5,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20
  },
  heading: {
    fontSize: FontSize.size_xl,
    fontWeight: "700",
    color: 'green',
    marginLeft: '20%'
  },
  container: {
    marginTop: 20,
    alignItems: 'flex-start',
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
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    paddingRight: 70,
    elevation: 3, // For Android shadow
  },
  buttonText: {
    fontSize: FontSize.size_xl,
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
    backgroundColor: 'green',
    padding: 20,
    alignItems: 'center',
    borderRadius: 22,
    marginTop: 30, // Adjusted to push it to the bottom
    width: '100%',
  },
  vendorName: {
    color: Color.colorWhite,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "600",
    fontSize: FontSize.size_xl,
  },
  vendorDescription: {
    color: Color.colorWhite,
    fontFamily: FontFamily.poppinsRegular,
    marginTop: 2,
  },
  removeFromVendorList: {
    fontSize: FontSize.size_lg,
    color: Color.colorDarkturquoise,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
  },
  removeFromVendorContainer: {
    marginTop: 5,
  },
  buttonList: {
    alignItems: 'center', // Centering the list items
  }
});

export default VendorsProfilePage;
