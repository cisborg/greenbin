import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, FlatList } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'; // Import for icons
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for state persistence

const CoinRewards = () => {
  const [checkedIn, setCheckedIn] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1); // Start at Day 1
  const [totalCoins, setTotalCoins] = useState(0);
  const [showCoinsMall, setShowCoinsMall] = useState(true);

  const days = [
    { day: 1, coins: 1 },
    { day: 2, coins: 6 },
    { day: 3, coins: 18 },
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

  useEffect(() => {
    const loadState = async () => {
      try {
        const savedCoins = await AsyncStorage.getItem('totalCoins');
        const savedDay = await AsyncStorage.getItem('selectedDay');
        if (savedCoins !== null) {
          setTotalCoins(parseInt(savedCoins, 10));
        }
        if (savedDay !== null) {
          setSelectedDay(parseInt(savedDay, 10));
        }
      } catch (e) {
        console.error("Error loading state:", e);
      }
    };

    loadState();
  }, []);

  const handleCheckIn = async () => {
    setCheckedIn(true);
    setTotalCoins(prevTotal => prevTotal + days[selectedDay - 1].coins);
    await AsyncStorage.setItem('totalCoins', (totalCoins + days[selectedDay - 1].coins).toString());
    await AsyncStorage.setItem('selectedDay', selectedDay.toString());
  };

  const handleVoucherRedemption = (voucher) => {
    if (totalCoins >= voucher.coins) {
      setTotalCoins(prevTotal => prevTotal - voucher.coins);
      AsyncStorage.setItem('totalCoins', (totalCoins - voucher.coins).toString());
      alert(`Voucher ${voucher.value} redeemed!`);
    } else {
      alert('Not enough coins to redeem this voucher.');
    }
  };

  const handleDayReset = async () => {
    const today = new Date().getDate(); // Get current day of the month
    if (today !== selectedDay) {
      setSelectedDay(1); // Reset to Day 1 if user missed a day
      setTotalCoins(0); // Reset coins as well
      await AsyncStorage.removeItem('totalCoins');
      await AsyncStorage.removeItem('selectedDay');
    }
  };

  const resetAfter7Days = async () => {
    if (selectedDay > 7) {
      setSelectedDay(1); // Reset back to Day 1
      setTotalCoins(0); // Reset coins after 7 days
      await AsyncStorage.removeItem('totalCoins');
      await AsyncStorage.removeItem('selectedDay');
    }
  };

  useEffect(() => {
    handleDayReset();
    resetAfter7Days();
  }, [selectedDay]);

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
                day.day > selectedDay && styles.disabledDay
              ]}
              disabled={checkedIn || day.day > selectedDay}
              onPress={() => {
                setSelectedDay(day.day);
                if (day.day === selectedDay && !checkedIn) {
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
        
      </View>

      {showCoinsMall && (
        <View>
          <Text style={styles.coinsMallHeader}>Coins Mall</Text>
          <FlatList
            data={vouchers}
            renderItem={({ item }) => (
              <View style={styles.voucherCard}>
                <Text style={styles.voucherValue}>{item.value}</Text>
                <Text style={styles.voucherType}>{item.type}</Text>
                <Text style={styles.voucherCoins}>{item.coins} Coins</Text>
                <TouchableOpacity style={styles.exchangeButton} onPress={() => handleVoucherRedemption(item)}>
                  <Text style={styles.buttonText}>Exchange</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.id}
            numColumns={2}
          />
        </View>
      ) }
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
