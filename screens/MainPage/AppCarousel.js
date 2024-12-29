import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import LottieView from 'lottie-react-native';

// Import your existing screen components
import RegisterPage from '../Registration/RegisterPage'; // Adjust the path as needed
import SignInPage from '../Registration/SignInPage'; // Adjust the path as needed

const { width: screenWidth } = Dimensions.get('window');

// Define the screens array referencing your imported components
const screens = [
    { component: RegisterPage },
    { component: SignInPage },
];

const AppCarousel = () => {
    const carouselRef = useRef(null);
    const [activeSlide, setActiveSlide] = useState(0);

    const renderItem = ({ item: { component: Component } }) => (
        <View style={styles.slide}>
            <Component /> 
            {activeSlide === 0 && (
                <LottieView
                    source={require('../../assets/lottie/recycleSplash.json')} // Adjust the path to your Lottie file
                    autoPlay
                    loop
                    style={styles.animation}
                />
            )}
            <Text>Begin Your Journey of Promoting Green Circular Economy!</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Carousel
                ref={carouselRef}
                data={screens}
                renderItem={renderItem}
                width={screenWidth}
                height={screenWidth} // Adjust height as needed
                onSnapToItem={(index) => setActiveSlide(index)}
            />
            <View style={styles.pagination}>
                {screens.map((_, index) => (
                    <View
                        key={index}
                        style={[styles.dot, activeSlide === index ? styles.activeDot : null]}
                    />
                ))}
            </View>
            <TouchableOpacity
                style={styles.nextButton}
                onPress={() => {
                    const nextIndex = (activeSlide + 1) % screens.length;
                    carouselRef.current.scrollToIndex(nextIndex); // Updated method for scrolling
                    setActiveSlide(nextIndex);
                }}
            >
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', // Light background color
    },
    slide: {
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff', // White background for slides
        borderRadius: 14,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3, // For Android shadow
    },
    pagination: {
        position: 'absolute',
        bottom: 100,
        flexDirection: 'row',
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 8,
        backgroundColor: 'gray',
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: 'black',
    },
    nextButton: {
        position: 'absolute',
        bottom: 30,
        backgroundColor: '#007BFF', // Button color
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 14,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    animation: {
        width: 100,
        height: 100,
        position: 'absolute',
        top: 20,
    },
});

export default AppCarousel;
