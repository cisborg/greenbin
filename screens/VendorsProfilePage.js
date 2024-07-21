import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";

const VendorsProfilePage = () => {
  const navigation = useNavigation();

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
      
      <Pressable
        style={[styles.rectangleParent, styles.groupParentLayout]}
        onPress={() => navigation.navigate("ChatPage")}
      >
        <View style={styles.groupChild} />
        <Image
          style={styles.chatAlt2FillIcon}
          contentFit="cover"
          source={require("../assets/chat-alt-2-fill.png")}
        />
        <Text style={[styles.communicate, styles.communicateTypo]}>
          Chat
        </Text>
      </Pressable>
      <View style={[styles.rectangleGroup, styles.groupParentLayout]}>
        <View style={styles.groupChild} />
        <Text style={[styles.communicate, styles.communicateTypo]}>
          Share Vendor
        </Text>
        <Image
          style={[styles.groupShareIcon, styles.notificationPosition]}
          contentFit="cover"
          source={require("../assets/group-share.png")}
        />
      </View>
      <View style={[styles.rectangleContainer, styles.groupParentLayout]}>
        <View style={styles.groupChild} />
        <Text style={[styles.communicate, styles.communicateTypo]}>
          Call Vendor
        </Text>
        <Image
          style={[styles.phoneFillIcon, styles.fillIconLayout]}
          contentFit="cover"
          source={require("../assets/phone-fill.png")}
        />
      </View>
      <View style={[styles.groupView, styles.groupParentLayout]}>
        <View style={styles.groupChild} />
        <Text style={[styles.vendorsHistory, styles.communicateTypo]}>
          Vendor’s History
        </Text>
        <Image
          style={[styles.userLightIcon, styles.fillIconLayout]}
          contentFit="cover"
          source={require("../assets/user-light.png")}
        />
      </View>
      <View style={[styles.rectangleParent1, styles.groupParentLayout]}>
        <View style={styles.groupChild} />
        <Text style={[styles.vendorsHistory, styles.communicateTypo]}>
          Report Vendor as scam
        </Text>
        <Image
          style={[styles.flagFinishFillIcon, styles.fillIconLayout]}
          contentFit="cover"
          source={require("../assets/Untitled.png")}
        />
      </View>
      <Text style={styles.vendorsProfile}>Vendor’s Profile</Text>
      <Pressable style={styles.image2} onPress={() => navigation.goBack()}>
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/image-2.png")}
        />
      </Pressable>
      <View style={[styles.rectangleParent2, styles.groupChild2Layout]}>
        <View style={[styles.groupChild2, styles.groupChild2Layout]} />
        <Text style={[styles.shaileshShete, styles.shaileshSheteTypo]}>
          John Doe
        </Text>
        <Text style={[styles.verifiedVendorAt, styles.shaileshSheteTypo]}>
          (Vendor at Nature Diversity)
        </Text>
        <Image
          style={styles.ellipseIcon}
          contentFit="cover"
          source={require("../assets/ellipse-93.png")}
        />
        <Pressable
          style={styles.removeFromVendorContainer}>
               
          <Text style={styles.removeFromVendorList}  onPress={() => navigation.navigate("HomePageExistingUser")}>
            Remove from Vendor List?
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  vectorIconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  notificationPosition: {
    left: 18,
    position: "absolute",
  },
  groupParentLayout: {
    height: 63,
    width: 354,
    left: 19,
    position: "absolute",
  },
  communicateTypo: {
    fontFamily: FontFamily.manropeSemiBold,
    fontSize: FontSize.size_xl,
    textAlign: "left",
    fontWeight: "600",
    top: 17,
    color: Color.colorBlack,
    position: "absolute",
  },
  fillIconLayout: {
    height: 24,
    width: 24,
    position: "absolute",
  },
  groupChild2Layout: {
    height: 263,
    width: 390,
    left: 0,
    position: "absolute",
  },
  shaileshSheteTypo: {
    color: Color.colorWhite,
    fontSize: FontSize.size_xl,
    textAlign: "center",
    position: "absolute",
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
  vectorIcon: {
    height: "42.86%",
    width: "6.2%",
    top: "46.43%",
    right: "0%",
    bottom: "10.71%",
    left: "93.8%",
  },
  vectorIcon1: {
    height: "60.71%",
    width: "6.48%",
    top: "35.71%",
    right: "7.61%",
    bottom: "3.57%",
    left: "85.92%",
  },
  vectorIcon2: {
    height: "67.86%",
    width: "5.63%",
    top: "32.14%",
    right: "16.06%",
    bottom: "0%",
    left: "78.31%",
  },
  text: {
    top: "42.86%",
    left: "0%",
    fontSize: FontSize.size_sm,
    textAlign: "center",
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    position: "absolute",
  },
  notification: {
    width: 355,
    height: 28,
    top: 0,
  },
  groupChild: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorLightgray,
    left: 0,
    height: 63,
    width: 354,
    top: 0,
    position: "absolute",
  },
  chatAlt2FillIcon: {
    left: 21,
    width: 30,
    height: 30,
    top: 17,
    position: "absolute",
  },
  communicate: {
    left: 67,
    textAlign: "left",
  },
  rectangleParent: {
    top: 339,
  },
  groupShareIcon: {
    top: 13,
    width: 35,
    height: 35,
  },
  rectangleGroup: {
    top: 260,
  },
  phoneFillIcon: {
    left: 23,
    top: 20,
    height: 24,
    width: 24,
  },
  rectangleContainer: {
    top: 182,
  },
  vendorsHistory: {
    left: 66,
    textAlign: "left",
  },
  userLightIcon: {
    top: 19,
    left: 24,
    borderRadius: Border.br_4xl,
  },
  groupView: {
    top: 418,
  },
  flagFinishFillIcon: {
    left: 28,
    top: 20,
    height: 24,
    width: 24,
    
  },
  rectangleParent1: {
    top: 497,
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
  icon: {
    height: "100%",
    width: "100%",
  },
  image2: {
    left: 1,
    top: 33,
    width: 79,
    height: 79,
    position: "absolute",
  },
  groupChild2: {
    backgroundColor: Color.colorLimegreen_200,
    top: 0,
  },
  shaileshShete: {
    top: 170,
    left: 120,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    color: Color.colorWhite,
  },
  verifiedVendorAt: {
    top: 194,
    left: 52,
    fontFamily: FontFamily.poppinsRegular,
  },
  ellipseIcon: {
    top: 41,
    left: 135,
    width: 120,
    height: 118,
    position: "absolute",
  },
  removeFromVendorList: {
    fontSize: FontSize.size_lg,
    color: Color.colorDarkturquoise,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
  },
  removeFromVendorContainer: {
    left: 78,
    top: 225,
    position: "absolute",
  },
  rectangleParent2: {
    top: 581,
  },
  vendorsProfilePage: {
    backgroundColor: Color.colorWhitesmoke,
    flex: 1,
    height: 844,
    overflow: "hidden",
    width: "100%",
  },
});

export default VendorsProfilePage;
