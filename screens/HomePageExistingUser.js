import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable,FlatList ,TextInput} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, Border, FontSize } from "../GlobalStyles";

const challenges = [
  {
    id: '1',
    title: 'Plant Two Trees Daily',
    icon: require("../assets/del-alt-fill.png"),
    name: 'John Doe'
  },
  {
    id: '2',
    title: 'Buy a Smart Gadget',
    icon: require("../assets/favorite.png"),
    name: 'Joe Smith'
  },
  {
    id: '3',
    title: 'Buy a Green Home',
    icon: require("../assets/favorite.png"),
    name: 'Joe Smith'
  },
  {
    id: '4',
    title: 'Recycle Plastics',
    icon: require("../assets/circle-left.png"),
    name: 'Hassan'
  },
  {
    id: '5',
    title: 'Recycle Bins',
    icon: require("../assets/circle-left.png"),
    name: 'Joyce'
  }
];

const HomePageExistingUser = () => {

  
  const navigation = useNavigation();
  const renderItem = ({ item }) => (
    <View style={[styles.challengeBox,styles.challengeLayout]}>
      <Pressable>
        
          <View style={styles.challengeBoxChild} />
          <Text style={styles.challengeText}>{item.title}</Text>
          <Image style={styles.rainIcon} contentFit="cover" source={item.icon} />
          <Text style={styles.shaileshText}>{item.name}</Text>
       
      </Pressable>
    </View>
  );

  return (
    
    <View style={styles.homePageExistingUser}>
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
      
      
      
      <View style={styles.challengeFrame}>
        <FlatList data={challenges} renderItem={renderItem}
         keyExtractor={item => item.id} 
         horizontal       
          />
          
      </View>
    

      
     
      <View style={[styles.noteMessage, styles.noteLayout]}>
        <View style={[styles.noteMessageChild, styles.noteLayout]} />
        <Text style={[styles.factAbout201Container, styles.textFlexBox]}>
          <Text style={styles.textTypo}>Fact</Text>
          <Text style={styles.about201BillionTypo}>
            : About 2.01 billion tons of municipal solid waste is generated
            globally each year
          </Text>
        </Text>
      </View>

      <View style={styles.Bar}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Your Top Favorite Challenges"
          placeholderTextColor={Color.colorGray_100}
          // Add any other props like onChangeText for handling input
        />
      </View>
      <Pressable>
      <Text style={[styles.hello, styles.helloTypo]}
      onPress={() => navigation.navigate("EventsInformationPage")}
      >Hello!🍀</Text>
      </Pressable>
      <View style={styles.vendorFrame}>
        <Pressable
          style={[styles.vendordetails, styles.vendordetailsLayout]}
          onPress={() => navigation.navigate("VendorsProfilePage")}
        >
          <View style={[styles.vendorname, styles.vendornameLayout]}>
            <Text style={[styles.shailesh, styles.shaileshTypo]}>John Doe</Text>
            <Text style={[styles.mumbai, styles.thaneTypo]}>(Nairobi)</Text>
          </View>
          <Image
            style={[styles.vendorimgIcon, styles.vendordetailsLayout]}
            contentFit="cover"
            source={require("../assets/vendorimg.png")}
          />
        </Pressable>
        <Pressable 
          style={[styles.vendordetails1, styles.vendordetailsLayout]}
          onPress={() => navigation.navigate("VendorsProfilePage")}
          >
          <View style={[styles.vendorname1, styles.vendorname1Layout]}>
            <Text style={[styles.hansenReddy, styles.vendorname1Layout]}>
              Hassan 
            </Text>
            <Text style={[styles.thane, styles.thaneTypo]}>(Nakuru)</Text>
          </View>
          <Image
            style={[styles.vendorimgIcon, styles.vendordetailsLayout]}
            contentFit="cover"
            source={require("../assets/vendorimg1.png")}
          />
        </Pressable>
        <Pressable  >
          <View  style={[styles.addVendorBtn, styles.text1Layout]}>
            <Image
              style={[styles.addVendorBtnChild, styles.vendornameLayout]}
              contentFit="cover"
              source={require("../assets/ellipse-47.png")}
            />
            <Text onPress={()=> navigation.navigate('VendorList')} style={[styles.text1, styles.text1Layout]}>+</Text>
          </View>
        </Pressable>
        <Text style={[styles.vendorsYouFollow, styles.vendorsYouFollowTypo]}>
          Vendors you follow:
        </Text>
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
  textFlexBox: {
    textAlign: "center",
    position: "absolute",
  },
  challengeLayout: {
    width: 119,
    height: 185,
    top: 0,
    marginHorizontal: 10,
    
    
  },
  about201BillionTypo: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
  },
  challengeBoxChild: {
    backgroundColor: Color.colorLimegreen_200,
    borderRadius: Border.br_base,
    width: 119,
    borderRadius: 19, // Rounded corners
    elevation: 3, // Shadow effect for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 1, height: 4 }, // Shadow offset
    shadowOpacity: 0.4, // Shadow opacity
    shadowRadius: 4,
    height: 135,
    overflow: 'hidden',
  },
  shaileshText: {
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.manropeSemiBold,
    width: 100,
    position: "absolute",
    left: 5,
    top: 110,
    textAlign: "center",
    contentFit: "center",
  },
  challengeText: {
    top: 73,
    left: 9,
    fontSize: FontSize.size_base,
    color: Color.colorWhite,
    width: 101,
    height: 78,
    textAlign: "center",
    position: "absolute",
  },
  groupBorder: {
    backgroundColor: Color.colorGainsboro,
    borderWidth: 1,
    borderColor: Color.colorGainsboro,
    borderStyle: "solid",
    height: 10,
    borderRadius: Border.br_base,
    left: 0,
    top: 0,
    position: "absolute",
  },
  vendorsYouFollowTypo: {
    height: 35,
    width: 300,
    fontSize: FontSize.size_5xl,
    color: Color.colorGray_800,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    textAlign: "center",
    position: "absolute",
  },
  noteLayout: {
    height: 57,
    width: 359,
    position: "absolute",
  },
  helloTypo: {
    fontSize: FontSize.size_13xl,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    textAlign: "center",
  },
  vendordetailsLayout: {
    width: 141,
    position: "absolute",
  },
  vendornameLayout: {
    height: 41,
    position: "absolute",
  },
  shaileshTypo1: {
    color: Color.colorLimegreen_100,
    height: 150,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    left: 5,
    textAlign: "center",
    top: 144,
  },
  Bar: {
    width: 365,
    
    padding: 10,
    backgroundColor: '#f0f0f0', // Background color of the search bar
    borderRadius: 8, // Rounded corners
    elevation: 3, // Shadow effect for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 4, 
    top: 480,// 
    left: 10,
    
},
searchBar: {
  flex: 1, // Takes the remaining space
  height: 40, // Height of the search bar
  fontSize: 16, // Font size
  color: '#333', // Text color
  textDecorationStyle: 'solid'
 
},

  
  thaneTypo: {
    height: 18,
    width: 60,
    fontSize: FontSize.size_3xs,
    color: Color.colorDarkslategray,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    textAlign: "center",
    position: "absolute",
  },
  shaileshTypo: {
    height: 30,
    width: 89,
    fontSize: FontSize.size_lg,
    color: Color.colorDarkslategray,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    textAlign: "center",
    position: "absolute",
  },
  vendorname1Layout: {
    width: 117,
    position: "absolute",
  },
  text1Layout: {
    height: 45,
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
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
  },
  notification: {
    left: 18,
    width: 355,
    height: 28,
    top: 0,
    position: "absolute",
  },
  menuBarIcon: {
    top: 770,
    width: 397,
    height: 74,
    left: 0,
    position: "absolute",
  },
  challengeBox1Child: {
    backgroundColor: Color.colorGray_300,
    borderRadius: Border.br_base,
    width: 119,
    height: 177,
    left: 0,
    top: 0,
     
    position: "absolute",
  },
  buySmartGadget: {
    top: 73,
    left: 9,
    fontSize: FontSize.size_base,
    color: Color.colorWhite,
    width: 101,
    height: 72,
    textAlign: "center",
    position: "absolute",
  },
  rainIcon: {
    top: 20,
    left: 33,
    width: 53,
    height: 53,
    position: "absolute",
  },
  groupChild: {
    borderWidth: 1,
    borderColor: Color.colorGainsboro,
    borderStyle: "solid",
    height: 10,
    width: 90,
    borderRadius: Border.br_base,
    left: 0,
    top: 0,
    position: "absolute",
  },
  groupItem: {
    width: 45,
  },
  rectangleParent: {
    top: 155,
    left: 15,
    height: 10,
    width: 90,
    position: "absolute",
  },
  
  groupInner: {
    width: 90,
    backgroundColor: Color.colorGainsboro,
  },
 
  groupChild1: {
    width: 19,
  },
  
  challengeFrame: {
    top: 534,
    left: 23,
    width: 353,
    height: 177,
    position: "absolute",
  },
  challengeProgress: {
    top: 486,
    left: 8,
  },
  noteMessageChild: {
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowRadius: 8,
    elevation: 8,
    shadowOpacity: 1,
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorWhite,
    left: 0,
    top: 0,
  },
  textTypo: {
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
  },
  factAbout201Container: {
    top: 9,
    left: 1,
    fontSize: FontSize.size_smi,
    color: Color.colorGray_700,
    width: 354,
    height: 48,
  },
  noteMessage: {
    top: 409,
    left: 17,
  },
  hello: {
    top: 51,
    left: 248,
    width: 145,
    height: 39,
    color: Color.colorGray_800,
    fontSize: FontSize.size_13xl,
    position: "absolute",
  },
  shailesh: {
    fontSize: FontSize.size_xl,
    width: 100,
    position: "absolute",
  },
  shailesh1: {
    fontSize: FontSize.size_lg,
    width: 100,
    position: "absolute",
  },
  mumbai: {
    top: 24,
    left: 17,
  },
  vendorname: {
    top: 171,
    left: 24,
    width: 93,
  },
  vendorimgIcon: {
    borderRadius: Border.br_51xl_5,
    height: 165,
    left: 0,
    top: 0,
  },
  vendordetails: {
    height: 212,
    left: 0,
    top: 0,
  },
  hansenReddy: {
    fontSize: FontSize.size_xl,
    color: Color.colorDarkslategray,
    height: 35,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    left: 0,
    textAlign: "center",
    top: 0,
    position: "absolute",
    width: 100
  },
  thane: {
    top: 22,
    left: 31,
  },
  vendorname1: {
    top: 165,
    left: 12,
    height: 39,
  },
  vendordetails1: {
    top: 6,
    left: 152,
    height: 204,
  },
  addVendorBtnChild: {
    top: 3,
    width: 41,
    left: 0,
  },
  text1: {
    left: 10,
    width: 22,
    fontSize: FontSize.size_13xl,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    textAlign: "center",
    color: Color.colorBlack,
    top: 0,
  },
  addVendorBtn: {
    top: 82,
    left: 312,
    width: 41,
  },
  vendorsYouFollow: {
    top: -44,
    left: -15,
  },
  vendorFrame: {
    top: 182,
    width: 350,
    height: 212,
    left: 17,
    position: "absolute",
  },
  homePageExistingUser: {
    backgroundColor: Color.colorWhitesmoke,
    flex: 1,
    width: "100%",
    height: 844,
    overflow: "hidden",
  },
});

export default HomePageExistingUser;
