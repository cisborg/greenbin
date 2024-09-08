import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { Animated } from 'react-native';

const ProfileScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header with Gradient Background */}
      <View style={styles.header}>
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.gradientHeader}>
          <Image
            style={styles.profileImage}
            source={require('../assets/profile-img.png')} // Replace with your image source
          />
          <Text style={styles.name}>Arya Muller</Text>
        </LinearGradient>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={styles.tabText}>STATS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>ACHIEVEMENTS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>ACTIVITY</Text>
        </TouchableOpacity>
      </View>

      {/* Achievements Section */}
      <View style={styles.achievementsContainer}>
        <Text style={styles.sectionTitle}>ACHIEVEMENTS</Text>
        <View style={styles.levelContainer}>
          <Text style={styles.levelText}>Level 2</Text>
          <Text style={styles.pointsText}>500 Points to next level</Text>
          <LinearGradient
            colors={['#FFD700', '#FF8C00']}
            style={styles.progressBar}
          >
            <View style={[styles.progressFill, { width: '87%' }]} />
          </LinearGradient>
          <Text style={styles.progressText}>5200/6000</Text>
        </View>

        {/* Medals */}
        <View style={styles.medalsContainer}>
          <Text style={styles.sectionTitle}>MEDALS</Text>
          <View style={styles.medals}>
            <View style={styles.medal}>
              <FontAwesome5 name="medal" size={24} color="#FFD700" />
              <Text style={styles.medalCount}>24</Text>
              <Text style={styles.medalName}>Gold</Text>
            </View>
            <View style={styles.medal}>
              <FontAwesome5 name="medal" size={24} color="#C0C0C0" />
              <Text style={styles.medalCount}>18</Text>
              <Text style={styles.medalName}>Silver</Text>
            </View>
            <View style={styles.medal}>
              <FontAwesome5 name="medal" size={24} color="#CD7F32" />
              <Text style={styles.medalCount}>11</Text>
              <Text style={styles.medalName}>Bronze</Text>
            </View>
          </View>
        </View>

        {/* Certifications */}
        <View style={styles.certificationsContainer}>
          <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
          <View style={styles.certification}>
            <AntDesign name="checkcircle" size={20} color="green" />
            <View style={styles.certificationDetails}>
              <Text style={styles.certificationName}>Food Safety Protocols</Text>
              <Text style={styles.certificationStatus}>Bronze Certified</Text>
            </View>
          </View>
          <View style={styles.certification}>
            <AntDesign name="checkcircle" size={20} color="silver" />
            <View style={styles.certificationDetails}>
              <Text style={styles.certificationName}>Facilities & Maintenance</Text>
              <Text style={styles.certificationStatus}>Silver Certified</Text>
            </View>
          </View>
        </View>

        {/* Badges */}
        <View style={styles.badgesContainer}>
          <Text style={styles.sectionTitle}>BADGES</Text>
          <View style={styles.badge}>
            <AntDesign name="star" size={24} color="gold" />
            <Text style={styles.badgeText}>Safety</Text>
          </View>
          <View style={styles.badge}>
            <AntDesign name="heart" size={24} color="red" />
            <Text style={styles.badgeText}>Health</Text>
          </View>
        </View>
      </View>

      {/* Footer Indicator */}
      <View style={styles.footer}>
        <View style={styles.footerIndicator} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1e1e1e',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
    width: 404
  },
  header: {
    alignItems: 'center',
    marginBottom: 15,
  },
  gradientHeader: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 15,
    elevation: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
    elevation: 4,
    marginBottom: 10,
  },
  name: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#333',
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: '#FFD700',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#bbb',
  },
  achievementsContainer: {
    backgroundColor: '#2c2c2c',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    color: '#FFD700',
  },
  levelContainer: {
    marginBottom: 20,
  },
  levelText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 5,
  },
  pointsText: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#555',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
  },
  progressText: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#fff',
  },
  medalsContainer: {
    marginBottom: 20,
  },
  medals: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  medal: {
    alignItems: 'center',
    flex: 1,
  },
  medalCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFD700',
  },
  medalName: {
    fontSize: 14,
    color: '#ccc',
  },
  certificationsContainer: {
    marginBottom: 20,
  },
  certification: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  certificationDetails: {
    marginLeft: 10,
  },
  certificationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  certificationStatus: {
    fontSize: 14,
    color: '#ccc',
  },
  badgesContainer: {
    marginBottom: 20,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  badgeText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#fff',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerIndicator: {
    width: '35%',
    height: 5,
    backgroundColor: '#555',
    borderRadius: 5,
  },
});

export default ProfileScreen;
