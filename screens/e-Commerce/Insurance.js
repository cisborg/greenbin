import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from 'react-native-reanimated-carousel';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const Insurance = () => {
  const carouselRef = useRef(null);
  const navigation = useNavigation(); // Get navigation object

  // Sample data for Green Insurance Services
  const insuranceServices = [
    {
      title: 'Green Health Insurance',
      description: 'Eco-conscious health coverage for sustainable lifestyles.',
      icon: 'health-and-safety',
      lottieFile: require('../../assets/lottie/bouncing_check.json'),
      badge: 'Popular',
    },
    {
      title: 'Renewable Energy',
      description: 'Insurance for renewable energy projects and installations.',
      icon: 'solar-power',
      lottieFile: require('../../assets/lottie/bouncing_check.json'),
      badge: 'Featured',
    },
    {
      title: 'Property Insurance',
      description: 'Sustainable property insurance for green buildings.',
      icon: 'home',
      lottieFile: require('../../assets/lottie/bouncing_check.json'),
      badge: 'Featured',
    },
    {
      title: 'Entrepreneurial Startups',
      description: 'Support for eco-friendly startups.',
      icon: 'business',
      lottieFile: require('../../assets/lottie/bouncing_check.json'),
      badge: 'Latest',
    },
    {
      title: 'Transport Insurance',
      description: 'Support for Green Travelling and Airlifts',
      icon: 'commute',
      lottieFile: require('../../assets/lottie/bouncing_check.json'),
    },
  ];

  // Render each insurance service card
  const renderInsuranceCard = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('RegisterPage', { insurance: item })} // Navigate to RegisterPage
    >
      <Card style={styles.insuranceCard} key={index}>
        <Card.Content>
          <View style={styles.iconRow}>
            {item.badge && <Badge>{item.badge}</Badge>}
            <LottieView source={item.lottieFile} style={styles.lottieIcon} />
            <Title style={styles.cardTitle}>{item.title}</Title>
          </View>
          <Paragraph>{item.description}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, James!</Text>
          <Icon name="notifications" size={30} color="#fff" />
        </View>

        <Animated.View entering={FadeInUp} style={styles.recentTrips}>
          <Text style={styles.sectionTitle}>Recent Policy</Text>
          <Card style={styles.tripCard}>
            <Card.Content>
              <View style={styles.tripHeader}>
                <Text style={styles.tripTime}>Today, 03:40 p.m.</Text>
              </View>
              <Text style={styles.tripLocation}>Los Angeles International Airport</Text>
              <Text style={styles.tripAddress}>5274 Blackwelder St, Los Angeles</Text>
            </Card.Content>
          </Card>
        </Animated.View>

        <View style={styles.greenInsuranceServices}>
          <Text style={styles.sectionTitle}>Green Insurance Policies</Text>
          <Carousel
            ref={carouselRef}
            data={insuranceServices}
            renderItem={renderInsuranceCard}
            width={300}
            height={200}
            autoPlay={true}
            autoPlayInterval={3000}
          />
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'green',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  greeting: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  recentTrips: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  tripCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tripTime: {
    fontSize: 16,
    color: '#555',
  },
  tripLocation: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 5,
  },
  tripAddress: {
    fontSize: 16,
    color: '#777',
    marginTop: 2,
  },
  greenInsuranceServices: {
    marginBottom: 20,
  },
  insuranceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    elevation: 2,
    alignItems: 'center',
    marginHorizontal: 10,
    maxWidth: '100%'
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },

  lottieIcon: {
    width: 30,
    height: 30,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Insurance;
