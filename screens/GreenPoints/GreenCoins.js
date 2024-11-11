import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, FlatList} from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'; // Import for icons
import FastImage from 'react-native-fast-image';
const CoinRewards = () => {
  const [checkedIn, setCheckedIn] = useState(false);
  const [selectedDay, setSelectedDay] = useState(3); // Assume today is "DAY-3" for testing
  const [totalCoins, setTotalCoins] = useState(0);
  const [showCoinsMall, setShowCoinsMall] = useState(true);

  const days = [
    { day: 1, coins: 1 },
    { day: 2, coins: 6 },
    { day: 3, coins: 18 }, // "today"
    { day: 4, coins: 20 },
    { day: 5, coins: 24 },
    { day: 6, coins: 30 },
    { day: 7, coins: 48 }
  ];

  const vouchers = [
    { id: '1', value: 'KSh 15 Off', type: 'Shipping voucher', coins: 70 },
    { id: '2', value: 'KSh 15 Off', type: 'Platform voucher', coins: 70 },
    { id: '3', value: 'KSh 55 Off', type: 'Shipping voucher', coins: 230 },
    { id: '4', value: 'KSh 60 Off', type: 'Platform voucher', coins: 229 },
  ];

  const products = [
    { id: '1', name: 'Product 1', description: 'Ecogreen Bag', price: 'KSh 100', image: 'https://via.placeholder.com/100' },
    { id: '2', name: 'Product 2', description: 'GreenBin Standard', price: 'KSh 200', image: 'https://via.placeholder.com/100' },
    { id: '3', name: 'Product 3', description: 'Green Mattress', price: 'KSh 300', image: 'https://via.placeholder.com/100' },
  ];

  const handleCheckIn = () => {
    setCheckedIn(true);
    setTotalCoins(prevTotal => prevTotal + days[selectedDay - 1].coins);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daily Coin Rewards</Text>
      <Text style={styles.totalCoins}>Total Coins: {totalCoins}</Text>

      <View style={styles.checkInContainer}>
  <Text style={styles.checkInText}>Check-in today to earn {days[selectedDay - 1].coins} coins</Text>
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    {days.map((day) => (
      <TouchableOpacity
        key={day.day}
        style={[
          styles.dayBox,
          selectedDay === day.day && !checkedIn && styles.todayDay,
          day.day < selectedDay && styles.checkedDay,
        ]}
        disabled={checkedIn || day.day > selectedDay} // Disable future days
        onPress={() => {
          setSelectedDay(day.day);
          if (day.day === selectedDay) {
            handleCheckIn();
          }
        }}
      >
        <Text style={styles.dayLabel}>{day.day}</Text>
        <Text style={styles.coinValue}>
          {day.day < selectedDay || (checkedIn && day.day === selectedDay) ? (
            <MaterialCommunityIcons name="checkbox-marked-circle" size={20} color="green" />
          ) : (
            <FontAwesome5 name="coins" size={20} color="gold" />
          )}
          {(!checkedIn || day.day !== selectedDay) && <Text> +{day.coins}</Text>}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
</View>

      <View style={styles.toggleContainer}>
        <TouchableOpacity onPress={() => setShowCoinsMall(true)} style={[styles.toggleButton, showCoinsMall && styles.activeToggle]}>
          <Text style={styles.toggleText}>Coins Mall</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowCoinsMall(false)} style={[styles.toggleButton, !showCoinsMall && styles.activeToggle]}>
          <Text style={styles.toggleText}>Recommend Me</Text>
        </TouchableOpacity>
      </View>

      {showCoinsMall ? (
        <View>
          <Text style={styles.coinsMallHeader}>Coins Mall</Text>
          <FlatList
            data={vouchers}
            renderItem={({ item }) => (
              <View style={styles.voucherCard}>
                <Text style={styles.voucherValue}>{item.value}</Text>
                <Text style={styles.voucherType}>{item.type}</Text>
                <Text style={styles.voucherCoins}>{item.coins} Coins</Text>
                <TouchableOpacity style={styles.exchangeButton}>
                  <Text style={styles.buttonText}>Exchange</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.id}
            numColumns={2}
          />
        </View>
      ) : (
        <View>
          <Text style={styles.mayLikeHeader}>You May Also Like</Text>
          <FlatList
            data={products}
            renderItem={({ item }) => (
              <View style={styles.productCard}>
                <FastImage source={{ uri: item.image }} style={styles.productImage} resizeMode={FastImage.resizeMode.cover}/>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productDescription}>{item.description}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
                <TouchableOpacity style={styles.exchangeButton}>
                  <Text style={styles.buttonText}>Apply Voucher</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.id}
            numColumns={2}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#343a40',
  },
  totalCoins: {
    fontSize: 18,
    marginBottom: 16,
    color: '#6c757d',
  },
  checkInContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  checkInText: {
    fontSize: 16,
    marginBottom: 8,
  },
  dayBox: {
    padding: 10,
    backgroundColor: '#e9ecef',
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  todayDay: {
    backgroundColor: '#28a745',
  },
  checkedDay: {
    backgroundColor: '#6c757d',
  },
  dayLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  coinValue: {
    fontSize: 14,
    color: '#495057',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  toggleButton: {
    padding: 10,
    borderRadius: 14,
    backgroundColor: '#e9ecef',
    flex: 1,
    alignItems: 'center',
    margin: 5
  },
  activeToggle: {
    backgroundColor: '#28a745',
  },
  toggleText: {
    fontSize: 16,
    color: '#343a40',
  },
  coinsMallHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#343a40',
  },
  voucherCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 15,
    margin: 8,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  voucherValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  voucherType: {
    fontSize: 14,
    color: '#6c757d',
  },
  voucherCoins: {
    fontSize: 14,
    color: '#28a745',
  },
  exchangeButton: {
    marginTop: 8,
    padding: 10,
    backgroundColor: '#28a745',
    borderRadius: 14,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  mayLikeHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#343a40',
  },
  productCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    margin: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
    color: '#6c757d',
  },
  productPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#28a745',
  },
});

export default CoinRewards;
