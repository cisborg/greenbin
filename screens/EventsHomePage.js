import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, Border, FontSize } from "../GlobalStyles";

const Home = () => {
  return (
    <View style={styles.home}>
      <View style={[styles.popularParent, styles.popularPosition]}>
        <Text style={[styles.popular, styles.popularTypo]}>Nearby You</Text>
        <View style={[styles.allCopyParent, styles.groupChild12Layout]}>
          <Text style={styles.allCopy}>See All</Text>
          <Image
            style={styles.groupChild}
            contentFit="cover"
            source={require("../assets/vector-1.png")}
          />
        </View>
      </View>
      <View style={[styles.rectangleParent, styles.rectangleParentPosition1]}>
        <View style={[styles.groupItem, styles.groupChildShadowBox1]} />
        <Image
          style={[styles.womensLeadership, styles.iconGroupLayout]}
          contentFit="cover"
          source={require("../assets/womens-leadership.png")}
        />
        <View style={styles.groupParent}>
          <View style={styles.imGoingToShakeYParent}>
            <Text style={[styles.imGoingTo, styles.timeTypo]}>
              Women's leadership conference
            </Text>
            <View style={styles.minParent}>
              <Text style={[styles.min, styles.minTypo1]}>
                Radius Gallery • Santa Cruz
              </Text>
              <Image
                style={[styles.groupInner, styles.groupLayout1]}
                contentFit="cover"
                source={require("../assets/group-6.png")}
              />
            </View>
          </View>
          <Text style={[styles.stMaySat, styles.exploreTypo]}>
            1st May- Sat -2:00 PM
          </Text>
        </View>
        <Image
          style={[styles.favoriteActiveIcon, styles.iconGroupLayout]}
          contentFit="cover"
          source={require("../assets/favorite-active.png")}
        />
      </View>
      <View style={[styles.rectangleGroup, styles.rectangleParentPosition1]}>
        <View style={[styles.rectangleView, styles.groupChildShadowBox1]} />
        <Image
          style={[styles.womensLeadership, styles.iconGroupLayout]}
          contentFit="cover"
          source={require("../assets/international-kids-safe.png")}
        />
        <View style={styles.groupParent}>
          <View style={styles.imGoingToShakeYParent}>
            <Text style={[styles.imGoingTo, styles.timeTypo]}>
              International kids safe parents night out
            </Text>
            <View style={styles.minParent}>
              <Text style={[styles.min, styles.minTypo1]}>
                Radius Gallery • Santa Cruz
              </Text>
              <Image
                style={[styles.groupInner, styles.groupLayout1]}
                contentFit="cover"
                source={require("../assets/group-6.png")}
              />
            </View>
          </View>
          <Text style={[styles.stMaySat, styles.exploreTypo]}>
            1st May- Sat -2:00 PM
          </Text>
        </View>
        <Image
          style={[styles.favoriteActiveIcon, styles.iconGroupLayout]}
          contentFit="cover"
          source={require("../assets/favorite-iactive.png")}
        />
      </View>
      <View style={[styles.homeChild, styles.homeChildLayout]} />
      <View style={styles.groupView}>
        <View style={[styles.rectangleContainer, styles.groupChild1Layout]}>
          <View style={[styles.groupChild1, styles.groupChildShadowBox]} />
          <View style={[styles.groupParent1, styles.groupParentLayout]}>
            <Image
              style={[styles.groupChild2, styles.groupChildLayout1]}
              contentFit="cover"
              source={require("../assets/group-18215.png")}
            />
            <Text style={[styles.music, styles.foodPosition]}>Music</Text>
          </View>
        </View>
        <View style={styles.groupChild3Position}>
          <View style={[styles.groupChild3, styles.groupChild3Position]} />
          <View style={[styles.groupParent2, styles.groupParentLayout]}>
            <Image
              style={[styles.groupChild4, styles.groupChildLayout1]}
              contentFit="cover"
              source={require("../assets/group-18217.png")}
            />
            <Text style={[styles.sports, styles.foodPosition]}>Sports</Text>
          </View>
        </View>
        <View style={[styles.rectangleParent2, styles.groupChild5Layout]}>
          <View style={[styles.groupChild5, styles.groupChild5Layout]} />
          <View style={[styles.groupParent3, styles.groupParentLayout]}>
            <Image
              style={[styles.groupChild2, styles.groupChildLayout1]}
              contentFit="cover"
              source={require("../assets/group-18214.png")}
            />
            <Text style={[styles.food, styles.foodPosition]}>Food</Text>
          </View>
        </View>
        <View style={[styles.rectangleParent3, styles.groupChild7Layout]}>
          <View style={[styles.groupChild7, styles.groupChild7Layout]} />
          <View style={[styles.groupParent4, styles.groupParentLayout]}>
            <Image
              style={[styles.groupChild4, styles.groupChildLayout1]}
              contentFit="cover"
              source={require("../assets/group-18216.png")}
            />
            <Text style={styles.art}>Art</Text>
          </View>
        </View>
      </View>
      <View style={[styles.homeInner, styles.homeInnerLayout]}>
        <View style={[styles.searchParent, styles.homeInnerLayout]}>
          <Image
            style={[styles.searchIcon, styles.groupLayout]}
            contentFit="cover"
            source={require("../assets/search.png")}
          />
          <Text style={[styles.search, styles.searchTypo]}>Search...</Text>
          <View style={[styles.lineView, styles.capIconLayout]} />
          <View style={[styles.rectangleParent4, styles.groupChild9Layout]}>
            <View style={[styles.groupChild9, styles.groupChild9Layout]} />
            <View style={[styles.groupParent5, styles.groupLayout]}>
              <Image
                style={[styles.groupChild10, styles.groupLayout]}
                contentFit="cover"
                source={require("../assets/group-18240.png")}
              />
              <Text style={[styles.filters, styles.goingTypo]}>Filters</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={[styles.combinedShape2Parent, styles.rectangleParentPosition1]}
      >
        <Image
          style={[styles.combinedShape2, styles.iconGroupLayout]}
          contentFit="cover"
          source={require("../assets/combined-shape-2.png")}
        />
        <Image
          style={[styles.groupChild11, styles.frameParentPosition]}
          contentFit="cover"
          source={require("../assets/group-18103.png")}
        />
        <View style={[styles.frameParent, styles.frameParentPosition]}>
          <View style={styles.currentLocationParent}>
            <Text style={[styles.currentLocation, styles.goingTypo]}>
              Current Location
            </Text>
            <Image
              style={[styles.icon, styles.iconGroupLayout]}
              contentFit="cover"
              source={require("../assets/.png")}
            />
          </View>
          <Text style={[styles.dhakaBangladesh, styles.minTypo1]}>
            New Yourk, USA
          </Text>
        </View>
      </View>
      <View style={[styles.vectorParent, styles.iconGroupPosition]}>
        <Image
          style={[styles.rectangleIcon, styles.iconGroupLayout]}
          contentFit="cover"
          source={require("../assets/rectangle-83.png")}
        />
        <View style={[styles.iconlyboldcalendarParent, styles.parentPosition]}>
          <Image
            style={[styles.iconlyboldcalendar, styles.groupChildPosition1]}
            contentFit="cover"
            source={require("../assets/iconlyboldcalendar.png")}
          />
          <Text style={[styles.events, styles.goingTypo]}>Events</Text>
        </View>
        <Text style={[styles.explore, styles.exploreTypo]}>Explore</Text>
        <Image
          style={[styles.groupChild12, styles.groupChild12Layout]}
          contentFit="cover"
          source={require("../assets/group-33335.png")}
        />
        <View
          style={[
            styles.uiElements1HomeIndicatorWrapper,
            styles.iconGroupPosition,
          ]}
        >
          <View
            style={[styles.uiElements1HomeIndicator, styles.iconGroupPosition]}
          >
            <View style={[styles.barsHomeIndicatorOnLig, styles.homeLayout]}>
              <View style={[styles.homeIndicator, styles.homeLayout]} />
            </View>
          </View>
        </View>
        <View style={styles.ovalParent}>
          <Image
            style={[styles.ovalIcon, styles.iconGroupLayout]}
            contentFit="cover"
            source={require("../assets/oval.png")}
          />
          <Text style={[styles.addBoxMaterial, styles.searchTypo]}></Text>
        </View>
        <View style={[styles.prfileParent, styles.parentPosition]}>
          <Text style={[styles.events, styles.goingTypo]}>Prfile</Text>
          <Image
            style={[styles.groupChild13, styles.groupChildPosition1]}
            contentFit="cover"
            source={require("../assets/group-33337.png")}
          />
        </View>
        <View style={[styles.mapParent, styles.parentPosition]}>
          <Text style={[styles.events, styles.goingTypo]}>Map</Text>
          <Image
            style={[styles.groupChild14, styles.groupChildPosition1]}
            contentFit="cover"
            source={require("../assets/group-33338.png")}
          />
        </View>
      </View>
      <View style={[styles.barsStatusBarIphoneL, styles.armanRokniLayout]}>
        <View style={styles.battery}>
          <View style={styles.border} />
          <Image
            style={[styles.capIcon, styles.capIconLayout]}
            contentFit="cover"
            source={require("../assets/cap.png")}
          />
          <View style={styles.capacity} />
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
          <Text style={[styles.time, styles.timeLayout]}>9:41</Text>
        </View>
      </View>
      <View style={[styles.rectangleParent5, styles.groupChildLayout]}>
        <View style={[styles.groupChild15, styles.groupChildLayout]} />
        <View style={[styles.imGoingToShakeYContainer, styles.goingPosition]}>
          <Text style={[styles.imGoingTo2, styles.textTypo]}>
            International Band Mu...
          </Text>
          <View style={[styles.minContainer, styles.minPosition]}>
            <Text
              style={[styles.min2, styles.minTypo]}
            >{`36 Guild Street London, UK `}</Text>
            <Image
              style={[styles.groupChild16, styles.groupLayout1]}
              contentFit="cover"
              source={require("../assets/group-61.png")}
            />
          </View>
          <View style={[styles.groupGroup, styles.groupPosition]}>
            <Image
              style={[styles.groupIcon1, styles.iconGroupLayout]}
              contentFit="cover"
              source={require("../assets/group.png")}
            />
            <Text style={[styles.going, styles.goingPosition1]}>+20 Going</Text>
          </View>
        </View>
        <Image
          style={styles.groupChild17}
          contentFit="cover"
          source={require("../assets/group-33318.png")}
        />
        <View style={[styles.rectangleParent6, styles.groupChild18Layout]}>
          <View style={[styles.groupChild18, styles.groupChildPosition]} />
          <Image
            style={[styles.groupChild19, styles.iconGroupLayout]}
            contentFit="cover"
            source={require("../assets/group-18129.png")}
          />
        </View>
        <View style={[styles.rectangleParent7, styles.groupChild20Layout]}>
          <View style={[styles.groupChild20, styles.groupChild20Layout]} />
          <Text style={[styles.armanRokni, styles.armanRokniLayout]}>
            <Text style={styles.armanRokniTxtContainer}>
              <Text style={[styles.text, styles.textTypo]}>{`10
`}</Text>
              <Text style={styles.june}>June</Text>
            </Text>
          </Text>
        </View>
      </View>
      <View style={[styles.rectangleParent8, styles.groupChildLayout]}>
        <View style={[styles.groupChild21, styles.groupChildLayout]} />
        <View style={[styles.imGoingToShakeYParent1, styles.goingPosition]}>
          <Text style={[styles.imGoingTo2, styles.textTypo]}>
            Jo Malone London’s Mo..
          </Text>
          <View style={[styles.minParent1, styles.minPosition]}>
            <Text style={[styles.min3, styles.minTypo]}>
              Radius Gallery • Santa Cruz, CA
            </Text>
            <Image
              style={[styles.groupChild16, styles.groupLayout1]}
              contentFit="cover"
              source={require("../assets/group-61.png")}
            />
          </View>
          <View style={[styles.groupParent6, styles.groupPosition]}>
            <Image
              style={[styles.groupIcon1, styles.iconGroupLayout]}
              contentFit="cover"
              source={require("../assets/group.png")}
            />
            <Text style={[styles.going, styles.goingPosition1]}>+20 Going</Text>
          </View>
        </View>
        <Image
          style={styles.groupChild17}
          contentFit="cover"
          source={require("../assets/group-333181.png")}
        />
        <View style={[styles.rectangleParent6, styles.groupChild18Layout]}>
          <View style={[styles.groupChild18, styles.groupChildPosition]} />
          <Image
            style={[styles.groupChild19, styles.iconGroupLayout]}
            contentFit="cover"
            source={require("../assets/group-181291.png")}
          />
        </View>
        <View style={[styles.rectangleParent7, styles.groupChild20Layout]}>
          <View style={[styles.groupChild20, styles.groupChild20Layout]} />
          <Text style={[styles.armanRokni, styles.armanRokniLayout]}>
            <Text style={styles.armanRokniTxtContainer}>
              <Text style={[styles.text, styles.textTypo]}>{`10
`}</Text>
              <Text style={styles.june}>June</Text>
            </Text>
          </Text>
        </View>
      </View>
      <View style={[styles.popularGroup, styles.popularPosition]}>
        <Text style={[styles.popular, styles.popularTypo]}>
          Upcoming Events
        </Text>
        <View style={[styles.allCopyParent, styles.groupChild12Layout]}>
          <Text style={styles.allCopy}>See All</Text>
          <Image
            style={styles.groupChild}
            contentFit="cover"
            source={require("../assets/vector-1.png")}
          />
        </View>
      </View>
      <View style={[styles.rectangle, styles.homeItemPosition]} />
      <Image
        style={[styles.homeItem, styles.homeItemPosition]}
        contentFit="cover"
        source={require("../assets/group-33650.png")}
      />
      <View style={styles.internationalGalaMParent}>
        <Text style={[styles.internationalGalaM, styles.popularTypo]}>
          Invite your friends
        </Text>
        <Text style={[styles.madisonAveNew, styles.minTypo1]}>
          Get $20 for ticket
        </Text>
        <View style={[styles.groupChild27, styles.homeInnerLayout]} />
        <Text style={[styles.invite, styles.goingTypo]}>Invite</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  popularPosition: {
    height: 34,
    left: "6.4%",
    right: "6.48%",
    width: "87.12%",
    top: "50%",
    position: "absolute",
  },
  popularTypo: {
    color: Color.colorTypographyTitle,
    textAlign: "left",
    fontFamily: FontFamily.title1Eventhub,
    fontWeight: "500",
    left: "0%",
    position: "absolute",
  },
  groupChild12Layout: {
    height: 23,
    position: "absolute",
  },
  rectangleParentPosition1: {
    right: "6.4%",
    width: "87.2%",
    left: "6.4%",
    position: "absolute",
  },
  groupChildShadowBox1: {
    borderRadius: Border.br_lg,
    shadowOpacity: 1,
    elevation: 30,
    shadowRadius: 30,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowColor: "rgba(80, 85, 136, 0.06)",
    backgroundColor: Color.colorWhite,
  },
  iconGroupLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  timeTypo: {
    fontSize: FontSize.body2_size,
    top: "50%",
  },
  minTypo1: {
    fontSize: FontSize.subTitle1_size,
    fontFamily: FontFamily.title1Eventhub,
    top: "50%",
    position: "absolute",
  },
  groupLayout1: {
    height: 16,
    width: 16,
    left: 0,
    position: "absolute",
  },
  exploreTypo: {
    color: Color.colorPrimaryBlue,
    fontSize: FontSize.subTitle2_size,
    fontFamily: FontFamily.title1Eventhub,
    position: "absolute",
  },
  homeChildLayout: {
    width: 375,
    left: 0,
  },
  groupChild1Layout: {
    width: 101,
    height: 39,
    top: 0,
    position: "absolute",
  },
  groupChildShadowBox: {
    borderRadius: 21,
    elevation: 20,
    shadowRadius: 20,
    shadowColor: "rgba(46, 46, 79, 0.12)",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  groupParentLayout: {
    height: 20,
    position: "absolute",
  },
  groupChildLayout1: {
    height: 18,
    width: 18,
    left: 0,
    position: "absolute",
  },
  foodPosition: {
    lineHeight: 25,
    color: Color.colorWhite,
    left: 26,
    height: 20,
    top: 0,
    fontSize: FontSize.body2_size,
    textAlign: "left",
    fontFamily: FontFamily.title1Eventhub,
    position: "absolute",
  },
  groupChild3Position: {
    width: 107,
    height: 39,
    top: 0,
    left: 0,
    position: "absolute",
  },
  groupChild5Layout: {
    width: 95,
    height: 39,
    position: "absolute",
  },
  groupChild7Layout: {
    width: 82,
    height: 39,
    top: 0,
    position: "absolute",
  },
  homeInnerLayout: {
    height: 32,
    position: "absolute",
  },
  groupLayout: {
    height: 24,
    position: "absolute",
  },
  searchTypo: {
    fontSize: 20,
    color: Color.colorWhite,
    textAlign: "left",
    position: "absolute",
  },
  capIconLayout: {
    width: 1,
    position: "absolute",
  },
  groupChild9Layout: {
    width: 75,
    height: 32,
    top: 0,
    position: "absolute",
  },
  goingTypo: {
    fontSize: FontSize.subTitle2_size,
    position: "absolute",
  },
  frameParentPosition: {
    height: 36,
    top: 0,
    position: "absolute",
  },
  iconGroupPosition: {
    bottom: "0%",
    left: "0%",
    position: "absolute",
  },
  parentPosition: {
    opacity: 0.2,
    bottom: "27.93%",
    top: "35.14%",
    height: "36.94%",
    position: "absolute",
  },
  groupChildPosition1: {
    bottom: "43.9%",
    height: "56.1%",
    maxHeight: "100%",
    maxWidth: "100%",
    top: "0%",
    position: "absolute",
    overflow: "hidden",
  },
  homeLayout: {
    height: 5,
    width: 134,
    left: "50%",
    position: "absolute",
  },
  armanRokniLayout: {
    height: 44,
    position: "absolute",
  },
  timeLayout: {
    width: 54,
    position: "absolute",
  },
  groupChildLayout: {
    height: 255,
    width: 237,
    position: "absolute",
  },
  goingPosition: {
    height: 84,
    left: "6.75%",
    marginTop: 26.5,
    top: "50%",
    position: "absolute",
  },
  textTypo: {
    fontSize: FontSize.title1Eventhub_size,
    fontFamily: FontFamily.title1Eventhub,
  },
  minPosition: {
    marginTop: 25,
    height: 17,
    opacity: 0.5,
    left: "0%",
    top: "50%",
    position: "absolute",
  },
  minTypo: {
    color: Color.colorGray_100,
    fontSize: FontSize.subTitle1_size,
    marginTop: -8.5,
    textAlign: "left",
    fontFamily: FontFamily.title1Eventhub,
    top: "50%",
    position: "absolute",
  },
  groupPosition: {
    bottom: "32.14%",
    top: "39.29%",
    height: "28.57%",
    left: "0%",
    position: "absolute",
  },
  goingPosition1: {
    top: 3,
    fontFamily: FontFamily.title1Eventhub,
  },
  groupChild18Layout: {
    height: 30,
    width: 30,
    position: "absolute",
  },
  groupChildPosition: {
    backgroundColor: Color.colorGray_200,
    top: 0,
    left: 0,
  },
  groupChild20Layout: {
    width: 45,
    position: "absolute",
  },
  homeItemPosition: {
    bottom: "17.12%",
    right: "6.13%",
    top: "67.24%",
    width: "87.47%",
    height: "15.64%",
    left: "6.4%",
    position: "absolute",
  },
  popular: {
    marginTop: -17,
    opacity: 0.84,
    textAlign: "left",
    lineHeight: 34,
    color: Color.colorTypographyTitle,
    fontSize: FontSize.title1Eventhub_size,
    top: "50%",
  },
  allCopy: {
    marginTop: -11.5,
    fontSize: FontSize.body3_size,
    textAlign: "right",
    color: Color.colorTypographySubColor,
    lineHeight: 23,
    fontFamily: FontFamily.title1Eventhub,
    left: "0%",
    top: "50%",
    position: "absolute",
  },
  groupChild: {
    top: 8,
    left: 49,
    borderRadius: Border.br_12xs,
    width: 6,
    height: 9,
    opacity: 0.5,
    position: "absolute",
  },
  allCopyParent: {
    marginTop: -11,
    width: "17.05%",
    left: "82.95%",
    right: "0%",
    top: "50%",
  },
  popularParent: {
    marginTop: 291,
  },
  groupItem: {
    bottom: "0%",
    left: "0%",
    position: "absolute",
    top: "0%",
    height: "100%",
    right: "0%",
    width: "100%",
  },
  womensLeadership: {
    height: "82.14%",
    width: "24.16%",
    top: "8.93%",
    right: "72.78%",
    bottom: "8.93%",
    left: "3.06%",
    position: "absolute",
  },
  imGoingTo: {
    marginTop: -32,
    textAlign: "left",
    color: Color.colorTypographyTitle,
    fontFamily: FontFamily.title1Eventhub,
    fontWeight: "500",
    left: "0%",
    position: "absolute",
    width: "100%",
  },
  min: {
    left: "12.22%",
    marginTop: -8.5,
    fontSize: FontSize.subTitle1_size,
    color: Color.colorTypographySubColor,
    textAlign: "left",
  },
  groupInner: {
    top: 1,
  },
  minParent: {
    marginTop: 15,
    width: "94.24%",
    right: "5.76%",
    height: 17,
    left: "0%",
    top: "50%",
    position: "absolute",
  },
  imGoingToShakeYParent: {
    marginTop: -22.5,
    height: 64,
    right: "0%",
    left: "0%",
    top: "50%",
    position: "absolute",
    width: "100%",
  },
  stMaySat: {
    textTransform: "uppercase",
    top: "0%",
    textAlign: "left",
    fontWeight: "500",
    left: "0%",
  },
  groupParent: {
    marginTop: -41,
    width: "58.41%",
    right: "8.87%",
    left: "32.72%",
    height: 83,
    top: "50%",
    position: "absolute",
  },
  favoriteActiveIcon: {
    height: "14.29%",
    width: "4.92%",
    top: "12.5%",
    right: "4.25%",
    bottom: "73.21%",
    left: "90.83%",
    position: "absolute",
  },
  rectangleParent: {
    top: "91.26%",
    bottom: "-5.05%",
    height: "13.79%",
    width: "87.2%",
  },
  rectangleView: {
    bottom: "0%",
    left: "0%",
    position: "absolute",
    top: "0%",
    height: "100%",
    right: "0%",
    width: "100%",
  },
  rectangleGroup: {
    top: "106.77%",
    bottom: "-20.57%",
    height: "13.79%",
    width: "87.2%",
  },
  homeChild: {
    borderBottomRightRadius: Border.br_14xl,
    borderBottomLeftRadius: Border.br_14xl,
    backgroundColor: "#4a43ec",
    height: 179,
    top: 0,
    position: "absolute",
  },
  groupChild1: {
    backgroundColor: "#f59762",
    width: 101,
    height: 39,
    top: 0,
    position: "absolute",
    left: 0,
  },
  groupChild2: {
    top: 2,
    height: 18,
  },
  music: {
    width: 42,
    color: Color.colorWhite,
  },
  groupParent1: {
    width: 68,
    left: 16,
    height: 20,
    top: 9,
  },
  rectangleContainer: {
    left: 118,
  },
  groupChild3: {
    backgroundColor: Color.colorSalmon,
    borderRadius: 21,
    elevation: 20,
    shadowRadius: 20,
    shadowColor: "rgba(46, 46, 79, 0.12)",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  groupChild4: {
    top: 1,
  },
  sports: {
    width: 48,
    color: Color.colorWhite,
  },
  groupParent2: {
    width: 74,
    left: 17,
    top: 9,
  },
  groupChild5: {
    backgroundColor: "#29d697",
    borderRadius: 21,
    elevation: 20,
    shadowRadius: 20,
    shadowColor: "rgba(46, 46, 79, 0.12)",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    top: 0,
    left: 0,
  },
  food: {
    width: 37,
    color: Color.colorWhite,
  },
  groupParent3: {
    width: 63,
    left: 16,
    height: 20,
    top: 9,
  },
  rectangleParent2: {
    left: 230,
    top: 1,
  },
  groupChild7: {
    backgroundColor: "#46cdfb",
    borderRadius: 21,
    elevation: 20,
    shadowRadius: 20,
    shadowColor: "rgba(46, 46, 79, 0.12)",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    left: 0,
  },
  art: {
    fontSize: 15,
    width: 24,
    color: Color.colorWhite,
    left: 26,
    height: 20,
    top: 0,
    textAlign: "left",
    fontFamily: FontFamily.title1Eventhub,
    position: "absolute",
  },
  groupParent4: {
    top: 10,
    width: 50,
    left: 17,
  },
  rectangleParent3: {
    left: 337,
  },
  groupView: {
    top: 157,
    width: 419,
    height: 39,
    left: 24,
    position: "absolute",
  },
  searchIcon: {
    top: 4,
    width: 24,
    left: 0,
    overflow: "hidden",
  },
  search: {
    left: 41,
    letterSpacing: -1,
    opacity: 0.3,
    top: 3,
    fontFamily: FontFamily.title1Eventhub,
  },
  lineView: {
    top: 6,
    left: 34,
    borderColor: "#7974e7",
    borderRightWidth: 1,
    height: 21,
    borderStyle: "solid",
  },
  groupChild9: {
    borderRadius: 50,
    backgroundColor: "#5d56f3",
    left: 0,
  },
  groupChild10: {
    width: 24,
    top: 0,
    left: 0,
  },
  filters: {
    top: 5,
    left: 27,
    width: 36,
    color: Color.colorWhite,
    height: 17,
    textAlign: "left",
    fontFamily: FontFamily.title1Eventhub,
  },
  groupParent5: {
    left: 4,
    top: 4,
    width: 63,
  },
  rectangleParent4: {
    left: 252,
  },
  searchParent: {
    width: 327,
    height: 32,
    top: 0,
    left: 0,
  },
  homeInner: {
    top: 100,
    width: 327,
    height: 32,
    left: 24,
  },
  combinedShape2: {
    height: "53.33%",
    width: "7.34%",
    top: "22.22%",
    right: "92.66%",
    bottom: "24.44%",
    opacity: 0.94,
    left: "0%",
    position: "absolute",
  },
  groupChild11: {
    left: 291,
    width: 36,
  },
  currentLocation: {
    marginTop: -8,
    opacity: 0.7,
    textAlign: "center",
    color: Color.colorWhite,
    fontFamily: FontFamily.title1Eventhub,
    left: "0%",
    top: "50%",
  },
  icon: {
    height: "31.25%",
    width: "9.35%",
    top: "37.5%",
    bottom: "31.25%",
    left: "90.65%",
    opacity: 0.9,
    right: "0%",
    position: "absolute",
  },
  currentLocationParent: {
    height: "44.44%",
    width: "87.7%",
    right: "5.74%",
    bottom: "55.56%",
    left: "6.56%",
    top: "0%",
    position: "absolute",
    overflow: "hidden",
  },
  dhakaBangladesh: {
    marginTop: 0,
    left: "9.02%",
    color: "#f4f4fe",
    textAlign: "center",
    fontWeight: "500",
  },
  frameParent: {
    left: 102,
    width: 122,
    overflow: "hidden",
  },
  combinedShape2Parent: {
    height: "4.43%",
    top: "5.42%",
    bottom: "90.15%",
  },
  rectangleIcon: {
    height: "79.28%",
    top: "20.72%",
    bottom: "0%",
    left: "0%",
    position: "absolute",
    right: "0%",
    width: "100%",
  },
  iconlyboldcalendar: {
    width: "62.16%",
    right: "18.92%",
    left: "18.92%",
  },
  events: {
    top: "60.98%",
    color: Color.colorDarkslategray,
    textAlign: "center",
    fontFamily: FontFamily.title1Eventhub,
    left: "0%",
  },
  iconlyboldcalendarParent: {
    width: "9.87%",
    right: "61.6%",
    left: "28.53%",
  },
  explore: {
    top: "57.66%",
    left: "7.47%",
    textAlign: "center",
  },
  groupChild12: {
    top: 39,
    left: 38,
    width: 23,
  },
  homeIndicator: {
    marginLeft: -67,
    bottom: 0,
    borderRadius: 100,
    backgroundColor: Color.colorDarkslategray,
  },
  barsHomeIndicatorOnLig: {
    marginTop: 3,
    marginLeft: -66.5,
    top: "50%",
    overflow: "hidden",
  },
  uiElements1HomeIndicator: {
    top: "0%",
    height: "100%",
    bottom: "0%",
    right: "0%",
    width: "100%",
  },
  uiElements1HomeIndicatorWrapper: {
    height: "30.63%",
    top: "69.37%",
    opacity: 0.1,
    right: "0%",
    width: "100%",
  },
  ovalIcon: {
    bottom: "0%",
    left: "0%",
    position: "absolute",
    top: "0%",
    height: "100%",
    right: "0%",
    width: "100%",
  },
  addBoxMaterial: {
    marginTop: -10,
    left: "28.26%",
    fontFamily: FontFamily.material,
    top: "50%",
  },
  ovalParent: {
    height: "41.44%",
    width: "12.27%",
    right: "44%",
    bottom: "58.56%",
    left: "43.73%",
    top: "0%",
    position: "absolute",
  },
  groupChild13: {
    width: "79.31%",
    right: "10.34%",
    left: "10.34%",
  },
  prfileParent: {
    width: "7.73%",
    right: "8.53%",
    left: "83.73%",
  },
  groupChild14: {
    width: "95.83%",
    right: "4.17%",
    left: "0%",
  },
  mapParent: {
    width: "6.4%",
    right: "29.07%",
    left: "64.53%",
  },
  vectorParent: {
    height: "13.67%",
    top: "86.33%",
    right: "0%",
    width: "100%",
  },
  border: {
    right: 2,
    borderRadius: 3,
    borderColor: Color.colorWhite,
    borderWidth: 1,
    width: 22,
    opacity: 0.35,
    height: 11,
    borderStyle: "solid",
    top: 0,
    position: "absolute",
  },
  capIcon: {
    right: 0,
    height: 4,
    opacity: 0.4,
    top: 4,
  },
  capacity: {
    right: 4,
    borderRadius: 1,
    height: 7,
    width: 18,
    top: 2,
    position: "absolute",
    backgroundColor: Color.colorWhite,
  },
  battery: {
    right: 15,
    height: 11,
    top: 17,
    width: 24,
    position: "absolute",
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
    marginTop: -3.5,
    letterSpacing: 0,
    fontWeight: "600",
    fontFamily: FontFamily.sFProText,
    textAlign: "center",
    color: Color.colorWhite,
    left: 0,
    fontSize: FontSize.body2_size,
    top: "50%",
  },
  timeStyle: {
    top: 7,
    left: 21,
    height: 21,
  },
  barsStatusBarIphoneL: {
    top: -1,
    width: 375,
    left: 0,
  },
  groupChild15: {
    top: 0,
    left: 0,
    borderRadius: Border.br_lg,
    shadowOpacity: 1,
    elevation: 30,
    shadowRadius: 30,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowColor: "rgba(80, 85, 136, 0.06)",
    backgroundColor: Color.colorWhite,
  },
  imGoingTo2: {
    marginTop: -42,
    color: Color.colorBlack,
    textAlign: "left",
    fontFamily: FontFamily.title1Eventhub,
    fontWeight: "500",
    left: "0%",
    top: "50%",
    position: "absolute",
  },
  min2: {
    left: "11.54%",
  },
  groupChild16: {
    top: 0,
  },
  minContainer: {
    width: "91.92%",
    right: "8.08%",
  },
  groupIcon1: {
    width: "44.8%",
    right: "55.2%",
    bottom: "0%",
    left: "0%",
    position: "absolute",
    top: "0%",
    height: "100%",
  },
  going: {
    left: 66,
    lineHeight: 19,
    color: Color.colorBlueviolet_100,
    fontSize: FontSize.subTitle2_size,
    position: "absolute",
    textAlign: "left",
    fontWeight: "500",
  },
  groupGroup: {
    width: "63.13%",
    right: "36.87%",
  },
  imGoingToShakeYContainer: {
    width: "83.54%",
    right: "9.7%",
  },
  groupChild17: {
    left: 9,
    width: 218,
    height: 131,
    top: 9,
    position: "absolute",
  },
  groupChild18: {
    borderRadius: Border.br_6xs,
    height: 30,
    width: 30,
    position: "absolute",
  },
  groupChild19: {
    height: "46.67%",
    width: "47%",
    top: "26.67%",
    right: "26.33%",
    bottom: "26.67%",
    left: "26.67%",
    position: "absolute",
  },
  rectangleParent6: {
    left: 189,
    top: 17,
  },
  groupChild20: {
    borderRadius: Border.br_3xs,
    height: 45,
    backgroundColor: Color.colorGray_200,
    top: 0,
    left: 0,
  },
  text: {
    lineHeight: 6,
    fontWeight: "700",
    fontFamily: FontFamily.title1Eventhub,
  },
  june: {
    fontSize: FontSize.size_3xs,
    lineHeight: 14,
    fontFamily: FontFamily.title1Eventhub,
    fontWeight: "500",
  },
  armanRokniTxtContainer: {
    width: "100%",
  },
  armanRokni: {
    marginTop: -20.35,
    width: "73.33%",
    left: "13.33%",
    color: Color.colorSalmon,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    textTransform: "uppercase",
    top: "50%",
  },
  rectangleParent7: {
    height: 47,
    top: 17,
    left: 17,
  },
  rectangleParent5: {
    top: 262,
    width: 237,
    left: 24,
  },
  groupChild21: {
    top: 0,
    left: 0,
    borderRadius: Border.br_lg,
    shadowOpacity: 1,
    elevation: 30,
    shadowRadius: 30,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowColor: "rgba(80, 85, 136, 0.06)",
    backgroundColor: Color.colorWhite,
  },
  min3: {
    left: "10.19%",
  },
  minParent1: {
    right: "0%",
    width: "100%",
  },
  groupParent6: {
    width: "60.68%",
    right: "39.32%",
  },
  imGoingToShakeYParent1: {
    width: "86.92%",
    right: "6.33%",
  },
  rectangleParent8: {
    left: 277,
    top: 262,
    width: 237,
  },
  popularGroup: {
    marginTop: -188,
  },
  rectangle: {
    borderRadius: 12,
    backgroundColor: "rgba(0, 248, 255, 0.16)",
  },
  homeItem: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  internationalGalaM: {
    marginTop: -48,
    textAlign: "left",
    lineHeight: 34,
    color: Color.colorTypographyTitle,
    fontSize: FontSize.title1Eventhub_size,
    top: "50%",
  },
  madisonAveNew: {
    marginTop: -14,
    width: "86.93%",
    color: "#484d70",
    textAlign: "left",
    left: "0%",
  },
  groupChild27: {
    top: 64,
    borderRadius: 5,
    backgroundColor: Color.colorPrimaryCyanSecondary,
    width: 72,
    left: 0,
  },
  invite: {
    top: 69,
    left: 14,
    color: Color.colorWhite,
    textTransform: "uppercase",
    lineHeight: 23,
    fontSize: FontSize.subTitle2_size,
    textAlign: "left",
    fontFamily: FontFamily.title1Eventhub,
    fontWeight: "500",
  },
  internationalGalaMParent: {
    marginTop: 153,
    width: "40.8%",
    right: "48%",
    left: "11.2%",
    height: 96,
    top: "50%",
    position: "absolute",
  },
  home: {
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.colorWhite,
  },
});

export default Home;
