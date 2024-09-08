import * as React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/core";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import AntDesign from '@expo/vector-icons/AntDesign';


const Transactions = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.transfer}>
       
      <View style={[styles.groupParent, styles.groupParentLayout]}>
      
        <View style={[styles.rectangleParent, styles.groupParentLayout]}>
          <View style={[styles.groupChild, styles.groupLayout]} />
          <Text style={[styles.h, styles.hTypo]}>1 day</Text>
        </View>
        <TouchableOpacity>
          <View style={[styles.rectangleGroup, styles.groupParentLayout]}>
            
              <View style={[styles.groupItem, styles.groupBg]} />
              <Text style={[styles.d, styles.hTypo]}>2 days</Text>
            
          </View>
        </TouchableOpacity>
        <View style={[styles.rectangleContainer, styles.groupParentLayout]}>
          <View style={[styles.groupItem, styles.groupBg]} />
          <Text style={[styles.d1, styles.hTypo]}>5 days</Text>
        </View>
        <View style={[styles.groupView, styles.groupParentLayout]}>
          <View style={[styles.groupItem, styles.groupBg]} />
          <Text style={[styles.w, styles.wLayout]}>Week</Text>
        </View>
      </View>
      <View style={styles.Back}>
      <TouchableOpacity>
          <AntDesign name="leftcircle" size={24} color="black" onPress={() => navigation.goBack()} />
        </TouchableOpacity>
      </View>
     
      <Text style={[styles.transfer1, styles.d2Typo]}>Transactions Repository 💰</Text>
      <Text style={[styles.d2, styles.d2Typo]}>2 days</Text>
      
     
      <View style={[styles.transferItem, styles.ellipseIconLayout]} />
      <Text style={[styles.recentActivity, styles.recent]}>Recent Transactions</Text>
      <View style={styles.groupContainer}>
        <View style={[styles.rectangleParent1, styles.rectangleParentLayout1]}>
          <View style={[styles.groupChild1, styles.rectangleParentLayout1]} />
          <Text style={styles.text}>-59</Text>
          <View style={[styles.groupChild2, styles.groupChildLayout2]} />
          <Image
            style={[styles.upRightArrow1Icon, styles.hPosition]}
            contentFit="cover"
            source={require("../assets/sendBu.png")}
          />
          <Text style={styles.jun2022}>12 Sept 2024</Text>
          <View style={[styles.toJinParent, styles.parentGroupPosition]}>
            <Text style={[styles.toJin, styles.toJinTypo]}>To: Jin</Text>
            <Image
              style={[styles.ellipseIcon, styles.ellipseIconLayout]}
              contentFit="cover"
              source={require("../assets/arrow-icon.png")}
            />
            <Text style={[styles.work, styles.workTypo]}>Work</Text>
          </View>
        </View>
        <View style={[styles.rectangleParent2, styles.rectangleParentLayout1]}>
          <View style={[styles.groupChild1, styles.rectangleParentLayout1]} />
          <Text style={[styles.text1, styles.textTypo1]}>+859</Text>
          <View style={[styles.groupParent1, styles.parentGroupPosition]}>
            <Image
              style={[styles.groupIcon, styles.groupChildLayout2]}
              contentFit="cover"
              source={require("../assets/received.webp")}
            />
            <View style={[styles.jun2022Parent, styles.parentPosition]}>
              <Text style={[styles.jun20221, styles.junTypo]}>10 Oct 2024</Text>
              <View style={[styles.fromGoogleParent, styles.parentPosition]}>
                <Text style={[styles.fromGoogle, styles.toJinTypo]}>
                  From Google
                </Text>
                <Image
                  style={[styles.groupChild4, styles.groupChildLayout1]}
                  contentFit="cover"
                  source={require("../assets/arrow-icon.png")}
                />
                <Text style={[styles.salary, styles.workTypo]}> Salary</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.rectangleParent3, styles.rectangleParentLayout1]}>
          <View style={[styles.groupChild1, styles.rectangleParentLayout1]} />
          <Text style={[styles.text2, styles.textTypo1]}>-479</Text>
          <View style={[styles.groupParent2, styles.parentGroupPosition]}>
            <Image
              style={[styles.groupChild6, styles.groupChildLayout2]}
              contentFit="cover"
              source={require("../assets/sendBu.png")}
            />
            <View style={[styles.jun2022Group, styles.jun2022GroupPosition]}>
              <Text style={[styles.jun20222, styles.junTypo]}>7 Sept 2024</Text>
              <View style={[styles.toDavidParent, styles.jun2022GroupPosition]}>
                <Text style={[styles.toDavid, styles.toJinTypo]}>To Michelle </Text>
                <Image
                  style={[styles.groupChild7, styles.groupChildLayout1]}
                  contentFit="cover"
                  source={require("../assets/sendBu.png")}
                />
                <Text style={[styles.work1, styles.workTypo]}>Business</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Image
        style={styles.Echo}
        contentFit="cover"
        source={require("../assets/echo.png")}
      />
      <View style={styles.textParent}>
        <View style={styles.text3}>
          <Text style={styles.generalBalance}>General balance</Text>
          <View style={styles.parent}>
            <Text style={styles.textTypo}>GCPs</Text>
            <Text style={[styles.text5, styles.textTypo]}>1,286.00</Text>
          </View>
        </View>
        <View style={styles.groupParent3}>
          <View style={styles.rectangleParent4}>
            <Image
              style={[styles.rectangleIcon, styles.groupChildLayout]}
              contentFit="cover"
              source={require("../assets/anotherWoman.avif")}
            />
            <Text style={[styles.watson, styles.sendLayout]}>Watson</Text>
            <View style={[styles.groupParent4, styles.sendLayout]}>
              <View style={[styles.rectangleParent5, styles.groupChildLayout]}>
                <View style={[styles.groupChild9, styles.groupChildLayout]} />
                <Image
                  style={styles.send12con}
                  contentFit="cover"
                  source={require("../assets/sendBu.png")}
                />
              </View>
              <Text style={[styles.send, styles.sendLayout]}>Send</Text>
            </View>
          </View>
          <View style={[styles.rectangleParent6, styles.rectangleParentLayout]}>
            <Image
              style={[styles.groupChild10, styles.groupChildLayout]}
              contentFit="cover"
              source={require("../assets/anotherMan.avif")}
            />
            <Text style={[styles.toni, styles.sendTypo]}>Toni</Text>
          </View>
          <View style={[styles.rectangleParent7, styles.rectangleParentLayout]}>
            <Image
              style={[styles.groupChild10, styles.groupChildLayout]}
              contentFit="cover"
              source={require("../assets/man.avif")}
            />
            <Text style={[styles.moni, styles.sendTypo]}>Moni</Text>
          </View>
          <View style={[styles.rectangleParent8, styles.rectangleParentLayout]}>
            <Image
              style={[styles.groupChild10, styles.groupChildLayout]}
              contentFit="cover"
              source={require("../assets/women.avif")}
            />
            <Text style={[styles.sofia, styles.sendTypo]}>Sofia</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  groupParentLayout: {
    height: 36,
    position: "absolute",
  },
  groupLayout: {
    borderWidth: 1,
    borderStyle: "solid",
    width: 79,
    left: 0,
    height: 36,
    position: "absolute",
  },
  hTypo: {
    textAlign: "left",
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: "450",
    fontSize: 12,
    color: Color.colorLimegreen_200,
  },
  Echo : {
    height: 180,
    width: 180,
    top: 190,
    left: 100,
    position: "absolute",
  },
  Back: {
    height: 36,
    width: 36,
    top: 60,
    left: 20,
    position: "absolute",
  },
  groupBg: {
    backgroundColor: Color.colorWhite,
    borderRadius: 14,
    top: 0,
  },
  wLayout: {
    width: 45,
    position: "absolute",
  },
  d2Typo: {
    fontSize: FontSize.size_xl,
    textAlign: "left",
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: "450",
    position: "absolute",
  },
  tabLayout: {
    height: 54,
    width: 179,
    top: 865,
    position: "absolute",
  },
  outline28IconLayout: {
    height: 28,
    width: 28,
  },
  outline28WrapperFlexBox: {
    padding: 20,
    justifyContent: "center",
    width: 90,
    alignItems: "center",
    height: 48,
    flexDirection: "row",
  },
  ellipseIconLayout: {
    height: 3,
    position: "absolute",
  },
  rectangleParentLayout1: {
    height: 66,
    width: 375,
    left: 0,
    position: "absolute",
  },
  groupChildLayout2: {
    height: 37,
    width: 37,
    position: "absolute",
  },
  hPosition: {
    left: 22,
    height: 19,
    position: "absolute",
  },
  parentGroupPosition: {
    top: 9,
    position: "absolute",
  },
  toJinTypo: {
    fontSize: FontSize.size_base,
    height: 26,
    lineHeight: 24,
    textAlign: "left",
    color: Color.white,
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: "600",
    left: 0,
    top: 0,
    position: "absolute",
  },
  workTypo: {
    opacity: 0.6,
    fontFamily: FontFamily.montserratRegular,
    fontSize: FontSize.size_base,
    height: 26,
    lineHeight: 24,
    textAlign: "left",
    color: 'blue',
    top: 0,
    position: "absolute",
  },
  textTypo1: {
    color: Color.colorSpringgreen,
    height: 26,
    textAlign: "right",
    lineHeight: 24,
    fontSize: FontSize.size_xs,
    top: 20,
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: "700",
    position: "absolute",
  },
  parentPosition: {
    width: 171,
    top: 0,
    position: "absolute",
  },
  junTypo: {
    top: 26,
    opacity: 0.4,
    height: 22,
    fontFamily: FontFamily.montserratMedium,
    fontWeight: "500",
    lineHeight: 20,
    fontSize: FontSize.size_xs,
    textAlign: "left",
    color: Color.white,
    left: 0,
    position: "absolute",
  },
  groupChildLayout1: {
    height: 4,
    width: 4,
    top: 11,
    borderRadius: Border.br_xs,
    position: "absolute",
  },
  jun2022GroupPosition: {
    width: 131,
    top: 0,
    position: "absolute",
  },
  textTypo: {
    fontFamily: FontFamily.montserratBold,
    fontWeight: "700",
    fontSize: FontSize.size_21xl,
    textAlign: "center",
    color: 'orange',
    letterSpacing: 0,
  },
  groupChildLayout: {
    height: 42,
    width: 42,
    top: 0,
    position: "absolute",
  },
  sendLayout: {
    width: 48,
    position: "absolute",
  },
  rectangleParentLayout: {
    width: 42,
    height: 68,
    left: "50%",
    position: "absolute",
  },
  sendTypo: {
    lineHeight: 22,
    textAlign: "center",
    fontSize: FontSize.size_xs,
    left: "50%",
    height: 19,
    color: Color.white,
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: "600",
  },
  groupChild: {
    backgroundColor: Color.colorWhite,
    borderColor: Color.colorLimegreen_200,
    borderRadius: 14,
    top: 0,
  },
  h: {
    width: 35,
    color: Color.colorLimegreen_200,
    height: 19,
    letterSpacing: 0,
    left: 22,
    fontSize: 12,
    position: "absolute",
    top: 8,
  },
  rectangleParent: {
    opacity: 0.5,
    width: 79,
    left: 0,
    top: 0,
  },
  groupItem: {
    borderColor: Color.colorLimegreen_200,
    borderWidth: 1,
    borderRadius: 14,
    backgroundColor: Color.colorWhite,
    width: 79,
    left: 0,
    height: 36,
    position: "absolute",
  },
  d: {
    width: 45,
    letterSpacing: 0,
    top: 8,
    left: 20,
    fontSize: 12,
    position: "absolute",
  },
  rectangleGroup: {
    left: 97,
    width: 79,
    top: 0,
   
  },
  d1: {
    width: 45,
    height: 19,
    letterSpacing: 0,
    color: Color.colorLimegreen_200,
    top: 8,
    left: 20,
    fontSize: 12,
    position: "absolute",
   
  },
  rectangleContainer: {
    left: 194,
    width: 79,
    top: 0,
  },
  w: {
    left: 24,
    height: 19,
    textAlign: "left",
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: "500",
    fontSize: 12,
    color: Color.colorLimegreen_200,
    letterSpacing: 0,
    top: 8,
    width: 45
  },
  groupView: {
    left: 292,
    width: 79,
    top: 0,
  },
  groupParent: {
    top: 513,
    width: 371,
    left: 28,
  },
  transfer1: {
    marginLeft: -42,
    top: 60,
    left: "35%",
    color: Color.colorLimegreen_200,
    fontSize: FontSize.size_xl,
  },
  d2: {
    top: 99,
    left: 417,
    color: Color.colorLimegreen_200,
    letterSpacing: 0,
    fontSize: 12,
    position: "absolute",
  },
  transferChild: {
    marginLeft: -187,
    top: 133,
    width: 373,
    height: 294,
    left: "50%",
    position: "absolute",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 20

  },
  tab: {
    left: 2,
  },
  homeOutline28Icon: {
    overflow: "hidden",
  },
  paymentCardOutline28Wrapper: {
    marginLeft: 23,
  },
  frameParent: {
    left: -245,
    flexDirection: "row",
    top: 8,
    position: "absolute",
  },
  tab1: {
    left: 249,
  },
  transferItem: {
    top: 870,
    left: 255,
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorAquamarine,
    width: 32,
  },
  recentActivity: {
    top: 474,
    lineHeight: 28,
    left: 20,
    fontSize: 18,
    fontWeight: '800',
    color: 'orange',
    letterSpacing: 0,
    marginBottom: 20,
    position: "absolute",
  },
  groupChild1: {
    backgroundColor: Color.colorWhitesmoke,
    borderRadius: 20,
    top: 0,
  },
  text: {
    left: 316,
    color: Color.colorCrimson,
    width: 39,
    height: 26,
    textAlign: "right",
    lineHeight: 24,
    fontSize: FontSize.size_xs,
    top: 20,
    marginLeft: -15,
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: "600",
    position: "absolute",
  },
  groupChild2: {
    borderRadius: 20,
    backgroundColor: Color.colorWhitesmoke,
    left: 13,
    top: 12,
  },
  upRightArrow1Icon: {
    top: 21,
    width: 33,
    height: 35,
    overflow: "hidden",
  },
  jun2022: {
    top: 35,
    width: 150,
    opacity: 0.4,
    height: 22,
    fontFamily: FontFamily.montserratMedium,
    fontWeight: "450",
    lineHeight: 20,
    left: 70,
    fontSize: FontSize.size_xs,
    textAlign: "left",
    color: Color.white,
    position: "absolute",
  },
  toJin: {
    width: 82,
  },
  ellipseIcon: {
    left: 51,
    width: 3,
    top: 12,
  },
  work: {
    width: 47,
    opacity: 0.6,
    fontFamily: FontFamily.montserratRegular,
    left: 110,
    color: Color.colorDarkcyan
  },
  toJinParent: {
    width: 106,
    left: 70,
    top: 9,
    height: 26,
  },
  rectangleParent1: {
    top: 0,
  },
  text1: {
    left: 308,
    width: 55,
    color: Color.colorLimegreen_200,
    marginLeft: -15

  },
  groupIcon: {
    top: 5,
    left: 0,
  },
  jun20221: {
    width: 150,
    opacity: 0.5
  },
  fromGoogle: {
    width: 117,
  },
  groupChild4: {
    left: 109,
  },
  salary: {
    left: 130,
    width: 53,
    
    fontFamily: FontFamily.montserratRegular,
    color: Color.colorDarkcyan
  },
  fromGoogleParent: {
    height: 26,
    left: 0,
  },
  jun2022Parent: {
    left: 57,
    height: 48,
  },
  groupParent1: {
    width: 228,
    left: 13,
    top: 9,
    height: 48,
  },
  rectangleParent2: {
    top: 85,
  },
  text2: {
    left: 311,
    width: 59,
    marginLeft: -15,
    color: Color.colorCrimson
  },
  groupChild6: {
    top: 6,
    left: 0,
  },
  jun20222: {
    width: 180,
    opacity: 0.5
  },
  toDavid: {
    width: 150,
  },
  groupChild7: {
    left: 75,
  },
  work1: {
    left: 110,
    width: 100,
    opacity: 0.6,
    fontFamily: FontFamily.montserratRegular,
    color: Color.colorDarkcyan
  },
  toDavidParent: {
    height: 26,
    left: 0,
  },
  jun2022Group: {
    left: 57,
    height: 48,
  },
  groupParent2: {
    width: 188,
    left: 13,
    top: 9,
    height: 48,
  },
  rectangleParent3: {
    top: 170,
  },
  groupContainer: {
    top: 581,
    height: 236,
    width: 375,
    left: 15,
    position: "absolute",
  },
  generalBalance: {
    textAlign: "center",
    color: Color.colorAquamarine,
    fontFamily: FontFamily.montserratMedium,
    fontWeight: "500",
    letterSpacing: 0,
    fontSize: FontSize.size_lg,
  },
  text5: {
    marginLeft: 8,
  },
  parent: {
    marginTop: 4,
    flexDirection: "row",
  },
  text3: {
    left: 65,
    marginTop: -70,
    alignItems: "center",
    top: 0,
    position: "absolute",
  },
 
  rectangleIcon: {
    marginLeft: 14.15,
    left: "50%",
    borderRadius: 40,
  },
  watson: {
    marginLeft: 12.15,
    lineHeight: 22,
    textAlign: "center",
    fontSize: FontSize.size_xs,
    left: "50%",
    height: 19,
    color: Color.white,
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: "600",
    top: 50,
  },
  groupChild9: {
    backgroundColor: Color.colorWhite,
    left: 0,
    borderRadius: 40,
  },
  send1Icon: {
    left: 12,
    width: 18,
    height: 18,
    borderRadius: 40,
    top: 12,
    position: "absolute",
    overflow: "hidden",
  },
  send12con: {
    left: 12,
    width: 30,
    height: 30,
    borderRadius: 40,
    top: 12,
    position: "absolute",
    overflow: "hidden",
  },
  rectangleParent5: {
    left: 3,
  },
  send: {
    marginLeft: -23.85,
    top: 49,
    lineHeight: 22,
    textAlign: "center",
    fontSize: FontSize.size_xs,
    left: "50%",
    height: 19,
    color: Color.white,
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: "600",
  },
  groupParent4: {
    height: 67,
    top: 1,
    left: 0,
  },
  rectangleParent4: {
    width: 120,
    height: 68,
    top: 70,
    marginLeft: -140.95,
    left: 100,
    position: "absolute",
  },
  groupChild10: {
    marginLeft: -21.05,
    left: "50%",
    borderRadius: 40,
  },
  toni: {
    marginLeft: -24.05,
    width: 50,
    top: 50,
    lineHeight: 22,
    position: "absolute",
  },
  rectangleParent6: {
    marginLeft: 40,
    top: 74,
    height: 68,
    position: "absolute",


  },
  moni: {
    marginLeft: -23.05,
    width: 50,
    top: 50,
    lineHeight: 22,
    position: "absolute",
  },
  rectangleParent7: {
    marginLeft: 116.95,
    top: 74,
    height: 68,
    position: "absolute",
  },
  sofia: {
    marginLeft: -24.05,
    top: 50,
    lineHeight: 22,
    width: 50,
    position: "absolute",
  },
  rectangleParent8: {
    marginLeft: -38.25,
    top: 74,
    height: 68,
    position: "absolute",
  },
  groupParent3: {
    top: 136,
    height: 69,
    marginLeft: -158.95,
    width: 318,
    left: "50%",
    position: "absolute",
  },
  textParent: {
    top: 178,
    height: 204,
    width: 318,
    left: 57,
    position: "absolute",
  },
  transfer: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    width: 404,
    height: 932,
    overflow: "hidden",
    borderRadius: Border.br_5xl,
  },
});

export default Transactions;
