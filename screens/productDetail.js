import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Padding, Border, Color, FontFamily, FontSize } from "../GlobalStyles";

const PRODUCTDETAILFINAL = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.productDetailFinal}>
      <Image
        style={[styles.bgIcon, styles.bgIconPosition]}
        contentFit="cover"
        source={require("../assets/bg.png")}
      />
      <Image
        style={[styles.productDetailFinalChild, styles.buttonBacklogoPosition]}
        contentFit="cover"
        source={require("../assets/rectangle-10.png")}
      />
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
          <Text style={[styles.text, styles.textFlexBox]}>9:41</Text>
        </View>
      </View>
      <View style={[styles.buttonBacklogo, styles.buttonBacklogoPosition]}>
        <Pressable
          style={[styles.backButton, styles.buttonSpaceBlock]}
          onPress={() => navigation.navigate("DASHBOARD")}
        >
          <Image
            style={styles.backButtonChild}
            contentFit="cover"
            source={require("../assets/group-6.png")}
          />
        </Pressable>
        <Image
          style={styles.logoGreeneryIcon}
          contentFit="cover"
          source={require("../assets/logogreenery1.png")}
        />
      </View>
      <View style={styles.productDescription}>
        <View>
          <View style={styles.tittlePlantParent}>
            <View style={styles.tittlePlant}>
              <View style={styles.plantName}>
                <Text style={styles.peaceLily}>Peace Lily</Text>
              </View>
              <View style={styles.plantPrice}>
                <Text style={styles.peaceLily}>$15.00</Text>
              </View>
            </View>
            <View style={[styles.addItem, styles.addItemFlexBox]}>
              <Image
                style={styles.iconLayout}
                contentFit="cover"
                source={require("../assets/xsbutton1.png")}
              />
              <View style={[styles.count, styles.iconLayout]}>
                <Text style={[styles.text2, styles.text2Typo]}>0</Text>
              </View>
              <Image
                style={styles.iconLayout}
                contentFit="cover"
                source={require("../assets/xsbutton2.png")}
              />
            </View>
          </View>
          <View style={[styles.infoDetail, styles.infoSpaceBlock]}>
            <View style={styles.speciesFlexBox}>
              <Text style={[styles.indoor, styles.text2Typo]}>Indoor</Text>
            </View>
            <View style={[styles.species, styles.speciesFlexBox]}>
              <Text style={[styles.indoor, styles.text2Typo]}>
                Spathiphyllum
              </Text>
            </View>
          </View>
          <View style={[styles.infoRating, styles.infoSpaceBlock]}>
            <Image
              style={styles.iconLayout}
              contentFit="cover"
              source={require("../assets/star1.png")}
            />
            <Text style={[styles.text3, styles.text3Typo]}>4.5</Text>
            <Text style={[styles.reviews, styles.text3Typo]}>
              (100 reviews)
            </Text>
          </View>
          <Text style={styles.loremIpsumDolor}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
          <View style={[styles.infoPlantDetailParent, styles.infoSpaceBlock]}>
            <View style={styles.infoFlexBox}>
              <View
                style={[styles.iconHeightWrapper, styles.wrapperSpaceBlock]}
              >
                <Image
                  style={styles.backButtonChild}
                  contentFit="cover"
                  source={require("../assets/iconheight.png")}
                />
              </View>
              <View style={styles.humadity}>
                <Text style={[styles.height, styles.text4Layout]}>Height</Text>
                <View>
                  <View style={styles.tittlePlant}>
                    <Text style={[styles.text4, styles.text4Layout]}>5’</Text>
                    <Text style={[styles.text4, styles.text4Layout]}>5”</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.infoPlantDetail1, styles.infoFlexBox]}>
              <View
                style={[styles.iconHeightWrapper, styles.wrapperSpaceBlock]}
              >
                <Image
                  style={styles.backButtonChild}
                  contentFit="cover"
                  source={require("../assets/drop.png")}
                />
              </View>
              <View style={styles.humadity}>
                <Text style={[styles.height, styles.text4Layout]}>
                  Humadity
                </Text>
                <View>
                  <View style={styles.tittlePlant}>
                    <Text style={[styles.text4, styles.text4Layout]}>65</Text>
                    <Text style={[styles.text4, styles.text4Layout]}>%</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.infoPlantDetail1, styles.infoFlexBox]}>
              <View
                style={[styles.iconHeightWrapper, styles.wrapperSpaceBlock]}
              >
                <Image
                  style={styles.backButtonChild}
                  contentFit="cover"
                  source={require("../assets/maximize4.png")}
                />
              </View>
              <View style={styles.humadity}>
                <Text style={[styles.height, styles.text4Layout]}>Size</Text>
                <View>
                  <View style={styles.tittlePlant}>
                    <Text style={[styles.text4, styles.text4Layout]}>
                      Large
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.infoPlantDetail1, styles.infoFlexBox]}>
              <View style={[styles.calculatorWrapper, styles.buttonShadowBox]}>
                <Image
                  style={styles.backButtonChild}
                  contentFit="cover"
                  source={require("../assets/calculator.png")}
                />
              </View>
              <View style={styles.humadity}>
                <Text style={[styles.height, styles.text4Layout]}>Weight</Text>
                <View>
                  <View style={styles.tittlePlant}>
                    <Text style={[styles.text4, styles.text4Layout]}>5</Text>
                    <Text style={[styles.text4, styles.text4Layout]}>kg</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.button}>
          <View style={[styles.buttonShop, styles.buttonShadowBox]}>
            <Image
              style={styles.backButtonChild}
              contentFit="cover"
              source={require("../assets/bag1.png")}
            />
          </View>
          <View style={[styles.buttondefaultBlury, styles.addItemFlexBox]}>
            <Text style={[styles.signIn, styles.text2Typo]}>Add to cart</Text>
          </View>
          <View style={[styles.buttonShop1, styles.buttonShadowBox]}>
            <Image
              style={styles.backButtonChild}
              contentFit="cover"
              source={require("../assets/heart1.png")}
            />
          </View>
        </View>
      </View>
      <Image
        style={[styles.snakePlantsSmallSize, styles.buttonBacklogoPosition]}
        contentFit="cover"
        source={require("../assets/snake-plants----small-size--indoor1.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bgIconPosition: {
    width: 430,
    left: 0,
    top: 0,
    position: "absolute",
  },
  buttonBacklogoPosition: {
    left: "50%",
    position: "absolute",
  },
  textFlexBox: {
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
  },
  buttonSpaceBlock: {
    padding: Padding.p_3xs,
    borderRadius: Border.br_mini,
  },
  addItemFlexBox: {
    backgroundColor: Color.colorDarkslategray,
    alignItems: "center",
    flexDirection: "row",
  },
  iconLayout: {
    height: 25,
    width: 25,
  },
  text2Typo: {
    color: Color.brandColorBrokenWhite,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
  },
  infoSpaceBlock: {
    marginTop: 14,
    flexDirection: "row",
  },
  speciesFlexBox: {
    paddingVertical: Padding.p_9xs,
    paddingHorizontal: Padding.p_3xs,
    borderRadius: Border.br_8xs,
    backgroundColor: Color.colorDarkslategray,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  text3Typo: {
    marginLeft: 5,
    fontSize: FontSize.size_base,
    textAlign: "left",
  },
  wrapperSpaceBlock: {
    padding: Padding.p_mini,
    borderRadius: Border.br_80xl,
    backgroundColor: Color.colorDarkslategray,
  },
  text4Layout: {
    lineHeight: 20,
    textAlign: "justify",
    color: Color.colorDarkslategray,
  },
  infoFlexBox: {
    width: 160,
    alignItems: "center",
    flexDirection: "row",
  },
  buttonShadowBox: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: -2,
      height: -2,
    },
    shadowColor: "#fff",
    flexDirection: "row",
  },
  bgIcon: {
    height: 932,
  },
  productDetailFinalChild: {
    marginLeft: -215,
    left: "50%",
    width: 430,
    top: 0,
    height: 932,
    borderRadius: Border.br_31xl,
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
  text: {
    height: "85.77%",
    top: "9.62%",
    left: "0%",
    fontSize: FontSize.size_mini,
    letterSpacing: -0.3,
    fontFamily: FontFamily.sFProText,
    color: Color.colorWhite,
    alignItems: "flex-end",
    justifyContent: "center",
    fontWeight: "600",
    display: "flex",
    textAlign: "center",
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
  },
  backButtonChild: {
    width: 30,
    height: 30,
  },
  backButton: {
    width: 50,
    padding: Padding.p_3xs,
    backgroundColor: Color.brandColorBrokenWhite,
    borderRadius: Border.br_mini,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  logoGreeneryIcon: {
    width: 47,
    height: 50,
  },
  buttonBacklogo: {
    top: 50,
    paddingHorizontal: Padding.p_21xl,
    paddingVertical: Padding.p_6xl,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: -215,
    left: "50%",
    width: 430,
  },
  peaceLily: {
    fontSize: FontSize.size_5xl,
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    textAlign: "left",
    color: Color.colorDarkslategray,
  },
  plantName: {
    borderStyle: "solid",
    borderColor: Color.colorDarkslategray,
    borderRightWidth: 3,
    paddingRight: Padding.p_mini,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  plantPrice: {
    paddingLeft: Padding.p_mini,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  tittlePlant: {
    flexDirection: "row",
  },
  text2: {
    alignSelf: "stretch",
    height: 24,
    fontSize: FontSize.size_base,
    color: Color.brandColorBrokenWhite,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    textAlign: "center",
  },
  count: {
    alignItems: "center",
  },
  addItem: {
    borderRadius: Border.br_3xs,
    width: 85,
    height: 30,
    justifyContent: "space-between",
  },
  tittlePlantParent: {
    width: 340,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  indoor: {
    fontSize: FontSize.size_xs,
    textAlign: "left",
  },
  species: {
    marginLeft: 10,
  },
  infoDetail: {
    justifyContent: "center",
  },
  text3: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    color: Color.colorDarkslategray,
  },
  reviews: {
    color: Color.disabledColorGray,
    fontFamily: FontFamily.poppinsRegular,
  },
  infoRating: {
    alignItems: "center",
    justifyContent: "center",
  },
  loremIpsumDolor: {
    lineHeight: 24,
    color: Color.brandColorPineGreen,
    height: 100,
    textAlign: "justify",
    fontFamily: FontFamily.poppinsRegular,
    marginTop: 14,
    fontSize: FontSize.size_base,
    width: 340,
    alignItems: "center",
    display: "flex",
  },
  iconHeightWrapper: {
    flexDirection: "row",
  },
  height: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
  },
  text4: {
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_xs,
  },
  humadity: {
    marginLeft: 15,
  },
  infoPlantDetail1: {
    marginLeft: 20,
  },
  calculatorWrapper: {
    padding: Padding.p_mini,
    borderRadius: Border.br_80xl,
    backgroundColor: Color.colorDarkslategray,
  },
  infoPlantDetailParent: {
    flexWrap: "wrap",
    width: 340,
  },
  buttonShop: {
    padding: Padding.p_3xs,
    borderRadius: Border.br_mini,
    width: 50,
    backgroundColor: Color.brandColorBrokenWhite,
    justifyContent: "space-between",
  },
  signIn: {
    fontSize: FontSize.size_base,
    color: Color.brandColorBrokenWhite,
    textAlign: "left",
  },
  buttondefaultBlury: {
    marginLeft: 20,
    padding: Padding.p_3xs,
    borderRadius: Border.br_mini,
    backgroundColor: Color.colorDarkslategray,
    justifyContent: "center",
    height: 50,
    overflow: "hidden",
    flex: 1,
  },
  buttonShop1: {
    marginLeft: 20,
    padding: Padding.p_3xs,
    borderRadius: Border.br_mini,
    width: 50,
    backgroundColor: Color.brandColorBrokenWhite,
    justifyContent: "space-between",
  },
  button: {
    marginTop: 50,
    width: 340,
    alignItems: "center",
    flexDirection: "row",
  },
  productDescription: {
    bottom: 0,
    borderTopLeftRadius: Border.br_6xl,
    borderTopRightRadius: Border.br_6xl,
    padding: Padding.p_21xl,
    backgroundColor: Color.brandColorBrokenWhite,
    left: "50%",
    marginLeft: -215,
    width: 430,
    position: "absolute",
  },
  snakePlantsSmallSize: {
    marginLeft: -69,
    top: 115,
    width: 138,
    height: 208,
  },
  productDetailFinal: {
    backgroundColor: Color.colorWhite,
    overflow: "hidden",
    height: 932,
    width: "100%",
    flex: 1,
    borderRadius: Border.br_31xl,
  },
});

export default PRODUCTDETAILFINAL;
