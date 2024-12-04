import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from 'react-native-reanimated-carousel';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';

const Insurance = () => {
  const carouselRef = useRef(null);
  
  // Sample data for Green Insurance Services
  const insuranceServices = [
    {
      title: 'Green Health Insurance',
      description: 'Eco-conscious health coverage for sustainable lifestyles.',
      icon: 'health-and-safety',
      lottieFile: require('../../assets/lottie/bouncing_check.json'),  // Update path to your Lottie file
      badge: 'Popular'
    },
    {
      title: 'Renewable Energy',
      description: 'Insurance for renewable energy projects and installations.',
      icon: 'solar-power',
      lottieFile: require('../../assets/lottie/bouncing_check.json'),  // Update path to your Lottie file
      badge: 'Featured'
    },
    {
      title: 'Property Insurance',
      description: 'Sustainable property insurance for green buildings.',
      icon: 'home',
      lottieFile: require('../../assets/lottie/bouncing_check.json'),  // Update path to your Lottie file
    },
    {
      title: 'Entrepreneurial Startups',
      description: 'Support for eco-friendly startups.',
      icon: 'business',
      lottieFile: require('../../assets/lottie/bouncing_check.json'),  // Update path to your Lottie file
    },
    {
      title: 'Transport Insurance',
      description: 'Support for Green Travelling and Airlifts',
      icon: 'business',
      lottieFile: require('../../assets/lottie/bouncing_check.json'),  // Update path to your Lottie file
    },
  ];

  // Render each insurance service card with Lottie animation and optional badge
  const renderInsuranceCard = ({ item }) => (
    <Card style={styles.insuranceCard}>
      <Card.Content>
        <View style={styles.iconRow}>
          {/* Badge for highlighted services */}
          {item.badge && <Badge style={styles.badge}>{item.badge}</Badge>}
          
          {/* Icon with animated Lottie icon */}
          <LottieView source={item.lottieFile} autoPlay loop style={styles.lottieIcon} />
          <Title style={styles.cardTitle}>{item.title}</Title>
        </View>
        <Paragraph>{item.description}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, James!</Text>
          <Icon name="notifications" size={30} color="#fff" />
        </View>

        <Animated.View entering={FadeInUp} style={styles.recentTrips}>
          <Text style={styles.sectionTitle}>Recent Trips</Text>
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
            sliderWidth={300}
            itemWidth={250}
            layout="default"
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
    backgroundColor: '#3B82F6',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  greeting: {
    color: '#fff',
    fontSize: 24,
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
    borderRadius: 10,
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
    borderRadius: 10,
    padding: 15,
    elevation: 3,
    marginHorizontal: 10,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  badge: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontSize: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginRight: 5,
  },
  lottieIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Insurance;
