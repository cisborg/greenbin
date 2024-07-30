import * as React from "react";
import { StyleSheet, View, Text, Pressable, Button } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { ProgressBar } from "react-native-web";


const ProfilePage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.profileSectionTitle}>Your Profile</Text>

        <Image
          style={styles.profileImg}
          source={require("../assets/profile-img.png")}
        />
       <Text style={styles.greeting}>Hi, Josh Doe</Text>

      </View>

     

      <View style={styles.cardContainer}>
        
        <View style={styles.card} >
         
          <Text style={styles.cardValue}>GCPs: 15300</Text>
        </View>

        <View style={styles.card} >
          <View style={styles.cardRes} >
          <TouchableOpacity activeOpacity={0.3}>
           
            <Image
              style={styles.cardIcon}
              source={require("../assets/stats_2500115.png")}
            />
           <Text style={styles.cardTitle} onPress={()=> navigation.navigate("LeaderBoard")}>LeaderBoard</Text>
          </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.card}>
        <TouchableOpacity activeOpacity={0.3}>
          <Image
            style={styles.cardIcon}
            source={require("../assets/vector4.png")}
          />
          <Text style={styles.cardTitle1}>Security & Privacy</Text>
          </TouchableOpacity>
        </View>
        

        <View style={styles.card}>
          <View style={styles.cardRes}>
            <TouchableOpacity activeOpacity={0.3}>
            
              <Image
            style={styles.userIcon}
            source={require("../assets/user-light.png")}
          />
          <Text style={styles.cardTitle}>Green Connect</Text>

        </TouchableOpacity>
      </View>
        </View>
      </View>
      <Text style={[styles.strongestTopics, styles.topicsTypo]}>
          Strongest Topics
        </Text>
        <View style={styles.ProgressBar}>
        <View style={[styles.rectangleGroup, styles.rectangleParentLayout1]}>
           
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
              <Text style={styles.correct}>Correct</Text>
            </Text>
          </View>
          <View style={[styles.rectangleGroup, styles.rectangleParentLayout1]}>
           
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
             <Text style={styles.correct}>Correct</Text>
           </Text>
         </View>
        
         <View style={[styles.rectangleGroup, styles.rectangleParentLayout1]}>
           
           <Text style={[styles.topicName, styles.topicPosition1]}>
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
             <Text style={styles.correct}>Correct</Text>
           </Text>
         </View>

         </View>
    
    
     
     
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image
          style={styles.backIcon}
          source={require("../assets/image-2.png")}
        />
      </Pressable>

      <Pressable style={styles.signOutButton} onPress={() => navigation.navigate("ProfileGCPs")}>
        <Text style={styles.signOutText}>Sign Out?</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhitesmoke,
    padding: 20,
    width: 393,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 25,
    borderRadius: 25,
    elevation: 3,
    shadowColor: Color.colorGray_100,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    width: 375,


  },
  greeting: {
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.poppinsBold,
    color: Color.colorLimegreen_100,
    marginTop: 8,
  },
  ProgressBar: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 35,
    borderRadius: 22,
    elevation: 3,
    shadowColor: Color.colorGray_100,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    width: 379,
    
  },
  profileImg: {
    width: 90,
    height: 90,
    borderRadius: 60,
  },
  signOutButton: {
    alignSelf: 'flex-end',
    bottom: 0,
    paddingTop: 30,
  },
  rectangleGroup : {
    flexDirection: 'row',
    alignItems: "flex-wrap",
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
  strongestTopics : {
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 0,
    marginLeft: 2,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.poppinsBold,
    color: Color.colorLimegreen_100,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginTop: 10,
    marginRight: 2,
    width: 373,
    height: 190,
    alignItems: 'center',
    paddingTop: 10,
    alignItems: 'center',
    backgroundColor: Color.colorWhitesmoke,
    borderRadius: 20,
    elevation: 3,
    shadowColor: 'lightGray',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,

  },
  card: {
    backgroundColor: Color.colorLightgray,
    width: '44%', // Responsive width
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    margin: 10,
    padding: 10,
    paddingBottom:20,
    paddingTop:20,
    height: 70,
    marginVertical: 10,
    
    alignItems: 'flex-wrap',
  },
  cardValue: {
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorBlack,

    
    
  },
  rectangleParent: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    paddingLeft: 0,
    left: 0,
},
adjustableProgressBar: {
    height: 10,
    borderRadius: 5,
   
    
    width: 110,
    paddingHorizontal: 25,
    marginTop: 20,
},
progressWrapper: {
    height: 10,
    width: 90,
    borderRadius: 5,
    overflow: 'hidden',
    marginEnd: 20,
    marginTop: 21,
    
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
correct: {
    color: '#666',
},
  cashoutButton: {
    width: '100%',
    borderRadius: 30,
    overflow: 'hidden',
  },
  cardTitle: {
    fontFamily: FontFamily.Helvetica,
    fontWeight: "700",
    textAlign: "center",
    color: Color.colorBlack,
    fontSize: FontSize.size_lg,
    marginBottom: 40,
    
    
  },
  cardTitle1: {
    fontFamily: FontFamily.Helvetica,
    fontWeight: "700",
    textAlign: "center",
    color: Color.colorBlack,
    fontSize: FontSize.size_lg,
    marginBottom: 90,
    paddingTop: 0,
    marginTop: -30,
    marginLeft: 20,
    
    
    
  },
  cardIcon: {
    width: 25,
    height: 25,
  },
  profileSectionTitle: {
    fontSize: FontSize.size_5xl,
    fontFamily: FontFamily.poppinsSemiBold,
    color: "black",
    marginBottom: 0,
    marginVertical: 5,
    alignSelf: "flex-end",
    paddingEnd: 15,
    top: 0,
  },
  userIcon: {
    width: 24,
    height: 24,
    alignSelf: 'flex-start',
    left: 2,
  },
  profilePeopleImg: {
    width: '398',
    height: 100,
    marginTop: 10,
    borderRadius: 20,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 40,
  },
  backIcon: {
    width: 79,
    height: 79,
  },
});

export default ProfilePage;
