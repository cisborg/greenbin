import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Padding, FontFamily, FontSize, Border, Color } from "../GlobalStyles";

const DASHBOARD = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.dashboard}>
      <Image
        style={[styles.bgIcon, styles.bgIconPosition]}
        contentFit="cover"
        source={require("../assets/bg.png")}
      />
      <View style={styles.product}>
        <Pressable
          style={styles.cardProduct}
          onPress={() => navigation.navigate("PRODUCTDETAILFINAL")}
        >
          <LinearGradient
            style={styles.bgShadowBox}
            locations={[0, 1]}
            colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.1)"]}
          />
          <Image
            style={[
              styles.snakePlantsLargeSize,
              styles.navbarMenuParentPosition,
            ]}
            contentFit="cover"
            source={require("../assets/snake-plants----large-size--indoor.png")}
          />
          <View style={[styles.btnLikes, styles.bgIconPosition]}>
            <Image
              style={styles.btnLikes1Icon}
              contentFit="cover"
              source={require("../assets/btnlikes1.png")}
            />
          </View>
          <View style={[styles.detailPrice, styles.indoorTextSpaceBlock]}>
            <View>
              <Text
                style={[styles.snakePlants, styles.snakePlantsTypo]}
              >{`Snake Plants `}</Text>
              <View style={styles.starParent}>
                <Image
                  style={styles.starIcon}
                  contentFit="cover"
                  source={require("../assets/star.png")}
                />
                <Text style={[styles.text, styles.textSpaceBlock]}>4.5</Text>
                <Text style={[styles.reviews, styles.textSpaceBlock]}>
                  (100 reviews)
                </Text>
              </View>
            </View>
            <View style={styles.priceAdd}>
              <Text style={[styles.text1, styles.indoorTypo]}>$25.00</Text>
              <Image
                style={styles.xsButtonIcon}
                contentFit="cover"
                source={require("../assets/xsbutton.png")}
              />
            </View>
          </View>
        </Pressable>
        <Pressable
          style={styles.cardProduct1}
          onPress={() => navigation.navigate("PRODUCTDETAILFINAL")}
        >
          <LinearGradient
            style={styles.bgShadowBox}
            locations={[0, 1]}
            colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.1)"]}
          />
          <Image
            style={[
              styles.snakePlantsLargeSize,
              styles.navbarMenuParentPosition,
            ]}
            contentFit="cover"
            source={require("../assets/snake-plants----large-size--indoor.png")}
          />
          <View style={[styles.btnLikes, styles.bgIconPosition]}>
            <Image
              style={styles.btnLikes1Icon}
              contentFit="cover"
              source={require("../assets/btnlikes1.png")}
            />
          </View>
          <View style={[styles.detailPrice, styles.indoorTextSpaceBlock]}>
            <View>
              <Text
                style={[styles.snakePlants, styles.snakePlantsTypo]}
              >{`Snake Plants `}</Text>
              <View style={styles.starParent}>
                <Image
                  style={styles.starIcon}
                  contentFit="cover"
                  source={require("../assets/star.png")}
                />
                <Text style={[styles.text, styles.textSpaceBlock]}>4.5</Text>
                <Text style={[styles.reviews, styles.textSpaceBlock]}>
                  (100 reviews)
                </Text>
              </View>
            </View>
            <View style={styles.priceAdd}>
              <Text style={[styles.text1, styles.indoorTypo]}>$25.00</Text>
              <Image
                style={styles.xsButtonIcon}
                contentFit="cover"
                source={require("../assets/xsbutton.png")}
              />
            </View>
          </View>
        </Pressable>
        <Pressable
          style={styles.cardProduct1}
          onPress={() => navigation.navigate("PRODUCTDETAILFINAL")}
        >
          <LinearGradient
            style={styles.bgShadowBox}
            locations={[0, 1]}
            colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.1)"]}
          />
          <Image
            style={[
              styles.snakePlantsLargeSize,
              styles.navbarMenuParentPosition,
            ]}
            contentFit="cover"
            source={require("../assets/snake-plants----large-size--indoor.png")}
          />
          <View style={[styles.btnLikes, styles.bgIconPosition]}>
            <Image
              style={styles.btnLikes1Icon}
              contentFit="cover"
              source={require("../assets/btnlikes1.png")}
            />
          </View>
          <View style={[styles.detailPrice, styles.indoorTextSpaceBlock]}>
            <View>
              <Text
                style={[styles.snakePlants, styles.snakePlantsTypo]}
              >{`Snake Plants `}</Text>
              <View style={styles.starParent}>
                <Image
                  style={styles.starIcon}
                  contentFit="cover"
                  source={require("../assets/star.png")}
                />
                <Text style={[styles.text, styles.textSpaceBlock]}>4.5</Text>
                <Text style={[styles.reviews, styles.textSpaceBlock]}>
                  (100 reviews)
                </Text>
              </View>
            </View>
            <View style={styles.priceAdd}>
              <Text style={[styles.text1, styles.indoorTypo]}>$25.00</Text>
              <Image
                style={styles.xsButtonIcon}
                contentFit="cover"
                source={require("../assets/xsbutton.png")}
              />
            </View>
          </View>
        </Pressable>
      </View>
      <View style={[styles.indoorText, styles.indoorTextSpaceBlock]}>
        <Text style={[styles.indoor, styles.indoorTypo]}>Indoor</Text>
      </View>
      <View style={styles.product1}>
        <Pressable
          style={styles.cardProduct}
          onPress={() => navigation.navigate("PRODUCTDETAILFINAL")}
        >
          <LinearGradient
            style={styles.bgShadowBox}
            locations={[0, 1]}
            colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.1)"]}
          />
          <Image
            style={[
              styles.snakePlantsLargeSize,
              styles.navbarMenuParentPosition,
            ]}
            contentFit="cover"
            source={require("../assets/snake-plants----large-size--indoor.png")}
          />
          <View style={[styles.btnLikes, styles.bgIconPosition]}>
            <Image
              style={styles.btnLikes1Icon}
              contentFit="cover"
              source={require("../assets/btnlikes1.png")}
            />
          </View>
          <View style={[styles.detailPrice, styles.indoorTextSpaceBlock]}>
            <View>
              <Text
                style={[styles.snakePlants, styles.snakePlantsTypo]}
              >{`Snake Plants `}</Text>
              <View style={styles.starParent}>
                <Image
                  style={styles.starIcon}
                  contentFit="cover"
                  source={require("../assets/star.png")}
                />
                <Text style={[styles.text, styles.textSpaceBlock]}>4.5</Text>
                <Text style={[styles.reviews, styles.textSpaceBlock]}>
                  (100 reviews)
                </Text>
              </View>
            </View>
            <View style={styles.priceAdd}>
              <Text style={[styles.text1, styles.indoorTypo]}>$25.00</Text>
              <Image
                style={styles.xsButtonIcon}
                contentFit="cover"
                source={require("../assets/xsbutton.png")}
              />
            </View>
          </View>
        </Pressable>
        <Pressable
          style={styles.cardProduct1}
          onPress={() => navigation.navigate("PRODUCTDETAILFINAL")}
        >
          <LinearGradient
            style={styles.bgShadowBox}
            locations={[0, 1]}
            colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.1)"]}
          />
          <Image
            style={[
              styles.snakePlantsLargeSize,
              styles.navbarMenuParentPosition,
            ]}
            contentFit="cover"
            source={require("../assets/snake-plants----large-size--indoor.png")}
          />
          <View style={[styles.btnLikes, styles.bgIconPosition]}>
            <Image
              style={styles.btnLikes1Icon}
              contentFit="cover"
              source={require("../assets/btnlikes1.png")}
            />
          </View>
          <View style={[styles.detailPrice, styles.indoorTextSpaceBlock]}>
            <View>
              <Text
                style={[styles.snakePlants, styles.snakePlantsTypo]}
              >{`Snake Plants `}</Text>
              <View style={styles.starParent}>
                <Image
                  style={styles.starIcon}
                  contentFit="cover"
                  source={require("../assets/star.png")}
                />
                <Text style={[styles.text, styles.textSpaceBlock]}>4.5</Text>
                <Text style={[styles.reviews, styles.textSpaceBlock]}>
                  (100 reviews)
                </Text>
              </View>
            </View>
            <View style={styles.priceAdd}>
              <Text style={[styles.text1, styles.indoorTypo]}>$25.00</Text>
              <Image
                style={styles.xsButtonIcon}
                contentFit="cover"
                source={require("../assets/xsbutton.png")}
              />
            </View>
          </View>
        </Pressable>
        <Pressable
          style={styles.cardProduct1}
          onPress={() => navigation.navigate("PRODUCTDETAILFINAL")}
        >
          <LinearGradient
            style={styles.bgShadowBox}
            locations={[0, 1]}
            colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.1)"]}
          />
          <Image
            style={[
              styles.snakePlantsLargeSize,
              styles.navbarMenuParentPosition,
            ]}
            contentFit="cover"
            source={require("../assets/snake-plants----large-size--indoor.png")}
          />
          <View style={[styles.btnLikes, styles.bgIconPosition]}>
            <Image
              style={styles.btnLikes1Icon}
              contentFit="cover"
              source={require("../assets/btnlikes1.png")}
            />
          </View>
          <View style={[styles.detailPrice, styles.indoorTextSpaceBlock]}>
            <View>
              <Text
                style={[styles.snakePlants, styles.snakePlantsTypo]}
              >{`Snake Plants `}</Text>
              <View style={styles.starParent}>
                <Image
                  style={styles.starIcon}
                  contentFit="cover"
                  source={require("../assets/star.png")}
                />
                <Text style={[styles.text, styles.textSpaceBlock]}>4.5</Text>
                <Text style={[styles.reviews, styles.textSpaceBlock]}>
                  (100 reviews)
                </Text>
              </View>
            </View>
            <View style={styles.priceAdd}>
              <Text style={[styles.text1, styles.indoorTypo]}>$25.00</Text>
              <Image
                style={styles.xsButtonIcon}
                contentFit="cover"
                source={require("../assets/xsbutton.png")}
              />
            </View>
          </View>
        </Pressable>
      </View>
      <View style={[styles.bottomNavbar, styles.headerPosition]}>
        <Image
          style={styles.bgIcon1}
          contentFit="cover"
          source={require("../assets/bg1.png")}
        />
        <View style={[styles.navbarMenuParent, styles.sliderFlexBox]}>
          <View style={[styles.navbarMenu, styles.navbarSpaceBlock]}>
            <Image
              style={styles.btnLikes1Icon}
              contentFit="cover"
              source={require("../assets/home2.png")}
            />
            <Text style={[styles.home, styles.homeTypo]}>Home</Text>
          </View>
          <Pressable
            style={[styles.navbarMenu1, styles.navbarSpaceBlock]}
            onPress={() => navigation.navigate("LIKESFINAL")}
          >
            <Image
              style={styles.btnLikes1Icon}
              contentFit="cover"
              source={require("../assets/heart.png")}
            />
            <Text style={[styles.home1, styles.homeTypo]}>Home</Text>
          </Pressable>
          <Pressable
            style={[styles.navbarMenu1, styles.navbarSpaceBlock]}
            onPress={() => navigation.navigate("CART")}
          >
            <Image
              style={styles.btnLikes1Icon}
              contentFit="cover"
              source={require("../assets/bag.png")}
            />
            <Text style={[styles.home1, styles.homeTypo]}>Home</Text>
          </Pressable>
          <Pressable
            style={[styles.navbarMenu1, styles.navbarSpaceBlock]}
            onPress={() => navigation.navigate("PROFILEFINAL")}
          >
            <Image
              style={styles.btnLikes1Icon}
              contentFit="cover"
              source={require("../assets/frame.png")}
            />
            <Text style={[styles.home1, styles.homeTypo]}>Home</Text>
          </Pressable>
        </View>
      </View>
      <View style={[styles.categoriesBar, styles.indoorTextSpaceBlock]}>
        <View>
          <Text style={[styles.indoor, styles.indoorTypo]}>Popular</Text>
          <View style={styles.frameChild} />
        </View>
        <Text style={[styles.indoor1, styles.indoorTypo]}>Indoor</Text>
        <Text style={[styles.indoor1, styles.indoorTypo]}>Outdoor</Text>
        <Text style={[styles.indoor1, styles.indoorTypo]}>Office</Text>
        <Text style={[styles.indoor1, styles.indoorTypo]}>Other</Text>
      </View>
      <View style={styles.containerSale}>
        <LinearGradient
          style={[styles.cardNews, styles.sliderFlexBox]}
          locations={[0, 1]}
          colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.1)"]}
        >
          <View style={styles.helloweenSale50OffParent}>
            <Text
              style={[styles.helloweenSale50, styles.snakePlantsTypo]}
            >{`HELLOWEEN
SALE 50% OFF`}</Text>
            <Text style={styles.oct20Typo}>{`oct 20 - oct 31 `}</Text>
          </View>
          <View style={styles.snakeLayout}>
            <Image
              style={[styles.snakePlantsSmallSize, styles.snakeLayout]}
              contentFit="cover"
              source={require("../assets/snake-plants----small-size--indoor.png")}
            />
            <Image
              style={styles.succulentsAndCactiSmallS}
              contentFit="cover"
              source={require("../assets/succulents-and-cacti--small-size--indoor.png")}
            />
          </View>
        </LinearGradient>
        <View style={[styles.slider, styles.sliderFlexBox]}>
          <View style={[styles.sliderChild, styles.sliderLayout]} />
          <View style={[styles.sliderItem, styles.sliderLayout]} />
          <View style={[styles.sliderItem, styles.sliderLayout]} />
        </View>
      </View>
      <LinearGradient
        style={[styles.searchBlurry, styles.cardNewsLayout]}
        locations={[0, 1]}
        colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.1)"]}
      >
        <View style={styles.searchNormalParent}>
          <Image
            style={styles.btnLikes1Icon}
            contentFit="cover"
            source={require("../assets/searchnormal.png")}
          />
          <Text style={[styles.searchAnyPlants, styles.oct20Typo]}>
            Search any plants ...
          </Text>
        </View>
        <LinearGradient
          style={[styles.smallButtonBlurry, styles.navbarSpaceBlock]}
          locations={[0, 1]}
          colors={["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.1)"]}
        >
          <Image
            style={styles.btnLikes1Icon}
            contentFit="cover"
            source={require("../assets/candle2.png")}
          />
        </LinearGradient>
      </LinearGradient>
      <View style={[styles.header, styles.sliderFlexBox]}>
        <Image
          style={styles.btnLikes1Icon}
          contentFit="cover"
          source={require("../assets/menu.png")}
        />
        <Text style={styles.fileName}>GREENERY</Text>
        <Image
          style={styles.btnLikes1Icon}
          contentFit="cover"
          source={require("../assets/notification.png")}
        />
      </View>
      <View style={[styles.uiStatusBars, styles.bgIconPosition]}>
        <Image
          style={styles.batteryIcon}
          contentFit="cover"
          source={require("../assets/battery.png")}
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
          <Text style={styles.text12}>9:41</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bgIconPosition: {
    top: 0,
    position: "absolute",
  },
  navbarMenuParentPosition: {
    zIndex: 1,
    position: "absolute",
  },
  indoorTextSpaceBlock: {
    paddingHorizontal: Padding.p_xl,
    position: "absolute",
  },
  snakePlantsTypo: {
    textAlign: "left",
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
  },
  textSpaceBlock: {
    marginLeft: 2,
    textAlign: "left",
  },
  indoorTypo: {
    fontSize: FontSize.size_base,
    textAlign: "left",
  },
  headerPosition: {
    left: "50%",
    marginLeft: -215,
    position: "absolute",
  },
  sliderFlexBox: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  navbarSpaceBlock: {
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_xl,
    borderRadius: Border.br_mini,
    flexDirection: "row",
  },
  homeTypo: {
    marginLeft: 5,
    width: 51,
    fontSize: FontSize.size_base,
    alignItems: "center",
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    textAlign: "left",
    color: Color.colorDarkslategray,
  },
  snakeLayout: {
    width: 90,
    height: 90,
  },
  sliderLayout: {
    height: 10,
    borderRadius: Border.br_80xl,
  },
  cardNewsLayout: {
    width: 390,
    alignItems: "center",
  },
  oct20Typo: {
    fontSize: FontSize.size_sm,
    color: Color.brandColorBrokenWhite,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
  },
  bgIcon: {
    width: 430,
    left: 0,
    height: 932,
  },
  bgShadowBox: {
    zIndex: 0,
    height: 225,
    width: 160,
    backgroundColor: "transparent",
    borderWidth: 0.5,
    borderColor: Color.colorWhite,
    borderStyle: "solid",
    borderRadius: Border.br_mini,
    shadowOpacity: 1,
    elevation: 40,
    shadowRadius: 40,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  snakePlantsLargeSize: {
    top: 7,
    left: 50,
    width: 60,
    height: 151,
  },
  btnLikes1Icon: {
    width: 30,
    height: 30,
  },
  btnLikes: {
    left: 100,
    padding: Padding.p_mini,
    zIndex: 2,
    flexDirection: "row",
  },
  snakePlants: {
    fontSize: FontSize.size_xs,
    color: Color.colorDarkslategray,
  },
  starIcon: {
    width: 15,
    height: 15,
  },
  text: {
    fontSize: FontSize.size_3xs,
    fontFamily: FontFamily.poppinsSemiBold,
    marginLeft: 2,
    fontWeight: "600",
    color: Color.colorDarkslategray,
  },
  reviews: {
    fontSize: FontSize.size_5xs,
    color: Color.disabledColorGray,
    width: 53,
    alignItems: "center",
    display: "flex",
    fontFamily: FontFamily.poppinsRegular,
    height: 15,
  },
  starParent: {
    marginTop: 2,
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
  },
  text1: {
    color: Color.colorDarkslategray,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    fontSize: FontSize.size_base,
  },
  xsButtonIcon: {
    width: 25,
    height: 25,
    marginLeft: 39,
  },
  priceAdd: {
    marginTop: 10,
    flexDirection: "row",
  },
  detailPrice: {
    top: 125,
    paddingVertical: Padding.p_mini,
    zIndex: 3,
    justifyContent: "center",
    backgroundColor: Color.brandColorBrokenWhite,
    borderRadius: Border.br_mini,
    left: 0,
  },
  cardProduct: {
    flexDirection: "row",
  },
  cardProduct1: {
    marginLeft: 15,
    flexDirection: "row",
  },
  product: {
    top: 738,
    flexDirection: "row",
    left: 19,
    position: "absolute",
  },
  indoor: {
    color: Color.colorWhite,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    fontSize: FontSize.size_base,
  },
  indoorText: {
    top: 694,
    paddingVertical: 0,
    flexDirection: "row",
    left: 19,
  },
  product1: {
    top: 449,
    flexDirection: "row",
    left: 19,
    position: "absolute",
  },
  bgIcon1: {
    borderBottomRightRadius: Border.br_31xl,
    borderBottomLeftRadius: Border.br_31xl,
    height: 90,
    zIndex: 0,
    width: 430,
  },
  home: {
    display: "flex",
  },
  navbarMenu: {
    width: 129,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.brandColorBrokenWhite,
  },
  home1: {
    display: "none",
  },
  navbarMenu1: {
    alignItems: "center",
    justifyContent: "center",
  },
  navbarMenuParent: {
    top: 20,
    left: 20,
    width: 390,
    alignItems: "center",
    zIndex: 1,
    position: "absolute",
  },
  bottomNavbar: {
    bottom: 0,
  },
  frameChild: {
    width: 50,
    height: 2,
    backgroundColor: Color.colorWhite,
  },
  indoor1: {
    marginLeft: 32,
    color: Color.colorWhite,
    fontFamily: FontFamily.poppinsRegular,
  },
  categoriesBar: {
    top: 403,
    paddingVertical: 0,
    flexDirection: "row",
    left: 19,
  },
  helloweenSale50: {
    fontSize: FontSize.size_5xl,
    color: Color.brandColorBrokenWhite,
  },
  helloweenSale50OffParent: {
    justifyContent: "center",
  },
  snakePlantsSmallSize: {
    left: 0,
    top: 0,
    position: "absolute",
  },
  succulentsAndCactiSmallS: {
    top: 47,
    left: 45,
    width: 39,
    height: 43,
    position: "absolute",
  },
  cardNews: {
    padding: Padding.p_xl,
    width: 390,
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 0.5,
    borderColor: Color.colorWhite,
    shadowOpacity: 1,
    elevation: 40,
    shadowRadius: 40,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderStyle: "solid",
    borderRadius: Border.br_mini,
  },
  sliderChild: {
    width: 42,
    backgroundColor: Color.brandColorBrokenWhite,
  },
  sliderItem: {
    borderColor: Color.brandColorBrokenWhite,
    borderWidth: 1.5,
    width: 10,
    borderStyle: "solid",
    borderRadius: Border.br_80xl,
  },
  slider: {
    width: 72,
    marginTop: 20,
  },
  containerSale: {
    top: 220,
    alignItems: "center",
    left: 19,
    position: "absolute",
  },
  searchAnyPlants: {
    width: 246,
    marginLeft: 12,
    alignItems: "center",
    display: "flex",
  },
  searchNormalParent: {
    alignItems: "center",
    borderRadius: Border.br_mini,
    flexDirection: "row",
  },
  smallButtonBlurry: {
    marginLeft: 12,
    backgroundColor: "transparent",
    borderWidth: 0.5,
    borderColor: Color.colorWhite,
    shadowOpacity: 1,
    elevation: 40,
    shadowRadius: 40,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderStyle: "solid",
  },
  searchBlurry: {
    top: 150,
    paddingVertical: 0,
    paddingHorizontal: Padding.p_xl,
    position: "absolute",
    backgroundColor: "transparent",
    borderWidth: 0.5,
    borderColor: Color.colorWhite,
    shadowOpacity: 1,
    elevation: 40,
    shadowRadius: 40,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderStyle: "solid",
    borderRadius: Border.br_mini,
    flexDirection: "row",
    left: 19,
  },
  fileName: {
    fontSize: FontSize.size_xl,
    letterSpacing: 5,
    fontWeight: "800",
    fontFamily: FontFamily.interExtraBold,
    textAlign: "center",
    color: Color.brandColorBrokenWhite,
  },
  header: {
    top: 50,
    height: 100,
    paddingHorizontal: Padding.p_21xl,
    left: "50%",
    marginLeft: -215,
    position: "absolute",
    paddingVertical: 0,
    alignItems: "center",
    borderRadius: Border.br_mini,
    width: 430,
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
  text12: {
    height: "85.77%",
    top: "9.62%",
    left: "0%",
    fontSize: FontSize.size_mini,
    letterSpacing: -0.3,
    fontFamily: FontFamily.sFProText,
    textAlign: "center",
    color: Color.colorWhite,
    display: "flex",
    fontWeight: "600",
    alignItems: "flex-end",
    justifyContent: "center",
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
    left: 0,
  },
  dashboard: {
    borderRadius: Border.br_31xl,
    flex: 1,
    overflow: "hidden",
    height: 932,
    width: "100%",
    backgroundColor: Color.colorWhite,
  },
});

export default DASHBOARD;
