import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import { TouchableOpacity } from "react-native-gesture-handler";

const VendorsProfilePage = () => {
  const navigation = useNavigation();

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.vendorsProfilePage}>
      <Image
        style={styles.shapesIcon}
        contentFit="cover"
        source={require("../assets/shapes.png")}
      />
      <Image
        style={[styles.shapesIcon1, styles.vectorIconLayout]}
        contentFit="cover"
        source={require("../assets/shapes.png")}
      />
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.buttonContainer]}
        onPress={() => handleNavigation("callPage")}
      >
        <Image
          style={styles.iconStyle}
          contentFit="cover"
          source={require("../assets/phone-fill.png")}
        />
        <Text style={styles.buttonText}>Call Vendor</Text>
        
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttonContainer]}
        onPress={() => handleNavigation("ShareVendorPage")}
      >
        <Image
          style={styles.iconStyle}
          contentFit="cover"
          source={require("../assets/group-share.png")}
        />
        <Text style={styles.buttonText}>Share Vendor</Text>
        
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttonContainer]}
        onPress={() => handleNavigation("ChatPage")}
      >
         <Image
          style={styles.iconStyle}
          contentFit="cover"
          source={require("../assets/chat-alt-2-fill.png")}
        />
        <Text style={styles.buttonText}>Chat</Text>
       
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttonContainer]}
        onPress={() => handleNavigation("VendorHistoryPage")}
      >
        <Image
          style={styles.iconStyle}
          contentFit="cover"
          source={require("../assets/user-light.png")}
        />
        <Text style={styles.buttonText}>Vendor’s History</Text>
        
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttonContainer]}
        onPress={() => handleNavigation("ReportVendorPage")}
      >
         <Image
          style={styles.iconStyle}
          contentFit="cover"
          source={require("../assets/Untitled.png")}
        />
        <Text style={styles.buttonText}>Report Vendor as scam</Text>
       
      </TouchableOpacity>
      </View>

      <Text style={styles.vendorsProfile}>Vendor’s Profile</Text>
     

      <View style={styles.vendorInfoContainer}>
       
        <Image
          style={styles.ellipseIcon}
          contentFit="cover"
          source={require("../assets/ellipse-93.png")}
        />
         <Text style={styles.vendorName}>Johanna</Text>
        <Text style={styles.vendorDescription}>
          (Tree Vendor)
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
    </View>
  );
};

const styles = StyleSheet.create({
  vendorsProfilePage: {
    backgroundColor: Color.colorWhitesmoke,
    flex: 1,
    height: 844,
    overflow: "hidden",
    width: 404,
  },
  shapesIcon: {
    top: -52,
    left: -54,
    width: 235,
    height: 173,
    position: "absolute",
  },
  shapesIcon1: {
    height: "20.5%",
    width: "60.26%",
    top: "84.24%",
    right: "-18.97%",
    bottom: "-4.74%",
    left: "58.72%",
  },
  container:{
    left: 20
  },
  buttonContainer: {
    height: 63,
    width: 370,
    backgroundColor: Color.colorLightgray,
    borderRadius: Border.br_3xs,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  buttonText: {
    fontFamily: FontFamily.manropeBold,
    fontSize: FontSize.size_xl,
    color: Color.colorBlack,
    flex: 1,
  },
  iconStyle: {
    height: 24,
    width: 24,
    marginRight: 20
  },
  vendorsProfile: {
    top: 50,
    left: 153,
    fontSize: FontSize.size_9xl,
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorGray_800,
    width: 228,
    height: 39,
    fontWeight: "600",
    textAlign: "center",
    position: "absolute",
  },
  image2: {
    left: 1,
    top: 33,
    width: 79,
    height: 79,
    position: "absolute",
  },
  vendorInfoContainer: {
    backgroundColor: Color.colorLimegreen_200,
    padding: 20,
    alignItems: 'center',
    height: 200,
    marginTop: 20,
    width: 380,
    borderRadius: 17,
    left: 15
  },
  vendorName: {
    color: Color.colorWhite,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    fontSize: FontSize.size_xl,
    top: 85
  },
  vendorDescription: {
    color: Color.colorWhite,
    fontFamily: FontFamily.poppinsRegular,
    top: 85
  },
  ellipseIcon: {
    top: 30,
    left: 154,
    width: 60,
    height: 60,
    position: "absolute",
  },
  removeFromVendorList: {
    fontSize: FontSize.size_lg,
    color: Color.colorDarkturquoise,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
  },
  removeFromVendorContainer: {
    marginTop: 85,
  },
});

export default VendorsProfilePage;
