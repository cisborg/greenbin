import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, CheckBox } from 'react-native';

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([
    { id: '1', seller: 'John Bike', name: 'Ecobikes', price: 4704, quantity: 1, checked: false },
    { id: '2', seller: 'Pinya Electronic Products Co., Ltd', name: 'Smart Security', price: 12225, quantity: 1, checked: false },
    { id: '3', seller: 'Jack', name: 'Smart Homes', price: 699, quantity: 1, checked: false },
    { id: '4', seller: 'Jilian', name: 'Tree Vendors', price: 599, quantity: 1, checked: false },
    { id: '4', seller: 'Johanna', name: 'Smart Devices', price: 599, quantity: 1, checked: false },

  ]);

  const [isEditing, setIsEditing] = useState(false);

  const toggleCheck = (id) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        item.checked = !item.checked;
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleRemoveItems = () => {
    setCartItems(cartItems.filter(item => !item.checked));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const increaseQuantity = (id) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        item.quantity += 1;
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const decreaseQuantity = (id) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id && item.quantity > 1) {
        item.quantity -= 1;
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={styles.sellerRow}>
        <View style={styles.sellerInfo}>
          {isEditing && (
            <CheckBox
              value={item.checked}
              onValueChange={() => toggleCheck(item.id)}
              style={styles.checkbox}
            />
          )}
          <Image source={require('../assets/basket.png')} style={styles.basketIcon} />
          <TouchableOpacity onPress={() => navigation.navigate('SellerInfo', { sellerId: item.id })}>
            <Text style={styles.sellerName}>{item.seller}</Text>
          </TouchableOpacity>
          <Image source={require('../assets/arrow-icon.png')} style={styles.arrowIcon} />
        </View>
      </View>
      <View style={styles.itemRow}>
        <Image source={require('../assets/earphones.png')} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>GCPs {item.price}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.minusButton} onPress={() => decreaseQuantity(item.id)}>
              <Text style={styles.minusButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity style={styles.plusButton} onPress={() => increaseQuantity(item.id)}>
              <Text style={styles.plusButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cart({cartItems.length})</Text>
        <TouchableOpacity onPress={handleEdit}>
          <Text style={styles.editButton}>{isEditing ? 'Done' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.footer}>
        <Text style={styles.totalPrice}>GCPs {getTotalPrice()}</Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Check Out({cartItems.length})</Text>
        </TouchableOpacity>
      </View>
      {isEditing && (
        <TouchableOpacity style={styles.removeButton} onPress={handleRemoveItems}>
          <Text style={styles.removeButtonText}>Delete</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    width: 404
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  editButton: {
    fontSize: 16,
    color: '#007bff',
  },
  sellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 10,
  },
  basketIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    color: 'green'
  },
  sellerName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    color: 'green'
  },
  arrowIcon: {
    width: 15,
    height: 15,
  },
  itemRow: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
  },
  itemImage: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: '#555',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  plusButton: {
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 10,
    width: 30,
    height: 20
  },
  plusButtonText: {
    color: '#fff',
    fontSize: 20,
    marginTop: -7,
    alignSelf: 'center',
  },
  minusButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 10,
    width: 30,
    height: 20,
  },
  minusButtonText: {
    color: '#fff',
    fontSize: 20,
    alignSelf: 'center',
    marginTop: -7,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 18,
  },
  checkoutButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  removeButton: {
    backgroundColor: '#ff0000',
    padding: 10,
    margin: 20,
    borderRadius: 15,
    width: 90,
    alignItems: 'center',
  },
  removeButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default CartScreen;
