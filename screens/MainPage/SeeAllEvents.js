import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, StyleSheet, View, Text, TextInput, Dimensions, Animated, FlatList, TouchableOpacity, ActivityIndicator, Platform, StatusBar } from "react-native";
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import FastImage from "react-native-fast-image";
import moment from 'moment';
import Ionicons from '@expo/vector-icons/Ionicons';
import { fetchSquadActivities } from "../../redux/actions/events"; // Import the action
import { Color } from "../../GlobalStyles";

const { width } = Dimensions.get('window');

const formatDate = (dateString) => {
  return moment(dateString).format('ddd, MMM D • h:mm A'); // "Sat, May 1 • 2:00 PM"
};
const formatLocation = (location) => {
  // Example: Split location string and add custom formatting
  const locationParts = location.split(', ');
  if (locationParts.length > 1) {
    return `${locationParts[0]} - ${locationParts[1]}`; // Example: "Nairobi - Kenya"
  }
  return location; // If location format is simple or not split, just return as is
};


const SeeAllEvents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch(); // Initialize Redux dispatch
  const { activities, loading, error } = useSelector(state => state.squadActivities); // Access Redux state
  
  const [filteredEvents, setFilteredEvents] = useState([]);
  const animationRefs = useRef([]);

  useEffect(() => {
    dispatch(fetchSquadActivities()); // Fetch squad activities on component mount
  }, [dispatch]);

  useEffect(() => {
    if (activities) {
      setFilteredEvents(activities); // Initialize filtered events with squad activities
      animationRefs.current = activities.map(() => new Animated.Value(0));
      runAnimations(activities.length);
    }
  }, [activities]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = activities.filter(activity => 
      activity.title.toLowerCase().includes(query.toLowerCase()) ||
      activity.date.toLowerCase().includes(query.toLowerCase()) ||
      activity.location.toLowerCase().includes(query.toLowerCase())
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
          imageSource={{ uri: item.image }} // Updated to handle dynamic image URLs
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

      {loading ? (
        <ActivityIndicator size="large" color="green" style={{ marginTop: 20 }} />
      ) : error ? (
        <Text style={{ color: 'green', textAlign: 'center', marginTop: 20 }}>{error}</Text>
      ) : (
        <FlatList
          data={filteredEvents}
          renderItem={renderEventCard}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.groupParent}
        />
      )}
    </SafeAreaView>
  );
};

const EventCard = ({ title, date, location, imageSource }) => {
  return (
    <View style={styles.rectangleParent}>
      <View style={styles.groupChildShadowBox} />
      <View style={styles.imGoingToShakeYParent}>
        <FastImage style={styles.groupInner} resizeMode={FastImage.resizeMode.cover} source={imageSource} />
        <View style={styles.groupInnerShadowBox}>
          <Text style={styles.imGoingTo}>{title}</Text>
          <Text style={styles.satMay1}>{formatDate(date)}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FastImage style={styles.locationIcon} resizeMode={FastImage.resizeMode.cover} source={require('../../assets/location.jpg')} />
            <Text style={styles.min}>{formatLocation(location)}</Text>
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
