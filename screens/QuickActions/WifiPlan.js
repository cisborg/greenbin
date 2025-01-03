import React, { useEffect, useRef, useState } from 'react';
import { Animated, SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/core';
import { Dimensions } from 'react-native';
import Lottie from 'lottie-react-native'; // Import Lottie
import { Color , FontFamily } from '../../GlobalStyles'; // Import your color palette
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import { purchaseProduct } from '../../redux/actions/products'; // Adjust the import based on your project structure

const { width, height } = Dimensions.get('window');

const WifiPlans = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch(); // Initialize dispatch
    const loading = useSelector(state => state.product.loading); // Access loading state from Redux
    const [loadingStates, setLoadingStates] = useState({}); // State to manage loading for each plan

    const plans = [
        {
            title: 'Green Networks',
            benefits: 'Unlimited Wireless with Pizza Gift',
            validity: '2 Weeks',
            price: 'Green Points - 15000',
            type: '2 Weeks',
            id: 1 // Add a unique ID for each plan
        },
        {
            title: 'Amazing EcoConnect',
            benefits: 'Unlimited Wireless with Voucher Gift',
            validity: '3 Weeks',
            price: 'Green Points - 20000',
            type: '3 Weeks',
            id: 2
        },
        {
            title: 'Super Squad Network',
            benefits: 'Unlimited Wireless with Voucher Gift',
            validity: 'Monthly Rate',
            price: 'Green Points - 24500',
            type: 'Monthly',
            id: 3
        },
        {
            title: 'Circular Economy',
            benefits: 'Voice - 10 Minutes & 10 SMS to Green daily',
            validity: 'Monthly Rate',
            price: 'Green Points - 30000',
            type: 'Monthly',
            id: 4
        },
        {
            title: 'Green Mifi Renewables',
            benefits: 'Unlimited - 1000 and Talkie Credits valid 2 months',
            validity: '2 Months',
            price: 'Green Points - 50000',
            type: '2 Months',
            id: 5
        },
        {
            title: 'Super Go Games',
            benefits: 'Buy DSTV with Half Paid Plan',
            validity: '2 Months',
            price: 'Green Points - 45000',
            type: '2 Months',
            id: 6
        },
    ];

    const handlePurchase = async (plan) => {
        setLoadingStates(prev => ({ ...prev, [plan.title]: true }));
        try {
            await dispatch(purchaseProduct(plan.id, 1)); // Assuming quantity is always 1
            navigation.navigate('BuyWifiSuccessful', { 
                packaged: plan.benefits, 
                valid: plan.validity, 
                price: plan.price 
            });
        } catch (error) {
            console.error(error); // Handle error appropriately
        } finally {
            setLoadingStates(prev => ({ ...prev, [plan.title]: false }));
        }
    };

    const renderPlansByType = (type) => {
        return plans
            .filter(plan => plan.type === type)
            .map((plan) => (
                <View key={plan.title} style={styles.card}>
                    <Text style={styles.planTitle}>{plan.title}</Text>
                    <Text style={styles.benefits}>{plan.benefits}</Text>
                    <Text style={styles.validity}>Validity: {plan.validity}</Text>
                    <Text style={styles.price}>{plan.price}</Text>
                    <TouchableOpacity 
                        onPress={() => handlePurchase(plan)} // Call the purchase handler
                        disabled={loading || loadingStates[plan.title]} // Disable button when loading for this plan or globally
                    >
                        <View style={styles.proceed}>
                            {loadingStates[plan.title] || loading ? (
                                <Lottie source={require('../../assets/lottie/bouncing_check.json')} autoPlay loop style={styles.loadingAnimation} /> // Show Lottie animation when loading
                            ) : (
                                <Text style={styles.cardText}>Confirm</Text>
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
            ));
    };

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={{ ...styles.animatedView, opacity: fadeAnim }}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.heading}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <AntDesign name="leftcircle" size={30} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.header}>Choose Your Best Package</Text>
                    </View>
                    <Text style={styles.subHeader}>Best Supersonic Wifi Packages!</Text>
                    {['2 Weeks', '3 Weeks', 'Monthly', '2 Months'].map(type => (
                        <View key={type}>
                            <Text style={styles.categoryHeader}>{type}</Text>
                            {renderPlansByType(type)}
                        </View>
                    ))}
                </ScrollView>
            </Animated.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    animatedView: {
        flex: 1,
    },
    loadingAnimation: {
        width: 30, // Adjust width as needed
        height: 30, // Adjust height as needed
    },
    scrollView: {
        padding: 10,
        paddingBottom: 10,
    },
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'green',
        marginLeft: 10,
    },
    subHeader: {
        fontSize: 15,
        color: Color.colorDarkturquoise,
        marginBottom: 5,
        textAlign: 'center',
    },
    proceed: {
        backgroundColor: 'green',
        shadowColor: '#000',
        marginTop: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        alignItems: 'center',
        paddingVertical: 8,
        borderRadius: 14,
        justifyContent: 'center',
        width: '100%', // Make it responsive
    },
    cardText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    categoryHeader: {
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 4,
        fontFamily: FontFamily.poppinsRegular,
        color: 'orange',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 15,
        marginBottom: 12,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    planTitle: {
        fontSize: 15,
        fontWeight: '600',
        fontFamily: FontFamily.manropeBold,
    },
    benefits: {
        fontSize: 13,
        color: '#555',
        marginBottom: 4,
    },
    validity: {
        fontSize: 11,
        color: '#777',
        marginBottom: 4,
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'green',
    },
});

export default WifiPlans;
