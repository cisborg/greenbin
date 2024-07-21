import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { FontFamily, Border, Color, FontSize } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/core";

const ChallengePage = () => {
  const navigation = useNavigation()
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
      
      <Image
        style={[styles.menuBarIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/menu-bar.png")}
      />
      <View style={styles.completedChallengeFrame}>
        <View style={[styles.challengeBox1, styles.challengeLayout]}>
          <View
            style={[styles.challengeBox1Child, styles.challengeChildLayout]}
          />
          <Text style={[styles.walkAMile, styles.walkAMileTypo]}>{`Purchased Green Bags`}</Text>
          <Image
            style={styles.favoriteIcon}
            contentFit="cover"
            source={require("../assets/favorite.png")}
          />
          <Image
            style={[styles.challengeBox1Item, styles.challengeItemPosition]}
            contentFit="cover"
            source={require("../assets/line-6.png")}
          />
          <Text style={[styles.completedYesterday, styles.completedTypo]}>
            <Text style={styles.completedTypo1}>{`Completed: 
`}</Text>
            <Text style={styles.yesterday}>Yesterday</Text>
          </Text>
        </View>
        <View style={[styles.challengeBox3, styles.challengeLayout]}>
          <View
            style={[styles.challengeBox1Child, styles.challengeChildLayout]}
          />
          <Text style={[styles.walkAMile, styles.walkAMileTypo]}>{`Walked
2 Miles`}</Text>
          <Image
            style={styles.favoriteIcon}
            contentFit="cover"
            source={require("../assets/favorite.png")}
          />
          <Image
            style={[styles.challengeBox1Item, styles.challengeItemPosition]}
            contentFit="cover"
            source={require("../assets/line-6.png")}
          />
          <Text style={[styles.completedYesterday, styles.completedTypo]}>
            <Text style={styles.completedTypo1}>{`Completed: 
`}</Text>
            <Text style={styles.yesterday}>14th August</Text>
          </Text>
        </View>
        <View style={[styles.challengeBox2, styles.challengeLayout]}>
          <View
            style={[styles.challengeBox2Child, styles.challengeChildLayout]}
          />
          <Text style={[styles.water5Random, styles.plant5TreesTypo]}>
            Planted 5 Random Plants/Trees
          </Text>
          <Image
            style={styles.image1Icon}
            contentFit="cover"
            source={require("../assets/image-1.png")}
          />
          <Image
            style={[styles.challengeBox2Item, styles.challengeItemPosition]}
            contentFit="cover"
            source={require("../assets/line-6.png")}
          />
          <Text style={[styles.completed2, styles.startTypo]}>Completed</Text>
        </View>
        
      </View>
      <Text style={[styles.completedChallenges, styles.challengesTypo]}>
        Completed challenges:
      </Text>
      <View style={[styles.weeklyChallengeFrame, styles.challengeLayout]}>
        <View style={[styles.challengeBox11, styles.challengeLayout]}>
          <View
            style={[styles.challengeBox2Child, styles.challengeChildLayout]}
          />
          <Text style={[styles.plant5Trees, styles.plant5TreesTypo]}>{`Purchase 5 
trees or plants`}</Text>
          <Image
            style={styles.image1Icon}
            contentFit="cover"
            source={require("../assets/image-1.png")}
          />
          <View style={[styles.videoFillParent, styles.parentPosition]}>
            <Image
              style={[styles.videoFillIcon, styles.startedPosition]}
              contentFit="cover"
              source={require("../assets/video-fill.png")}
            />
            <Text style={[styles.start, styles.startTypo]}>START</Text>
            <Image
              style={[styles.groupChild, styles.challengeItemPosition]}
              contentFit="cover"
              source={require("../assets/line-6.png")}
            />
          </View>
        </View>
        <View style={[styles.challengeBox2, styles.challengeLayout]}>
          <View
            style={[styles.challengeBox2Inner, styles.challengeChildLayout]}
          />
          <Text
            style={[styles.plant5Trees, styles.plant5TreesTypo]}
          >{`Order Bike for Green
Health`}</Text>
          <Image
            style={styles.rainIcon}
            contentFit="cover"
            source={require("../assets/rain1.png")}
          />
          <View style={[styles.lineParent, styles.parentPosition]}>
            <View style={[styles.groupItem, styles.groupItemLayout]} />
            <Text style={[styles.started, styles.startedPosition]}>
              PENDING
            </Text>
          </View>
        </View>
        <View style={[styles.challengeBox31, styles.challengeLayout]}>
          <View
            style={[styles.challengeBox3Inner, styles.challengeChildLayout]}
          />
          <Text style={[styles.plant5Trees, styles.plant5TreesTypo]}>{`Purchase 
Renewable Bags`}</Text>
          <Image
            style={styles.circleLeftIcon}
            contentFit="cover"
            source={require("../assets/circle-left1.png")}
          />
          <View style={[styles.lineParent, styles.parentPosition]}>
            <View style={[styles.groupItem, styles.groupItemLayout]} />
            <Text style={[styles.started, styles.startedPosition]}>
              PENDING
            </Text>
          </View>
        </View>
      </View>
      <Text style={[styles.thisWeeksChallenges, styles.parentPosition]}>
        Challenges Category:
      </Text>
      <View style={[styles.noteMessage, styles.noteLayout]}>
        <View style={[styles.noteMessageChild, styles.noteLayout]} />
        <Text style={[styles.tipOfTheContainer, styles.parentPosition]}>
          <Text style={styles.textTypo}>Tip Of The Day</Text>
          <Text style={styles.completedTypo1}>: Reduce. Reuse. Recycle.</Text>
        </Text>
      </View>
      
        <Text style={styles.challenges} onPress={() => navigation.navigate('ProfilePage')}
       > Challenges!</Text> 
     
        <View style={[styles.challengePageChild, styles.groupItemLayout]} />
     
    </View>
  );
};

const styles = StyleSheet.create({
  vectorIconLayout: {
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  textTypo: {
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
  },
  iconLayout: {
    height: 74,
    position: "absolute",
  },
  challengeLayout: {
    height: 203,
    position: "absolute",
  },
  challengeChildLayout: {
    borderRadius: Border.br_base,
    height: 203,
    width: 119,
    left: 0,
    top: 0,
    position: "absolute",
  },
  walkAMileTypo: {
    height: 55,
    color: Color.colorWhite,
    fontSize: FontSize.size_lg,
    left: 11,
    width: 101,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    textAlign: "center",
    position: "absolute",
  },
  challengeItemPosition: {
    width: 118,
    left: 0,
    position: "absolute",
  },
  completedTypo: {
    width: 108,
    fontSize: FontSize.size_base,
    color: Color.colorWhite,
    textAlign: "center",
    position: "absolute",
  },
  plant5TreesTypo: {
    height: 83,
    top: 95,
    fontSize: FontSize.size_base,
    color: Color.colorWhite,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    textAlign: "center",
    position: "absolute",
  },
  startTypo: {
    fontSize: FontSize.size_base,
    color: Color.colorWhite,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    textAlign: "center",
  },
  challengesTypo: {
    height: 35,
    width: 325,
    fontSize: FontSize.size_5xl,
    color: Color.colorGray_800,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    textAlign: "center",
  },
  parentPosition: {
    left: 1,
    position: "absolute",
  },
  startedPosition: {
    top: 3,
    position: "absolute",
  },
  groupItemLayout: {
    height: 1,
    borderTopWidth: 1,
    borderStyle: "solid",
    position: "absolute",
  },
  noteLayout: {
    height: 57,
    width: 359,
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
    maxHeight: "100%",
  },
  vectorIcon: {
    height: "42.86%",
    width: "6.2%",
    top: "46.43%",
    right: "0%",
    bottom: "10.71%",
    left: "93.8%",
    maxHeight: "100%",
  },
  vectorIcon1: {
    height: "60.71%",
    width: "6.48%",
    top: "35.71%",
    right: "7.61%",
    bottom: "3.57%",
    left: "85.92%",
    maxHeight: "100%",
  },
  vectorIcon2: {
    height: "67.86%",
    width: "5.63%",
    top: "32.14%",
    right: "16.06%",
    bottom: "0%",
    left: "78.31%",
    maxHeight: "100%",
  },
  text: {
    top: "42.86%",
    left: "0%",
    fontSize: FontSize.size_sm,
    color: Color.colorBlack,
    textAlign: "center",
    position: "absolute",
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
    width: 390,
    left: 0,
  },
  challengeBox1Child: {
    backgroundColor: Color.colorCrimson,
  },
  walkAMile: {
    top: 78,
  },
  favoriteIcon: {
    top: 19,
    left: 33,
    width: 53,
    height: 53,
    position: "absolute",
  },
  challengeBox1Item: {
    top: 145,
    maxHeight: "100%",
  },
  completedTypo1: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
  },
  yesterday: {
    fontFamily: FontFamily.poppinsRegular,
  },
  completedYesterday: {
    top: 151,
    left: 6,
  },
  challengeBox1: {
    width: 110,
    top: 1,
    height: 203,
    left: 0,
  },
  challengeBox3: {
    left: 285,
    width: 100,
    top: 1,
    height: 203,
  },
  challengeBox2Child: {
    backgroundColor: Color.colorDarkolivegreen,
  },
  water5Random: {
    width: 110,
    left: 0,
  },
  image1Icon: {
    top: 10,
    left: 24,
    width: 71,
    height: 81,
    position: "absolute",
  },
  challengeBox2Item: {
    top: 169,
    maxHeight: "100%",
  },
  completed2: {
    top: 172,
    left: 14,
    position: "absolute",
  },
  challengeBox2: {
    left: 141,
    width: 110,
    top: 0,
  },
  challengeBox4Child: {
    backgroundColor: "#b913d4",
  },
  makeDrywetDustbins: {
    top: 80,
  },
  challengeBox4Item: {
    top: 165,
    height: 0,
  },
  completed3: {
    top: 170,
    left: 5,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
  },
  delAltFillIcon: {
    top: 9,
    width: 74,
    left: 23,
  },
  
  
  completedChallengeFrame: {
    top: 460,
    height: 204,
    width: 357,
    left: 17,
    position: "absolute",
  },
  completedChallenges: {
    left: 26,
    top: 403,
    position: "absolute",
  },
  plant5Trees: {
    left: 9,
    width: 101,
    top: 95,
  },
  videoFillIcon: {
    width: 26,
    height: 26,
    left: 17,
  },
  start: {
    top: 4,
    left: 46,
    position: "absolute",
  },
  groupChild: {
    top: 0,
    maxHeight: "100%",
  },
  videoFillParent: {
    height: 29,
    top: 171,
    left: 1,
    width: 118,
  },
  challengeBox11: {
    width: 119,
    left: 0,
    top: 0,
  },
  challengeBox2Inner: {
    backgroundColor: "#1b32ab",
  },
  rainIcon: {
    top: 16,
    left: 20,
    width: 75,
    height: 75,
    position: "absolute",
  },
  groupItem: {
    borderColor: Color.colorWhite,
    width: 119,
    left: 0,
    top: 0,
  },
  started: {
    left: 23,
    fontSize: FontSize.size_base,
    color: Color.colorWhite,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    textAlign: "center",
  },
  lineParent: {
    height: 27,
    top: 171,
    left: 1,
    width: 118,
  },
  challengeBox3Inner: {
    backgroundColor: "#70841f",
  },
  circleLeftIcon: {
    top: 20,
    left: 27,
    width: 67,
    height: 67,
    position: "absolute",
  },
  challengeBox31: {
    left: 284,
    width: 119,
    top: 0,
  },
  weeklyChallengeFrame: {
    top: 177,
    left: 16,
    width: 357,
  },
  thisWeeksChallenges: {
    top: 129,
    height: 35,
    width: 325,
    fontSize: FontSize.size_5xl,
    color: Color.colorGray_800,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    textAlign: "center",
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
  tipOfTheContainer: {
    top: 15,
    fontSize: 17,
    color: Color.colorGray_700,
    width: 354,
    height: 25,
    textAlign: "center",
  },
  noteMessage: {
    top: 699,
    left: 17,
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
  challengePageChild: {
    left: 35,
    borderColor: "#afa5a5",
    width: 328,
    top: 403,
  },
  challengePage: {
    backgroundColor: Color.colorWhitesmoke,
    flex: 1,
    width: "100%",
    height: 844,
    overflow: "hidden",
  },
});

export default ChallengePage;
