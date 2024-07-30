import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { FontFamily, Border, Color, FontSize } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/core";
import { ScrollView } from "react-native-gesture-handler";

const ChallengePage = () => {
  const navigation = useNavigation();

  const challenges = [
    {
      id: '1',
      title: 'Purchase Smart Device',
      status: 'Start',
      image: require("../assets/image-1.png"),
      color: Color.colorDarkolivegreen,
    },
    {
      id: '2',
      title: 'Order Bike for Green Health',
      status: 'Pending',
      image: require("../assets/rain1.png"),
      color: "#1b32ab",
    },
    {
      id: '3',
      title: 'Purchase Bags',
      status: 'Pending',
      image: require("../assets/circle-left1.png"),
      color: "#70841f",
    },
    {
      id: '4',
      title: 'Purchase Green Bags',
      status: 'Pending',
      image: require("../assets/circle-left1.png"),
      color: "purple",
    },
  ];
  const otherChallenges = [
    {
      id: '1',
      title: 'Purchase Smart Device',
      status: 'Start',
      image: require("../assets/image-1.png"),
      color: Color.colorDarkolivegreen,
    },
    {
      id: '2',
      title: 'Order Bike for Green Health',
      status: 'Pending',
      image: require("../assets/rain1.png"),
      color: "#1b32ab",
    },
    {
      id: '3',
      title: 'Purchase Bags',
      status: 'Pending',
      image: require("../assets/circle-left1.png"),
      color: "#70841f",
    },
    {
      id: '4',
      title: 'Purchase Green Bags',
      status: 'Pending',
      image: require("../assets/circle-left1.png"),
      color: "purple",
    },
  ];

  const completedChallenges = [
    {
      id: '1',
      title: 'Purchased Green Bags',
      date: 'Yesterday',
      image: require("../assets/favorite.png"),
      color: Color.colorCrimson,
    },
    {
      id: '2',
      title: 'Purchased 5 Trees',
      date: 'Now',
      image: require("../assets/favorite.png"),
      color: Color.colorBlack,
    },
    {
      id: '3',
      title: 'Walked 2 Miles',
      date: 'Today',
      image: require("../assets/favorite.png"),
      color: Color.colorDarkcyan,
    },
    {
      id: '4',
      title: 'Hired Bike',
      date: 'Today',
      image: require("../assets/favorite.png"),
      color: Color.colorDarkcyan,
    }
  ];

  const renderChallenges = ({ item }) => (
    <View style={[styles.challengeBox1, { backgroundColor: item.color }]}>
      <Pressable>
        <Text style={styles.walkAMileTypo}>{item.title}</Text>
        <Image style={styles.FavIcon1} contentFit="cover" source={item.image} />
        <Text style={styles.started}>{item.status}</Text>
      </Pressable>
    </View>
  );

  const renderCompleted = ({ item }) => (
    <Pressable>
      <View style={[styles.challengeBox, { backgroundColor: item.color }]}>
        <Text style={styles.walkAMileTypo}>{item.title}</Text>
        <Image style={styles.FavIcon} contentFit="cover" source={item.image} />
        <Text style={styles.started}>{item.date}</Text>
      </View>
    </Pressable>
  );
  const renderCompletes = ({ item }) => (
    <Pressable>
      <View style={[styles.challengeBox2, { backgroundColor: item.color }]}>
        <Text style={styles.walkAMileTypo}>{item.title}</Text>
        <Image style={styles.FavIcon} contentFit="cover" source={item.image} />
        <Text style={styles.started}>{item.date}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.challengePage}>
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

      <Text style={styles.thisWeeksChallenges}>Explore New Challenges: </Text>
      <ScrollView style={styles.challengePage1}>
      <FlatList
        data={challenges}
        renderItem={renderChallenges}
        keyExtractor={item => item.id}
        horizontal
        contentContainerStyle={styles.challengeFrame}
        showsVerticalScrollIndicator={true}
        scrollEnabled={true}

      />

      
      <FlatList
        data={otherChallenges}
        renderItem={renderCompletes}
        keyExtractor={item => item.id}
        horizontal
        contentContainerStyle={styles.completedChallengeFrame}
        showsVerticalScrollIndicator={true}
        scrollEnabled={true}
      />
      </ScrollView>
      
      <Text style={styles.completedChallenges}>Completed challenges:</Text>

      <View style={styles.challengePage2}>
        <FlatList
          data={completedChallenges}
          renderItem={renderCompleted}
          keyExtractor={item => item.id}
          horizontal
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.completedChallengeFrame}
          scrollEnabled={true}
          
        />
      </View>
    


      
        <Text style={styles.challenges} onPress={() => navigation.navigate('ProfilePage')}
       > Challenges!</Text> 


      
    </View>
  );
};

const styles = StyleSheet.create({
  challengePage: {
    backgroundColor: Color.colorWhitesmoke,
    flex: 1,
    
    padding: 16,
    width: 450,
  },
  challengePage1: {
    backgroundColor: Color.colorWhitesmoke,
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 40,
    paddingBottom: 50,
    
    
  },
  challengePage2: {
    backgroundColor: Color.colorWhitesmoke,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingBottom: 200,
    marginBottom: 40,
    
    
    
  },
  challengeFrame: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
 
  
  completedChallengeFrame: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  challengeBox: {
    borderRadius: Border.br_base,
    width: 116,
    height: 133,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    overflow: 'hidden',
    
    
  },
  challengeBox1: {
    borderRadius: Border.br_base,
    width: 116,
    height: 133,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    BorderWidth: 1,
    
    
  },
  challengeBox2: {
    borderRadius: Border.br_base,
    width: 116,
    height: 133,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    BorderWidth: 1,
    
    
  },
  walkAMileTypo: {
    color: Color.colorWhite,
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.poppinsSemiBold,
    textAlign: 'center',
    top: 45,
  },
  FavIcon: {
    width: 40,
    height: 40,
    marginTop: 15,
    alignItems: 'center',
    bottom: 48,
    textAlign:"center",
  },
  FavIcon1: {
    width: 40,
    height: 40,
    marginTop: 15,
    alignItems: 'center',
    bottom: 55,
    textAlign:"center",
    left: 31,
  },
 
 
  thisWeeksChallenges: {
    fontSize: FontSize.size_xl,
    color: Color.colorGray_800,
    fontFamily: FontFamily.poppinsSemiBold,
    
    marginVertical: 20,
    marginHorizontal: 20,
    left: 0,
    top: 50,
  },
 
  started: {
    
    fontSize: FontSize.size_lg,
    color: Color.colorWhite,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "300",
    textAlign: "center",
   
  },
  
 
 
  completedTypo1: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
  },
  
  
  completedChallenges: {
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.poppinsSemiBold,
    left: 0,
    bottom: 0,
  },
  challenges: {
    top: 30,
    left: 160,
    fontSize: FontSize.size_9xl,
    width: 300,
    height: 30,
    color: Color.colorLimegreen_100,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    textAlign: "center",
    position: "absolute",
  },
  
});

export default ChallengePage;
