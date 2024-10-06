import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Animated,
  RefreshControl,
  Platform,
  StatusBar,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Color } from '../../GlobalStyles';
import ItemGridScreen from '../e-Commerce/allProducts';
import { useNavigation } from '@react-navigation/native';

const ChallengePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [data, setData] = useState(categories);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const bannerImages = [
    require('../../assets/greenFriday.png'),
    require('../../assets/greenPoints.png'),
    require('../../assets/Bags.png'),
    require('../../assets/connect.png'),
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [fadeAnim]);

  const handleSidebarItemPress = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const handleHomePress = () => {
    setSelectedCategory(null);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const loadMoreItems = async () => {
    if (!loading && data.length < categories.length) {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setData(prevData => [...prevData, ...categories]); // Load more categories
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryCard} onPress={() => navigation.navigate('VendorProducts')}>
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderListHeader = () => (
    <>
      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholder="Discover Ecogreen products..."
          placeholderTextColor={Color.colorGray_100}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={() => navigation.navigate('cart')}>
          <FontAwesome6 name="cart-plus" size={24} color="#32CD32" />
        </TouchableOpacity>
      </View>
      <View style={styles.banner}>
        <Image
          source={bannerImages[currentImageIndex]}
          style={styles.bannerImage}
          resizeMode="cover"
        />
        <View style={styles.dotsContainer}>
          {bannerImages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentImageIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <View style={styles.container}>
          <View style={styles.sidebar}>
            <TouchableOpacity style={styles.homeContainer} onPress={handleHomePress}>
              <Image source={require('../../assets/menu.jpg')} style={styles.homeImage} />
              <Text style={styles.homeText}>Home</Text>
            </TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false}>
              {sidebarCategories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.sidebarItem}
                  onPress={() => handleSidebarItemPress(category.name)}
                >
                  <MaterialCommunityIcons name={category.icon} size={20} color="#333" />
                  <Text style={styles.sidebarText}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.mainContent}>
            {renderListHeader()}

            {selectedCategory ? (
              <ItemGridScreen 
                selectedCategory={selectedCategory}
                onRefresh={onRefresh}
                loadMoreItems={loadMoreItems}
                navigation={navigation}
              />
            ) : (
              <FlatList
                data={filteredCategories}
                renderItem={renderCategoryItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={4}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.categoriesContainer}
                ListFooterComponent={
                  loading && data.length < categories.length ? (
                    <ActivityIndicator size="large" color="#32CD32" />
                  ) : (
                    <Text style={styles.loadingText}>Loaded Successfully</Text>
                  )
                }
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                onEndReached={loadMoreItems}
                onEndReachedThreshold={0.5}
              />
            )}
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const sidebarCategories = [
  { name: 'Appliances', icon: 'fridge' },
  { name: 'Television', icon: 'television-classic' },
  { name: 'Kids Products', icon: 'baby-face-outline' },
  { name: 'Sneakers', icon: 'shoe-sneaker' },
  { name: 'Smart', icon: 'cellphone' },
  { name: 'Health', icon: 'heart' },
  { name: 'Bags', icon: 'bag-suitcase' },
  { name: 'Electronics', icon: 'phone' },
  { name: 'Books', icon: 'book-open-variant' },
  { name: 'Garden & Outdoors', icon: 'leaf' },
];

const categories = [
  { name: 'Smart Phones', image: require('../../assets/smartphone.png') },
  { name: 'Televisions', image: require('../../assets/Television.png') },
  { name: 'Kitchen Supplies', image: require('../../assets/kitchen.png') },
  { name: 'Refurbished Phones', image: require('../../assets/refurbished.png') },
  { name: 'Earphones', image: require('../../assets/earphones.png') },
  { name: 'Household Appliances', image: require('../../assets/Appliance.png') },
  { name: 'Home Storage', image: require('../../assets/storage.png') },
  { name: 'Sneakers', image: require('../../assets/sneakers.png') },
  { name: 'Woofers', image: require('../../assets/woofer.png') },
  { name: 'Watches', image: require('../../assets/watches.png') },
  { name: 'Beauty & Personal Care', image: require('../../assets/beauty.png') },
  { name: 'Clothes', image: require('../../assets/clothes.png') },
];

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
  },
  sidebar: {
    width: '15%',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRightWidth: 1,
    borderColor: '#ccc',
    marginTop: 20,
  },
  homeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  homeImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  homeText: {
    fontSize: 11,
  },
  sidebarItem: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  sidebarText: {
    marginLeft: 5,
    fontSize: 10,
  },
  mainContent: {
    flex: 1,
    marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    borderRadius: 14,
    paddingHorizontal: 10,
    height: 35,
    marginRight: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  banner: {
    width: '100%',
    height: 160,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 20,
    marginBottom: 15
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'contain',
    top: 0,
    left: 0,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#32CD32',
  },
  categoriesContainer: {
    paddingBottom: 50,
  },
  categoryCard: {
    flex: 1,
    margin: 5,
    borderRadius: 14,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  categoryImage: {
    width: 60, // Reduced size
    height: 60, // Reduced size
    borderRadius: 8,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 12, // Reduced size
    textAlign: 'center',
  },
  loadingText: {
    textAlign: 'center',
    padding: 10,
    color:'green'
  },
});

export default ChallengePage;
