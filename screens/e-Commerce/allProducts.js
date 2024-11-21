import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import FastImage from "react-native-fast-image";
import { useSelector, useDispatch } from "react-redux";
import useProcessedProducts from "../../hooks/use-processed-products";

const { width } = Dimensions.get("window");

// TODO: Update product card UI and grid layout
const ItemGridScreen = ({ navigation, selectedCategory }) => {
  const [groupedData, setGroupedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const products = useSelector((state) => state.product.products);
  const { processedProducts, groupedProducts, paginate } =
    useProcessedProducts(products);

  const ITEMS_PER_PAGE = 10;

  const paginateData = (data, page) => {
    if (!data) return [];
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  useEffect(() => {
    if (products && selectedCategory) {
      console.log("Selected category: ", selectedCategory);

      const filteredProducts = groupedProducts[selectedCategory.toLowerCase()];

      setGroupedData((prevData) => [
        ...prevData,
        ...paginateData(filteredProducts, page),
      ]);
    }
  }, [products, selectedCategory, page]);

  const handleProductClick = (item) => {
    navigation.navigate("productDetail", { productId: item.id });
  };

  // Load more items when the user scrolls to the end
  const loadMore = () => {
    if (!loading && groupedData.length < processedProducts.length) {
      setLoading(true);
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
    }
  };

  // Render each product item in the grid
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleProductClick(item)}>
      {console.log("Item: ", item)}
      <View style={styles.productContainer}>
        <FastImage
          // source={{ uri: item.image }}
          source={item.image[0]}
          resizeMode={FastImage.resizeMode.cover}
          style={styles.productImage}
        />
        <Text style={styles.productTitle}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price} KSH</Text>
        <Text style={styles.rating}>
          {"★".repeat(item.rating)}
          {"☆".repeat(5 - item.rating)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {console.log(`${selectedCategory} Category Products`)}
      {groupedData.length > 0 ? (
        <FlatList
          data={groupedData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? <ActivityIndicator size="large" color="blue" /> : null
          }
        />
      ) : (
        <Text style={styles.emptyMessage}>No items available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  productContainer: {
    backgroundColor: "#f8f8f8",
    borderRadius: 15,
    width: width / 3.5 - 10, // Adjust width to fit 3 items per row
    margin: 5,
    padding: 10,
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: 60,
    borderRadius: 12,
    marginBottom: 2,
  },
  productTitle: {
    fontSize: 10,
    fontWeight: "400",
    marginBottom: 1,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 1,
    color: "#000",
  },
  rating: {
    fontSize: 12,
    color: "#FFD700",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#808080",
  },
});

export default ItemGridScreen;
