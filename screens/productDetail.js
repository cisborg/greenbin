import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Animated, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { FontFamily, Color, Border, FontSize } from "../GlobalStyles";
import { useNavigation } from '@react-navigation/core';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';


const CartDetail = () => {
  const navigation = useNavigation()
  const [cartCount, setCartCount] = useState(0);
  const cartBounce = new Animated.Value(1);

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
    Animated.sequence([
      Animated.timing(cartBounce, { toValue: 1.2, duration: 200, useNativeDriver: true }),
      Animated.timing(cartBounce, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircle" size={27} color={Color.colorLimegreen_200} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Cart Details</Text>
      </View>
      {/* Product Image */}
      <View style={styles.productImageContainer}>
        <Image 
          source={require('../assets/greenBin.png')} 
          style={styles.productImage} 
        />
        <View style={styles.imageIndicatorContainer}>
          <Text style={styles.imageIndicator}>1/4</Text>
        </View>
      </View>
      
      {/* Product Info */}
      <View style={styles.productInfoContainer}>
        <Text style={styles.discountedPrice}>GCPs 459</Text>
        <Text style={styles.originalPrice}>GCPs 1,299</Text>
        <Text style={styles.discountPercentage}>-64%</Text>

        <Text style={styles.productTitle}>
          Green Bin - 100% Recycled and Renewable Green Bins with Zippered Handles
        </Text>

        <View style={styles.ratingContainer}>
          <Icon name="star" type="font-awesome" color="#f5c518" size={16} />
          <Text style={styles.ratingText}>4.4</Text>
          <Text style={styles.reviewText}>Reviews(16152)</Text>
        </View>

        {/* Color Options */}
        <View style={styles.colorContainer}>
          <Text style={styles.colorText}>Color: black</Text>
          <View style={styles.colorOptions}>
            <Image 
              source={require('../assets/greenBin.png')} 
              style={styles.colorOption} 
            />
            <Image 
              source={require('../assets/greenBin.png')} 
              style={styles.colorOption} 
            />
          </View>
        </View>
      </View>

      {/* Fused Add to Cart and Order Now Buttons with Icons */}
      <View style={styles.buttonContainer}>
        {/* Chat Icon */}
        <TouchableOpacity style={styles.chatButton}onPress={()=> navigation.navigate('ChatPage')}>
        <AntDesign name="message1" size={20} color="black" />
        </TouchableOpacity>

        {/* Cart Icon with Bouncing Animation */}
        <TouchableOpacity style={styles.cartButton} onPress={()=> navigation.navigate('cart')}>
          <Animated.View style={{ transform: [{ scale: cartBounce }] }}>
          <FontAwesome6 name="cart-plus" size={20} color={Color.colorLimegreen_200} />
          {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.orderNowButton}>
          <Text style={styles.orderNowText}>Order Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    width: 404,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'flex-start',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 100
  },
  productImageContainer: {
    position: 'relative',
    marginTop: 50,
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
  },
  imageIndicatorContainer: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 4,
    borderRadius: 4,
  },
  imageIndicator: {
    color: '#fff',
    fontSize: 12,
  },
  productInfoContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  discountedPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Color.colorLimegreen_200,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: '#9e9e9e',
  },
  discountPercentage: {
    color: '#ff5722',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#424242',
    marginVertical: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 4,
    color: '#424242',
  },
  reviewText: {
    fontSize: 12,
    marginLeft: 8,
    color: '#757575',
  },
  colorContainer: {
    marginTop: 16,
  },
  colorText: {
    fontSize: 14,
    color: '#424242',
  },
  colorOptions: {
    flexDirection: 'row',
    marginTop: 8,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
    borderColor: '#e0e0e0',
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  chatButton: {
    marginRight: 8,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  cartButton: {
    marginRight: 8,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 8,
    paddingHorizontal: 5,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
  },
  addToCartButton: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    padding: 16,
    backgroundColor: Color.colorWhitesmoke,
    borderRadius: 16,
    borderColor: Color.colorLimegreen_200,
    alignItems: 'center',
  },
  addToCartText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  orderNowButton: {
    flex: 1,
    padding: 16,
    backgroundColor: Color.colorWhitesmoke,
    borderRadius: 16,
    borderColor: Color.colorLimegreen_200,
    borderWidth: 1,
    alignItems: 'center',
  },
  orderNowText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default CartDetail;
