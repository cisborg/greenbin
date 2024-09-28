import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image,
    Animated, KeyboardAvoidingView, Platform, SafeAreaView, Modal, ActivityIndicator, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Color } from '../../GlobalStyles';
import AntDesign from '@expo/vector-icons/AntDesign';

const paymentMethods = ['Green Bank', 'Request a Friend', 'GCPs Wallet'];
const presetAmounts = [2000, 5000, 8000, 12000];

const BuyGoods = () => {
    const navigation = useNavigation();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [customAmount, setCustomAmount] = useState('');
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0]);
    const [promoCode, setPromoCode] = useState('');
    const [totalCost, setTotalCost] = useState(0);
    const [greenBankCode, setGreenBankCode] = useState('');
    const [availablePoints, setAvailablePoints] = useState(1000); 
    const [friendPhoneNumber, setFriendPhoneNumber] = useState('');

    const fadeAnim = useState(new Animated.Value(0))[0];

    const [isProcessing, setIsProcessing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [purchaseSuccessful, setPurchaseSuccessful] = useState(false);

    const validateInputs = () => {
        const amount = parseFloat(customAmount) || selectedAmount;
        const isValidPhoneNumber = phoneNumber.length === 10 && /^\d+$/.test(phoneNumber);
        const isValidGreenBankCode = greenBankCode.length === 10 && /^\d+$/.test(greenBankCode);
        
        if (!isValidPhoneNumber) {
            Alert.alert("Invalid Phone Number", "Please enter a valid 10-digit phone number.");
            return false;
        }

        if (selectedPaymentMethod === 'Green Bank' && !isValidGreenBankCode) {
            Alert.alert("Invalid Green Bank Code", "Please enter a valid 10-digit Green Bank code.");
            return false;
        }

        if (amount <= 0) {
            Alert.alert("Invalid Amount", "The amount must be greater than zero.");
            return false;
        }

        return true;
    };

    const handlePurchase = () => {
        if (!validateInputs()) return;

        setIsProcessing(true);
        setShowModal(true);

        setTimeout(() => {
            setIsProcessing(false);
            setPurchaseSuccessful(true);
        }, 600);
    };

    const calculateTotal = (amount) => {
        setTotalCost(amount);
    };

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

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
                            <Text style={styles.title}>Buy Goods And Services Now</Text>
                        </View>

                        {/* User Information */}
                        <View style={styles.userInfo}>
                            <Image source={{ uri: 'https://example.com/profile.jpg' }} style={styles.profilePicture} />
                            <TextInput
                                style={styles.input1}
                                placeholder="Enter Paybill/Pochi/Account"
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
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Friend's Phone Number"
                                placeholderTextColor={Color.colorGray_100}
                                keyboardType="numeric"
                                value={friendPhoneNumber}
                                onChangeText={setFriendPhoneNumber}
                            />
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

                        {/* Promotions/Discounts */}
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Promo Code"
                            placeholderTextColor={Color.colorGray_100}
                            value={promoCode}
                            onChangeText={setPromoCode}
                        />
                        <TouchableOpacity style={styles.ApplyButton}>
                            <Text style={{ color: 'black' }}>Apply Voucher</Text>
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
                                {isProcessing ? (
                                    <>
                                        <ActivityIndicator size="large" color={Color.colorLimegreen_200} />
                                        <Text style={styles.modalText}>Processing Airtime Redeem...</Text>
                                    </>
                                ) : (
                                    <>
                                        <Text style={styles.modalText}>Purchase Successful!</Text>
                                        <Text style={styles.modalSubText}>Conserve your environment with green token</Text>
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
                                    </>
                                )}
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
        padding: 20,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    backButton: {
        marginRight: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        left: 20,
        color: 'green'
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
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
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
        backgroundColor: Color.colorGray_100,
        alignItems: 'center',
        marginHorizontal: 5,
        marginTop: -10,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        width: 200,
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
        borderRadius: 12,
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    selectedAmountButton: {
        backgroundColor: Color.colorLimegreen_200,
    },
    amountText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    paymentSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    paymentButton: {
        padding: 10,
        borderRadius: 12,
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    selectedPaymentButton: {
        backgroundColor: Color.colorLimegreen_200,
    },
    paymentText: {
        fontSize: 16,
        fontWeight: 'bold',
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
        backgroundColor: Color.colorLimegreen_200,
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
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
        width: 250,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginTop: 15,
        fontSize: 16,
        textAlign: 'center',
        color: Color.colorLimegreen_200,
    },
    modalSubText: {
        fontSize: 14,
        marginTop: 10,
        textAlign: 'center',
        color: 'green',
    },
    okButton: {
        marginTop: 20,
        backgroundColor: Color.colorLimegreen_200,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    okButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default BuyGoods;
