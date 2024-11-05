import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, StyleSheet, View, Text, TextInput, Dimensions, Animated, FlatList, TouchableOpacity,Platform,StatusBar } from "react-native";
import { Image } from "expo-image";
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontFamily, Color, FontSize } from "../../GlobalStyles";

const { width } = Dimensions.get('window');

const SeeAllEvents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const events = [
    { title: "Renewable Energy Technology Show", date: "Sat, May 1 • 2:00 PM", location: "Lot 13 • Embu, Kenya", image: require("../../assets/rectangle-57.png") },
    { title: "National Tree Planting Week Out", date: "Fri, Apr 23 • 6:00 PM", location: "Lot 13 • BlueRidge, Mombasa", image: require("../../assets/tree.avif") },
    { title: "Green Circular Economy Expo 2024", date: "Mon, Jun 21 • 10:00 PM", location: "Safari Park Nairobi - Kenya", image: require("../../assets/greenCircular.webp") },
    { title: "Women's Leadership Conference 2024", date: "Sat, Apr 24 • 1:30 PM", location: "53 Bush St • Parklands, Nairobi", image: require("../../assets/women.avif") },
    { title: "Scrap Waste Collection Expo 2024", date: "Wed, Apr 28 • 5:30 PM", location: "Serena • Nairobi, Kenya", image: require("../../assets/rectangle-571.png") },
    { title: "International Gala Music Festival", date: "Sun, Apr 25 • 10:15 AM", location: "Kenyatta Avenue Nairobi, Kenya", image: require("../../assets/galaMusic.avif") }
  ];

  const [filteredEvents, setFilteredEvents] = useState(events);
  const animationRefs = useRef(filteredEvents.map(() => new Animated.Value(0)));

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = events.filter(event => 
      event.title.toLowerCase().includes(query.toLowerCase()) ||
      event.date.toLowerCase().includes(query.toLowerCase()) ||
      event.location.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEvents(filtered);
    animationRefs.current = filtered.map(() => new Animated.Value(0));
    runAnimations(filtered.length);
  };

  const runAnimations = (length) => {
    for (let i = 0; i < length; i++) {
      Animated.timing(animationRefs.current[i], {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  };

  useEffect(() => {
    runAnimations(filteredEvents.length);
  }, []);

  const handleEventPress = (event) => {
    console.log(`Event clicked: ${event.title}`);
  };

  const renderEventCard = ({ item, index }) => (
    <Animated.View 
      style={{
        opacity: animationRefs.current[index].interpolate({ inputRange: [0, 1], outputRange: [0, 1] }),
        transform: [{ translateY: animationRefs.current[index].interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) }]
      }}
    >
      <TouchableOpacity onPress={() => handleEventPress(item)}>
        <EventCard 
          title={item.title}
          date={item.date}
          location={item.location}
          imageSource={item.image}
        />
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.seeAllEvents}> 
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search events by name, time, or venue"
          placeholderTextColor={Color.colorGray_100}
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings" size={28} color='green' />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredEvents}
        renderItem={renderEventCard}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.groupParent}
      />
    </SafeAreaView>
  );
};

const EventCard = ({ title, date, location, imageSource }) => {
  return (
    <View style={styles.rectangleParent}>
      <View style={styles.groupChildShadowBox} />
      <View style={styles.imGoingToShakeYParent}>
        <Image style={styles.groupInner} contentFit="cover" source={imageSource} />
        <View style={styles.groupInnerShadowBox}>
          <Text style={styles.imGoingTo}>{title}</Text>
          <Text style={styles.satMay1}>{date}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={styles.locationIcon} contentFit="cover" source={require('../../assets/location.jpg')} />
            <Text style={styles.min}>{location}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  seeAllEvents: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 8,
    paddingBottom: '10%',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: { 
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 15,
  },
  searchInput: {
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 20,
    elevation: 3,
    marginTop: 12,
   shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    width: '80%',
  },
  settingsButton: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    right: 20,
    marginLeft: 50,
    marginTop: -10
  },
  groupParent: {
    marginTop: 10,
  },
  rectangleParent: {
    height: 220,
    marginBottom: '2%',
    width: '100%', // Responsive width
    alignSelf: 'center',
  },
  groupChildShadowBox: {
    position: "absolute",
    width: "100%",
    marginBottom: -10,
  },
  imGoingToShakeYParent: {
    marginTop: -10,
    flexDirection: 'column',
    borderRadius: 20,
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: -50,
    elevation: 1,
  },
  imGoingTo: {
    fontSize: width * 0.032, // Dynamic font size
    fontWeight: "500",
    color: Color.colorTypographyTitle,
  },
  satMay1: {
    color: 'blue',
    fontSize: width * 0.030, // Dynamic font size
    marginTop: 3,
  },
  min: {
    color: Color.colorTypographySubColor,
    fontSize: width * 0.029, // Dynamic font size
    marginTop: 4,
  },
  groupInner: {
    width: '100%', // Responsive width
    height: 120,
    borderRadius: 16,
    marginRight: 10
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});

export default SeeAllEvents;
