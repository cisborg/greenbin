import * as React from "react";
import { StyleSheet, Text, View, Pressable, FlatList, TextInput, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, Border, FontSize } from "../GlobalStyles";
import AntDesign from '@expo/vector-icons/AntDesign';
import { TouchableOpacity } from "react-native-gesture-handler";

const challenges = [
  { id: '1', title: 'EcoBikes', icon: require('../assets/bikes.png') },
  { id: '2', title: 'GreenBins', icon: require('../assets/greenBin.png') },
  { id: '3', title: 'New Arrivals', icon: require('../assets/NewArrivals.png') },
  { id: '4', title: 'MoleBio', icon: require('../assets/genetic.png') },
  { id: '5', title: 'Beauty & Care', icon: require('../assets/visa.png') },
  { id: '6', title: 'Phones', icon: require('../assets/mpesa.png') },
  { id: '7', title: 'TVs', icon: require('../assets/Television.png') },
  { id: '8', title: 'Shoes', icon: require('../assets/Shoes.png') },
  { id: '9', title: 'Appliances', icon: require('../assets/Appliance.png') },
  { id: '10', title: 'Trees', icon: require('../assets/Treee.png') },
  { id: '11', title: 'Beauty & Care', icon: require('../assets/visa.png') },
  { id: '12', title: 'Phones', icon: require('../assets/mpesa.png') },
  { id: '13', title: 'TVs', icon: require('../assets/Television.png') },
  { id: '14', title: 'Shoes', icon: require('../assets/Shoes.png') },
  { id: '15', title: 'Appliances', icon: require('../assets/Appliance.png') },
  { id: '16', title: 'Trees', icon: require('../assets/Treee.png') },
];

