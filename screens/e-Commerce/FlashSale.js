// components/FlashSaleSection.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

// Sample data for products
const products = [
  {
    id: '1',
    name: 'Bra',
    price: 'KSh 531',
    imageUrl: 'https://yourcdn.com/image_bra.jpg', // replace with actual image
  },
  {
    id: '2',
    name: 'Hair Bonnet',
    price: 'KSh 199',
    imageUrl: 'https://yourcdn.com/image_bonnet.jpg', // replace with actual image
  },
  {
    id: '3',
    name: 'Wig',
    price: 'KSh 687',
    imageUrl: 'https://yourcdn.com/image_wig.jpg', // replace with actual image
  },
  {
    id: '4',
    name: 'Earrings',
    price: 'KSh 335',
    imageUrl: 'https://yourcdn.com/image_earrings.jpg', // replace with actual image
  },
];

// Countdown timer function
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(3600); // Example: 1 hour countdown

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>;
};

// Product item component
const ProductItem = ({ item }) => (
  <View style={styles.productItem}>
    <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
    <Text style={styles.productPrice}>{item.price}</Text>
  </View>
);

// Main flash sale component
const FlashSale = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Flash Sale Header */}
      <TouchableOpacity style={styles.header} onPress={()=> navigation.navigate('SalesList')}>
        <Text style={styles.flashSaleText}> Fl⚡sh Sale Granary</Text>
        <CountdownTimer />
        <AntDesign name="right" size={24} color="green" />
      </TouchableOpacity>

      {/* Horizontal Scrollable List */}
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductItem item={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '16%',
    marginTop: '-2%',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 4,
    borderRadius: 20,
    paddingVertical: 5,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 5
  },
  flashSaleText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'green',
    marginRight: '39%'
  },
  timerText: {
    fontSize: 15,
    color: 'red',
    fontWeight: 'bold',
  },
  productItem: {
    width: 120,
    marginRight: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 55,
    resizeMode: 'contain',
    borderRadius: 12,
    
  },
  productPrice: {
    marginTop: 5,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default FlashSale;
