import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Padding, Color, Border, FontSize, FontFamily } from "../GlobalStyles";

const CART = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.cart}>
      <Image
        style={[styles.bgIcon, styles.bgIconPosition]}
        contentFit="cover"
        source={require("../assets/bg.png")}
      />
      <View style={[styles.tittleCart, styles.tittleCartSpaceBlock]}>
        <Text style={[styles.cart1, styles.cart1FlexBox]}>Cart</Text>
      </View>
      <View style={styles.contentCart}>
        <View style={styles.snakeLayout}>
          <Image
            style={styles.snakePlantsSmallSize}
            contentFit="cover"
            source={require("../assets/snake-plants----small-size--indoor2.png")}
          />
          <View style={styles.frameParent}>
            <View>
              <Text style={styles.peaceLily}>Peace Lily</Text>
              <View style={[styles.wrapper, styles.text1FlexBox]}>
                <Text style={styles.text}>$15.00</Text>
              </View>
            </View>
            <View style={styles.addItem}>
              <Image
                style={styles.countLayout}
                contentFit="cover"
                source={require("../assets/xsbutton3.png")}
              />
              <View style={[styles.count, styles.countLayout]}>
                <Text style={[styles.text1, styles.textFlexBox]}>0</Text>
              </View>
              <Image
                style={styles.countLayout}
                contentFit="cover"
                source={require("../assets/xsbutton.png")}
              />
            </View>
          </View>
        </View>
        <View style={[styles.snakePlantsSmallSizeGroup, styles.snakeLayout]}>
          <Image
            style={styles.snakePlantsSmallSize}
            contentFit="cover"
            source={require("../assets/snake-plants----small-size--indoor2.png")}
          />
          <View style={styles.frameParent}>
            <View>
              <Text style={styles.peaceLily}>{`Snake Plant `}</Text>
              <View style={[styles.wrapper, styles.text1FlexBox]}>
                <Text style={styles.text}>$15.00</Text>
              </View>
            </View>
            <View style={styles.addItem}>
              <Image
                style={styles.countLayout}
                contentFit="cover"
                source={require("../assets/xsbutton3.png")}
              />
              <View style={[styles.count, styles.countLayout]}>
                <Text style={[styles.text1, styles.textFlexBox]}>0</Text>
              </View>
              <Image
                style={styles.countLayout}
                contentFit="cover"
                source={require("../assets/xsbutton.png")}
              />
            </View>
          </View>
        </View>
        <View style={[styles.snakePlantsSmallSizeGroup, styles.snakeLayout]}>
          <Image
            style={styles.snakePlantsSmallSize}
            contentFit="cover"
            source={require("../assets/snake-plants----small-size--indoor2.png")}
          />
          <View style={styles.frameParent}>
            <View>
              <Text style={styles.peaceLily}>White Rose</Text>
              <View style={[styles.wrapper, styles.text1FlexBox]}>
                <Text style={styles.text}>$15.00</Text>
              </View>
            </View>
            <View style={styles.addItem}>
              <Image
                style={styles.countLayout}
                contentFit="cover"
                source={require("../assets/xsbutton3.png")}
              />
              <View style={[styles.count, styles.countLayout]}>
                <Text style={[styles.text1, styles.textFlexBox]}>0</Text>
              </View>
              <Image
                style={styles.countLayout}
                contentFit="cover"
                source={require("../assets/xsbutton.png")}
              />
            </View>
          </View>
        </View>
        <View style={[styles.snakePlantsSmallSizeGroup, styles.snakeLayout]}>
          <Image
            style={styles.snakePlantsSmallSize}
            contentFit="cover"
            source={require("../assets/snake-plants----small-size--indoor2.png")}
          />
          <View style={styles.frameParent}>
            <View>
              <Text style={styles.peaceLily}>Snow Drop</Text>
              <View style={[styles.wrapper, styles.text1FlexBox]}>
                <Text style={styles.text}>$15.00</Text>
              </View>
            </View>
            <View style={styles.addItem}>
              <Image
                style={styles.countLayout}
                contentFit="cover"
                source={require("../assets/xsbutton3.png")}
              />
              <View style={[styles.count, styles.countLayout]}>
                <Text style={[styles.text1, styles.textFlexBox]}>0</Text>
              </View>
              <Image
                style={styles.countLayout}
                contentFit="cover"
                source={require("../assets/xsbutton.png")}
              />
            </View>
          </View>
        </View>
        <View style={[styles.snakePlantsSmallSizeGroup, styles.snakeLayout]}>
          <Image
            style={styles.snakePlantsSmallSize}
            contentFit="cover"
            source={require("../assets/snake-plants----small-size--indoor2.png")}
          />
          <View style={styles.frameParent}>
            <View>
              <Text style={styles.peaceLily}>Sunflower</Text>
              <View style={[styles.wrapper, styles.text1FlexBox]}>
                <Text style={styles.text}>$15.00</Text>
              </View>
            </View>
            <View style={styles.addItem}>
              <Image
                style={styles.countLayout}
                contentFit="cover"
                source={require("../assets/xsbutton3.png")}
              />
              <View style={[styles.count, styles.countLayout]}>
                <Text style={[styles.text1, styles.textFlexBox]}>0</Text>
              </View>
              <Image
                style={styles.countLayout}
                contentFit="cover"
                source={require("../assets/xsbutton.png")}
              />
            </View>
          </View>
        </View>
      </View>
      <LinearGradient
        style={[styles.checkoutArea, styles.buttonBigShadowBox]}
        locations={[0, 1]}
        colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.1)"]}
      >
        <View style={styles.totalPrice}>
          <Text style={[styles.total, styles.totalLayout]}>Total</Text>
          <Text style={[styles.text10, styles.totalLayout]}>$ 109.00</Text>
        </View>
        <Pressable
          style={[styles.buttonBig, styles.buttonBigShadowBox]}
          onPress={() => navigation.navigate("CHECKOUTFINAL")}
        >
          <Text style={[styles.textArea, styles.textTypo]}>Checkout</Text>
        </Pressable>
      </LinearGradient>
      <View style={styles.checkoutAreaPosition}>
        <Image
          style={styles.bgIcon1}
          contentFit="cover"
          source={require("../assets/bg1.png")}
        />
        <View style={styles.navbarMenuParent}>
          <Pressable
            style={styles.navbarFlexBox}
            onPress={() => navigation.navigate("DASHBOARD")}
          >
            <Image
              style={styles.home2Icon}
              contentFit="cover"
              source={require("../assets/home21.png")}
            />
            <Text style={[styles.home, styles.homeTypo]}>Home</Text>
          </Pressable>
          <Pressable
            style={styles.navbarFlexBox}
            onPress={() => navigation.navigate("LIKESFINAL")}
          >
            <Image
              style={styles.home2Icon}
              contentFit="cover"
              source={require("../assets/heart.png")}
            />
            <Text style={[styles.home, styles.homeTypo]}>Home</Text>
          </Pressable>
          <View style={[styles.navbarMenu2, styles.navbarFlexBox]}>
            <Image
              style={styles.home2Icon}
              contentFit="cover"
              source={require("../assets/bag2.png")}
            />
            <Text style={[styles.cart2, styles.homeTypo]}>Cart</Text>
          </View>
          <Pressable
            style={styles.navbarFlexBox}
            onPress={() => navigation.navigate("PROFILEFINAL")}
          >
            <Image
              style={styles.home2Icon}
              contentFit="cover"
              source={require("../assets/frame.png")}
            />
            <Text style={[styles.home, styles.homeTypo]}>Home</Text>
          </Pressable>
        </View>
      </View>
      <View style={[styles.uiStatusBars, styles.bgIconPosition]}>
        <Image
          style={styles.batteryIcon}
          contentFit="cover"
          source={require("../assets/battery1.png")}
        />
        <Image
          style={styles.wifiIcon}
          contentFit="cover"
          source={require("../assets/wifi.png")}
        />
        <Image
          style={styles.mobileSignalIcon}
          contentFit="cover"
          source={require("../assets/mobile-signal.png")}
        />
        <View style={styles.timeStyle}>
          <Text style={[styles.text11, styles.textFlexBox]}>9:41</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bgIconPosition: {
    left: 0,
    top: 0,
    width: 430,
    position: "absolute",
  },
  tittleCartSpaceBlock: {
    paddingHorizontal: Padding.p_21xl,
    width: 430,
  },
  cart1FlexBox: {
    textAlign: "left",
    color: Color.brandColorBrokenWhite,
  },
  text1FlexBox: {
    alignSelf: "stretch",
    alignItems: "center",
  },
  countLayout: {
    height: 25,
    width: 25,
  },
  textFlexBox: {
    textAlign: "center",
    fontWeight: "600",
    justifyContent: "center",
    display: "flex",
  },
  snakeLayout: {
    paddingVertical: Padding.p_xl,
    paddingHorizontal: Padding.p_6xl,
    height: 145,
    borderRadius: Border.br_mini,
    width: 390,
    backgroundColor: Color.brandColorBrokenWhite,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonBigShadowBox: {
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    alignItems: "center",
    flexDirection: "row",
  },
  totalLayout: {
    height: 21,
    width: 85,
    color: Color.colorDarkslategray,
    display: "flex",
    textAlign: "left",
    alignItems: "center",
  },
  textTypo: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsSemiBold,
  },
  homeTypo: {
    marginLeft: 5,
    width: 51,
    color: Color.colorDarkslategray,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    textAlign: "left",
    alignItems: "center",
  },
  navbarFlexBox: {
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_xl,
    borderRadius: Border.br_mini,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  bgIcon: {
    width: 430,
    height: 932,
  },
  cart1: {
    fontSize: FontSize.size_13xl,
    width: 73,
    height: 50,
    display: "flex",
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    textAlign: "left",
    alignItems: "center",
  },
  tittleCart: {
    top: 50,
    paddingVertical: Padding.p_6xl,
    alignItems: "center",
    flexDirection: "row",
    left: "50%",
    marginLeft: -215,
    paddingHorizontal: Padding.p_21xl,
    position: "absolute",
  },
  snakePlantsSmallSize: {
    width: 69,
    height: 105,
  },
  peaceLily: {
    color: Color.brandColorPineGreen,
    width: 140,
    height: 30,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_xl,
    display: "flex",
    textAlign: "left",
    alignItems: "center",
  },
  text: {
    width: 53,
    color: Color.colorDarkslategray,
    fontSize: FontSize.size_base,
    alignSelf: "stretch",
    display: "flex",
    textAlign: "left",
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    alignItems: "center",
  },
  wrapper: {
    marginTop: 6,
    height: 30,
    flexDirection: "row",
  },
  text1: {
    height: 24,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsSemiBold,
    alignSelf: "stretch",
    alignItems: "center",
    color: Color.brandColorBrokenWhite,
    textAlign: "center",
  },
  count: {
    alignItems: "center",
  },
  addItem: {
    borderRadius: Border.br_3xs,
    width: 85,
    backgroundColor: Color.colorDarkslategray,
    height: 30,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  frameParent: {
    marginLeft: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  snakePlantsSmallSizeGroup: {
    marginTop: 16,
  },
  contentCart: {
    marginLeft: -195,
    top: 150,
    justifyContent: "center",
    alignItems: "center",
    left: "50%",
    position: "absolute",
  },
  total: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
  },
  text10: {
    marginTop: 5,
    fontSize: FontSize.size_xl,
    height: 21,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
  },
  totalPrice: {
    width: 177,
  },
  textArea: {
    fontWeight: "600",
    fontSize: FontSize.size_base,
    textAlign: "left",
    color: Color.brandColorBrokenWhite,
  },
  buttonBig: {
    shadowColor: "#fff",
    shadowRadius: 4,
    elevation: 4,
    width: 210,
    padding: Padding.p_3xs,
    backgroundColor: Color.colorDarkslategray,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    borderRadius: Border.br_mini,
    justifyContent: "center",
    height: 50,
    overflow: "hidden",
  },
  checkoutArea: {
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowRadius: 40,
    elevation: 40,
    borderTopLeftRadius: Border.br_6xl,
    borderTopRightRadius: Border.br_6xl,
    borderStyle: "solid",
    borderColor: Color.colorWhite,
    borderWidth: 1,
    paddingTop: Padding.p_6xl,
    paddingBottom: 115,
    backgroundColor: "transparent",
    bottom: 0,
    left: "50%",
    marginLeft: -215,
    position: "absolute",
    justifyContent: "space-between",
    paddingHorizontal: Padding.p_21xl,
    width: 430,
  },
  bgIcon1: {
    borderBottomRightRadius: Border.br_31xl,
    borderBottomLeftRadius: Border.br_31xl,
    height: 90,
    zIndex: 0,
    width: 430,
  },
  home2Icon: {
    width: 30,
    height: 30,
  },
  home: {
    display: "none",
  },
  cart2: {
    display: "flex",
  },
  navbarMenu2: {
    width: 129,
    backgroundColor: Color.brandColorBrokenWhite,
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_xl,
  },
  navbarMenuParent: {
    top: 20,
    left: 20,
    zIndex: 1,
    justifyContent: "space-between",
    width: 390,
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
  },
  checkoutAreaPosition: {
    bottom: 0,
    left: "50%",
    marginLeft: -215,
    position: "absolute",
  },
  batteryIcon: {
    height: "25.8%",
    width: "6.49%",
    top: "39.4%",
    right: "3.91%",
    bottom: "34.8%",
    left: "89.6%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  wifiIcon: {
    width: 18,
    height: 12,
  },
  mobileSignalIcon: {
    width: 19,
    height: 12,
  },
  text11: {
    height: "85.77%",
    top: "9.62%",
    left: "0%",
    fontSize: FontSize.size_mini,
    letterSpacing: -0.3,
    fontFamily: FontFamily.sFProText,
    color: Color.colorWhite,
    alignItems: "flex-end",
    position: "absolute",
    width: "100%",
  },
  timeStyle: {
    height: "47.8%",
    width: "14.4%",
    top: "27.2%",
    right: "80%",
    bottom: "25%",
    left: "5.6%",
    position: "absolute",
  },
  uiStatusBars: {
    height: 50,
    width: 430,
  },
  cart: {
    borderRadius: Border.br_31xl,
    backgroundColor: Color.colorWhite,
    overflow: "hidden",
    height: 932,
    width: "100%",
    flex: 1,
  },
});

export default CART;
