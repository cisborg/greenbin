import * as React from "react";
import { StyleSheet, View, Text, Pressable, Button } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize } from "../GlobalStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const ProfilePage = () => {
  const navigation = useNavigation();
  const username = "Josh"
  const cash = 1400

  return (
    <View style={styles.container}>
      <View style={styles.header}>
    
        <Image
          style={styles.profileImg}
          source={require("../assets/profile-img.png")}
        />
       <Text style={styles.greeting}>Hi, {username} </Text>
       <Text style={styles.greeting1}>You are an ecoWarrior and Green Economist!</Text>


      </View>

     

      <View style={styles.cardContainer}>
  <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("ProfileGCPs", { name: username, bal: cash})}>
  <Image
      style={styles.cardIcon}
      source={require("../assets/checked.png")}
    />
    <Text style={styles.cardValue}>#{cash} </Text>
    <Text style={styles.cardValue1}>Transact GCPs</Text>

  </TouchableOpacity>

  <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Happy")}>
    <Image
      style={styles.cardIcon}
      source={require("../assets/stats_2500115.png")}
    />
   <Text style={styles.cardTitle3}>#333</Text>

    <Text style={styles.cardTitle}>LeaderBoard 🏆</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("CarbonCalculator")}>
    <Image
      style={styles.cardIcon}
      source={require("../assets/menu.jpg")}
    />
    <Text style={styles.cardTitle1}>GCPs  Calculator 🔐</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("GreenConnect")}>
    <Image
      style={styles.cardIcon}
      source={require("../assets/electric.png")}
    />
      <Text style={styles.cardTitle}>Connect Green</Text>
      <Text style={styles.cardTitle2}>Today 🪢</Text>


  </TouchableOpacity>
