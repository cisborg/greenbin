import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Animated, Alert, Modal, ScrollView, TextInput } from 'react-native';
import { Ionicons ,FontAwesome5} from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'; // Ensure you have this import at the top
import { RefreshControl } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox'; // Import BouncyCheckbox


const initialProducts = [
  {
    id: '1',
    title: 'Eco-Friendly Solar Lamp',
    price: 899,
    originalPrice: 999,
    image: require('../../assets/check.png'),
    rating: 4.5,
    reviewCount: 10,
    brand: 'EcoBrand',
    isBrandOfficial: false,
    isLocalDispatch: true,
  },
  {
    id: '2',
    title: 'Recycled Plastic Chair',
    price: 1154,
    originalPrice: null,
    image: require('../../assets/clothes.png'),
    rating: 4.0,
    reviewCount: 5,
    brand: 'ReGreen',
    isBrandOfficial: true,
    isLocalDispatch: false,
  },
  {
    id: '3',
    title: 'Recycled Plastic Chair',
    price: 1154,
    originalPrice: null,
    image: require('../../assets/clothes.png'),
    rating: 4.0,
    reviewCount: 5,
    brand: 'ReGreen',
    isBrandOfficial: true,
    isLocalDispatch: false,
  },
  {
    id: '4',
    title: 'Eco-Friendly Solar Lamp',
    price: 899,
    originalPrice: 999,
    image: require('../../assets/check.png'),
    rating: 4.5,
    reviewCount: 10,
    brand: 'EcoBrand',
    isBrandOfficial: false,
    isLocalDispatch: true,
  },
 
];

const StoreHeader = () => {

    const [isFollowing, setIsFollowing] = useState(false);
    const [followText, setFollowText] = useState('Follow');
    const [followers, setFollowers] = useState(99); // Initial number of followers

    const handleFollow = () => {
      setIsFollowing(true);
      setTimeout(() => {
        setIsFollowing(false);
        setFollowers(prevFollowers => {
          if (followText === 'Follow') {
            setFollowText('Connected');
            return prevFollowers + 1; // Increment followers
          } else {
            setFollowText('Follow');
            return prevFollowers - 1; // Decrement followers
          }
        });
      }, 300);
    };
  

  return (
    <View style={styles.storeHeaderContainer}>
      <FastImage
        source={require('../../assets/tree.avif')}
        style={styles.storeImage}
        resizeMode={FastImage.resizeMode.cover} // Set the desired resize mode
      />      <View style={styles.storeInfoContainer}>
        <Text style={styles.storeName}>Sysnex Electronics</Text>
        <Text style={styles.storeDetails}>Total 707 products | {followers} followers</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.storeScore}>Score: 3.95</Text>
          <Text style={styles.ratingsCount}>(292 Ratings)</Text>
        </View>
      </View>
        <TouchableOpacity 
        style={[styles.followButton, { backgroundColor: followText === 'Connected' ? 'green' : '#FF5722' }]} 
        onPress={handleFollow}
        disabled={isFollowing}  // Disable button when following is in progress
        >
        {isFollowing ? (
          <ActivityIndicator color="#fff" /> // Show indicator if isFollowing is true
        ) : (
          <Text style={styles.followText}>{followText}</Text> // Button text changes dynamically
        )}
      </TouchableOpacity>

    </View>
  );
};


