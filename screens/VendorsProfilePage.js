import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import { TouchableOpacity } from "react-native-gesture-handler";

const VendorsProfilePage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { name, icon, profession } = route.params;

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
        onPress={() => handleNavigation("ChatPage",{name: name})}
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
        onPress={() => handleNavigation("VendorProducts")}
      >
        <Image
          style={styles.iconStyle}
          contentFit="cover"
          source={require("../assets/user-light.png")}
        />
        <Text style={styles.buttonText}>Products Repository</Text>
        
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttonContainer]}
        onPress={() => handleNavigation("ReportVendor")}
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
          source={icon} style={styles.icon}
        />
         <Text style={styles.vendorName}>{name}</Text>
        <Text style={styles.vendorDescription}>
          {profession}
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
    backgroundColor: Color.colorWhite,
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
  icon: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: Color.colorGray_100,
    resizeMode: "cover",
    marginBottom: -70
  },
  buttonContainer: {
    height: 63,
    width: 370,
    backgroundColor: '#f2f2f2',
    borderRadius: Border.br_3xs,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  
  },
  buttonText: {
    fontSize: FontSize.size_xl,
    color: Color.colorBlack,
    fontWeight: "500",
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
    fontSize: FontSize.size_5xl,
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
