import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated, SafeAreaView } from 'react-native';
import LottieView from 'lottie-react-native';
import { Color } from '../../GlobalStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core';
import FastImage from 'react-native-fast-image'; // Import FastImage

const gamesData = [
  {
    id: '1',
    title: 'Eco-Challenges',
    description: 'Participate in weekly challenges that encourage sustainable behaviors, like reducing plastic use or planting trees.',
    format: 'Log activities and share photos to earn points and badges.',
    howToPlay: 'Join the challenge, complete the tasks, and submit evidence through the app.',
    image: require('../../assets/genetic.png'), // Add your image path
  },
  {
    id: '2',
    title: 'Green Trivia Games',
    description: 'Answer questions related to environmental issues and sustainability practices in a fun quiz format.',
    format: 'Compete against friends or teams with leaderboards.',
    howToPlay: 'Select a quiz, answer questions, and earn points for correct answers.',
    image: require('../../assets/Television.png'), // Add your image path
  },
  {
    id: '3',
    title: 'Virtual Clean-Up Events',
    description: 'Join virtual clean-ups and track your litter collection in your community.',
    format: 'Share your results and earn rewards for participation.',
    howToPlay: 'Collect litter, log your collection in the app, and share photos.',
    image: require('../../assets/greenBin.png'), // Add your image path
  },
  {
    id: '4',
    title: 'Sustainable Sports Tournaments',
    description: 'Participate in local sports tournaments that promote environmental themes.',
    format: 'Teams compete while raising awareness about conservation.',
    howToPlay: 'Register your team, participate in matches, and enjoy eco-friendly events.',
    image: require('../../assets/watches.png'), // Add your image path
  },
  {
    id: '5',
    title: 'Eco-Scavenger Hunts',
    description: 'Find and learn about local flora, fauna, and recycling bins in a fun scavenger hunt.',
    format: 'Use the app for clues and track your progress.',
    howToPlay: 'Follow clues, find items, and log them in the app for rewards.',
    image: require('../../assets/checked.png'), // Add your image path
  },
  {
    id: '6',
    title: 'Talent Showcases',
    description: 'Showcase your talents related to sustainability, like eco-friendly crafts or conservation-themed music.',
    format: 'Vote for your favorite performances and win prizes.',
    howToPlay: 'Submit your performance, get votes, and compete for recognition.',
    image: require('../../assets/talent.png'), // Add your image path
  },
  {
    id: '7',
    title: 'Fitness Challenges with a Green Twist',
    description: 'Log your fitness miles and pledge to plant a tree for every milestone reached.',
    format: 'Collaborate with local organizations to plant trees based on participation.',
    howToPlay: 'Track your workouts in the app and achieve milestones for tree planting.',
    image: require('../../assets/fitness.png'), // Add your image path
  },
  {
    id: '8',
    title: 'Art Competitions',
    description: 'Create art that promotes environmental themes and submit for a chance to win.',
    format: 'Showcase your artwork and get featured in galleries.',
    howToPlay: 'Create and submit your artwork through the app for evaluation.',
    image: require('../../assets/art.webp'), // Add your image path
  },
  {
    id: '9',
    title: 'Environmental Simulation Games',
    description: 'Build and manage a sustainable city, making decisions that impact the environment.',
    format: 'Compete to create the most eco-friendly city with educational content.',
    howToPlay: 'Play the simulation, make eco-friendly choices, and earn rewards.',
    image: require('../../assets/simulation.png'), // Add your image path
  },
  {
    id: '10',
    title: 'Sponsored Community Events',
    description: 'Participate in sponsored events like park clean-ups and educational workshops.',
    format: 'Sign up through the app to participate and earn rewards.',
    howToPlay: 'Join events, complete tasks, and log your participation in the app.',
    image: require('../../assets/likeButton.avif'), // Add your image path
  },
];

const GameCard = ({ game }) => {
  return (
    <View style={styles.card}>
      <FastImage source={game.image} style={styles.cardImage} resizeMode={FastImage.resizeMode.cover} /> {/* Use FastImage */}
      <Text style={styles.cardTitle}>{game.title}</Text>
      <Text style={styles.cardDescription}>{game.description}</Text>
      <Text style={styles.cardFormat}>
        <Text style={{ fontWeight: 'bold' }}>Format:</Text> {game.format}
      </Text>
      <Text style={styles.cardHowToPlay}>
        <Text style={{ fontWeight: 'bold' }}>How to Play:</Text> {game.howToPlay}
      </Text>
    </View>
  );
};

const GamesScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Start the fade-in animation after loading is complete
    setTimeout(() => {
      setIsLoading(false);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 2000); // Simulate a 2-second loading delay
  }, [fadeAnim]);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        // Lottie animation displayed while loading
        <View style={styles.loadingContainer}>
          <LottieView
            source={require('../../assets/lottie/rotatingBalls.json')} // Path to your Lottie JSON file
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>
      ) : (
        // Main content rendered after loading is complete
        <>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} accessibilityLabel="Go back">
              <Ionicons name="arrow-back-circle-outline" size={30} color="green" />
            </TouchableOpacity>
            <Text style={styles.header}>Discover New Games for Your Green Life!</Text>
          </View>
          <Animated.View style={{ ...styles.cardList, opacity: fadeAnim }}>
            <FlatList
              data={gamesData}
              renderItem={({ item }) => <GameCard game={item} />}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.cardListContainer}
            />
          </Animated.View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 2, // Reduced padding
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerContainer: {
    padding: 5, // Reduced padding
    flexDirection: "row",
    alignItems: 'flex-start',
    marginBottom: '-1%',
    marginTop: '-5%'
  },
  header: {
    fontSize: 18, // Decreased font size
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginLeft: 5, // Reduced margin
    flex: 1,
  },
  cardList: {
    paddingBottom: 15, // Reduced padding
    flexGrow: 1,
    paddingLeft: 10, // Reduced padding
    paddingRight: 10, // Reduced padding
    marginBottom: 20

  },
  cardListContent: {
    paddingBottom: 5, 
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14, // Adjusted border radius
    padding: 10, // Reduced padding
    marginVertical: 5, // Reduced margin
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2, // Adjusted shadow offset
    },
    shadowOpacity: 0.15, // Adjusted shadow opacity
    shadowRadius: 2, // Adjusted shadow radius
    elevation: 1, // Adjusted elevation
  },
  cardImage: {
    width: '100%',
    height: 80, // Decreased height
    borderRadius: 8, // Adjusted border radius
    marginBottom: 8, // Reduced margin
  },
  cardTitle: {
    fontSize: 15, // Decreased font size
    fontWeight: 'bold',
    color: '#27ae60',
  },
  cardDescription: {
    fontSize: 14, // Decreased font size
    color: '#34495e',
    marginVertical: 3, // Reduced margin
  },
  cardFormat: {
    fontSize: 12, // Decreased font size
    color: '#7f8c8d',
  },
  cardHowToPlay: {
    fontSize: 12, // Decreased font size
    color: '#7f8c8d',
    marginTop: 3, // Reduced margin
  },
});

export default GamesScreen;
