import * as React from "react";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";

const LeaderBoard = () => {
  const navigation= useNavigation()
  return (
    <View style={styles.iphone1313Pro1}>

      
      <Pressable onPress={()=> navigation.goBack()}>
      <Image 
        style={styles.evaarrowIosBackFillIcon} 
        contentFit="cover"
        source={require("../assets/arrow_8642990.png")}
      />
      </Pressable>
 
      <Text style={styles.leaderboard}> Leaderboard</Text>
      <Image
        style={styles.ellipseIcon1}
        contentFit="cover"
        source={require("../assets/notifcationIcon.webp")}
      />
      <View style={styles.iphone1313Pro1Child} />
      <View style={styles.iphone1313Pro1Item} />
      <View style={styles.iphone1313Pro1Inner} />
      <Text style={[styles.region, styles.eidenTypo]}>Region</Text>
      <Text style={[styles.emmaAria, styles.textTypo2]}>Emma Aria</Text>
      <Text style={[styles.eiden, styles.textTypo2]}>Eiden</Text>
      <Text style={[styles.jackson, styles.textTypo2]}>Jackson</Text>
      <Text style={[styles.username, styles.usernameTypo1]}>@username</Text>
      <Text style={[styles.username1, styles.usernameTypo1]}>@username</Text>
      <Text style={[styles.username2, styles.usernameTypo1]}>@username</Text>
      <Text style={[styles.text, styles.textTypo]}>1674</Text>
      <Text style={[styles.text1, styles.textTypo]}>1847</Text>
      <Text style={[styles.text2, styles.textTypo]}>2430</Text>
      <Text style={[styles.national, styles.eidenTypo]}>National</Text>
      <Text style={[styles.global, styles.eidenTypo]}>Global</Text>
      <View style={styles.rectangleView} />
      <View style={styles.iphone1313Pro1Child1} />
      <Image
        style={styles.ellipseIcon}
        contentFit="cover"
        source={require("../assets/profileluke.avif")}
      />
      <Image
        style={[styles.iphone1313Pro1Child2, styles.iphone1313ChildLayout6]}
        contentFit="cover"
        source={require("../assets/women.avif")}
      />
      <Image
        style={[styles.iphone1313Pro1Child3, styles.iphone1313ChildLayout5]}
        contentFit="cover"
        source={require("../assets/anotherMan.avif")}
      />
      <Image
        style={[styles.iphone1313Pro1Child4, styles.iphone1313ChildLayout5]}
        contentFit="cover"
        source={require("../assets/anotherMan.avif")}
      />
      <Image
        style={[styles.iphone1313Pro1Child5, styles.iphone1313ChildLayout5]}
        contentFit="cover"
        source={require("../assets/anotherWoman.avif")}
      />
      <Image
        style={[styles.iphone1313Pro1Child6, styles.iphone1313ChildLayout5]}
        contentFit="cover"
        source={require("../assets/man.avif")}
      />
      <Image
        style={[styles.iphone1313Pro1Child7, styles.iphone1313ChildLayout5]}
        contentFit="cover"
        source={require("../assets/anotherWoman.avif")}
      />
      <Image
        style={[styles.iphone1313Pro1Child8, styles.iphone1313ChildLayout6]}
        contentFit="cover"
        source={require("../assets/anotherMan.avif")}
      />
      <Image
        style={styles.groupIcon}
        contentFit="cover"
        source={require("../assets/kingIcon.jpg")}
      />
      <View
        style={[styles.iphone1313Pro1Child9, styles.iphone1313ChildLayout4]}
      />
      <View
        style={[styles.iphone1313Pro1Child10, styles.iphone1313ChildLayout4]}
      />
      <View
        style={[styles.iphone1313Pro1Child11, styles.iphone1313ChildLayout4]}
      />
      <Text style={[styles.text3, styles.textTypo1]}>2</Text>
      <Text style={[styles.text4, styles.textTypo1]}>1</Text>
      <Text style={[styles.text5, styles.textTypo1]}>3</Text>
      <Text style={[styles.sebastian, styles.jasonTypo]}>Sebastian</Text>
      <Text style={[styles.jason, styles.jasonTypo]}>Jason</Text>
      <Text style={[styles.natalie, styles.jasonTypo]}>Natalie</Text>
      <Text style={[styles.serenity, styles.jasonTypo]}>Serenity</Text>
      <Text style={[styles.hannah, styles.textTypo2]}>Hannah</Text>
      <Text style={[styles.text6, styles.textTypo]}>1124</Text>
      <Text style={[styles.text7, styles.textTypo]}>875</Text>
      <Text style={[styles.text8, styles.textTypo]}>774</Text>
      <Text style={[styles.text9, styles.textTypo]}>723</Text>
      <Text style={[styles.text10, styles.textTypo]}>559</Text>
      <Text style={[styles.username3, styles.usernameTypo]}>@username</Text>
      <Text style={[styles.username4, styles.usernameTypo]}>@username</Text>
      <Text style={[styles.username5, styles.usernameTypo]}>@username</Text>
      <Text style={[styles.username6, styles.usernameTypo]}>@username</Text>
      <Text style={[styles.username7, styles.usernameTypo1]}>@username</Text>
      <Image
        style={[styles.polygonIcon, styles.iphone1313ChildLayout2]}
        contentFit="cover"
        source={require("../assets/uparrow.png")}
      />
      <Image
        style={[styles.iphone1313Pro1Child12, styles.iphone1313ChildLayout2]}
        contentFit="cover"
        source={require("../assets/redarrow.png")}
      />
      <Image
        style={[styles.iphone1313Pro1Child13, styles.iphone1313ChildLayout2]}
        contentFit="cover"
        source={require("../assets/uparrow.png")}
      />
      <Image
        style={[styles.iphone1313Pro1Child14, styles.iphone1313ChildLayout2]}
        contentFit="cover"
        source={require("../assets/uparrow.png")}
      />
      <Image
        style={[styles.iphone1313Pro1Child15, styles.iphone1313ChildLayout2]}
        contentFit="cover"
        source={require("../assets/redarrow.png")}
      />
      <View style={[styles.lineView, styles.iphone1313ChildLayout]} />
      <View
        style={[styles.iphone1313Pro1Child16, styles.iphone1313ChildLayout]}
      />
      <View
        style={[styles.iphone1313Pro1Child17, styles.iphone1313ChildLayout]}
      />
      <View
        style={[styles.iphone1313Pro1Child18, styles.iphone1313ChildLayout]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  eidenTypo: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "500",
    textAlign: "left",
    position: "absolute",
  },
  textTypo2: {
    fontSize: FontSize.size_xs,
    color: Color.colorWhite,
  },
  usernameTypo1: {
    color: Color.colorDarkgray,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "200",
    fontSize: FontSize.size_5xs,
    textAlign: "left",
    position: "absolute",
    marginLeft: 0,
  },
  textTypo: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "700",
    textAlign: "left",
    position: "absolute",
  },
  iphone1313ChildLayout6: {
    height: 68,
    width: 68,
    position: "absolute",
    borderRadius: 50,
  },
  iphone1313ChildLayout5: {
    width: 50,
    height: 50,
    position: "absolute",
  },
  ellipseIcon1: {
    top: 20,
    left: 360,
    width: 35,
    height: 35,
    position: "absolute",
    overflow: "hidden",
  },
  iphone1313ChildLayout4: {
    transform: [
      {
        rotate: "45deg",
      },
    ],
    height: 17,
    width: 17,
    borderRadius: Border.br_8xs,
    position: "absolute",
  },
  textTypo1: {
    fontSize: FontSize.size_5xs,
    textAlign: "left",
    color: Color.colorWhite,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    position: "absolute",
  },
  jasonTypo: {
    left: 94,
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    textAlign: "left",
    color: Color.colorWhite,
    position: "absolute",
  },
  usernameTypo: {
    left: 96,
    color: Color.colorDarkgray,
    fontFamily: FontFamily.interLight,
    fontWeight: "300",
    fontSize: FontSize.size_5xs,
    textAlign: "left",
    position: "absolute",
  },
  iphone1313ChildLayout2: {
    height: 7,
    width: 9,
    position: "absolute",
  },
  iphone1313ChildLayout: {
    height: 1,
    width: 335,
    borderTopWidth: 1,
    borderColor: Color.colorDimgray,
    borderStyle: "solid",
    position: "absolute",
  },
  entypodotsTwoHorizontalIcon: {
    top: 15,
    width: 32,
    height: 32,
    left: 341,
    position: "absolute",
    overflow: "hidden",
  },
  evaarrowIosBackFillIcon: {
    top: 20,
    left: 14,
    width: 35,
    height: 35,
    position: "absolute",
    overflow: "hidden",
  },
  leaderboard: {
    top: 28,
    left: 133,
    fontSize: 20,
    textAlign: "center",
    color: Color.colorLimegreen_200,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "600",
    position: "absolute",
  },
  iphone1313Pro1Child: {
    top: 95,
    left: 24,
    height: 50,
    width: 360,
    backgroundColor: Color.colorWhitesmoke,
    borderRadius: 20,
    position: "absolute",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
  },
  iphone1313Pro1Item: {
    top: 293,
    height: 113,
    left: 27,
    width: 342,
    borderRadius: "25",
    backgroundColor: "lightgray",
    position: "absolute",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 3,
  },
  iphone1313Pro1Inner: {
    top: 247,
    left: 137,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "lightgray",
    width: 122,
    height: 159,
    position: "absolute",
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 3,
  },
  region: {
    fontSize: FontSize.size_mini,
    left: 48,
    top: 111,
    fontWeight: "500",
    color: Color.colorBlack,
  },
  emmaAria: {
    top: 333,
    left: 280,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "500",
    textAlign: "left",
    position: "absolute",
  },
  eiden: {
    left: 182,
    top: 304,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "500",
    textAlign: "left",
    position: "absolute",
  },
  jackson: {
    top: 336,
    left: 58,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "500",
    textAlign: "left",
    position: "absolute",
  },
  username: {
    top: 379,
    color: Color.colorDarkgray,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "300",
    left: 40,
  },
  username1: {
    top: 362,
    left: 148,
  },
  username2: {
    left: 266,
    top: 379,
    color: Color.colorDarkgray,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "200",
  },
  text: {
    top: 356,
    left: 296,
    color: Color.colorLimegreen_100,
    fontSize: FontSize.size_mini,
  },
  text1: {
    top: 357,
    left: 64,
    color: "red",
    fontSize: FontSize.size_mini,
  },
  text2: {
    top: 332,
    left: 178,
    color: "orange",
    fontSize: FontSize.size_mini,
  },
  national: {
    left: 165,
    fontSize: FontSize.size_mini,
    top: 111,
    fontWeight: "500",
    color: Color.colorBlack,
  },
  global: {
    left: 292,
    fontSize: FontSize.size_mini,
    top: 111,
    fontWeight: "500",
    color: Color.colorBlack,
  },
  rectangleView: {
    top: 142,
    borderRadius: 10,
    backgroundColor: "lightgray",
    width: 45,
    height: 3,
    left: 48,
    position: "absolute",
  },
  iphone1313Pro1Child1: {
    top: 434,
    left: 0,
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23,
    width: 390,
    height: 410,
    backgroundColor: Color.colorWhitesmoke,
    position: "absolute",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 3,
  },
  ellipseIcon: {
    top: 196,
    left: 157,
    width: 82,
    height: 82,
    position: "absolute",
    borderRadius: 50,
    borderLeftColor:'green',
  },
  iphone1313Pro1Child2: {
    top: 251,
    left: 48,
    borderRadius: 50,
  },
  iphone1313Pro1Child3: {
    top: 462,
    left: 23,
    width: 50,
    borderRadius: 50,
  },
  iphone1313Pro1Child4: {
    top: 544,
    left: 23,
    width: 50,
    borderRadius: 50, 
  },
  iphone1313Pro1Child5: {
    top: 626,
    left: 23,
    width: 50,
    borderRadius: 50,
  },
  iphone1313Pro1Child6: {
    top: 708,
    left: 23,
    width: 50,
    borderRadius: 50,
  },
  iphone1313Pro1Child7: {
    top: 790,
    left: 19,
    width: 50,
    borderRadius: 50,
  },
  iphone1313Pro1Child8: {
    top: 249,
    left: 280,
    width: 50,
    borderRadius: 50,
  },
  groupIcon: {
    height: "3.18%",
    width: "3.18%",
    top: 165,
  
    bottom: "77.27%",
    left: 182,
   
 
    position: "relative",
    overflow: "hidden",

  },
  iphone1313Pro1Child9: {
    top: 305,
    left: 82,
    backgroundColor: Color.colorDeepskyblue,
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  iphone1313Pro1Child10: {
    top: 264,
    left: 198,
    backgroundColor: Color.colorOrange,
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  iphone1313Pro1Child11: {
    left: 315,
    backgroundColor: Color.colorSpringgreen,
    top: 304,
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  text3: {
    top: 312,
    left: 80,
    color:'red',
    paddingTop: 7,
  },
  text4: {
    top: 271,
    left: 196,
    color:'red',
    paddingTop: 10,
  },
  text5: {
    top: 311,
    left: 312,
    color:'green',
    paddingTop: 7,
  },
  sebastian: {
    top: 469,
    left: 28,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "500",
    textAlign: "left",
    color: 'black',
    position: "absolute",
  },
  jason: {
    top: 551,
    left: 28,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "500",
    textAlign: "left",
    color: 'black',
  },
  natalie: {
    top: 633,
    left: 28,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "500",
    textAlign: "left",
    color: 'black',
  },
  serenity: {
    top: 715,
    left: 28,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "500",
    textAlign: "left",
    color: 'black',
  },
  hannah: {
    top: 797,
    left: 90,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "500",
    textAlign: "left",

    position: "absolute",
    color : "black"
  },
  text6: {
    top: 472,
    left: 334,
    fontSize: FontSize.size_xs,
    color: Color.colorLimegreen_200,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "500",
  },
  text7: {
    top: 554,
    fontSize: FontSize.size_xs,
    color: Color.colorLimegreen_200,
    left: 341,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "500",
  },
  text8: {
    top: 637,
    left: 340,
    fontSize: FontSize.size_xs,
    color: Color.colorLimegreen_200,
  },
  text9: {
    top: 718,
    fontSize: FontSize.size_xs,
    color: Color.colorLimegreen_200,
    left: 341,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "500",
  },
  text10: {
    top: 800,
    left: 338,
    fontSize: FontSize.size_xs,
    color: "red",
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "500",
  },
  username3: {
    top: 490,
  },
  username4: {
    top: 572,
  },
  username5: {
    top: 654,
  },
  username6: {
    top: 736,
  },
  username7: {
    top: 818,
    left: 92,
  },
  polygonIcon: {
    top: 493,
    left: 355,
    height: 7,
    width: 11,
  },
  iphone1313Pro1Child12: {
    top: 575,
    left: 355,
    height: 7,
    width: 9,

  },
  iphone1313Pro1Child13: {
    top: 657,
    left: 355,
    height: 7,
    width: 9,
    
  },
  iphone1313Pro1Child14: {
    top: 739,
    left: 355,
    height: 7,
    width: 9,
  },
  iphone1313Pro1Child15: {
    top: 821,
    left: 351,
  },
  lineView: {
    top: 527,
    left: 26,
    height: 1,
    width: 335,
    borderTopWidth: 1,
    borderColor: Color.colorDimgray,
    borderStyle: "solid",
  },
  iphone1313Pro1Child16: {
    top: 610,
    left: 26,
    height: 1,
    width: 335,
    borderTopWidth: 1,
    borderColor: Color.colorDimgray,
    borderStyle: "solid",
  },
  iphone1313Pro1Child17: {
    top: 691,
    left: 26,
    height: 1,
    width: 335,
    borderTopWidth: 1,
    borderColor: Color.colorDimgray,
    borderStyle: "solid",
  },
  iphone1313Pro1Child18: {
    top: 774,
    left: 27,
  },
  iphone1313Pro1: {
    backgroundColor: "white",
    flex: 1,
    width: "400",
    height: 844,
    overflow: "hidden",
  },
});

export default LeaderBoard;



