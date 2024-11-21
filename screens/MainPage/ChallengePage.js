import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FastImage from "react-native-fast-image"; // Import FastImage
import { Color } from "../../GlobalStyles";
import ItemGridScreen from "../e-Commerce/allProducts";
import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/actions/products";

const { width, height } = Dimensions.get("window");

const ChallengePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [data, setData] = useState(categories);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const bannerImages = [
    { uri: "https://your-image-url.com/greenFriday.png" },
    { uri: "https://your-image-url.com/greenPoints.png" },
    { uri: "https://your-image-url.com/Bags.png" },
    { uri: "https://your-image-url.com/connect.png" },
  ];

  useEffect(() => {
    dispatch(fetchProducts());
    products && setData(products);
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % bannerImages.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [fadeAnim]);

  const handleSidebarItemPress = (categoryName) => {
    setSelectedCategory(categoryName);
    onRefresh();
  };

  const handleHomePress = () => {
    setSelectedCategory(null);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const loadMoreItems = async () => {
    if (!loading && data.length < categories.length) {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setData((prevData) => [...prevData, ...categories]);
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => navigation.navigate("Products")}
    >
      <FastImage
        source={item.image}
        style={styles.categoryImage}
        resizeMode={FastImage.resizeMode.cover}
      />
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
        <TouchableOpacity onPress={() => navigation.navigate("cart")}>
          <FontAwesome6 name="cart-plus" size={24} color="#32CD32" />
        </TouchableOpacity>
      </View>
      <View style={styles.banner}>
        <FastImage
          source={bannerImages[currentImageIndex]}
          style={styles.bannerImage}
          resizeMode={FastImage.resizeMode.cover}
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
        <ScrollView horizontal={true} style={styles.scrollContainer}>
          <View style={styles.sidebar}>
            <TouchableOpacity
              style={styles.homeContainer}
              onPress={handleHomePress}
            >
              <FastImage
                source={require("../../assets/menu.jpg")}
                style={styles.homeImage}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={styles.homeText}>Home</Text>
            </TouchableOpacity>
            <FlatList // Use FlatList for sidebar items
              data={sidebarCategories}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.sidebarItem}
                  onPress={() => handleSidebarItemPress(item.name)}
                >
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={20}
                    color="#333"
                  />
                  <Text style={styles.sidebarText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>

          <View style={styles.mainContent}>
            {renderListHeader()}

            {selectedCategory ? (
              <ItemGridScreen
                selectedCategory={selectedCategory}
                onRefresh={onRefresh}
                loadMoreItems={loadMoreItems}
                navigation={navigation}
                products={products}
                onEndReached={() => handleSidebarItemPress(selectedCategory)} // Auto select category on scroll end
              />
            ) : (
              <FlashList
                data={filteredCategories}
                renderItem={renderCategoryItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={4}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.categoriesContainer}
                ListFooterComponent={
                  loading && data.length < categories.length ? (
                    <ActivityIndicator size="small" color="green" />
                  ) : (
                    <View style={{ paddingVertical: 20 }} />
                  )
                }
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                estimatedItemSize={40}
                onEndReached={loadMoreItems}
                onEndReachedThreshold={0.5}
              />
            )}
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

const sidebarCategories = [
  { name: "Appliances", icon: "fridge" },
  { name: "Television", icon: "television-classic" },
  { name: "Kids Products", icon: "baby-face-outline" },
  { name: "Sneaker", icon: "shoe-sneaker" },
  { name: "Smart", icon: "cellphone" },
  { name: "Health", icon: "heart" },
  { name: "Bags", icon: "bag-suitcase" },
  { name: "Electronics", icon: "phone" },
  { name: "Books", icon: "book-open-variant" },
  { name: "Garden & Outdoors", icon: "leaf" },
];

const categories = [
  { name: "Smart Phones", image: require("../../assets/smartphone.png") },
  { name: "Televisions", image: require("../../assets/Television.png") },
  { name: "Kitchen Supplies", image: require("../../assets/kitchen.png") },
  {
    name: "Refurbished Phones",
    image: require("../../assets/refurbished.png"),
  },
  { name: "Earphones", image: require("../../assets/earphones.png") },
  {
    name: "Household Appliances",
    image: require("../../assets/Appliance.png"),
  },
  { name: "Home Storage", image: require("../../assets/storage.png") },
  { name: "Sneakers", image: require("../../assets/sneakers.png") },
  { name: "Woofers", image: require("../../assets/woofer.png") },
  { name: "Watches", image: require("../../assets/watches.png") },
  { name: "Beauty & Personal Care", image: require("../../assets/beauty.png") },
  { name: "Clothes", image: require("../../assets/clothes.png") },
  { name: "Accessories" },
  { name: "Bags" },
  { name: "Jewelry" },
  { name: "Garden & Outdoors" },
  { name: "Books" },
  { name: "Furniture" },
  { name: "Sports" },
];

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollContainer: {
    // flex: 1,
    // backgroundColor: "#fff",
    // padding: 6,
    minHeight: height * 0.98,
    marginTop: -35,
  },
  sidebar: {
    width: width * 0.17,
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderRightWidth: 1,
    borderColor: "#ccc",
    marginTop: 20,
    alignItems: "center",
  },
  homeContainer: {
    flexDirection: "column",
    alignItems: "center",
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
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  sidebarText: {
    fontSize: 9,
  },
  mainContent: {
    flex: 1,
    marginLeft: 4,
    paddingVertical: 10,
    width: width * 0.81,
    height: height * 0.99,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    borderColor: Color.colorGray_100,
    borderRadius: 14,
    padding: 10,
    marginRight: 10,
    height: height * 0.045,
    backgroundColor: "#f5f5f5",
  },
  banner: {
    width: "100%",
    height: 180,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 10,
    borderColor: "gray",
    borderWidth: 1,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    margin: 5,
  },
  activeDot: {
    backgroundColor: "#32CD32",
  },
  categoryCard: {
    width: "100%",
    marginVertical: 10,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  categoryImage: {
    width: "80%",
    height: 52,
    borderRadius: 10,
  },
  categoryText: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 10,
  },
  loadingText: {
    textAlign: "center",
    marginVertical: 10,
    color: "green",
  },
  categoriesContainer: {
    paddingBottom: 50, // Add padding to avoid cut-off
  },
  row: {
    justifyContent: "space-between",
  },
});

export default ChallengePage;
