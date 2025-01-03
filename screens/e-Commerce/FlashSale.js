import React, { useEffect ,useState} from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native'; // Import Lottie
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import { fetchFlashsale } from '../../redux/actions/products'; // Adjust the import based on your project structure

// Countdown timer function
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
      const difference = Math.floor((midnight - now) / 1000); // Difference in seconds
      setTimeLeft(difference > 0 ? difference : 0);
    };

    calculateTimeLeft(); // Initial calculation

    const interval = setInterval(() => {
      calculateTimeLeft(); // Update every second
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>;
};

const ProductItem = ({ item }) => (
  <View style={styles.productItem}>
    <FastImage source={{ uri: item.imageUrl }} style={styles.productImage} resizeMode={FastImage.resizeMode.cover} />
    <Text style={styles.productPrice}>{item.price}</Text>
  </View>
);

// Main flash sale component
const FlashSale = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch(); // Initialize dispatch

  // Get products and loading state from Redux
  const { products, loading,error } = useSelector(state => ({
    products: state.products.products, // Adjust based on your state structure
    loading: state.products.loading,
    error: state.products.error,
  }));

  // Fetch products when component mounts
  useEffect(() => {
    dispatch(fetchFlashsale());
  }, [dispatch]);

  return (
    <View style={styles.container}>
        {/* Flash Sale Header */}
        <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('SalesList')}>
            <Text style={styles.flashSaleText}>Fl⚡sh Sale Granary</Text>
            <CountdownTimer />
            <AntDesign name="right" size={24} color="green" />
        </TouchableOpacity>

        {/* Conditional Rendering for Loading, Error, and Products */}
        {loading ? (
            <LottieView
                source={require('../../assets/lottie/gift.json')} // Replace with your Lottie file path
                autoPlay
                loop
                style={styles.loadingAnimation}
            />
        ) : error ? ( // Check for the error state
            <View style={styles.errorContainer}>
                <LottieView
                    source={require('../../assets/lottie/errorLottie.json')} // Replace with your error Lottie file path
                    autoPlay
                    loop
                    style={styles.loadingAnimation}
                />
                <Text style={styles.errorMessage}>Oops! Something went wrong!</Text>
            </View>
        ) : (
            <FlatList
                data={products}
                renderItem={({ item }) => <ProductItem item={item} />}
                keyExtractor={(item) => item.id} // Ensure id is a string
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        )}
    </View>
)
};


const styles = StyleSheet.create({
  container: {
    height: '16%',
    marginTop: '5%',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 4,
    borderRadius: 20,
    paddingVertical: 5,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 5
  },
  loadingAnimation: {
    width: 40, // Adjust width as needed
    height: 40, // Adjust height as needed
    alignSelf: 'center',
  },
  errorContainer: {
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
  flashSaleText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'green',
    marginRight: '39%'
  },
  timerText: {
    fontSize: 15,
    color: 'red',
    fontWeight: 'bold',
  },
  productItem: {
    width: 120,
    marginRight: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 55,
    resizeMode: 'contain',
    borderRadius: 12,
    
  },
  productPrice: {
    marginTop: 5,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default FlashSale;
