import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Platform, Image, Dimensions, Animated } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Color } from '../../GlobalStyles';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

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
            <Image 
                source={require('../../assets/greenBin.png')} // Replace with eco-friendly squad image
                style={styles.image} 
            />
            <Text style={styles.title}> Squad Created Successfully!</Text>
            <Text style={styles.message}>
                You've just launched an EcoGreen Squad focused on making our planet greener.
                Together, we can take action for a sustainable future!
            </Text>
            <Text style={styles.subtitle}>What's Next?</Text>
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
        width: width, // Full screen width
        padding: 20,
        backgroundColor: '#F0FFF4', // Light green for eco-friendly vibe
        paddingTop: Platform.OS === 'android'? StatusBar.currentHeight : 0,

    },
    image: {
        width: width * 0.4, // Responsive width (40% of screen width)
        height: width * 0.4, // Maintain the same ratio for height
        marginBottom: 25, // Space below image
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: Color.colorLimegreen_200 ,// Eco-friendly green color for title
        width: width * 0.8, // Responsive width (40% of screen width)
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: '#4CAF50' // Light green for message text
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        color: '#388E3C' // Darker green for contrast in subtitle
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
        elevation: 2, // Elevation for Android
    },
    inviteButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: 'bold',
        marginRight: 10, // Space between text and icon
        textAlign: 'center',
    },
    proceedButton: {
        padding: 13,
        backgroundColor: Color.colorLimegreen_200, // Light green color for proceed button
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        borderRadius: 14,
        width: 220 // Button width
    },
    proceedButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default SquadConfirmation;
