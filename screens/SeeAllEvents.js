import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";

const SeeAllEvents = () => {
  return (
    <View style={styles.seeAllEvents}>
      <View style={styles.groupParent}>
        <View style={[styles.rectangleParent, styles.groupParentLayout]}>
          <View style={styles.groupChildShadowBox} />
          <View style={styles.imGoingToShakeYParent}>
            <Text style={[styles.imGoingTo, styles.goingTypo1]}>
              A Virtual Evening of Smooth Jazz
            </Text>
            <View
              style={[
                styles.iconbookmarkWrapper,
                styles.iconbookmarkWrapperPosition,
              ]}
            >
              <View
                style={[
                  styles.iconbookmark,
                  styles.iconbookmarkWrapperPosition,
                ]}
              />
            </View>
            <View
              style={[styles.satMay1200PmWrapper, styles.satWrapperPosition]}
            >
              <Text style={styles.satMay1}>Sat, May 1 • 2:00 PM</Text>
            </View>
            <View style={[styles.minParent, styles.minParentPosition]}>
              <Text style={[styles.min, styles.minPosition]}>
                Lot 13 • Oakland, CA
              </Text>
              <Image
                style={[styles.groupItem, styles.groupPosition]}
                contentFit="cover"
                source={require("../assets/group-62.png")}
              />
            </View>
          </View>
          <Image
            style={styles.groupInner}
            contentFit="cover"
            source={require("../assets/group-33349.png")}
          />
        </View>
        <View style={[styles.rectangleGroup, styles.groupParentLayout]}>
          <View style={styles.groupChildShadowBox} />
          <View style={styles.imGoingToShakeYParent}>
            <Text style={[styles.imGoingTo1, styles.goingTypo]}>
              International Kids Safe Parents Night Out
            </Text>
            <View
              style={[
                styles.iconbookmarkWrapper,
                styles.iconbookmarkWrapperPosition,
              ]}
            >
              <View
                style={[
                  styles.iconbookmark,
                  styles.iconbookmarkWrapperPosition,
                ]}
              />
            </View>
            <View
              style={[styles.friApr23600PmWrapper, styles.satWrapperPosition]}
            >
              <Text style={styles.satMay1}>Fri, Apr 23 • 6:00 PM</Text>
            </View>
            <View style={[styles.minParent, styles.minParentPosition]}>
              <Text style={[styles.min, styles.minPosition]}>
                Lot 13 • Oakland, CA
              </Text>
              <Image
                style={[styles.groupItem, styles.groupPosition]}
                contentFit="cover"
                source={require("../assets/group-62.png")}
              />
            </View>
          </View>
          <Image
            style={styles.groupInner}
            contentFit="cover"
            source={require("../assets/international-kids-safe.png")}
          />
        </View>
        <View style={[styles.rectangleContainer, styles.groupParentLayout]}>
          <View style={styles.groupChildShadowBox} />
          <View style={styles.imGoingToShakeYParent}>
            <Text
              style={[styles.imGoingTo2, styles.goingTypo1]}
            >{`Collectivity Plays the Music of Jimi `}</Text>
            <View
              style={[
                styles.iconbookmarkWrapper,
                styles.iconbookmarkWrapperPosition,
              ]}
            >
              <View
                style={[
                  styles.iconbookmark,
                  styles.iconbookmarkWrapperPosition,
                ]}
              />
            </View>
            <View
              style={[styles.monJun211000PmWrapper, styles.satWrapperPosition]}
            >
              <Text style={styles.satMay1}>Mon, Jun 21 • 10:00 PM</Text>
            </View>
            <View style={[styles.minContainer, styles.minParentPosition]}>
              <Text
                style={[styles.min2, styles.minPosition]}
              >{`Longboard Margarita Bar `}</Text>
              <Image
                style={[styles.groupItem, styles.groupPosition]}
                contentFit="cover"
                source={require("../assets/group-62.png")}
              />
            </View>
          </View>
          <Image
            style={styles.groupInner}
            contentFit="cover"
            source={require("../assets/group-333491.png")}
          />
        </View>
        <View style={[styles.groupView, styles.groupParentLayout]}>
          <View style={styles.groupChildShadowBox} />
          <View style={styles.imGoingToShakeYParent}>
            <Text style={[styles.imGoingTo1, styles.goingTypo]}>
              Women's Leadership Conference 2021
            </Text>
            <View
              style={[
                styles.iconbookmarkWrapper,
                styles.iconbookmarkWrapperPosition,
              ]}
            >
              <View
                style={[
                  styles.iconbookmark,
                  styles.iconbookmarkWrapperPosition,
                ]}
              />
            </View>
            <View
              style={[styles.satApr24130PmWrapper, styles.satWrapperPosition]}
            >
              <Text style={styles.satMay1}>Sat, Apr 24 • 1:30 PM</Text>
            </View>
            <View style={[styles.minParent1, styles.minParentPosition]}>
              <Text style={[styles.min3, styles.minPosition]}>
                53 Bush St • San Francisco, CA
              </Text>
              <Image
                style={[styles.groupItem, styles.groupPosition]}
                contentFit="cover"
                source={require("../assets/group-62.png")}
              />
            </View>
          </View>
          <Image
            style={styles.groupInner}
            contentFit="cover"
            source={require("../assets/womens-leadership.png")}
          />
        </View>
        <View style={[styles.rectangleParent1, styles.groupParentLayout]}>
          <View style={styles.groupChildShadowBox} />
          <View style={styles.imGoingToShakeYParent}>
            <Text style={[styles.imGoingTo4, styles.goingTypo1]}>
              Jo Malone London’s Mother’s Day Presents
            </Text>
            <View
              style={[
                styles.iconbookmarkWrapper,
                styles.iconbookmarkWrapperPosition,
              ]}
            >
              <View
                style={[
                  styles.iconbookmark,
                  styles.iconbookmarkWrapperPosition,
                ]}
              />
            </View>
            <View
              style={[styles.wedApr28530PmWrapper, styles.satWrapperPosition]}
            >
              <Text style={styles.satMay1}>Wed, Apr 28 • 5:30 PM</Text>
            </View>
            <View style={[styles.minParent2, styles.minParentPosition]}>
              <Text style={[styles.min4, styles.minPosition]}>
                Radius Gallery • Santa Cruz, CA
              </Text>
              <Image
                style={[styles.groupItem, styles.groupPosition]}
                contentFit="cover"
                source={require("../assets/group-62.png")}
              />
            </View>
          </View>
          <Image
            style={styles.groupInner}
            contentFit="cover"
            source={require("../assets/group-333492.png")}
          />
        </View>
        <View style={[styles.rectangleParent2, styles.groupParentLayout]}>
          <View style={styles.groupChildShadowBox} />
          <View style={styles.imGoingToShakeYParent}>
            <Text style={[styles.imGoingTo5, styles.goingTypo]}>
              International Gala Music Festival
            </Text>
            <View
              style={[
                styles.iconbookmarkWrapper,
                styles.iconbookmarkWrapperPosition,
              ]}
            >
              <View
                style={[
                  styles.iconbookmark,
                  styles.iconbookmarkWrapperPosition,
                ]}
              />
            </View>
            <View
              style={[styles.sunApr251015AmWrapper, styles.satWrapperPosition]}
            >
              <Text style={styles.satMay1}>Sun, Apr 25 • 10:15 AM</Text>
            </View>
            <View style={[styles.minParent3, styles.minParentPosition]}>
              <Text style={styles.min5}>{`36 Guild Street London, UK  `}</Text>
              <Image
                style={[styles.groupChild12, styles.groupPosition]}
                contentFit="cover"
                source={require("../assets/group-63.png")}
              />
            </View>
          </View>
          <Image
            style={styles.groupInner}
            contentFit="cover"
            source={require("../assets/group-333493.png")}
          />
        </View>
      </View>
      <View style={[styles.barsStatusBarIphoneL, styles.barPosition]}>
        <View style={[styles.battery, styles.batteryPosition]}>
          <View style={[styles.border, styles.borderLayout]} />
          <Image
            style={[styles.capIcon, styles.capIconPosition]}
            contentFit="cover"
            source={require("../assets/cap.png")}
          />
          <View style={[styles.capacity, styles.capacityLayout]} />
        </View>
        <Image
          style={styles.wifiIcon}
          contentFit="cover"
          source={require("../assets/wifi.png")}
        />
        <Image
          style={styles.cellularConnectionIcon}
          contentFit="cover"
          source={require("../assets/cellular-connection.png")}
        />
        <View style={[styles.timeStyle, styles.timeLayout]}>
          <Text style={[styles.time, styles.timeTypo]}>9:41</Text>
        </View>
      </View>
      <View style={[styles.titleBar2, styles.barPosition]}>
        <Text style={[styles.helloAshfak, styles.goingTypo1]}>Events</Text>
        <Image
          style={[styles.backIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/back.png")}
        />
        <View
          style={[
            styles.barsStatusBarIphoneLWrapper,
            styles.iconbookmarkWrapperPosition,
          ]}
        >
          <View
            style={[styles.iconbookmark, styles.iconbookmarkWrapperPosition]}
          >
            <View style={[styles.batteryParent, styles.batteryPosition]}>
              <View style={[styles.battery1, styles.capIconPosition]}>
                <View style={[styles.border1, styles.borderLayout]} />
                <Image
                  style={[styles.capIcon, styles.capIconPosition]}
                  contentFit="cover"
                  source={require("../assets/cap1.png")}
                />
                <View style={[styles.capacity1, styles.capacityLayout]} />
              </View>
              <Image
                style={styles.wifiIcon}
                contentFit="cover"
                source={require("../assets/wifi1.png")}
              />
              <Image
                style={styles.cellularConnectionIcon}
                contentFit="cover"
                source={require("../assets/cellular-connection1.png")}
              />
              <View style={[styles.timeStyle1, styles.timeLayout]}>
                <Text style={[styles.time1, styles.timeTypo]}>9:41</Text>
              </View>
            </View>
          </View>
        </View>
        <Image
          style={[styles.moreIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/more.png")}
        />
      </View>
      <Image
        style={styles.searchIcon}
        contentFit="cover"
        source={require("../assets/search1.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  groupParentLayout: {
    height: 106,
    left: 0,
    width: 327,
    position: "absolute",
  },
  goingTypo1: {
    textAlign: "left",
    fontFamily: FontFamily.title1Eventhub,
    fontWeight: "500",
    color: Color.colorTypographyTitle,
    position: "absolute",
  },
  iconbookmarkWrapperPosition: {
    right: "0%",
    top: "0%",
    position: "absolute",
  },
  satWrapperPosition: {
    height: 17,
    top: 1,
    left: 0,
    position: "absolute",
  },
  minParentPosition: {
    marginTop: 26,
    height: 17,
    left: "0%",
    top: "50%",
    position: "absolute",
  },
  minPosition: {
    color: Color.colorTypographySubColor,
    marginTop: -8.5,
    fontSize: FontSize.subTitle1_size,
    textAlign: "left",
    fontFamily: FontFamily.title1Eventhub,
    top: "50%",
    position: "absolute",
  },
  groupPosition: {
    top: 1,
    left: 0,
    position: "absolute",
  },
  goingTypo: {
    width: "98.02%",
    textAlign: "left",
    fontFamily: FontFamily.title1Eventhub,
    fontWeight: "500",
    fontSize: FontSize.body2_size,
    left: "0%",
    marginTop: -21,
    top: "50%",
    position: "absolute",
  },
  barPosition: {
    width: 375,
    left: 0,
    position: "absolute",
  },
  batteryPosition: {
    right: 15,
    position: "absolute",
  },
  borderLayout: {
    opacity: 0.35,
    width: 22,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 3,
    right: 2,
    height: 11,
    top: 0,
    position: "absolute",
  },
  capIconPosition: {
    right: 0,
    position: "absolute",
  },
  capacityLayout: {
    height: 7,
    width: 18,
    borderRadius: 1,
    right: 4,
    top: 2,
    position: "absolute",
  },
  timeLayout: {
    height: 21,
    width: 54,
    position: "absolute",
  },
  timeTypo: {
    textAlign: "center",
    fontFamily: FontFamily.sFProText,
    fontWeight: "600",
    letterSpacing: 0,
    marginTop: -3.5,
    width: 54,
    fontSize: FontSize.body2_size,
    top: "50%",
    left: 0,
    position: "absolute",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    bottom: "6.25%",
    top: "66.25%",
    width: "5.87%",
    height: "27.5%",
    position: "absolute",
    overflow: "hidden",
  },
  groupChildShadowBox: {
    borderRadius: Border.br_base,
    shadowOpacity: 1,
    elevation: 35,
    shadowRadius: 35,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowColor: "rgba(87, 92, 138, 0.06)",
    top: 0,
    height: 106,
    left: 0,
    width: 327,
    position: "absolute",
    backgroundColor: Color.colorWhite,
  },
  imGoingTo: {
    width: "93.19%",
    fontSize: FontSize.body2_size,
    marginTop: -21,
    textAlign: "left",
    fontFamily: FontFamily.title1Eventhub,
    fontWeight: "500",
    left: "0%",
    top: "50%",
  },
  iconbookmark: {
    height: "100%",
    bottom: "0%",
    left: "0%",
    top: "0%",
    width: "100%",
  },
  iconbookmarkWrapper: {
    height: "18.6%",
    width: "7.77%",
    bottom: "81.4%",
    left: "92.23%",
  },
  satMay1: {
    color: Color.colorPrimaryBlue,
    fontSize: FontSize.subTitle1_size,
    textAlign: "left",
    fontFamily: FontFamily.title1Eventhub,
    top: 0,
    left: 0,
    position: "absolute",
  },
  satMay1200PmWrapper: {
    width: 117,
  },
  min: {
    left: "14.18%",
  },
  groupItem: {
    width: 14,
    height: 14,
  },
  minParent: {
    width: "68.08%",
    right: "31.92%",
  },
  imGoingToShakeYParent: {
    marginTop: -45,
    width: "63.33%",
    right: "4.56%",
    left: "32.11%",
    height: 86,
    top: "50%",
    position: "absolute",
  },
  groupInner: {
    left: 8,
    width: 79,
    height: 92,
    top: 7,
    position: "absolute",
  },
  rectangleParent: {
    top: 118,
  },
  imGoingTo1: {
    color: Color.colorTypographyTitle,
  },
  friApr23600PmWrapper: {
    width: 120,
  },
  rectangleGroup: {
    top: 354,
  },
  imGoingTo2: {
    width: "99.95%",
    fontSize: FontSize.body2_size,
    marginTop: -21,
    textAlign: "left",
    fontFamily: FontFamily.title1Eventhub,
    fontWeight: "500",
    left: "0%",
    top: "50%",
  },
  monJun211000PmWrapper: {
    width: 134,
  },
  min2: {
    left: "11.83%",
  },
  minContainer: {
    width: "81.6%",
    right: "18.4%",
  },
  rectangleContainer: {
    top: 477,
  },
  satApr24130PmWrapper: {
    width: 122,
  },
  min3: {
    left: "10.95%",
  },
  minParent1: {
    width: "97.05%",
    right: "2.95%",
  },
  groupView: {
    top: 236,
  },
  imGoingTo4: {
    width: "99.47%",
    fontSize: FontSize.body2_size,
    marginTop: -21,
    textAlign: "left",
    fontFamily: FontFamily.title1Eventhub,
    fontWeight: "500",
    left: "0%",
    top: "50%",
  },
  wedApr28530PmWrapper: {
    width: 132,
  },
  min4: {
    left: "9.76%",
  },
  minParent2: {
    width: "98.99%",
    right: "1.01%",
  },
  rectangleParent1: {
    top: 0,
  },
  imGoingTo5: {
    color: Color.colorBlack,
  },
  sunApr251015AmWrapper: {
    width: 131,
  },
  min5: {
    left: "12.02%",
    color: "#989aa6",
    marginTop: -8.5,
    fontSize: FontSize.subTitle1_size,
    textAlign: "left",
    fontFamily: FontFamily.title1Eventhub,
    top: "50%",
    position: "absolute",
  },
  groupChild12: {
    width: 16,
    height: 16,
  },
  minParent3: {
    width: "88.36%",
    right: "11.64%",
  },
  rectangleParent2: {
    top: 595,
  },
  groupParent: {
    top: 104,
    left: 24,
    height: 701,
    width: 327,
    position: "absolute",
  },
  border: {
    borderColor: Color.colorWhite,
  },
  capIcon: {
    top: 4,
    width: 1,
    height: 4,
    opacity: 0.4,
  },
  capacity: {
    backgroundColor: Color.colorWhite,
    height: 7,
    width: 18,
    borderRadius: 1,
    right: 4,
    top: 2,
  },
  battery: {
    top: 17,
    height: 11,
    width: 24,
  },
  wifiIcon: {
    width: 15,
    height: 11,
  },
  cellularConnectionIcon: {
    width: 17,
    height: 11,
  },
  time: {
    color: Color.colorWhite,
  },
  timeStyle: {
    left: 21,
    top: 7,
  },
  barsStatusBarIphoneL: {
    top: -1,
    height: 44,
  },
  helloAshfak: {
    top: "61.25%",
    left: "15.2%",
    fontSize: FontSize.h4Eventhub_size,
  },
  backIcon: {
    right: "87.73%",
    left: "6.4%",
  },
  border1: {
    borderColor: Color.colorTypographyTitle,
  },
  capacity1: {
    backgroundColor: Color.colorTypographyTitle,
  },
  battery1: {
    top: 10,
    height: 11,
    width: 24,
  },
  time1: {
    color: Color.colorTypographyTitle,
  },
  timeStyle1: {
    top: 0,
    left: 0,
    height: 21,
    width: 54,
  },
  batteryParent: {
    width: 339,
    height: 22,
    top: 7,
  },
  barsStatusBarIphoneLWrapper: {
    height: "55%",
    bottom: "45%",
    left: "0%",
    top: "0%",
    width: "100%",
  },
  moreIcon: {
    right: "6.4%",
    left: "87.73%",
  },
  titleBar2: {
    height: 80,
    top: 0,
  },
  searchIcon: {
    top: 53,
    left: 289,
    height: 24,
    width: 24,
    position: "absolute",
    overflow: "hidden",
  },
  seeAllEvents: {
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.colorWhite,
  },
});

export default SeeAllEvents;
