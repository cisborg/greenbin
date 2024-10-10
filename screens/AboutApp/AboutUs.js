import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Animated, SafeAreaView, StatusBar } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import { Color } from '../../GlobalStyles';

const AboutScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0); // Initial opacity of 0

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Fade in to full opacity
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Color.colorWhite} />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back-circle-outline" size={25} color="green" />
          </TouchableOpacity>
          <Text style={styles.title}>About Our App</Text>
        </View>

        <Animated.View style={{ ...styles.fadeContainer, opacity: fadeAnim }}>
          <Image
            source={require('../../assets/greenBin.png')} // Replace with a valid image URL
            style={styles.image}
          />
          <Text style={styles.subtitle}>Empowering the Green Circular Economy</Text>

          <Text style={styles.description}>
            Our app is dedicated to fostering a <Text style={{color: 'green'}}>Leading Charge in Sustainable Innovation</Text> through environmental conservation, pollution reduction, and community engagement. Join us in making a positive impact on the planet!
          </Text>

          <Text style={styles.sectionTitle}>Core Values:</Text>
          <View style={styles.listContainer}>
            <Text style={styles.listItem}><Icon name="leaf" size={18} color="#27ae60" /> Environmental Conservation</Text>
            <Text style={styles.listItem}><Icon name="globe" size={18} color="#27ae60" /> Pollution Reduction</Text>
            <Text style={styles.listItem}><Icon name="flower" size={18} color="#27ae60" /> Tree Planting Initiatives</Text>
            <Text style={styles.listItem}><Icon name="cloud" size={18} color="#27ae60" /> Clean Air Projects</Text>
            <Text style={styles.listItem}><Icon name="flash" size={18} color="#27ae60" /> Green Renewable Energy Solutions</Text>
          </View>

          <Text style={styles.sectionTitle}>Our Currency:</Text>
          <Text style={styles.description}>
            Earn **Green Carbon Points** for participating in eco-friendly activities. Use these points for transactions, rewards, and discounts within our green economy.
          </Text>

          <Text style={styles.sectionTitle}>Green Bank:</Text>
          <Text style={styles.description}>
            Our Green Bank offers personalized banking solutions. Users are deducted a small fee on every deposit, which helps in maintaining personalized mobile money liquidity and Savings. You can withdraw your balance to support your own activities or contribute to our focused value chain activities.
          </Text>
          <Text style={styles.description}>
            Users can partner with us to reach milestones through donations and community involvement, enhancing their Green Bank balance and supporting our mission.
          </Text>

          <Text style={styles.sectionTitle}>Join Us:</Text>
          <Text style={styles.description}>
            Together, we can create a cleaner, greener world. Get involved, earn rewards, and make a difference today!
          </Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
  },
  scrollView: {
    padding: 15,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginLeft: 8,
  },
  subtitle: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#34495e',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#34495e',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27ae60',
    marginTop: 15,
    marginBottom: 8,
  },
  listContainer: {
    marginBottom: 12,
  },
  listItem: {
    fontSize: 14,
    color: '#34495e',
    marginLeft: 8,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 15,
  },
  fadeContainer: {
    opacity: 1,
  },
});

export default AboutScreen;
