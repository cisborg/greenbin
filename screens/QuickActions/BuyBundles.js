import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator,
    FlatList,
    Share,
    
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchProducts,
    purchaseProduct,
    subscribeProduct,
} from '../../redux/actions/products';

const PackageCard = ({ pkg, onOrder, onShare, isSharing, onPurchase, onSubscribe }) => {
    const [isOrdering, setIsOrdering] = useState(false);

    const handleOrder = () => {
        setIsOrdering(true);
        onPurchase(pkg.id, 1); // Assuming quantity is 1 for simplicity
        setTimeout(() => {
            setIsOrdering(false);
            onOrder(); // Navigate to checkout
        }, 300); // Simulate loading
    };

    return (
        <View style={styles.card}>
            <View style={styles.packageHeader}>
                <Text style={styles.packageName}>{pkg.name}</Text>
                <TouchableOpacity onPress={onShare} disabled={isSharing}>
                    {isSharing ? (
                        <ActivityIndicator size="small" color="#000" />
                    ) : (
                        <Icon name="share" size={20} color="#000" />
                    )}
                </TouchableOpacity>
            </View>
            <Text style={styles.stockText}>Stock: {pkg.stock}</Text>
            {pkg.items.map((item, index) => (
                <Text key={index} style={styles.itemText}>
                    {item.name} (Qty: {item.quantity})
                </Text>
            ))}
            <Text style={styles.priceText}>Price: ${pkg.price}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
                    {isOrdering ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Order</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.subscribeButton}
                    onPress={() => onSubscribe(pkg.id)}
                >
                    <Text style={styles.buttonText}>Subscribe</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const BuyScreen = () => {
    const [selectedTab, setSelectedTab] = useState('Daily');
    const [sharingStatus, setSharingStatus] = useState({});
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { products, loading, error } = useSelector(state => state.product);

    useEffect(() => {
        // Fetch products when the component mounts
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleOrder = () => {
        navigation.navigate('OrderScreen');
    };

    const handleShare = async (packageName) => {
        setSharingStatus((prev) => ({ ...prev, [packageName]: true }));
        try {
            await Share.share({
                message: 'Check out this awesome package on our app!',
            });
        } catch (error) {
            alert(error.message);
        } finally {
            setSharingStatus((prev) => ({ ...prev, [packageName]: false }));
        }
    };

    const handlePurchase = (packageId, quantity) => {
        dispatch(purchaseProduct(packageId, quantity));
    };

    const handleSubscribe = (packageId) => {
        dispatch(subscribeProduct(packageId));
    };

    const renderPackageCard = ({ item }) => (
        <PackageCard
            pkg={item}
            onOrder={handleOrder}
            onShare={() => handleShare(item.name)}
            isSharing={!!sharingStatus[item.name]}
            onPurchase={handlePurchase}
            onSubscribe={handleSubscribe}
        />
    );

    // Filter products based on the selected tab
    const filteredProducts = products.filter(product => product.category === selectedTab);

    if (loading) return <ActivityIndicator size="large" color="#000" />;
    if (error) return <Text>Error: {error}</Text>;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="green" />
                </TouchableOpacity>
                <Text style={styles.headerText}>EcoGreen Subscriptions</Text>
                <Icon name="person" size={24} color="green" />
            </View>

            <View style={styles.tabContainer}>
                {['Daily', 'Weekly', 'BiWeekly', 'Monthly'].map((category) => (
                    <TouchableOpacity
                        key={category}
                        style={[styles.tab, selectedTab === category && styles.activeTab]}
                        onPress={() => setSelectedTab(category)}
                    >
                        <Text style={[styles.tabText, selectedTab === category && styles.activeTabText]}>
                            {category}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={filteredProducts} // Use filtered products based on the selected tab
                renderItem={renderPackageCard}
                keyExtractor={(item) => item.id.toString()} // Assuming id is a unique identifier
                contentContainerStyle={styles.contentContainer}
            />
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: '#f0f0f0',
        margin: 5
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'green',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    tab: {
        padding: 10,
        borderRadius: 14,
        backgroundColor: '#ddd',
    },
    activeTab: {
        backgroundColor: 'green',
    },
    tabText: {
        fontSize: 16,
        color: '#000',
    },
    activeTabText: {
        color: '#fff',
    },
    contentContainer: {
        flexGrow: 1,
    },
    card: {
        backgroundColor: '#fff',
        padding: 12,
        marginVertical: 8,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 1.5,
        elevation: 3,
    },
    packageHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    packageName: {
        fontWeight: 'bold',
        fontSize: 13,
        marginBottom: 4,
        color: '#333',
    },
    stockText: {
        fontSize: 12,
        marginBottom: 4,
        color: '#555',
    },
    itemText: {
        fontSize: 11,
        marginBottom: 2,
        color: '#555',
    },
    priceText: {
        fontSize: 12,
        marginBottom: 4,
        fontWeight: 'bold',
        color: '#000',
    },
    voucherText: {
        color: 'green',
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    voucherButton: {
        padding: 8,
        borderRadius: 14,
        backgroundColor: 'green',
        flex: 1,
        marginRight: 8,
        alignItems: 'center',
    },
    voucherButtonInactive: {
        backgroundColor: '#ccc',
    },
    voucherButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 13
    },
    orderButton: {
        padding: 8,
        borderRadius: 14,
        backgroundColor: 'orange',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    subscribeButton: {
        padding: 8,
        borderRadius: 14,
        backgroundColor: 'blue',
        flex: 1,
        marginLeft: 8,
        alignItems: 'center',
    },
    subscribed: {
        backgroundColor: 'green',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
   
    }
});

export default BuyScreen;
