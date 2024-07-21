import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const ChatPage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.chatPage}>
      <Image
        style={[styles.shapesIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/shapes.png")}
      />
      <View style={styles.groupParent}>
        <View style={[styles.groupContainer, styles.groupParentPosition]}>
          <View style={[styles.vectorParent, styles.groupChildLayout]}>
            <Image
              style={[styles.groupChild, styles.groupChildLayout]}
              contentFit="cover"
              source={require("../assets/rectangle-1131.png")}
            />
            <Text style={styles.weDidA}>
              We did a clean up drive Kamgar Nagar, Kurla. As you are a
              professional waste manager, we need your help for it!
            </Text>
          </View>
          <View style={styles.vectorGroup}>
            <Image
              style={styles.vectorGroup}
              contentFit="cover"
              source={require("../assets/rectangle-11311.png")}
            />
            <Text style={styles.helloShailesh}>Hello, Doe!</Text>
          </View>
          <Text style={[styles.am, styles.amLayout]}>09:25 AM</Text>
        </View>
        <View style={[styles.ellipseParent, styles.ellipsePosition]}>
          <Image
            style={styles.groupInner}
            contentFit="cover"
            source={require("../assets/ellipse-931.png")}
          />
          <View style={[styles.shaileshSheteParent, styles.shaileshPosition]}>
            <Text style={styles.shaileshShete}>John Doe</Text>
            <Text style={[styles.am1, styles.amTypo]}>10:55 AM</Text>
            <View style={[styles.vectorContainer, styles.rectangleIconLayout]}>
              <Image
                style={[styles.rectangleIcon, styles.rectangleIconLayout]}
                contentFit="cover"
                source={require("../assets/rectangle-11312.png")}
              />
              <Text style={[styles.sureIllCall, styles.textPosition]}>
                Sure, I’ll call you!
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.noteMessage, styles.rectangleLayout]}>
          <View style={[styles.rectangleParent, styles.rectangleLayout]}>
            <View style={[styles.rectangleView, styles.rectangleLayout]} />
            <Text style={styles.called1100am}>Called @11:00AM</Text>
            <Image
              style={[styles.phoneFillIcon, styles.phoneIconLayout]}
              contentFit="cover"
              source={require("../assets/phone-fill1.png")}
            />
            <Image
              style={[styles.phoneFillIcon1, styles.phoneIconLayout]}
              contentFit="cover"
              source={require("../assets/phone-fill1.png")}
            />
          </View>
        </View>
        <View style={[styles.image3Parent, styles.image3Layout]}>
          <Image
            style={[styles.image3Icon, styles.image3Layout]}
            contentFit="cover"
            source={require("../assets/image-3.png")}
          />
          <View style={[styles.groupView, styles.groupLayout1]}>
            <Image
              style={[styles.groupChild1, styles.groupLayout1]}
              contentFit="cover"
              source={require("../assets/rectangle-11313.png")}
            />
            <Text style={styles.droppingTheLocation}>
              Dropped the location, Doe. Tom, 9:30AM.
            </Text>
          </View>
          <View style={[styles.pmWrapper, styles.pmWrapperPosition]}>
            <Text style={[styles.pm, styles.amLayout]}>07:25 AM</Text>
          </View>
        </View>
        <View style={[styles.ellipseGroup, styles.ellipsePosition]}>
          <Image
            style={styles.groupInner}
            contentFit="cover"
            source={require("../assets/ellipse-931.png")}
          />
          <View style={[styles.shaileshSheteGroup, styles.shaileshPosition]}>
            <Text style={styles.shaileshShete}>John Doe</Text>
            <Text style={[styles.am1, styles.amTypo]}>10:09 AM</Text>
            <View style={[styles.vectorContainer, styles.rectangleIconLayout]}>
              <Image
                style={[styles.rectangleIcon, styles.rectangleIconLayout]}
                contentFit="cover"
                source={require("../assets/rectangle-11312.png")}
              />
              <Text style={[styles.text, styles.textTypo]}> Nice👍👍</Text>
            </View>
          </View>
        </View>
        <View style={[styles.ellipseContainer, styles.ellipsePosition]}>
          <Image
            style={styles.groupInner}
            contentFit="cover"
            source={require("../assets/ellipse-931.png")}
          />
          <View
            style={[styles.shaileshSheteContainer, styles.shaileshPosition]}
          >
            <Text style={styles.shaileshShete}>John Doe</Text>
            <Text style={[styles.am1, styles.amTypo]}>05:59 PM</Text>
            <View style={[styles.vectorContainer, styles.rectangleIconLayout]}>
              <Image
                style={[styles.rectangleIcon, styles.rectangleIconLayout]}
                contentFit="cover"
                source={require("../assets/rectangle-11312.png")}
              />
              <Text style={[styles.myPleasureYes, styles.textPosition]}>
                My pleasure! 
              </Text>
            </View>
          </View>
        </View>
        <Text style={[styles.saturday, styles.amTypo]}>Saturday</Text>
        <View style={[styles.groupParent1, styles.groupParentPosition]}>
          <View style={[styles.vectorParent3, styles.vectorParent3Layout]}>
            <Image
              style={[styles.vectorParent3, styles.vectorParent3Layout]}
              contentFit="cover"
              source={require("../assets/rectangle-11314.png")}
            />
            <Text style={[styles.gr8, styles.gr8Typo]}>In need of another!</Text>
          </View>
          <Text style={[styles.pm3, styles.pm3Typo]}>06:15 PM</Text>
        </View>
        <View style={[styles.groupParent2, styles.groupParentPosition]}>
          <View style={styles.vectorParent4}>
            <Image
              style={styles.vectorParent4}
              contentFit="cover"
              source={require("../assets/rectangle-11315.png")}
            />
            <Text style={[styles.dhanyawadShaileshHope, styles.gr8Typo]}>
              Hey Doe, got the gadget thanks!
            </Text>
          </View>
          <Text style={[styles.pm4, styles.pm3Typo]}>05:05 PM</Text>
        </View>
      </View>
      <View style={styles.chatPageChild} />
      <Image
        style={styles.shapesIcon1}
        contentFit="cover"
        source={require("../assets/shapes.png")}
      />
      <View style={styles.notification}>
        <Image
          style={[styles.vectorIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/vector.png")}
        />
        <Image
          style={[styles.vectorIcon1, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/vector1.png")}
        />
        <Image
          style={[styles.vectorIcon2, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/vector2.png")}
        />
        <Text style={styles.text1}>{`9:40 `}</Text>
      </View>
      <View style={[styles.rectangleGroup, styles.groupLayout]}>
        <View style={[styles.groupChild7, styles.groupLayout]} />
        <Image
          style={[styles.pinAltFillIcon, styles.fillIconLayout]}
          contentFit="cover"
          source={require("../assets/pin-alt-fill.png")}
        />
        <Text style={[styles.sendMessage, styles.shaileshTypo]}>
          Send Message...
        </Text>
        <Image
          style={[styles.sendFillIcon, styles.fillIconLayout]}
          contentFit="cover"
          source={require("../assets/send-fill.png")}
        />
        <Image
          style={[styles.imgLoadBoxFillIcon, styles.fillIconLayout]}
          contentFit="cover"
          source={require("../assets/img-load-box-fill.png")}
        />
      </View>
      <Text style={[styles.shailesh, styles.shaileshTypo]}> John </Text>
      <Pressable style={styles.image2} onPress={() => navigation.goBack()}>
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/image-2.png")}
        />
      </Pressable>
      <Image
        style={[styles.chatPageItem, styles.pmWrapperPosition]}
        contentFit="cover"
        source={require("../assets/ellipse-932.png")}
      />
      <View style={[styles.chatPageInner, styles.vectorParent3Layout]} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  groupParentPosition: {
    left: 141,
    width: 206,
    position: "absolute",
  },
  groupChildLayout: {
    height: 154,
    left: 0,
    width: 206,
    position: "absolute",
  },
  amLayout: {
    width: 66,
    height: 15,
  },
  ellipsePosition: {
    height: 86,
    left: 0,
    position: "absolute",
  },
  shaileshPosition: {
    height: 80,
    left: 52,
    top: 6,
    position: "absolute",
  },
  amTypo: {
    color: Color.colorGray_100,
    fontFamily: FontFamily.manropeExtraLight,
    fontWeight: "200",
    lineHeight: 10,
    position: "absolute",
  },
  rectangleIconLayout: {
    height: 36,
    width: 180,
    position: "absolute",
  },
  textPosition: {
    left: 12,
    top: 12,
    color: Color.colorGray_400,
    lineHeight: 12,
    fontFamily: FontFamily.manropeBold,
    fontWeight: "700",
    position: "absolute",
  },
  rectangleLayout: {
    height: 26,
    width: 301,
    position: "absolute",
  },
  phoneIconLayout: {
    width: 20,
    top: 3,
    height: 11,
    position: "absolute",
  },
  image3Layout: {
    width: 253,
    position: "absolute",
  },
  groupLayout1: {
    height: 85,
    width: 206,
    position: "absolute",
  },
  pmWrapperPosition: {
    left: 187,
    position: "absolute",
  },
  textTypo: {
    fontSize: FontSize.size_base,
    textAlign: "left",
  },
  vectorParent3Layout: {
    height: 42,
    position: "absolute",
  },
  gr8Typo: {
    width: 169,
    left: 20,
    lineHeight: 19,
    top: 12,
    textAlign: "right",
    color: Color.colorWhite,
    fontFamily: FontFamily.manropeBold,
    fontWeight: "700",
    letterSpacing: 0.2,
    fontSize: FontSize.size_mini,
    position: "absolute",
  },
  pm3Typo: {
    left: 138,
    height: 15,
    width: 66,
    color: Color.colorGray_100,
    fontFamily: FontFamily.manropeExtraLight,
    fontWeight: "200",
    lineHeight: 10,
    fontSize: FontSize.size_smi,
    textAlign: "right",
    position: "absolute",
  },
  groupLayout: {
    height: 63,
    width: 354,
    position: "absolute",
  },
  fillIconLayout: {
    height: 35,
    width: 35,
    top: 14,
    position: "absolute",
  },
  shaileshTypo: {
    fontWeight: "600",
    position: "absolute",
  },
  shapesIcon: {
    height: "20.5%",
    width: "60.26%",
    top: "84.24%",
    right: "-18.97%",
    bottom: "-4.74%",
    left: "58.72%",
  },
  groupChild: {
    top: 0,
  },
  weDidA: {
    top: 15,
    lineHeight: 20,
    height: 122,
    width: 168,
    textAlign: "right",
    color: Color.colorWhite,
    fontFamily: FontFamily.manropeBold,
    fontWeight: "700",
    left: 21,
    letterSpacing: 0.2,
    fontSize: FontSize.size_mini,
    position: "absolute",
  },
  vectorParent: {
    top: 56,
  },
  vectorGroup: {
    height: 53,
    top: 0,
    left: 0,
    width: 206,
    position: "absolute",
  },
  helloShailesh: {
    top: 18,
    height: 18,
    lineHeight: 12,
    width: 168,
    textAlign: "right",
    color: Color.colorWhite,
    fontFamily: FontFamily.manropeBold,
    fontWeight: "700",
    letterSpacing: 0.2,
    fontSize: FontSize.size_mini,
    left: 21,
    position: "absolute",
  },
  am: {
    top: 220,
    left: 129,
    height: 15,
    color: Color.colorGray_100,
    fontFamily: FontFamily.manropeExtraLight,
    fontWeight: "200",
    lineHeight: 10,
    position: "absolute",
    fontSize: FontSize.size_smi,
    textAlign: "right",
  },
  groupContainer: {
    top: -440,
    height: 235,
    width: 206,
  },
  groupInner: {
    width: 40,
    height: 40,
    top: 0,
    left: 0,
    position: "absolute",
  },
  shaileshShete: {
    lineHeight: 14,
    textAlign: "left",
    color: Color.colorGray_400,
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.manropeBold,
    fontWeight: "700",
    top: 0,
    left: 0,
    position: "absolute",
  },
  am1: {
    top: 70,
    left: 150,
    fontSize: FontSize.size_3xs,
    textAlign: "left",
  },
  rectangleIcon: {
    top: 0,
    left: 0,
  },
  sureIllCall: {
    textAlign: "left",
    top: 12,
    letterSpacing: 0.2,
    fontSize: FontSize.size_mini,
  },
  vectorContainer: {
    top: 26,
    left: 10,
  },
  shaileshSheteParent: {
    width: 190,
  },
  ellipseParent: {
    top: -204,
    width: 242,
  },
  rectangleView: {
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
    top: 0,
    left: 0,
  },
  called1100am: {
    top: 5,
    fontSize: 12,
    color: Color.colorGray_700,
    width: 297,
    height: 11,
    textAlign: "center",
    fontFamily: FontFamily.poppinsBold,
    left: 1,
    fontWeight: "700",
    position: "absolute",
  },
  phoneFillIcon: {
    left: 9,
  },
  phoneFillIcon1: {
    left: 269,
  },
  rectangleParent: {
    top: 0,
    left: 0,
  },
  noteMessage: {
    top: -100,
    left: 22,
  },
  image3Icon: {
    borderRadius: Border.br_base,
    height: 187,
    top: 0,
    left: 0,
  },
  groupChild1: {
    top: 0,
    left: 0,
  },
  droppingTheLocation: {
    top: 16,
    height: 24,
    lineHeight: 19,
    width: 168,
    textAlign: "right",
    color: Color.colorWhite,
    fontFamily: FontFamily.manropeBold,
    fontWeight: "700",
    letterSpacing: 0.2,
    fontSize: FontSize.size_mini,
    left: 21,
    position: "absolute",
  },
  groupView: {
    top: 193,
    left: 47,
  },
  pm: {
    height: 15,
    color: Color.colorGray_100,
    fontFamily: FontFamily.manropeExtraLight,
    fontWeight: "200",
    lineHeight: 10,
    position: "absolute",
    fontSize: FontSize.size_smi,
    textAlign: "right",
    top: 0,
    left: 0,
  },
  pmWrapper: {
    top: 283,
    height: 15,
    width: 66,
  },
  image3Parent: {
    top: -56,
    left: 94,
    height: 298,
  },
  text: {
    left: 12,
    top: 12,
    color: Color.colorGray_400,
    lineHeight: 12,
    fontFamily: FontFamily.manropeBold,
    fontWeight: "700",
    position: "absolute",
    letterSpacing: 0.2,
  },
  shaileshSheteGroup: {
    width: 191,
  },
  ellipseGroup: {
    top: 242,
    width: 243,
  },
  myPleasureYes: {
    letterSpacing: 0.1,
    textAlign: "left",
    fontSize: FontSize.size_sm,
    top: 12,
  },
  shaileshSheteContainer: {
    width: 193,
  },
  ellipseContainer: {
    top: 473,
    width: 245,
  },
  saturday: {
    top: 349,
    left: 166,
    width: 54,
    height: 15,
    fontSize: FontSize.size_smi,
    fontFamily: FontFamily.manropeExtraLight,
    fontWeight: "200",
    lineHeight: 10,
    textAlign: "right",
  },
  vectorParent3: {
    top: 0,
    left: 0,
    width: 206,
  },
  gr8: {
    height: 22,
  },
  pm3: {
    top: 50,
  },
  groupParent1: {
    top: 570,
    height: 65,
    width: 206,
  },
  vectorParent4: {
    height: 66,
    top: 0,
    left: 0,
    width: 206,
    position: "absolute",
  },
  dhanyawadShaileshHope: {
    height: 40,
  },
  pm4: {
    top: 73,
  },
  groupParent2: {
    top: 380,
    height: 88,
    width: 206,
  },
  groupParent: {
    top: 125,
    width: 347,
    height: 640,
    left: 22,
    position: "absolute",
  },
  chatPageChild: {
    top: -3,
    backgroundColor: Color.colorLimegreen_200,
    width: 390,
    height: 128,
    left: 0,
    position: "absolute",
  },
  shapesIcon1: {
    top: -52,
    left: -54,
    width: 235,
    height: 173,
    position: "absolute",
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
  text1: {
    top: "42.86%",
    left: "0%",
    color: Color.colorBlack,
    textAlign: "center",
    fontFamily: FontFamily.poppinsBold,
    fontSize: FontSize.size_sm,
    fontWeight: "700",
    position: "absolute",
  },
  notification: {
    left: 18,
    width: 355,
    height: 28,
    top: 0,
    position: "absolute",
  },
  groupChild7: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorLightgray,
    top: 0,
    left: 0,
  },
  pinAltFillIcon: {
    left: 55,
    borderRadius: Border.br_6xs,
    width: 35,
    top: 14,
  },
  sendMessage: {
    top: 21,
    left: 107,
    fontFamily: FontFamily.manropeSemiBold,
    color: "#696666",
    fontSize: FontSize.size_base,
    textAlign: "left",
  },
  sendFillIcon: {
    left: 304,
    borderRadius: 25,
    width: 35,
    top: 14,
  },
  imgLoadBoxFillIcon: {
    left: 13,
    borderRadius: Border.br_6xs,
    width: 35,
    top: 14,
  },
  rectangleGroup: {
    top: 765,
    left: 19,
  },
  shailesh: {
    top: 52,
    left: 255,
    fontSize: FontSize.size_9xl,
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorGray_800,
    width: 126,
    height: 39,
    textAlign: "center",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  image2: {
    top: 33,
    width: 79,
    height: 79,
    left: 1,
    position: "absolute",
  },
  chatPageItem: {
    top: 42,
    width: 61,
    height: 60,
  },
  chatPageInner: {
    top: 776,
    left: 116,
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderRightWidth: 1,
    width: 1,
  },
  chatPage: {
    backgroundColor: Color.colorWhitesmoke,
    flex: 1,
    height: 844,
    overflow: "hidden",
    width: "100%",
  },
});

export default ChatPage;
