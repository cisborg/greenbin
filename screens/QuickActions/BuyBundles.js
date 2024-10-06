import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator,
    Image,
    FlatList,
    Modal,
    Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const categories = {
    Daily: [
        {
            name: "Delight Breakfast",
            items: [
                { name: "Organic Apples", quantity: 3 },
                { name: "Almond Butter", quantity: 1 },
            ],
            price: 200,
            stock: 100,
        },
        {
            name: "Quality Refresh",
            items: [
                { name: "Fresh Berries", quantity: 5 },
                { name: "Whole Grain Bread", quantity: 1 },
            ],
            price: 250,
            stock: 50,
        },
    ],
    Weekly: [
        {
            name: "Weekly Wellness Box 1",
            items: [
                { name: "Herbal Supplements", quantity: 1 },
                { name: "Essential Oils", quantity: 1 },
            ],
            price: 30,
            stock: 30,
        },
    ],
    BiWeekly: [
        {
            name: "Bi-Weekly Gourmet Box 1",
            items: [
                { name: "Artisan Cheese", quantity: 1 },
                { name: "Charcuterie Meats", quantity: 1 },
            ],
            price: 35,
            stock: 40,
        },
    ],
    Monthly: [
        {
            name: "Monthly Self-Care Box 1",
            items: [
                { name: "Face Masks", quantity: 4 },
                { name: "Bath Salts", quantity: 1 },
            ],
            price: 40,
            stock: 25,
        },
    ],
};

const PackageCard = ({ pkg, onOrder, onApplyVoucher, voucherApplied, onShare, isSharing }) => {
    const [stockRemaining, setStockRemaining] = useState(pkg.stock);
    const [itemsOrdered, setItemsOrdered] = useState(0);
    const [localVoucherApplied, setLocalVoucherApplied] = useState(voucherApplied);
    const [isSubscribing, setIsSubscribing] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const [isOrdering, setIsOrdering] = useState(false); // Individual loading for the Order button
    const [modalVisible, setModalVisible] = useState(false); // State for Modal

    const handleOrder = () => {
        if (stockRemaining <= 0) {
            alert("Out of stock");
            return;
        }
        setIsOrdering(true);
        setTimeout(() => {
            setIsOrdering(false);
            setModalVisible(true); // Show modal after loading
        }, 300); // Simulate loading
    };

    const handleApplyVoucher = () => {
        if (pkg.price < 100) {
            alert("Voucher can only be applied to packages above $100.");
            return;
        }
        if (!localVoucherApplied) {
            setLocalVoucherApplied(true);
            onApplyVoucher(pkg.name);
        }
    };

    const handleSubscribe = () => {
        setIsSubscribing(true);
        setTimeout(() => {
            setIsSubscribing(false);
            setSubscribed(true);
        }, 300);
    };

    const confirmOrder = () => {
        // Handle order confirmation logic here
        alert(`Confirmed: ${pkg.name} ordered!`);
        setModalVisible(false);
    };

    const cancelOrder = () => {
        setModalVisible(false); // Close modal without confirming
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
            <Text style={styles.stockText}>Stock: {stockRemaining}</Text>
            {pkg.items.map((item, index) => (
                <Text key={index} style={styles.itemText}>
                    {item.name} (Qty: {item.quantity})
                </Text>
            ))}
            <Text style={styles.priceText}>
                Price: ${pkg.price - (localVoucherApplied ? 10 : 0)}
                {localVoucherApplied && <Text style={styles.voucherText}> (Voucher Applied: $10 OFF)</Text>}
            </Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.voucherButton, localVoucherApplied && styles.voucherButtonInactive]}
                    onPress={handleApplyVoucher}
                    disabled={localVoucherApplied}
                >
                    <Text style={styles.voucherButtonText}>{localVoucherApplied ? 'Voucher Applied' : 'Voucher ($10 OFF)'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
                    {isOrdering ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Order</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.subscribeButton, subscribed ? styles.subscribed : null]}
                    onPress={handleSubscribe}
                    disabled={subscribed || isSubscribing}
                >
                    {isSubscribing ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>
                            {subscribed ? 'Subscribed' : 'Subscribe'}
                        </Text>
                    )}
                </TouchableOpacity>
            </View>

            {/* Modal for Order Confirmation */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>
                            Confirm that you are purchasing this "{pkg.name}" for ${pkg.price}.
                            Your package will arrive in a timely manner.
                        </Text>
                        <Text style={styles.modalText}>
                            Continue enjoying EcoGreen Health!
                        </Text>
                        <View style={styles.modalButtonContainer}>
                            <Button title="Okay" onPress={confirmOrder} />
                            <Button title="Cancel" onPress={cancelOrder} color="red" />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const BuyScreen = ({ navigation }) => {
    const [selectedTab, setSelectedTab] = useState('Daily');
    const [voucherApplied, setVoucherApplied] = useState({});
    const [sharingStatus, setSharingStatus] = useState({});

    const handleOrder = () => {
        navigation.navigate('OrderScreen');
    };

    const handleApplyVoucher = (packageName) => {
        setVoucherApplied((prev) => ({ ...prev, [packageName]: true }));
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

    const renderPackageCard = ({ item }) => (
        <PackageCard
            pkg={item}
            onOrder={handleOrder}
            onApplyVoucher={handleApplyVoucher}
            voucherApplied={voucherApplied[item.name]}
            onShare={() => handleShare(item.name)}
            isSharing={!!sharingStatus[item.name]}
        />
    );

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
                {Object.keys(categories).map((category) => (
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
                data={categories[selectedTab]}
                renderItem={renderPackageCard}
                keyExtractor={(item) => item.name}
                contentContainerStyle={styles.contentContainer}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f0f0',
        margin: 15
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
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '80%',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});

export default BuyScreen;
