import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Color } from "../GlobalStyles";
import { useNavigation } from '@react-navigation/core';

const initialProducts = [
  {
    id: '1',
    name: 'Mahogany',
    image: 'https://via.placeholder.com/150',
    price: 459,
    discountedPrice: null,
    description: 'Wireless earbuds with intelligent noise reduction.',
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Cypress',
    image: 'https://via.placeholder.com/150',
    price: 499,
    discountedPrice: null,
    description: 'Super bass wireless earphones for music lovers.',
    rating: 4.2,
  },
  {
    id: '3',
    name: 'Pine',
    image: 'https://via.placeholder.com/150',
    price: 599,
    discountedPrice: 549,
    description: 'Stylish and compact true wireless earbuds.',
    rating: 4.8,
  },
  {
    id: '4',
    name: 'Cedar',
    image: 'https://via.placeholder.com/150',
    price: 350,
    discountedPrice: null,
    description: 'Description for product 4.',
    rating: 4.0,
  },
  {
    id: '5',
    name: 'Gum Tree',
    image: 'https://via.placeholder.com/150',
    price: 650,
    discountedPrice: 600,
    description: 'Description for product 5.',
    rating: 4.3,
  },
  {
    id: '6',
    name: 'Neem Tree',
    image: 'https://via.placeholder.com/150',
    price: 450,
    discountedPrice: null,
    description: 'Description for product 6.',
    rating: 4.1,
  },
];

const ProductScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (productName) => {
    alert(`${productName} added to cart!`);
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.productContainer} onPress={() => handleProductSelect(item)}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>GP {item.price}</Text>
        {item.discountedPrice && (
          <Text style={styles.discountedPrice}>GP {item.discountedPrice}</Text>
        )}
      </View>
      <Text style={styles.rating}>Rating: {item.rating} ⭐</Text>
      <TouchableOpacity style={styles.addCart} onPress={() => handleAddToCart(item.name)}>
        <Text style={{ color: Color.colorLimegreen_200 }}>Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Available Trees!</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a product..."
        placeholderTextColor={Color.colorGray_100}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
      />

      {selectedProduct && (
        <Modal
          transparent={true}
          visible={showModal}
          animationType="slide"
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={{ uri: selectedProduct.image }} style={styles.modalImage} />
              <Text style={styles.modalProductName}>{selectedProduct.name}</Text>
              <Text style={styles.modalProductDescription}>{selectedProduct.description}</Text>
              <Text style={styles.modalPrice}>KSh {selectedProduct.price}</Text>
              {selectedProduct.discountedPrice && (
                <Text style={styles.modalDiscountedPrice}>KSh {selectedProduct.discountedPrice}</Text>
              )}
              <Text style={styles.modalRating}>Rating: {selectedProduct.rating} ⭐</Text>
              <TouchableOpacity style={styles.addCart} onPress={() => handleAddToCart(selectedProduct.name)}>
                <Text style={{ color: Color.colorLimegreen_200 }}>Add to Cart</Text>
              </TouchableOpacity>
              <Button title="Close" onPress={() => setShowModal(false)} />
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    width: 404,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: Color.colorLimegreen_200,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
  },
  productList: {
    paddingBottom: 20,
  },
  addCart: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 15,
    margin: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    maxWidth: 120,
    shadowOpacity: 0.2,
    shadowRadius: 1,
    alignSelf: 'center',
  },
  productContainer: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 15,
    margin: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  productImage: {
    width: '100%',
    height: 70,
    borderRadius: 14,
  },
  productName: {
    fontSize: 13,
    fontWeight: '600',
    marginVertical: 10,
    color: '#007BFF',
  },
  productDescription: {
    fontSize: 12,
    color: '#555555',
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#007BFF',
    marginRight: 10,
  },
  discountedPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    color: '#FF0000',
  },
  rating: {
    fontSize: 10,
    marginBottom: 10,
    color: '#FFA500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalProductName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalProductDescription: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  modalDiscountedPrice: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    color: '#FF0000',
  },
  modalRating: {
    fontSize: 16,
    marginBottom: 10,
    color: '#FFA500',
  },
});

export default ProductScreen;
