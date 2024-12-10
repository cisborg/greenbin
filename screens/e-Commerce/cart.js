import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, FlatList,Platform,StatusBar, TouchableOpacity, SafeAreaView, Animated, ActivityIndicator, Dimensions } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Color } from '../../GlobalStyles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
import { addQuantity, decreaseQuantity, removeFromCart } from '../../redux/actions/cart';
import { fetchVouchers } from '../../redux/actions/rewardsActions'; // Import your fetch vouchers action

const { width } = Dimensions.get('window');

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const vouchers = useSelector((state) => state.vouchers.items); // Assuming you have a vouchers slice in your Redux store
  const [loading, setLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    dispatch(fetchVouchers()); // Fetch vouchers when the component mounts
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [dispatch, fadeAnim]);

  const increaseQuantity = (id) => {
    dispatch(addQuantity(id));
  };

  const reduceQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const removeItemFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getDeliveryFee = () => {
    return getTotalPrice() > 5500 ? 129 : 0;
  };

  const getVoucherInfo = () => {
    const totalPrice = getTotalPrice();
    const applicableVoucher = vouchers.find(v => totalPrice >= v.minAmount && totalPrice < v.maxAmount);
    return applicableVoucher ? { name: applicableVoucher.name, discount: applicableVoucher.value } : { name: "No Voucher", discount: 0 };
  };

  const getVoucherDiscount = () => {
    const voucherInfo = getVoucherInfo();
    return voucherInfo.discount; // Get the discount amount from the applicable voucher
  };

  const getNetTotalPrice = () => {
    const totalPrice = getTotalPrice();
    const discount = getVoucherDiscount();
    return totalPrice - discount; // Subtract the discount from the total price
  };

  const renderItem = ({ item }) => {
    const renderRightActions = () => (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeItemFromCart(item.id)}
      >
        <MaterialIcons name="delete" size={30} color='white' />
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
                <FastImage source={item.image} style={styles.itemImage} resizeMode={FastImage.resizeMode.cover} />
                <View style={styles.itemContent}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>GCPs {item.price}</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.quantityMinusButton} onPress={() => reduceQuantity(item.id)}>
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

  const handleCheckout = async () => {
    setLoading(true); // Set loading state to true
    try {
        const netPrice = getNetTotalPrice() + 5 + getDeliveryFee();
        await new Promise((resolve) => setTimeout(resolve, 300))
        navigation.navigate('Checkout', { points: netPrice });
    } catch (error) {
        Alert("Error during checkout process:", error);
    } finally {
        setLoading(false); // Reset loading state
    }
};

  const voucherInfo = getVoucherInfo();

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
              <Text style={styles.subTotalLabel}>Green Net Pay:</Text>
              <Text style={styles.subTotal}>GCPs {getNetTotalPrice() + 5 + getDeliveryFee()}</Text>
            </View>

            {/* Voucher Information */}
            <View style={styles.voucherContainer}>
              <Text style={styles.voucherLabel}>Voucher Applied:</Text>
              <Text style={styles.voucherMessage}>{voucherInfo.name} - GCPs {voucherInfo.discount} Off</Text>
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
    fontSize: 19,
    fontWeight: 'bold',
    color: '#333',
  },
  cartItem: {
    borderRadius: 22,
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
  voucherContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f0f0f0', // Adjust based on your design
    borderRadius: 5,
  },
  voucherLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  voucherMessage: {
    fontSize: 14,
    color: 'green', // Adjust color based on your theme
  },
  itemInfo: {
    flex: 1,
    padding: 10,
    width: width * 0.98,
  },
  sellerName: {
    fontSize: 13,
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
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  itemPrice: {
    fontSize: 12,
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
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: '90%',
    marginLeft: '5%',
    borderRadius: 20,
  },
  footer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: 15,
    elevation: 2,
    marginTop: 20,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalPriceLabel: {
    fontSize: 14,
    color: '#888',
  },
  totalPrice: {
    fontSize: 14,
    color: '#333',
  },
  subTotalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  subTotal: {
    fontSize: 16,
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
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
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