</View>

      <Text style={[styles.strongestTopics, styles.topicsTypo]}>
          Win EcoGreen Promos Now ! 🎉
        </Text>
        <View style={styles.ProgressBar}>
        <View style={[styles.rectangleGroup, styles.rectangleParentLayout1]}>
        <Image source={require('../assets/Treee.png')} contentFit="cover" style={styles.Picture} />

            <Text style={[styles.topicName, styles.topicPosition1]}>
              Tree Planting
            </Text>
            <LinearGradient
              style={[styles.adjustableProgressBar, styles.adjustablePosition]}
              locations={[0, 1]}
              colors={["#ffbf1a", "#ff4080"]}
            />
            <View style={[styles.progressWrapper, styles.progressLayout4]}>
              <LinearGradient
                style={[styles.progress, styles.progressPosition]}
                locations={[0, 1]}
                colors={["#ffbf1a", "white"]}
              />
            </View>
            <Text style={[styles.text11, styles.textPosition]}>
              <Text style={styles.text10}>{`46% `}</Text>
              <Text style={styles.correct}>Achieved!</Text>
            </Text>
          </View>
          <View style={[styles.rectangleGroup, styles.rectangleParentLayout1]}>
          <Image source={require('../assets/refurbished.png')} contentFit="cover" style={styles.Picture} />

           <Text style={[styles.topicName, styles.topicPosition1]}>
             Waste Recycle
           </Text>
           <LinearGradient
             style={[styles.adjustableProgressBar, styles.adjustablePosition]}
             locations={[0, 1]}
             colors={["green", "lightgreen"]}
           />
           <View style={[styles.progressWrapper, styles.progressLayout4]}>
             <LinearGradient
               style={[styles.progress, styles.progressPosition]}
               locations={[0, 1]}
               colors={["lightgreen", "white"]}
             />
           </View>
           <Text style={[styles.text11, styles.textPosition]}>
             <Text style={styles.text10}>{`50% `}</Text>
             <Text style={styles.correct}>Achieved!</Text>
           </Text>
         </View>
        
         <View style={[styles.rectangleGroup, styles.rectangleParentLayout1]}>
          <Image source={require('../assets/greenBin.png')} contentFit="cover" style={styles.Picture1} />
           
           <Text style={[styles.topicName1, styles.topicPosition1]}>
             Green Bins
           </Text>
           <LinearGradient
             style={[styles.adjustableProgressBar, styles.adjustablePosition]}
             locations={[0, 1]}
             colors={["blue", "blue"]}
           />
           <View style={[styles.progressWrapper, styles.progressLayout4]}>
             <LinearGradient
               style={[styles.progress, styles.progressPosition]}
               locations={[0, 1]}
               colors={["lightblue", "white"]}
             />
           </View>
           <Text style={[styles.text11, styles.textPosition]}>
             <Text style={styles.text10}>{`48% `}</Text>
             <Text style={styles.correct}>Achieved!</Text>
           </Text>
         </View>

         </View>
         <View style={styles.bottomContainer}>
          <View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ProfileSettings")}>
              <MaterialCommunityIcons name="account-edit-outline" size={24} color="green" />
              <Text style={styles.buttonText2}> Profile Settings </Text>
              <FontAwesome6 name="arrow-up-from-bracket" size={20} color="orange" />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ShopLocator")}>
              <MaterialCommunityIcons name="connection" size={20} color="green" marginTop={-10}/>
              <Text style={styles.buttonText}>Connect With Shops</Text>
              <FontAwesome6 name="arrow-up-from-bracket" size={20} color="orange" />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ReferAndEarn")}>
            <MaterialIcons name="connect-without-contact" size={20} color="green" />      
              <Text style={styles.buttonText}>Refer & Earn Gift  🎁</Text>
              <FontAwesome6 name="arrow-up-from-bracket" size={20} color="orange"  />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate("StartPage")}>
              <AntDesign name="logout" size={20} color="green" />
              <Text style={styles.buttonText1}>LogOut</Text>
            </TouchableOpacity>
          </View>
         </View>
        

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 20,
    width: 404,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 25,
    borderRadius: 25,
    elevation: 3,
   
    width: 375,
    height: 150


  },
 greeting : {
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.poppinsBold,
    color: Color.colorLimegreen_200,
    marginTop: 0,
  },
  greeting1 : {
    fontSize: 12,
    fontFamily: FontFamily.poppinsBold,
    marginTop: 0,
    color: Color.colorGray_100,
  },
  ProgressBar: {
    marginTop: 25,
    marginBottom: 35,
    paddingHorizontal: 35,
    borderRadius: 22,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.1,
    width: 378,
    paddingBottom: 18,
    
  },
  profileImg: {
    width: 60,
    height: 60, 
    borderRadius: 60,
    marginTop: -10,
    marginBottom: 10,
    left: 0   
  },
  signOutButton: {
    alignSelf: 'flex-end',
    bottom: 0,
    paddingTop: 30,
  },
  rectangleGroup : {
    flexDirection: 'row',
    alignItems: "flex-start",
    paddingTop: 25,
    left: 0,
  },
  signOutText: {
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorDarkturquoise,
  },
  cardRes : {
    flexDirection: 'row',
    alignItems: 'flex-wrap',

  },
  Picture: {
    height: 40,
    width: 40,
    left: 0,
  },
 
  Picture1: {
    height: 40,
    width: 40,
    left: 0,
    marginRight: 12
  },
  strongestTopics : {
    marginTop: -25,
    marginBottom: -5,
    paddingTop: 10,
    paddingBottom: 0,
    marginLeft: 2,
    fontSize: 17,
    fontFamily: FontFamily.poppinsBold,
    color: Color.colorLimegreen_100,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginTop: -10,
    marginRight: 2,
    width: 404,
    height: 190,
    alignItems: 'center',
    paddingTop: 10,
    alignItems: 'center',
    backgroundColor: Color.colorWhite,
    borderRadius: 22,
    elevation: 3,
   
    width: 378

  },
  card: {
    
    width: 150, // Responsive width
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    margin: 10,
    padding: 10,
    paddingBottom:20,
    paddingTop:20,
    height: 70,
    marginVertical: 10,
    
    alignItems: 'flex-wrap',
  },
  cardValue: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorLimegreen_200,
    fontWeight: '580',
    fontFamily: FontFamily.Helvetica,
    marginTop: -30,
    left: 38

  },
  cardValue1: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorCrimson,
    fontWeight: '580',
    fontFamily: FontFamily.Helvetica,
    marginTop: 5,
    left: 38    
  },
  rectangleParent: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
},
rectangleIcon: {
    width: 393,
    height: 100,
    borderRadius: 10, 
    marginBottom: 10,
},
topicName: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: -20,
    paddingLeft: 0,
    left: 35,
    alignItems: 'flex-start',
    
    
},
buttonText: {
  fontSize: FontSize.size_sm,
  fontFamily: FontFamily.poppinsSemiBold,
  color: Color.colorBlack,
  fontWeight: '580',
  fontFamily: FontFamily.Helvetica,
  marginTop: 0,
  marginLeft:35,
  marginRight: 145

},
buttonText1: {
  fontSize: FontSize.size_sm,
  fontFamily: FontFamily.poppinsSemiBold,
  color: Color.colorBlack,
  fontWeight: '580',
  fontFamily: FontFamily.Helvetica,
  marginTop: 0,
  marginLeft:20

},
buttonText2: {
  fontSize: FontSize.size_sm,
  fontFamily: FontFamily.poppinsSemiBold,
  color: Color.colorBlack,
  fontWeight: '580',
  fontFamily: FontFamily.Helvetica,
  marginTop: 0,
  marginLeft:29,
  marginRight: 170

},
topicName1: {
  fontSize: 14,
  fontWeight: '600',
  marginTop: -20,
  paddingLeft: 0,
  left: 23,
},
adjustableProgressBar: {
    height: 10,
    borderRadius: 5,
    width: 110,
    paddingHorizontal: 25,
    marginTop: 20,
    marginLeft: -25
},
progressWrapper: {
    height: 10,
    width: 90,
    borderRadius: 5,
    overflow: 'hidden',
    marginEnd: 20,
    marginTop: 21,
    marginLeft: 0
    
},
progress: {
    height: '100%',
    borderRadius: 5,
},
text9: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
},
text10: {
    fontWeight: 'bold',
    color: '#ff4080',
},
button: {
    width: 380, // Responsive width
    borderRadius: 10,
    elevation: 3,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    padding: 10,
    paddingBottom:20,
    paddingTop:20,
    height: 25,
    marginLeft: -5,
    marginVertical: 10,
},
button1: {
  width: 200, // Responsive width
  borderRadius: 10,
  borderStyle: 'solid',
  borderColor: 'green',
  elevation: 3,
  flexDirection: 'row',
  shadowColor: '#000',
  shadowOffset: { width: 1, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 6,
  marginBottom: 10,
  marginTop: 20,
  alignItems: 'center',
  justifyContent: 'center',
  padding: 10,
  paddingBottom:20,
  paddingTop:20,
  height: 25,
  marginVertical: 10,
  left: 100
},
correct: {
    color: Color.colorLimegreen_200,
    marginLeft: -12
},
  cashoutButton: {
    width: '100%',
    borderRadius: 30,
    overflow: 'hidden',
  },
  cardTitle: {
    fontFamily: FontFamily.Helvetica,
    fontWeight: "580",
    textAlign: "center",
    color: Color.colorBlack,
    fontSize: FontSize.size_sm,
    marginBottom: 30,
    marginLeft: 30,
    marginTop: -30,
  },
  cardTitle3: {
    fontFamily: FontFamily.Helvetica,
    fontWeight: "500",
    textAlign: "center",
    color: Color.colorLimegreen_200,
    fontSize: FontSize.size_sm,
    marginBottom: 30,
    marginLeft: 15,
    marginTop: -30,
  },
  cardTitle2: {
    fontFamily: FontFamily.Helvetica,
    fontWeight: "550",
    textAlign: "center",
    color: Color.colorLimegreen_200,
    fontSize: FontSize.size_sm,
    marginBottom: 30,
    marginLeft: 30,
    marginTop: -25,
  },
  cardTitle1: {
    fontFamily: FontFamily.Helvetica,
    fontWeight: "550",
    textAlign: "center",
    color: Color.colorBlack,
    fontSize: FontSize.size_sm,
    marginBottom: 50,
    marginLeft: 10,
    paddingLeft: 15,
    marginTop: -30
  },
  cardIcon: {
    width: 25,
    height: 25,
    borderRadius: 8
  },

 
});

export default ProfilePage;