import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Animated,
    KeyboardAvoidingView, Platform, SafeAreaView, Modal, ActivityIndicator, Alert,
} from 'react-native';
import LottieView from 'lottie-react-native'; // Import LottieView
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useRoute
import { Color } from '../../GlobalStyles';
import AntDesign from '@expo/vector-icons/AntDesign';
import FastImage from 'react-native-fast-image'; // Import FastImage
import { useDispatch } from 'react-redux'; // Import useDispatch
import { purchaseProduct } from '../../redux/actions/products'; 
import {  requestPayment } from '../../redux/actions/payments';

const paymentMethods = ['Green Bank', 'Request a Friend', 'GCPs Wallet'];
const presetAmounts = [2000, 5000, 8000, 12000];

const BuyGoods = () => {
    const navigation = useNavigation();
    const route = useRoute(); // Use route to get parameters
    const dispatch = useDispatch(); // Initialize dispatch
    const [loading, setLoading] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [customAmount, setCustomAmount] = useState('');
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0]);
    const [voucherApplied, setVoucherApplied] = useState(false);
    const [totalCost, setTotalCost] = useState(0);
    const [greenBankCode, setGreenBankCode] = useState('');
    const availablePoints = route.params; // Directly use availablePoints from route params
    const [friendPhoneNumber, setFriendPhoneNumber] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [purchaseSuccessful, setPurchaseSuccessful] = useState(false);

    const fadeAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!loading) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [loading, fadeAnim]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <LottieView
                    source={require('../../assets/lottie/rotatingBalls.json')}
                    autoPlay
                    loop
                    style={{ width: 150, height: 150 }}
                />
            </View>
        );
    }

    const handleRequestFriendToPay = () => {
        const isValidFriendPhone = friendPhoneNumber.length === 10 && /^\d+$/.test(friendPhoneNumber);
        
        if (!isValidFriendPhone) {
            Alert.alert("Invalid Friend's Phone Number", "Please enter a valid 10-digit friend's phone number.");
            return;
        }

        // Dispatch action to send payment request
        dispatch(requestPayment(friendPhoneNumber, totalCost))
            .then(() => {
                Alert.alert("Request Sent", `Payment request of GCPs ${totalCost} sent to ${friendPhoneNumber}.`);
                setFriendPhoneNumber(''); // Clear input after sending the request
            })
            .catch((error) => {
                Alert.alert(`${error}, "Failed to send payment request. Please try again.`);
            });
    };
    const validateInputs = () => {
        const amount = parseFloat(customAmount) || selectedAmount;
        const isValidPhoneNumber = phoneNumber.length === 6 && /^\d+$/.test(phoneNumber);
        const isValidGreenBankCode = greenBankCode.length === 10 && /^\d+$/.test(greenBankCode);
        const isValidFriendPhone = friendPhoneNumber.length === 10 && /^\d+$/.test(friendPhoneNumber);

        if (!isValidPhoneNumber) {
            Alert.alert("Invalid codePay", "Please enter a valid codePay number.");
            return false;
        }

        if (selectedPaymentMethod === 'Green Bank' && !isValidGreenBankCode) {
            Alert.alert("Invalid Green Bank Code", "Please enter a valid 10-digit Green Bank code.");
            return false;
        }

        if (selectedPaymentMethod === 'Request a Friend' && !isValidFriendPhone) {
            Alert.alert("Invalid Friend's Phone Number", "Please enter a valid 10-digit friend's phone number.");
            return false;
        }

        if (amount > availablePoints) { // Check if amount exceeds available points
            Alert.alert("Insufficient GCP Points", `You only have GCPs ${availablePoints}, but you need GCPs ${amount}`);
            return false;
        }

        if (totalCost <= 0) {
            Alert.alert("Invalid Amount", "The amount must be greater than zero.");
            return false;
        }

        return true;
    };

    const handlePurchase = () => {
        if (!validateInputs()) return;

        setIsProcessing(true);

        // Dispatch the purchase action
        dispatch(purchaseProduct(totalCost)); // Assuming productId is 1 and quantity is totalCost for demonstration

        // Simulate a 300ms process for payment
        setTimeout(() => {
            setIsProcessing(false);
            setPurchaseSuccessful(true);
            setShowModal(true);
        }, 300);
    };

    const calculateTotal = (amount) => {
        let discount = 0;
        if (amount >= 2000 && amount <= 5000) {
            discount = 200;
        } else if (amount > 5000 && amount <= 10000) {
            discount = 500;
        } else if (amount > 10000) {
            discount = 700;
        }
        setTotalCost(amount - (voucherApplied ? discount : 0));
    };

    const applyVoucher = () => {
        setVoucherApplied(true);
        calculateTotal(selectedAmount || parseFloat(customAmount));
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Animated.View style={{ opacity: fadeAnim }}>
                        {/* Header */}
                        <View style={styles.header}>
                            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                                <AntDesign name="leftcircleo" size={24} color="black" />
                            </TouchableOpacity>
                            <Text style={styles.title}>Buy Goods Go Green Today</Text>
                        </View>

                        {/* User Information */}
                        <View style={styles.userInfo}>
                            <FastImage
                                source={{ uri: 'https://example.com/profile.jpg' }}
                                style={styles.profilePicture}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                            <TextInput
                                style={styles.input1}
                                placeholder="Enter shop code pay"
                                placeholderTextColor={Color.colorGray_100}
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                keyboardType="numeric"
                            />
                        </View>

                        {/* Airtime Amount */}
                        <Text style={styles.sectionTitle}>Select Amount</Text>
                        <View style={styles.amountSection}>
                            {presetAmounts.map(amount => (
                                <TouchableOpacity
                                    key={amount}
                                    style={[
                                        styles.amountButton,
                                        selectedAmount === amount && styles.selectedAmountButton
                                    ]}
                                    onPress={() => {
                                        setSelectedAmount(amount);
                                        calculateTotal(amount);
                                    }}
                                >
                                    <Text style={styles.amountText}>GP {amount}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Custom Amount"
                            placeholderTextColor={Color.colorGray_100}
                            keyboardType="numeric"
                            value={customAmount}
                            onChangeText={(value) => {
                                setCustomAmount(value);
                                calculateTotal(parseFloat(value) || 0);
                            }}
                        />

                        {/* Payment Method */}
                        <Text style={styles.sectionTitle}>Payment Method</Text>
                        <View style={styles.paymentSection}>
                            {paymentMethods.map(method => (
                                <TouchableOpacity
                                    key={method}
                                    style={[
                                        styles.paymentButton,
                                        selectedPaymentMethod === method && styles.selectedPaymentButton
                                    ]}
                                    onPress={() => {
                                        setSelectedPaymentMethod(method);
                                        if (method !== 'Green Bank') {
                                            setGreenBankCode('');
                                        }
                                    }}
                                >
                                    <Text style={styles.paymentText}>{method}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Friend's Phone Number Input for Request a Friend */}
                        {selectedPaymentMethod === 'Request a Friend' && (
                            <>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Friend's Phone Number"
                                placeholderTextColor={Color.colorGray_100}
                                keyboardType="numeric"
                                value={friendPhoneNumber}
                                onChangeText={setFriendPhoneNumber}
                            />
                            <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={handleRequestFriendToPay}
                        >
                            <Text style={styles.confirmButtonText}>Request Payment</Text>
                        </TouchableOpacity>
                            </>
                            
                        )}

                        {/* Green Bank Code Input */}
                        {selectedPaymentMethod === 'Green Bank' && (
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Green Bank Code (10 digits)"
                                placeholderTextColor={Color.colorGray_100}
                                keyboardType="numeric"
                                value={greenBankCode}
                                onChangeText={setGreenBankCode}
                            />
                        )}

                        {/* Available Points for GCPs Wallet */}
                        {selectedPaymentMethod === 'GCPs Wallet' && (
                            <Text style={styles.availablePointsText}>Available Points: GCPs {availablePoints}</Text>
                        )}

                        {/* Apply Voucher Button */}
                        <TouchableOpacity
                            style={[styles.ApplyButton, voucherApplied && styles.voucherAppliedButton]}
                            onPress={applyVoucher}
                        >
                            <Text style={{ color: 'black' }}>
                                {voucherApplied ? 'Voucher Applied' : 'Apply Voucher (GP 100)'}
                            </Text>
                        </TouchableOpacity>

                        {/* Transaction Summary */}
                        <View style={styles.summarySection}>
                            <Text style={styles.summaryText}>Total Cost: GCPs {totalCost.toFixed(2)}</Text>
                        </View>

                        {/* Confirm Purchase */}
                        <TouchableOpacity style={styles.confirmButton} onPress={handlePurchase} disabled={isProcessing}>
                            {isProcessing ? (
                                <ActivityIndicator size="small" color="white" />
                            ) : (
                                <Text style={styles.confirmButtonText}>Pay GCPs {totalCost.toFixed(2)}</Text>
                            )}
                        </TouchableOpacity>
                    </Animated.View>

                    {/* Modal for Processing */}
                    <Modal
                        transparent={true}
                        visible={showModal}
                        animationType="fade"
                        onRequestClose={() => setShowModal(false)}
                    >
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalText}>Goods Purchased Successfully!</Text>
                                <Text style={styles.modalSubText}>Continue to conserve your environment with codePay!</Text>
                                <TouchableOpacity
                                    style={styles.okButton}
                                    onPress={() => {
                                        setShowModal(false);
                                        setPurchaseSuccessful(false);
                                        navigation.goBack();
                                    }}
                                >
                                    <Text style={styles.okButtonText}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.colorWhite,
        padding: '1%',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 10,
        marginTop: '-20%'
    },
     loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '10%',
    },
    backButton: {
        marginRight: '1%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        left: 50,
        color: 'green',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 15,
        borderColor: 'lightgray',
        borderWidth: 1,
        marginRight: 16,
    },
    input: {
        flex: 1,
        padding: 10,
        borderRadius: 13,
        marginBottom: 16,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    input1: {
        flex: 1,
        padding: 10,
        borderRadius: 13,
        marginBottom: 16,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        height: 50,
    },
    ApplyButton: {
        padding: 10,
        borderRadius: 12,
        backgroundColor: 'orange',
        alignItems: 'center',
        marginHorizontal: 5,
        marginTop: -10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        width: 200,
    },
    voucherAppliedButton: {
        backgroundColor: 'gray',
        marginTop: 10,
    },
    amountSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    amountButton: {
        padding: 10,
        borderRadius: 23,
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4,
        justifyContent: 'center'
    },
    selectedAmountButton: {
        backgroundColor: 'green',
    },
    amountText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    paymentSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    paymentButton: {
        padding: 10,
        borderRadius: 23,
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4,
        justifyContent: 'center'
    },
    selectedPaymentButton: {
        backgroundColor: 'green',
    },
    paymentText: {
        fontSize: 14,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    availablePointsText: {
        marginBottom: 16,
        color: 'green',
        fontSize: 16,
    },
    summarySection: {
        marginTop: 20,
    },
    summaryText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    confirmButton: {
        marginTop: 20,
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4,
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 14,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 3,
    },
    modalText: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        color: 'orange',
    },
    modalSubText: {
        fontSize: 14,
        marginTop: 10,
        textAlign: 'center',
        color: 'green',
    },
    okButton: {
        marginTop: 20,
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    okButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default BuyGoods;
