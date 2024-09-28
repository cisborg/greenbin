import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Animated, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';

const CartDetail = () => {
  const navigation = useNavigation();
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
          <AntDesign name="leftcircle" size={27} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Product Details</Text>
      </View>

      {/* Product Image */}
      <View style={styles.productImageContainer}>
        <Image 
          source={require('../../assets/greenBin.png')} 
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
              source={require('../../assets/greenBin.png')} 
              style={styles.colorOption} 
            />
            <Image 
              source={require('../../assets/greenBin.png')} 
              style={styles.colorOption} 
            />
          </View>
        </View>

        {/* Add to Cart and Chat Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate('ChatPage')}>
            <AntDesign name="message1" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('cart')}>
            <Animated.View style={{ transform: [{ scale: cartBounce }] }}>
              <FontAwesome6 name="cart-plus" size={24} color="#4CAF50" />
              {cartCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
              )}
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Additional Product Details */}
      <View style={styles.additionalInfoContainer}>
        <Text style={styles.additionalInfoTitle}>Additional Information</Text>
        <Text style={styles.additionalInfoText}>Material: 100% Recycled Plastic</Text>
        <Text style={styles.additionalInfoText}>Dimensions: 30 x 30 x 30 cm</Text>
        <Text style={styles.additionalInfoText}>Weight: 1.5 kg</Text>
        <Text style={styles.additionalInfoText}>Warranty: 2 years</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  productImageContainer: {
    position: 'relative',
    marginTop: 20,
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
    color: '#4CAF50',
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
    marginLeft: 8,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  additionalInfoContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  additionalInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  additionalInfoText: {
    fontSize: 14,
    color: '#424242',
  },
});

export default CartDetail;
