import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, SafeAreaView, Animated, ActivityIndicator, Dimensions, Platform,StatusBar } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Color } from '../../GlobalStyles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const { width } = Dimensions.get('window'); // Get device width

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([
    { id: '1', seller: 'John Bike', name: 'Ecobikes', price: 4704, quantity: 1, image: require('../../assets/bikes.png') },
    { id: '2', seller: 'Pinya Electronics', name: 'Smart Security', price: 12225, quantity: 1, image: require('../../assets/Appliance.png') },
    { id: '3', seller: 'Jack', name: 'Smart Homes', price: 699, quantity: 1, image: require('../../assets/Bags.png') },
    { id: '4', seller: 'Jilian', name: 'Tree Vendors', price: 599, quantity: 1, image: require('../../assets/clothes.png') },
    { id: '5', seller: 'Johanna', name: 'Smart Devices', price: 599, quantity: 1, image: require('../../assets/binance.png') },
  ]);

  const [loading, setLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const increaseQuantity = (id) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getDeliveryFee = () => {
    return getTotalPrice() > 5500 ? 129 : 0;
  };

  const renderItem = ({ item }) => {
    const renderRightActions = () => (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id))}
      >
        <MaterialIcons name="delete" size={30} color={Color.colorGray_100} />
      </TouchableOpacity>
    );

    return (
      <Swipeable renderRightActions={renderRightActions}>
        <View style={styles.cartItem}>
          <View style={styles.itemRow}>
            <View style={styles.itemInfo}>
              <TouchableOpacity>
                <Text style={styles.sellerName}>{item.seller}</Text>
              </TouchableOpacity>
              <View style={styles.itemDetails}>
                <Image source={item.image} style={styles.itemImage} />
                <View style={styles.itemContent}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>GCPs {item.price}</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.quantityMinusButton} onPress={() => decreaseQuantity(item.id)}>
                      <Text style={styles.quantityMinusText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity style={styles.quantityButton} onPress={() => increaseQuantity(item.id)}>
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Swipeable>
    );
  };

  
  const renderEmptyCart = () => (
    <View style={styles.emptyCartContainer}>
      <Text style={styles.emptyCartText}>No products in cart</Text>
      <Text style={styles.emptyCartSubText}>Click the button below to start adding items.</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('ChallengePage')}>
        <Text style={styles.addButtonText}>Order Now</Text>
      </TouchableOpacity>
    </View>
  );

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      navigation.navigate('Checkout', { totalPrice: getTotalPrice() + 5 + getDeliveryFee() });
      setLoading(false);
    }, 300);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.animatedView, { opacity: fadeAnim }]}>
        <View style={styles.header}>
          <Text style={styles.cartTitle}>My Cart ({cartItems.length} Items)</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('ChallengePage')}>
            <Text style={styles.addButtonText}>Claim More</Text>
          </TouchableOpacity>
        </View>
        {cartItems.length === 0 ? (
          renderEmptyCart()
        ) : (
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
          />
        )}
        {cartItems.length > 0 && (
          <View style={styles.footer}>
            <View style={styles.priceRow}>
              <Text style={styles.totalPriceLabel}>Total:</Text>
              <Text style={styles.totalPrice}>GCPs {getTotalPrice()}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.totalPriceLabel}>VAT:</Text>
              <Text style={styles.totalPrice}>GCPs 5</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.totalPriceLabel}>Delivery fee:</Text>
              <Text style={styles.totalPrice}>{getDeliveryFee() === 0 ? 'Free' : `GCPs ${getDeliveryFee()}`}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.priceRow}>
              <Text style={styles.subTotalLabel}>Cash In:</Text>
              <Text style={styles.subTotal}>GCPs {getTotalPrice() + 5 + getDeliveryFee()}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.checkoutButtonText}>Check Out</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 5,
    paddingTop: Platform.OS === 'android'? StatusBar.currentHeight : 0,

  },
  animatedView: {
    flex: 1,
    margin: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cartTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#333',
  },
  cartItem: {
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
    padding: 10,
    width: '100%',
  },
  sellerName: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 15,
    marginTop: -18,
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  itemPrice: {
    fontSize: 14,
    color:'green',
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor:'green',
    padding: 5,
    paddingVertical: 2,
    borderRadius: 9,
    marginHorizontal: 5,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityMinusButton: {
    backgroundColor:'#f1f1f1',
    padding: 5,
    paddingVertical: 2,
    borderRadius: 9,
    marginHorizontal: 5,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: Color.colorWhite,
    fontSize: 13,
    alignSelf: 'center',
  },
  quantityMinusText: {
    color: Color.colorBlack,
    fontSize: 20,
    marginTop: -6,
    alignSelf: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: '100%',
    borderRadius: 15,
  },
  footer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    marginTop: 20,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalPriceLabel: {
    fontSize: 16,
    color: '#888',
  },
  totalPrice: {
    fontSize: 16,
    color: '#333',
  },
  subTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: -55,
  },
  profileImage: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    marginLeft: -10,
  },
  profileText: {
    fontSize: 12,
    color: '#888',
    marginLeft: 5,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyCartText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptyCartSubText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor:'green',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 11,
    height: 40,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CartScreen;