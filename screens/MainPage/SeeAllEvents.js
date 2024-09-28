import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Dimensions, Animated } from "react-native";
import { Image } from "expo-image";
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontFamily, Color, FontSize, Border } from "../../GlobalStyles";

const { width } = Dimensions.get('window'); // Get the screen width

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

  const [filteredEvents, setFilteredEvents] = useState(events); // Initial event list
  const animationRefs = useRef(filteredEvents.map(() => new Animated.Value(0))); // Create an array of animated values

  // Search logic to filter events based on query
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = events.filter(event => 
      event.title.toLowerCase().includes(query.toLowerCase()) ||
      event.date.toLowerCase().includes(query.toLowerCase()) ||
      event.location.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEvents(filtered);
    animationRefs.current = filtered.map(() => new Animated.Value(0)); // Reset animations for new filtered events
    runAnimations(filtered.length); // Run animations for new filtered events
  };

  // Run animations for each event
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
    runAnimations(filteredEvents.length); // Run animation on component mount
  }, []);

  const handleEventPress = (event) => {
    // Handle event click, e.g., navigate to event details
    console.log(`Event clicked: ${event.title}`);
  };

  return (
    <View style={styles.seeAllEvents}> 
      <TextInput
        style={styles.searchInput}
        placeholder="Search events by name, time, or venue"
        placeholderTextColor={Color.colorGray_100}
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <TouchableOpacity style={styles.settingsButton}>
        <Ionicons name="notifications-sharp" size={28} color={Color.colorLimegreen_200} />
      </TouchableOpacity>

      <Image style={styles.shapesIcon1} contentFit="cover" source={require("../../assets/shapes.png")} />

      <View style={styles.groupParent}>
        {/* Animated View for Event Cards */}
        {filteredEvents.map((event, index) => (
          <Animated.View 
            key={index}
            style={{
              opacity: animationRefs.current[index].interpolate({ inputRange: [0, 1], outputRange: [0, 1] }),
              transform: [{ translateY: animationRefs.current[index].interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) }]
            }}
          >
            <TouchableOpacity onPress={() => handleEventPress(event)}>
              <EventCard 
                title={event.title}
                date={event.date}
                location={event.location}
                imageSource={event.image}
              />
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const EventCard = ({ title, date, location, imageSource }) => {
  return (
    <View style={styles.rectangleParent}>
      <View style={styles.groupChildShadowBox} />
      <View style={styles.imGoingToShakeYParent}>
        <Image style={styles.groupInner} contentFit="cover" source={imageSource} />
        <View style={styles.groupInnerShadowBox} >
          <Text style={styles.imGoingTo}>{title}</Text>
          <Text style={styles.satMay1}>{date}</Text>
          <View style={{flexDirection: 'row'}}>
          <Image style={styles.groupInner1} contentFit="cover" source={require('../../assets/location.jpg')} />
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
    padding: 20,
  },
  searchInput: {
    height: 38,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 20,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    width: '100%', // Full width for responsiveness
  },
  settingsButton: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 30,
    right: 20,
  },
  shapesIcon1: {
    height: "20%",
    width: "40%",
    position: "absolute",
    top: 0,
    right: 0,
  },
  groupParent: {
    marginTop: 10,
  },
  rectangleParent: {
    height: 120,
    marginBottom: -10, // Reduced margin
    elevation: 5,
    padding: 10,
    width: width * 0.9, // Responsive width
    alignSelf: 'center',
  },
  groupChildShadowBox: {
    position: "absolute",
    width: "100%",
    marginBottom: -10
  },
  imGoingToShakeYParent: {
    marginTop: -10,
    flexDirection: 'row',
    borderRadius: 20,
    padding: 12,
    marginBottom: -50,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  imGoingTo: {
    fontSize: FontSize.body2_size,
    fontWeight: "500",
    color: Color.colorTypographyTitle,
  },
  satMay1: {
    color: 'blue',
    fontSize: FontSize.subTitle1_size,
    marginTop: 6,
  },
  min: {
    color: Color.colorTypographySubColor,
    fontSize: FontSize.subTitle1_size,
    marginTop: 4,
  },
  groupInner: {
    width: '25%',
    height: 75,
    borderRadius: 19,
    marginRight: 12
  },
  groupInner1: {
    width: '8%',
    height: 18,
    marginRight: 5,
    marginTop: 3
  },

});

export default SeeAllEvents;
