import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { FontFamily, Color, Border, FontSize } from "../GlobalStyles";

import { useNavigation } from '@react-navigation/core';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const WifiPlans = () => {
    const navigation = useNavigation();
    const plans = [
        
        {
            title: 'Green Networks',
            benefits: 'Unlimited Wireless with Pizza Gift',
            validity: '2 Weeks',
            price: 'Green Points - 15000',
            type: '2 Weeks',
        },
        {
            title: 'Amazing EcoConnect',
            benefits: 'Unlimited Wireless with Voucher Gift',
            validity: '3 Weeks',
            price: 'Green Points - 20000',
            type: '3 Weeks',
        },
        {
            title: 'Super Squad Network',
            benefits: 'Unlimited Wireless with Voucher Gift',
            validity: 'Monthly Rate',
            price: 'Green Points - 24500',
            type: 'Monthly',
        },
        {
            title: 'Circular Economy',
            benefits: 'Voice - 10 Minutes & 10 SMS to Green daily',
            validity: 'Monthly Rate',
            price: 'Green Points -30000',
            type: 'Monthly',
        },
        {
            title: 'Green Mifi Renewables',
            benefits: 'Unlimited- 1000 and Talkie Credits valid 2 months',
            validity: '2 Months',
            price: 'Green Points -50000',
            type: '2 Months',
        },
        {
            title: 'Super Go Games',
            benefits: 'Buy DSTV with Half Paid Plan',
            validity: '2 Months',
            price: 'Green Points : 45000',
            type: '2 Months',
        },
        
    ];

    // Function to render plans by type
    const renderPlansByType = (type) => {
        return plans
            .filter(plan => plan.type === type)
            .map((plan, index) => (
                <View key={index} style={styles.card} >
                    <Text style={styles.planTitle}>{plan.title}</Text>
                    <Text style={styles.benefits}>{plan.benefits}</Text>
                    <Text style={styles.validity}>Validity: {plan.validity}</Text>
                    <Text style={styles.price}>{plan.price}</Text>
                    <TouchableOpacity onPress={()=> navigation.navigate('BuyWifiSuccessful', {packaged:plan.benefits, valid:plan.validity, price: plan.price })}>
                        <View style={styles.proceed}>
                            <Text style={styles.cardText}>Confirm</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ));
    };

    return (
        
        <ScrollView style={styles.container}>
            <View style={styles.heading}>
                <TouchableOpacity>
                    <AntDesign name="leftcircle" size={30} color="black" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
                <Text style={styles.header}>Choose Your Best Package</Text>
            </View>
            
            <Text style={styles.subHeader}>Best Supersonic Wifi Packages!</Text>

            
            <Text style={styles.categoryHeader}>2 Weeks</Text>
            {renderPlansByType('2 Weeks')}

            
            <Text style={styles.categoryHeader}>3 Weeks</Text>
            {renderPlansByType('3 Weeks')}

            
            <Text style={styles.categoryHeader}>Monthly</Text>
            {renderPlansByType('Monthly')}

            
            <Text style={styles.categoryHeader}>2 Months</Text>
            {renderPlansByType('2 Months')}
        </ScrollView>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        width: 404,
    },
    heading: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        marginBottom: 16,
        justifyContent: 'flex-start',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: Color.colorLimegreen_200,
        marginLeft: 30
    },
    subHeader: {
        fontSize: 16,
        color: Color.colorDarkturquoise,
        marginBottom: 30,
        top: 0,
        left: 85
    },
    proceed: {
        backgroundColor: 'white',
        shadowColor: '#000',
        left: 250,
        marginTop:0,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        alignContent: 'center',
        width: 100,
        height: 25,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
      },
      cardText: {
        color: Color.colorLimegreen_200,
        fontWeight: 'bold',
      },
    categoryHeader: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 11,
        marginTop: 0,
        fontFamily: FontFamily.poppinsRegular,
        color: Color.colorCrimson,
    },
    card: {
        backgroundColor: '#f9f9f9',
        borderRadius: 17,
        padding: 10,
        marginBottom: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        
    },
    noteMessage: {
        height: 40,
        width: 375,
        position: "absolute",
        borderRadius: 13,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        
        top: 82,
        left: 0,
      },
      factAbout201: {
        fontSize: FontSize.size_sm,
        color: Color.colorGray_800,
        width: 370,
        height: 48,
        marginTop: 10,
        marginLeft: 10,
        left: 3,
        position: "absolute",
      },
    planTitle: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: FontFamily.manropeBold
    },
    benefits: {
        fontSize: 14,
        color: '#555',
    },
    validity: {
        fontSize: 12,
        color: '#777',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
        marginTop: 8,
    },
});

export default WifiPlans;