export default function HomePageExistingUser() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredChallenges, setFilteredChallenges] = React.useState(challenges);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = challenges.filter(challenge => 
      challenge.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredChallenges(filtered);
  };

  const renderVendorItem = ({ item }) => (
    <TouchableOpacity onPress={()=> navigation.navigate('VendorsProfilePage')} >
    <View style={styles.vendorDetails} >
      <Image style={styles.vendorImgIcon} contentFit="cover" source={item.icon} />
      <Text style={styles.vendorName}>{item.name}</Text>
      <Text style={styles.vendorProfession}>{item.profession}</Text>

    </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.homePageExistingUser}>
      <Text style={styles.hello}>Hello!🍀</Text>
      <Image style={styles.shapesIcon} contentFit="cover" source={require("../assets/shapes.png")} />
      <Image style={styles.shapesIcon1} contentFit="cover" source={require("../assets/shapes.png")} />
      
      <Text style={styles.vendorsYouFollow}>Vendors you follow:</Text>

      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Your Top Favorite Challenges"
          placeholderTextColor={Color.colorGray_100}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <View style={styles.noteMessage}>
        <Text style={styles.factAbout201}>
          Fact: About 2.01 billion tons of municipal solid waste is generated globally each year!
        </Text>
      </View>

      <View style={styles.vendorFrame}>
        <FlatList
          data={[
            { id: '1', name: 'Johanna', icon: require("../assets/vendorimg.png") ,profession: '(Tree Vendor)'},
            { id: '2', name: 'Hassan', icon: require("../assets/vendorimg1.png"), profession: '(Smart Apps)' },
            { id: '3', name: 'Winnie', icon: require("../assets/anotherWoman.avif"), profession: '(MoleBio)' },
            { id: '4', name: 'Joseph', icon: require("../assets/anotherMan.avif"), profession: '(Smart Bins)' },


          ]}
          renderItem={renderVendorItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        
          <View style={styles.addVendorBtn}>
            <TouchableOpacity onPress={() => navigation.navigate('VendorList')}>

              <AntDesign name="pluscircle" size={30} color="green" />
            </TouchableOpacity>
          </View>
        

      </View>

      <View style={styles.challengeFrame}>
        <FlatList 
          data={filteredChallenges} 
          renderItem={({ item }) => (
            <View style={styles.challengeBox}>
              <TouchableOpacity>
                <View style={styles.challengeBoxChild} />
                <Text style={styles.challengeText}>{item.title}</Text>
                <Image style={styles.rainIcon} contentFit="cover" source={item.icon} />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.id}
          vertical
          numColumns={6}
          contentContainerStyle={{ flexWrap: 'wrap',alignItems:'flex-start' }}
          showsHorizontalScrollIndicator={false}       
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Style adjustments to ensure layout consistency
  challengeBox: {
    width: 75,
    height: 100,
    marginHorizontal: 10,
  },
  challengeBoxChild: {
    backgroundColor: 'white',
    borderRadius: Border.br_base,
    width: "100%",
    height: 80,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  challengeText: {
    top: 55,
    left: 5,
    marginLeft: -8,
    fontSize: 11,
    color: Color.colorGray_100,
    width: 80,
    height: 50,
    marginTop: 5,
    fontFamily: FontFamily.manropeBold,
    textAlign: "center",
    position: "absolute"
    
    
  },
  challengeFrame: {
    height: 195,
    width: 370,
    position: "absolute",
    top: 610,
    left: 17,
    
  },
  rainIcon: {
    top: 10,
    left: 15,
    width: 43,
    height: 40,
    marginBottom: 5,
    borderRadius: 15,
    position: "absolute",
  },
  vendorFrame: {
    top: 190,
    left: 0,
    height: 100,
    width: "100%",
    position: "absolute",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  vendorDetails: {
    flexDirection: 'row',
    alignItems: 'space-between',
    padding: 5,
    justifyContent: 'space-between',
    top: 90,
    marginBottom: 25,
    backgroundColor: Color.colorWhite,
    borderRadius: 20,
    elevation: 4,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    height: 220,
    width: 140,
  },
  vendorImgIcon: {
    width: 100,
    height: 100,
    borderRadius: 30,
    marginLeft: 15,
    
  },
  shapesIcon: {
    bottom: 0,
    left: 290,
    width: 150,
    height: 150,
    position: "absolute",
  },
  shapesIcon1: {
    top: 0,
    left: 0,
    width: 150,
    height: 148,
    position: "absolute",
  },
  vendorName: {
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.manropeBold,
    color: Color.colorGray_800,
    textAlign: 'center',
    fontWeight: 'bold',
    position: 'absolute',
    left: 29,
    top: 110,
  },
  vendorProfession: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.manropeSemiBold,
    color: Color.colorLimegreen_200,
    textAlign: 'center',
    position: 'absolute',
    marginTop: 5,
    left: 29,
    top: 130,
  },
  addVendorBtn: {
    padding: 10,
    backgroundColor: Color.colorWhite,
    borderRadius: 40,
    marginLeft: -20,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    top: 70,
    
  },
  vendorsYouFollow: {
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.manropeBold,
    color: Color.colorGray_800,
    fontWeight: 'bold',
    position: 'absolute',
    left: 13,
    top: 165
  },
  hello: {
    top: 50,
    left: 248,
    width: 145,
    height: 39,
    color: Color.colorGray_800,
    fontSize: FontSize.size_13xl,
    fontFamily: FontFamily.poppinsBold,
    textAlign: "left",
    position: "absolute",
  },
  noteMessage: {
    height: 57,
    width: 359,
    position: "absolute",
    borderRadius: 13,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    top: 434,
    left: 17,
  },
  factAbout201: {
    fontSize: FontSize.size_sm,
    color: Color.colorGray_800,
    width: 354,
    height: 48,
    marginTop: 10,
    marginLeft: 10,
    left: 3,
    position: "absolute",
  },
  searchBarContainer: {
    width: 365,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    top: 520,
    left: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
    textDecorationStyle: 'solid',
  },
  homePageExistingUser: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    height: 834,
    overflow: "hidden",
    width: 404,
  },
});
