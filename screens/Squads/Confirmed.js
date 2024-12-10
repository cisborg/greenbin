import React, { useEffect, useRef } from 'react';
import { Text, TouchableOpacity, StyleSheet,Platform, Dimensions, Animated, StatusBar } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const { width } = Dimensions.get('window'); // Get screen dimensions

const SquadConfirmation = () => {
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity

    useEffect(() => {
        // Start the animation for a smooth fade-in
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800, // Animation duration
            useNativeDriver: true, // Use native driver for better performance
        }).start();
    }, [fadeAnim]);

    // Handle navigation to the EcoGreen Home page
    const handleProceed = () => {
        navigation.navigate('SquadCreated'); // Redirect to squad homepage or next steps
    };


    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            {/* Eco-friendly themed image */}
            <FastImage
                source={require('../../assets/greenBin.png')} // Replace with eco-friendly squad image
                style={styles.image} 
                resizeMode={FastImage.resizeMode.cover}
            />
            <Text style={styles.title}> Squad Created Successfully!</Text>
            <Text style={styles.message}>
                Successfully launched an EcoGreen Squad focused on making our planet greener.
                Together, we can take action for a sustainable future!
            </Text>
            <Text style={styles.subtitle}>What is Next?</Text>
            <Text style={styles.nextSteps}>
                Start by inviting your friends to join your squad and participate in impactful eco-friendly activities.
            </Text>

            {/* Invite friends button */}
            <TouchableOpacity style={styles.inviteButton} >
                <Text style={styles.inviteButtonText}>Invite Friends</Text>
                <AntDesign name="team" size={20} color="white" />
            </TouchableOpacity>

            {/* Proceed to the squad home page */}
            <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
                <Text style={styles.proceedButtonText}>Proceed to Your Squad</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.99, // Full screen width
        padding: '2%',
        backgroundColor: '#F0FFF4', // Light green for eco-friendly vibe
        paddingTop: Platform.OS === 'android'? StatusBar.currentHeight : 0,

    },
    image: {
        width: width * 0.4, // Responsive width (40% of screen width)
        height: width * 0.4, // Maintain the same ratio for height
        marginBottom: 25, // Space below image
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'green' ,// Eco-friendly green color for title
        width: width * 0.8, // Responsive width (40% of screen width)
    },
    message: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
        color: '#4CAF50' // Light green for message text
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        color: 'orange' // Darker green for contrast in subtitle
    },
    nextSteps: {
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 30,
        color: '#6A6A6A' // Gray for additional guidance text
    },
    inviteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#388E3C', // Green color for inviting friends
        padding: 13,
        borderRadius: 14,
        width: 220,
        marginBottom: 20,
        shadowColor: '#000', // Shadow for slight elevation effect
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1, // Elevation for Android
        marginBottom: '5%',
    },
    inviteButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold',
        marginRight: 10, // Space between text and icon
        textAlign: 'center',
        
    },
    proceedButton: {
        padding: 13,
        backgroundColor: 'green', // Light green color for proceed button
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        borderRadius: 14,
        width: width * 0.96 // Button width
    },
    proceedButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default SquadConfirmation;
