import * as React from "react";
import { Image, StyleSheet, Text, View, Animated, Dimensions , Platform, StatusBar } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../../GlobalStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

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
    Dimensions.addEventListener('change', onChange);

    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  }, [screenAnim]);

  const handleNavigation = (screen, params = {}) => {
    navigation.navigate(screen, params);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.vendorsProfilePage, { opacity: screenAnim }]}>
        
        {/* Vendor Profile Container at the top */}
        <View style={styles.vendorInfoContainer}>
          <Image
            source={usericon}
            style={styles.icon}
          />
          <Text style={styles.vendorName}>{username}</Text>
          <Text style={styles.vendorDescription}>
            {userprofession}
          </Text>
          <TouchableOpacity style={styles.removeFromVendorContainer}>
            <Text
              style={styles.removeFromVendorList}
              onPress={() => navigation.navigate("HomePageExistingUser")}
            >
              Remove from Vendor List?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Buttons and navigation options */}
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => handleNavigation("callPage")}
          >
            <Image
              style={styles.iconStyle}
              contentFit="cover"
              source={require("../../assets/phone-fill.png")}
            />
            <Text style={styles.buttonText}>Call Vendor</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => handleNavigation("ShareVendorPage")}
          >
            <Image
              style={styles.iconStyle}
              contentFit="cover"
              source={require("../../assets/group-share.png")}
            />
            <Text style={styles.buttonText}>Share Vendor</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => handleNavigation("VendorChat", { name })}
          >
            <Image
              style={styles.iconStyle}
              contentFit="cover"
              source={require("../../assets/chat-alt-2-fill.png")}
            />
            <Text style={styles.buttonText}>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => handleNavigation("VendorProducts")}
          >
            <Image
              style={styles.iconStyle}
              contentFit="cover"
              source={require("../../assets/user-light.png")}
            />
            <Text style={styles.buttonText}>Products Repository</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => handleNavigation("ReportVendor")}
          >
            <Image
              style={styles.iconStyle}
              contentFit="cover"
              source={require("../../assets/Untitled.png")}
            />
            <Text style={styles.buttonText}>Report Vendor as scam</Text>
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
    paddingTop: Platform.OS === 'android'? StatusBar.currentHeight : 0,

  },
  vendorsProfilePage: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 20,
    overflow: 'hidden',
  },
  container: {
    marginTop: 20,
    alignItems: 'center',
    width: '100%', // Ensure container takes full width

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
    width: '100%', // Set all buttons to full width
    backgroundColor: '#f9f9f9',
    borderRadius: Border.br_3xs,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  buttonText: {
    fontSize: FontSize.size_xl,
    color: Color.colorBlack,
    fontWeight: "500",
  },
  iconStyle: {
    height: 24,
    width: 24,
    marginRight: 20,
  },
  vendorInfoContainer: {
    backgroundColor: Color.colorLimegreen_200,
    padding: 20,
    alignItems: 'center',
    borderRadius: 22,
    marginBottom: 30,
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
});

export default VendorsProfilePage;
