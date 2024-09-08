import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, FlatList } from 'react-native';
import { AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const activityData = [
  { type: 'gold', title: 'Gold Certification in Change Management', date: 'May 1, 2022', result: '5/5 Correct' },
  { type: 'completed', title: 'Completed Drive-Thru', date: 'May 1, 2022', result: '5/10 Correct' },
  { type: 'bronze', title: 'Bronze in Drive-Thru', date: 'May 1, 2022', result: '8/10 Correct' },
  { type: 'silver', title: 'Silver in Drive-Thru', date: 'May 1, 2022', result: '9/10 Correct' },
  { type: 'gold', title: 'Gold in Drive-Thru', date: 'May 1, 2022', result: '10/10 Correct' },
  { type: 'gold', title: 'Gold in Drive-Thru 101', date: 'May 1, 2022', result: '10/10 Correct' },
  { type: 'completed', title: 'Pre-Test in Customer Experience 101', date: 'May 1, 2022', result: '5/7 Correct' },
];

const ProfileScreen = () => {
  const renderActivityItem = ({ item }) => (
    <View style={styles.activityItem}>
      <View style={styles.activityIcon}>
        {item.type === 'gold' && <AntDesign name="star" size={24} color="gold" />}
        {item.type === 'silver' && <AntDesign name="staro" size={24} color="silver" />}
        {item.type === 'bronze' && <AntDesign name="staro" size={24} color="#cd7f32" />}
        {item.type === 'completed' && <MaterialIcons name="check-circle" size={24} color="gray" />}
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityTitle}>{item.title}</Text>
        <Text style={styles.activityDate}>{item.date} • {item.result}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.profileImage} source={require('../assets/profile-img.png')} />
        <Text style={styles.name}>Arya Muller</Text>
        <AntDesign name="setting" size={24} color="gray" style={styles.settingsIcon} />
      </View>

      <View style={styles.tabContainer}>
        <Text style={styles.tabText}>STATS</Text>
        <Text style={styles.tabText}>ACHIEVEMENTS</Text>
        <Text style={[styles.tabText, styles.activeTab]}>ACTIVITY</Text>
      </View>

      <FlatList
        data={activityData}
        renderItem={renderActivityItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.activityList}
      />

      <View style={styles.footer}>
        <Ionicons name="home-outline" size={28} color="gray" />
        <AntDesign name="profile" size={28} color="gray" />
        <AntDesign name="notification" size={28} color="#4b0082" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    width: 404
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  settingsIcon: {
    position: 'absolute',
    right: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tabText: {
    fontSize: 14,
    color: '#888',
  },
  activeTab: {
    color: '#4b0082',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#4b0082',
  },
  activityList: {
    paddingHorizontal: 15,
    paddingBottom: 80,
  },
  activityItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  activityIcon: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContent: {
    marginLeft: 15,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  activityDate: {
    fontSize: 12,
    color: '#999',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    elevation: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

export default ProfileScreen;
