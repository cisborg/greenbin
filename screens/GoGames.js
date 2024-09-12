import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Color } from '../GlobalStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core';

const gamesData = [
  {
    id: '1',
    title: 'Eco-Challenges',
    description: 'Participate in weekly challenges that encourage sustainable behaviors, like reducing plastic use or planting trees.',
    format: 'Log activities and share photos to earn points and badges.',
    howToPlay: 'Join the challenge, complete the tasks, and submit evidence through the app.',
    image: require('../assets/genetic.png'), // Add your image path
  },
  {
    id: '2',
    title: 'Green Trivia Games',
    description: 'Answer questions related to environmental issues and sustainability practices in a fun quiz format.',
    format: 'Compete against friends or teams with leaderboards.',
    howToPlay: 'Select a quiz, answer questions, and earn points for correct answers.',
    image: require('../assets/Television.png'), // Add your image path
  },
  {
    id: '3',
    title: 'Virtual Clean-Up Events',
    description: 'Join virtual clean-ups and track your litter collection in your community.',
    format: 'Share your results and earn rewards for participation.',
    howToPlay: 'Collect litter, log your collection in the app, and share photos.',
    image: require('../assets/greenBin.png'), // Add your image path
  },
  {
    id: '4',
    title: 'Sustainable Sports Tournaments',
    description: 'Participate in local sports tournaments that promote environmental themes.',
    format: 'Teams compete while raising awareness about conservation.',
    howToPlay: 'Register your team, participate in matches, and enjoy eco-friendly events.',
    image: require('../assets/watches.png'), // Add your image path
  },
  {
    id: '5',
    title: 'Eco-Scavenger Hunts',
    description: 'Find and learn about local flora, fauna, and recycling bins in a fun scavenger hunt.',
    format: 'Use the app for clues and track your progress.',
    howToPlay: 'Follow clues, find items, and log them in the app for rewards.',
    image: require('../assets/checked.png'), // Add your image path
  },
  {
    id: '6',
    title: 'Talent Showcases',
    description: 'Showcase your talents related to sustainability, like eco-friendly crafts or conservation-themed music.',
    format: 'Vote for your favorite performances and win prizes.',
    howToPlay: 'Submit your performance, get votes, and compete for recognition.',
    image: require('../assets/talent.png'), // Add your image path
  },
  {
    id: '7',
    title: 'Fitness Challenges with a Green Twist',
    description: 'Log your fitness miles and pledge to plant a tree for every milestone reached.',
    format: 'Collaborate with local organizations to plant trees based on participation.',
    howToPlay: 'Track your workouts in the app and achieve milestones for tree planting.',
    image: require('../assets/fitness.png'), // Add your image path
  },
  {
    id: '8',
    title: 'Art Competitions',
    description: 'Create art that promotes environmental themes and submit for a chance to win.',
    format: 'Showcase your artwork and get featured in galleries.',
    howToPlay: 'Create and submit your artwork through the app for evaluation.',
    image: require('../assets/art.webp'), // Add your image path
  },
  {
    id: '9',
    title: 'Environmental Simulation Games',
    description: 'Build and manage a sustainable city, making decisions that impact the environment.',
    format: 'Compete to create the most eco-friendly city with educational content.',
    howToPlay: 'Play the simulation, make eco-friendly choices, and earn rewards.',
    image: require('../assets/simulation.png'), // Add your image path
  },
  {
    id: '10',
    title: 'Sponsored Community Events',
    description: 'Participate in sponsored events like park clean-ups and educational workshops.',
    format: 'Sign up through the app to participate and earn rewards.',
    howToPlay: 'Join events, complete tasks, and log your participation in the app.',
    image: require('../assets/events.png'), // Add your image path
  },
];

const GameCard = ({ game }) => {
  return (
    <View style={styles.card}>
      <Image source={game.image} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{game.title}</Text>
      <Text style={styles.cardDescription}>{game.description}</Text>
      <Text style={styles.cardFormat}><strong>Format:</strong> {game.format}</Text>
      <Text style={styles.cardHowToPlay}><strong>How to Play:</strong> {game.howToPlay}</Text>
    </View>
  );
};

const GamesScreen = () => {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <View style={{padding: 10 , flexDirection: "row", alignItems: 'flex-start'}}>
        <TouchableOpacity onPress={()=> navigation.goBack()}> 
            <Ionicons name="arrow-back-circle-outline" size={30} color="green" />
        </TouchableOpacity>
        <Text style={styles.header}>Discover New Games for Your Green Life!</Text>
        </View>
      <FlatList
        data={gamesData}
        renderItem={({ item }) => <GameCard game={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.cardList}
      />
    </View>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: Color.colorLimegreen_200,
    textAlign: 'center',
    marginBottom: 20,
    marginLeft: 10
  },
  cardList: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  cardDescription: {
    fontSize: 16,
    color: '#34495e',
    marginVertical: 5,
  },
  cardFormat: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  cardHowToPlay: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },
});

export default GamesScreen;
