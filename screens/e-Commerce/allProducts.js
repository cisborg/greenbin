import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SectionList, FlatList, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import { fetchProducts } from '../../redux/actions/products'; // Adjust the import based on your project structure

const { width } = Dimensions.get('window');

const ItemGridScreen = ({ navigation }) => {
    const dispatch = useDispatch(); // Initialize dispatch
    const { products, loading } = useSelector(state => ({
        products: state.products, // Adjust based on your state structure
        loading: state.loading,
    }));

    // Fetch products on component mount
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Handle item click to navigate to product details
    const handleProductClick = (item) => {
        navigation.navigate('productDetail', { product: item });
    };

    // Handle "View All" button click for each section
    const handleViewAllClick = (sectionTitle) => {
        navigation.navigate('Products', { category: sectionTitle });
    };

    // Render each product item in the grid
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleProductClick(item)}>
            <View style={styles.productContainer}>
                <FastImage source={{ uri: item.image }} resizeMode={FastImage.resizeMode.cover} style={styles.productImage} />
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.rating}>{'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}</Text>
            </View>
        </TouchableOpacity>
    );

    // Render a section with products
    const renderSection = ({ section }) => (
        <View style={styles.sectionContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>{section.title}</Text>
                <TouchableOpacity style={styles.viewAllContainer} onPress={() => handleViewAllClick(section.title)}>
                    <Text style={styles.viewAll}>View All</Text>
                    <MaterialIcons name="arrow-forward-ios" size={14} color="green" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={section.data}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${section.title}-${item.title}-${index}`}  
                numColumns={3}
                columnWrapperStyle={styles.columnWrapper}
                scrollEnabled={false} // Prevent FlatList from taking over scroll
            />
        </View>
    );

    // Prepare data for SectionList
    const prepareData = () => {
        return [
            {
                title: "Recommended",
                data: products.filter(product => product.category === 'recommended'), // Adjust filtering based on your data
            },
            {
                title: "Latest in Store",
                data: products.filter(product => product.category === 'latest'), // Adjust filtering based on your data
            },
            {
                title: 'Mostly Purchased',
                data: products.filter(product => product.category === 'popular'), // Adjust filtering based on your data
            },
        ];
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="green" />
            ) : (
                <SectionList
                    sections={prepareData()}
                    keyExtractor={(item, index) => `${item.title}-${index}`}  
                    renderSectionHeader={({ section }) => renderSection({ section })}
                    renderItem={() => null} // To avoid duplicate rendering in SectionList
                    stickySectionHeadersEnabled={false}
                />
            )}
        </View>
    );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',

  },
  viewAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAll: {
    fontSize: 14,
    color: '#808080',
    marginRight: 5,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  productContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 15,
    width: width / 3.5 - 20, // Adjusted width to fit 3 items per row
    margin: 5,
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 60,
    borderRadius: 12,
    marginBottom: 2,
  },
  productTitle: {
    fontSize: 10,
    fontWeight: '400',
    marginBottom: 1,
    textAlign: 'center',
  },
  rating: {
    fontSize: 12,
    color: '#FFD700',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default ItemGridScreen;
