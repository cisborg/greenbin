import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Color, FontFamily } from '../GlobalStyles';

// Mock data for dropdowns
const paymentMethods = ['Green Bank', 'Request a Friend', 'GCPs Wallet'];
const presetAmounts = [200, 500, 800, 1200];

const BuyAirtimeScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [customAmount, setCustomAmount] = useState('');
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0]);
    const [promoCode, setPromoCode] = useState('');
    const [totalCost, setTotalCost] = useState(0);
    const [greenBankCode, setGreenBankCode] = useState('');
    const [availablePoints, setAvailablePoints] = useState(1000); // Example available points

    // Handle purchase logic (mocked for this example)
    const handlePurchase = () => {
        alert('Purchase Successful!');
    };

    // Calculate the total cost based on selected amount or custom input
    const calculateTotal = (amount) => {
        setTotalCost(amount);
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Buy EcoGreen Goods</Text>
            </View>

            {/* User Information */}
            <View style={styles.userInfo}>
                <Image source={{ uri: 'https://example.com/profile.jpg' }} style={styles.profilePicture} />
                <TextInput
                    style={styles.input1}
                    placeholder="Enter Till Number/Paybill/Pochi"
                    placeholderTextColor={Color.colorGray_100}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
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
                                setGreenBankCode(''); // Reset Green Bank code if another method is selected
                            }
                        }}
                    >
                        <Text style={styles.paymentText}>{method}</Text>
                    </TouchableOpacity>
                ))}
            </View>
           

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
            <TouchableOpacity style={styles.confirmButton} onPress={handlePurchase}>
                <Text style={styles.confirmButtonText}>Pay GCPs {totalCost.toFixed(2)}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.colorWhite,
        padding: 20,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    backButton: {
        marginRight: 16,
    },
    backText: {
        color: Color.colorLimegreen_200,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        left: 55,
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
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    input1: {
        flex: 1,
        padding: 10,
        borderRadius: 13,
        marginBottom: 16,
        marginTop: 13,
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    amountSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    ApplyButton: {
        padding: 10,
        borderColor: 'white',
        borderWidth: 1,
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        maxWidth: 200,
        left: 10,
    },
    amountButton: {
        padding: 10,
        borderWidth: 0,
        minWidth: 80,
        alignItems: 'center',
        borderRadius: 17,
        backgroundColor: '#f9f9f9',
        marginBottom: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        maxWidth: 70,
        left: 10,
    },
    selectedAmountButton: {},
    amountText: {
        color: Color.colorLimegreen_200,
    },
    paymentSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    paymentButton: {
        padding: 10,
        borderWidth: 1,
        alignItems: 'center',
        borderRadius: 12,
        borderColor: '#FFFFFF',
        backgroundColor: '#f9f9f9',
        marginBottom: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        maxWidth: 200,
        left: 10,
    },
    selectedPaymentButton: {
        backgroundColor: 'white',
        borderColor: Color.colorLimegreen_200,
    },
    paymentText: {
        color: Color.colorLimegreen_200,
    },
   
    summarySection: {
        marginBottom: 16,
    },
    summaryText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    confirmButton: {
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 17,
        marginBottom: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        maxWidth: 180,
        left: 120,
    },
    confirmButtonText: {
        color: Color.colorLimegreen_200,
        fontSize: 18,
        fontWeight: 'bold',
    },
    availablePointsText: {
        fontSize: 16,
        marginBottom: 16,
        color: Color.colorLimegreen_200,
    },
});

export default BuyAirtimeScreen;
