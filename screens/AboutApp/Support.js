import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, ScrollView, Animated, SafeAreaView,Platform,StatusBar } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; // For icons
import { useNavigation } from '@react-navigation/native'; // For navigation

const HelpSupportScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handlePhonePress = () => {
    Linking.openURL('tel:+254733100100');
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:info@naturediversity.org');
  };

  const handleFAQPress = () => {
    navigation.navigate('FAQ');
  };

  const handleTipsPress = () => {
    navigation.navigate('HelpFull');
  };

  const handleSocialPress = (url) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Help & Support</Text>
        </View>

        <ScrollView>
          <TouchableOpacity style={styles.section} onPress={handleFAQPress}>
            <Ionicons name="help-circle-outline" size={20} color="green" />
            <Text style={styles.sectionTitle}>FAQ</Text>
            <Ionicons name="chevron-forward" size={20} color="green" style={styles.arrowIcon} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.section} onPress={handleTipsPress}>
            <MaterialIcons name="lightbulb-outline" size={20} color="green" />
            <Text style={styles.sectionTitle}>Helpful Tips</Text>
            <Ionicons name="chevron-forward" size={20} color="green" style={styles.arrowIcon} />
          </TouchableOpacity>

          <Text style={styles.contactTitle}>Contact Us</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Phone:</Text>
            <TouchableOpacity onPress={handlePhonePress}>
              <Text style={styles.contactLink}> +25470000000</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Email:</Text>
            <TouchableOpacity onPress={handleEmailPress}>
              <Text style={styles.contactLink}> info@naturediversity.org</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.findUsTitle}>Find us on</Text>
          <View style={styles.socialIcons}>
            <TouchableOpacity style={styles.tweak} onPress={() => handleSocialPress('https://instagram.com')}>
              <Ionicons name="logo-instagram" size={30} color="#E1306C" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tweak} onPress={() => handleSocialPress('https://facebook.com')}>
              <Ionicons name="logo-facebook" size={30} color="#3b5998" />
            </TouchableOpacity>
            <TouchableOpacity  style={styles.tweak} onPress={() => handleSocialPress('https://twitter.com/naturediversity')}>
              <Ionicons name="logo-twitter" size={30} color="#1DA1F2" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tweak}  onPress={() => handleSocialPress('https://linkedin.com')}>
              <Ionicons name="logo-linkedin" size={30} color="#0077B5" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tweak} onPress={() => handleSocialPress('https://youtube.com')}>
              <Ionicons name="logo-youtube" size={30} color="#FF0000" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '1%',
    margin: 10,
    paddingTop: Platform.OS === 'android'? StatusBar.currentHeight : 0,

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 15,
    borderColor: '#ccc',
    borderRadius: 14,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    marginLeft: 10,
  },
  arrowIcon: {
    marginLeft: 'auto',
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactLabel: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  contactLink: {
    fontSize: 16,
    color: '#007BFF',
  },
  findUsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    marginBottom: 15,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  tweak: {
    width: '15%',
    height: '35%',
    margin: 10,
    paddingHorizontal: 2,
    paddingVertical: 4,
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
  },
});

export default HelpSupportScreen;
