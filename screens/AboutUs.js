import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import { Color } from '../GlobalStyles';


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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-circle-outline" size={24} color="green" />
        </TouchableOpacity>
        <Text style={styles.title}>About Our App</Text>
      </View>

      <Animated.View style={{ ...styles.fadeContainer, opacity: fadeAnim }}>
        <Image
          source={require('../assets/greenBin.png')} // Replace with a valid image URL
          style={styles.image}
        />
        <Text style={styles.subtitle}>Empowering the Green Circular Economy</Text>

        <Text style={styles.description}>
          Our app is dedicated to fostering a <Text style={{color: Color.colorLimegreen_200}}>Leading Charge in Sustainable Innovation</Text> through environmental conservation, pollution reduction, and community engagement. Join us in making a positive impact on the planet!
        </Text>

        <Text style={styles.sectionTitle}>Core Values:</Text>
        <View style={styles.listContainer}>
          <Text style={styles.listItem}><Icon name="leaf" size={20} color="#27ae60" /> Environmental Conservation</Text>
          <Text style={styles.listItem}><Icon name="globe" size={20} color="#27ae60" /> Pollution Reduction</Text>
          <Text style={styles.listItem}><Icon name="tree" size={20} color="#27ae60" /> Tree Planting Initiatives</Text>
          <Text style={styles.listItem}><Icon name="cloud" size={20} color="#27ae60" /> Clean Air Projects</Text>
          <Text style={styles.listItem}><Icon name="flash" size={20} color="#27ae60" /> Green Renewable Energy Solutions</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 20,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#34495e',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#27ae60',
    marginTop: 20,
    marginBottom: 10,
  },
  listContainer: {
    marginBottom: 15,
  },
  listItem: {
    fontSize: 16,
    color: '#34495e',
    marginLeft: 10,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  fadeContainer: {
    opacity: 1,
  },
});

export default AboutScreen;