const ProductCard = ({ item, addToFavorites, addToCart }) => {
  const swipeableRef = useRef(null);

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={() => (
        <View style={styles.swipeActions}>
          <TouchableOpacity onPress={() => addToCart(item)}>
            <Ionicons name="cart-outline" size={24} color="orange" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => addToFavorites(item)}>
            <Ionicons name="heart-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    >
      <TouchableOpacity style={styles.card} >
      <FastImage source={item.image} style={styles.productImage} resizeMode={FastImage.resizeMode.cover} />
      <View style={styles.infoContainer}>
          <Text style={styles.productTitle}>{item.title}</Text>
          {item.originalPrice && (
            <View style={styles.priceContainer}>
              <Text style={styles.originalPrice}>{item.originalPrice} GCP</Text>
              <Text style={styles.discountedPrice}>{item.price} GCP</Text>
              <Text style={styles.discountBadge}>{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF</Text>
            </View>
          )}
          {!item.originalPrice && <Text style={styles.productPrice}>{item.price} GCP</Text>}
          <Text style={styles.productBrand}>{item.brand}</Text>
          {item.isBrandOfficial && <Text style={styles.officialBadge}>Brand Official</Text>}
          <Text style={styles.ratingText}>{item.rating} ({item.reviewCount} reviews)</Text>
          <View style={styles.ratingContainer}>
            {[...Array(Math.floor(item.rating))].map((_, index) => (
              <Ionicons key={index} name="star" size={16} color="#FFD700" />
            ))}
            {item.rating % 1 !== 0 && <Ionicons name="star-half" size={16} color="#FFD700" />}
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default Products = () => {
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Best Match');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [isScreenLoading, setIsScreenLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [brandFilters, setBrandFilters] = useState({ EcoBrand: false, ReGreen: false });
  const [priceRanges, setPriceRanges] = useState({ low: false, medium: false, high: false });
  const animation = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setIsScreenLoading(false));
  }, []);

  const sortProducts = (sortOrder) => {
    setIsLoading(true);
    try {
      let sortedProducts;
      if (sortOrder === 'PriceLowHigh') {
        sortedProducts = [...products].sort((a, b) => a.price - b.price);
      } else if (sortOrder === 'PriceHighLow') {
        sortedProducts = [...products].sort((a, b) => b.price - a.price);
      }
      setProducts(sortedProducts);
    } catch (error) {
      console.error("Error sorting products:", error);
      Alert.alert("Error", "There was an issue sorting the products.");
    } finally {
      setIsLoading(false);
    }
  };

  const filterProducts = () => {
    let filteredProducts = initialProducts;

    // Filter by brands
    const selectedBrands = Object.keys(brandFilters).filter(brand => brandFilters[brand]);
    if (selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter(product => selectedBrands.includes(product.brand));
    }

    // Filter by price ranges
    if (priceRanges.low) {
      filteredProducts = filteredProducts.filter(product => product.price < 1000);
    }
    if (priceRanges.medium) {
      filteredProducts = filteredProducts.filter(product => product.price >= 1000 && product.price < 1500);
    }
    if (priceRanges.high) {
      filteredProducts = filteredProducts.filter(product => product.price >= 1500);
    }

    setProducts(filteredProducts);
    setShowFilterModal(false);
  };

  const refreshProducts = () => {
    setIsRefreshing(true);
    // Logic to refresh products from API or database
    setIsRefreshing(false);
  };

  const addToFavorites = (item) => {
    setFavorites([...favorites, item]);
  };

  const addToCart = (item) => {
    setCartCount(cartCount + 1);
  };

  const handleSortChange = (value) => {
    setSelectedSort(value);
    if (value === 'PriceLowHigh' || value === 'PriceHighLow') {
      sortProducts(value);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredProducts = initialProducts.filter(product => 
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setProducts(filteredProducts);
  };

  const renderFooter = () => {
    if (!isLoading) return null;
    return <ActivityIndicator size="large" color="#388e3c" style={{ margin: 10 }} />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    {isScreenLoading ? (
      <View style={styles.loadingContainer}>
        <Lottie 
          source={require('../../assets/lottie/rotatingBalls.json')} // Specify the path to your Lottie file
          autoPlay
          loop
          style={styles.loadingAnimation}
        />
      </View>
    ) : (
      <Animated.View style={[styles.container, { opacity: animation }]}>
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="black" />
          </TouchableOpacity>
          <TextInput 
            style={styles.searchBar} 
            placeholder="Search products..." 
            value={searchQuery} 
            onChangeText={handleSearch} 
          />
          <TouchableOpacity onPress={() => navigation.navigate('cart')}>
            <FontAwesome5 name="cart-plus" size={24} color="black" />
            {cartCount > 0 && <Text style={styles.cartCount}>{cartCount}</Text>}
          </TouchableOpacity>
        </View>
        <StoreHeader />

        <View style={styles.sortFilterRow}>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={selectedSort} onValueChange={handleSortChange} style={{ height: 40, width: 150, borderRadius: 14 }}>
              <Picker.Item label="Best Match" value="Best Match" />
              <Picker.Item label="Price: Low to High" value="PriceLowHigh" />
              <Picker.Item label="Price: High to Low" value="PriceHighLow" />
            </Picker>
          </View>
          <TouchableOpacity onPress={() => setShowFilterModal(true)}>
            <Ionicons name="filter-outline" size={28} color="black" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductCard item={item} addToFavorites={addToFavorites} addToCart={addToCart} />}
          numColumns={2}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refreshProducts} />}
        />

        <Modal visible={showFilterModal} animationType="fade" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Filter Products</Text>
              <ScrollView>
                {/* Brand Filter Section */}
                <Text style={{ color: 'green', marginBottom: 5, fontWeight: '500' }}>Brand Filter</Text>
                {Object.keys(brandFilters).map((brand) => (
                  <View key={brand} style={styles.checkboxContainer}>
                    <BouncyCheckbox
                      isChecked={brandFilters[brand]}
                      onPress={() => setBrandFilters({ ...brandFilters, [brand]: !brandFilters[brand] })}
                    />
                    <Text style={{ marginLeft: 5 }}>{brand}</Text>
                  </View>
                ))}
                
                {/* Price Range Section */}
                <Text style={{ color: 'green', marginBottom: 5, fontWeight: '500' }}>Price Range</Text>
                <View style={styles.checkboxContainer}>
                  <BouncyCheckbox
                    isChecked={priceRanges.low}
                    onPress={() => setPriceRanges({ ...priceRanges, low: !priceRanges.low })}
                  />
                  <Text style={{ marginLeft: 5 }}>Below 1000 GCP</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <BouncyCheckbox
                    isChecked={priceRanges.medium}
                    onPress={() => setPriceRanges({ ...priceRanges, medium: !priceRanges.medium })}
                  />
                  <Text style={{ marginLeft: 5 }}>1000 - 1500 GCP</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <BouncyCheckbox
                    isChecked={priceRanges.high}
                    onPress={() => setPriceRanges({ ...priceRanges, high: !priceRanges.high })}
                  />
                  <Text style={{ fontSize: 14}}>Above 1500 GCP</Text>
                </View>
                
                {/* Apply Button */}
                <TouchableOpacity style={styles.apply} onPress={filterProducts}>
                  <Text style={styles.applyText}>Apply</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>

      </Animated.View>
    )}
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingAnimation: {
    width: 150,
    height: 150,
  },
  container: {
    flex: 1,
    padding: '0.50%',
    backgroundColor: '#fff',
  },
  applyText: {
     fontSize: 14,
     fontWeight: 'bold',
     color: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
    width: '95%',
  },
  searchBar: {
    flex: 1,
    height: 35,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 17,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    width: 50
  },
  cartCount: {
    position: 'absolute',
    top: -8,
    right: -17,
    backgroundColor: 'green',
    color: 'white',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: 25,
    fontSize: 11,
  },
  storeHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  storeImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  storeInfoContainer: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  storeDetails: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  storeScore: {
    fontSize: 14,
    color: '#FF9800',
    marginRight: 4,
  },
  ratingsCount: {
    fontSize: 14,
    color: '#888',
  },
  followButton: {
    backgroundColor: '#FF5722',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  followText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sortFilterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    padding: 1,
    borderRadius: 20,
    borderWidth: 1,
    width: 150,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 9,
    borderRadius: 16,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  swipeActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#388e3c',
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 17,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '75%', // Width of the modal
    maxHeight: '80%', // Maximum height of the modal
    padding: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 14,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'flex-start',
  },
  apply: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  productImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  infoContainer: {
    marginTop: 10,
  },
  productTitle: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    fontSize: 9,
    color: 'grey',
    textDecorationLine: 'line-through',
    marginRight: 5,
  },
  discountedPrice: {
    fontSize: 10,
    color: 'green',
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
  },
  productBrand: {
    fontSize: 12,
    color: 'grey',
  },
  officialBadge: {
    fontSize: 10,
    color: 'blue',
    backgroundColor: '#e0f7fa',
    paddingHorizontal: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 5,
  },
  discountBadge: {
    fontSize: 12,
    color: 'red',
    marginLeft: 5,
  },
 
});
