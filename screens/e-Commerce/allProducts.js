import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SectionList, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux'; 
import { fetchProducts } from '../../redux/actions/products'; 
import LottieView from 'lottie-react-native';

const { width,height } = Dimensions.get('window');

const ItemGridScreen = ({ navigation }) => {
    const dispatch = useDispatch(); 
    const { products, loading, error } = useSelector(state => ({
        products: state.products, 
        loading: state.loading,
        error: state.error
    }));

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleProductClick = (item) => {
        navigation.navigate('productDetail', { product: item });
    };

    const handleViewAllClick = (sectionTitle) => {
        navigation.navigate('Products', { category: sectionTitle });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleProductClick(item)}>
            <View style={styles.productContainer}>
                <FastImage source={{ uri: item.image }} resizeMode={FastImage.resizeMode.cover} style={styles.productImage} />
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.rating}>{'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}</Text>
            </View>
        </TouchableOpacity>
    );

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
                scrollEnabled={false} 
            />
        </View>
    );

    const prepareData = () => {
        return [
            {
                title: "Recommended",
                data: products.filter(product => product.category === 'recommended'), 
            },
            {
                title: "Latest in Store",
                data: products.filter(product => product.category === 'latest'), 
            },
            {
                title: 'Mostly Purchased',
                data: products.filter(product => product.category === 'popular'), 
            },
        ];
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <LottieView
                      source={require('../../assets/lottie/rotateLoad.json')} 
                      autoPlay
                      loop
                      style={styles.lottie}
                    />
                </View>    
            ) : error ? (
                <View style={styles.errorContainer}>
                    <LottieView
                      source={require('../../assets/lottie/errorLottie.json')} // Replace with your error animation file
                      autoPlay
                      loop
                      style={styles.lottie}
                    />
                    <Text style={styles.errorMessage}>Oops! Something went wrong.</Text>
                </View>
            ) : (
                <SectionList
                    sections={prepareData()}
                    keyExtractor={(item, index) => `${item.title}-${index}`}  
                    renderSectionHeader={({ section }) => renderSection({ section })}
                    renderItem={() => null} 
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
},
errorMessage: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
},
viewAllContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},
loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff', // Adjust as needed
},
lottie: {
  width: width * 0.3, // Adjust size as needed
  height: height * 0.3,
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
