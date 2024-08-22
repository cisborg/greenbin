import * as React from "react";
import { StyleSheet, View, Text, Pressable, TouchableOpacity, TextInput } from "react-native";
import { Image } from "expo-image";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";

const SeeAllEvents = () => {
  
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = () => {
    // Implement search/filter logic here
    console.log('Searching for:', searchQuery);
  };
  return (
    <View style={styles.seeAllEvents}> 
    
        <TextInput
          style={styles.searchInput}
          placeholder="Search events by name, time, or venue"
          placeholderTextColor={Color.colorGray_100}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.settingsButton}>
          <AntDesign name="setting" size={30} color="green" />
        </TouchableOpacity>
      
       

            
      <Image style={styles.shapesIcon1} contentFit="cover" source={require("../assets/shapes.png")} />

     
      <View style={styles.groupParent}>
        <View style={[styles.rectangleParent, styles.groupParentLayout]}>
          <View style={styles.groupChildShadowBox} />
          <View style={styles.imGoingToShakeYParent}>
            <Text style={[styles.imGoingTo, styles.goingTypo1]}>
              Renewable Energy Technology Show 
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
                Lot 13 • Embu, Kenya
              </Text>
              <Image
                style={[styles.groupItem, styles.groupPosition]}
                contentFit="cover"
                source={require("../assets/location.jpg")}
              />
            </View>
          </View>
          <Image
            style={styles.groupInner}
            contentFit="cover"
            source={require("../assets/rectangle-57.png")}
          />
        </View>
        <View style={[styles.rectangleGroup, styles.groupParentLayout]}>
          <View style={styles.groupChildShadowBox} />
          <View style={styles.imGoingToShakeYParent}>
            <Text style={[styles.imGoingTo1, styles.goingTypo]}>
              National Tree Planting Week Out
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
                Lot 13 • BlueRidge, Mombasa
              </Text>
              <Image
                style={[styles.groupItem, styles.groupPosition]}
                contentFit="cover"
                source={require("../assets/location1.jpg")}
              />
            </View>
          </View>
          <Image
            style={styles.groupInner}
            contentFit="cover"
            source={require("../assets/tree.avif")}
          />
        </View>
        <View style={[styles.rectangleContainer, styles.groupParentLayout]}>
          <View style={styles.groupChildShadowBox} />
          <View style={styles.imGoingToShakeYParent}>
            <Text
              style={[styles.imGoingTo2, styles.goingTypo1]}
            >{`Green Circular Economy Building Expo 2024 `}</Text>
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
              >{`Safari Park Nairobi - Kenya `}</Text>
              <Image
                style={[styles.groupItem, styles.groupPosition]}
                contentFit="cover"
                source={require("../assets/location1.jpg")}
              />
            </View>
          </View>
          <Image
            style={styles.groupInner}
            contentFit="cover"
            source={require("../assets/greenCircular.webp")}
          />
        </View>
        <View style={[styles.groupView, styles.groupParentLayout]}>
          <View style={styles.groupChildShadowBox} />
          <View style={styles.imGoingToShakeYParent}>
            <Text style={[styles.imGoingTo1, styles.goingTypo]}>
              Women's Leadership Conference 2024
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
                53 Bush St • Parklands, Nairobi
              </Text>
              <Image
                style={[styles.groupItem, styles.groupPosition]}
                contentFit="cover"
                source={require("../assets/location.jpg")}
              />
            </View>
          </View>
          <Image
            style={styles.groupInner}
            contentFit="cover"
            source={require("../assets/women.avif")}
          />
        </View>
        <View style={[styles.rectangleParent1, styles.groupParentLayout]}>
          <View style={styles.groupChildShadowBox} />
          <View style={styles.imGoingToShakeYParent}>
            <Text style={[styles.imGoingTo4, styles.goingTypo1]}>
              Scrap Waste Collection Expo 2024
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
                Serena • Nairobi, Kenya
              </Text>
              <Image
                style={[styles.groupItem, styles.groupPosition]}
                contentFit="cover"
                source={require("../assets/location1.jpg")}
              />
            </View>
          </View>
          <Image
            style={styles.groupInner}
            contentFit="cover"
            source={require("../assets/rectangle-571.png")}
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
              <Text style={styles.min5}>{`Kenyatta Avenue Nairobi, Kenya `}</Text>
              <Image
                style={[styles.groupChild12, styles.groupPosition]}
                contentFit="cover"
                source={require("../assets/location.jpg")}
              />
            </View>
          </View>
          <Image
            style={styles.groupInner}
            contentFit="cover"
            source={require("../assets/galaMusic.avif")}
          />
        </View>
      </View>
     
     
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
 
  searchInput: {
    
    height: 38,
    borderColor: Color.colorLimegreen_200,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginRight: 20,
    width: 300,
    marginTop: 30,
    marginLeft: 20,
    marginBottom: -70,
    left: 20
  },
  settingsButton: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    top: 30,
    left: 350
  },
  headerContainer: {
    flexDirection: "column",
    justifyContent: 'flex-start',
    alignItems: "center",
    marginTop: 10,
    marginBottom: 25,
    height: 42,
    left: 0,
    position: "absolute",
  },
  minParentPosition: {
    marginTop: 22,
    height: 17,
    left: "0%",
    top: "48%",
    position: "absolute",
  },
  shapesIcon: {
    top: -52,
    left: -54,
    width: 150,
    height: 173,
    position: "absolute",
  },
  shapesIcon1: {
    height: "20.5%",
    width: "40%",
    top: "84.24%",
    right: "-18.97%",
    bottom: "-4.74%",
    left: "58.72%",
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
    shadowRadius: 38,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowColor: "rgba(87, 92, 138, 0.1)",
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
    width: 130,
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
    height: 78,
    top: 7,
    position: "absolute",
    borderRadius: 25,
  },
  rectangleParent: {
    top: 118,
  },
  imGoingTo1: {
    color: Color.colorLimegreen_200,
  },
  friApr23600PmWrapper: {
    width: 128,
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
    color: Color.colorCrimson
  },
  monJun211000PmWrapper: {
    width: 150,
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
    width: 145,
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
    color: 'blue'
  },
  wedApr28530PmWrapper: {
    width: 145,
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
    width: 150,
  },
  min5: {
    left: "12.02%",
    color: Color.colorGray_800,
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
    top: 125,
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
    top: 50,
    left: 115,
    fontSize: 17,
    fontFamily: FontFamily.poppinsBold
  },
  shaped: {
    top: 50,
    left: 200,
    
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
    top: 52,
    left: 345,
    height: 24,
    width: 24,
    position: "absolute",
    overflow: "hidden",
  },
  seeAllEvents: {
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: 404,
    backgroundColor: Color.colorWhite,
  },
});

export default SeeAllEvents;
