import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/core';
import TagList from './Tags';
import YourSquads from './Squads';
import NotificationsScreen from './Updates';
import { Color } from '../GlobalStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import TagSelection from './selectTag';

const Tab = createMaterialTopTabNavigator();

const GoodHome = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <SearchBar />
      <HomeTabs searchQuery={searchQuery} />
    </View>
  );
};

const HomeTabs = ({ searchQuery }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === 'selectTag') {
            return <View style={{ marginTop: 13}}>
              <MaterialIcons name="add-box" size={22} color={focused ? 'green' : "gray"} />
              </View>
          }
          return null; // No icon for other tabs
        },
        tabBarLabel: ({ focused }) => {
          if (route.name === 'selectTag') {
            return null; // No label for the selectTag tab
          }
          return (
            <Text style={{ color: focused ? "black" : "gray", fontWeight: '550'}}>
              {route.name}
            </Text>
          ); // Default label for other tabs
        },
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 45, // Adjust height as needed
          paddingBottom: 23, // Add padding if needed
          shadowOpacity: 0.2,
          shadowOffset: { width: 0, height: 1 },
          shadowRadius: 1,
          elevation: 2,
          borderRadius: 3,
          marginTop: 10,
          paddingTop: -5,
          justifyContent: 'center',
        },
        tabBarLabelStyle: {
          fontWeight: '600',
          fontSize: 14,
          textTransform: 'none',
        },
      })}
    >
      <Tab.Screen name="selectTag" component={TagSelection} />
      <Tab.Screen name="For you">
        {() => <ForYouScreen searchQuery={searchQuery} />}
      </Tab.Screen>
      <Tab.Screen name="Tags" component={TagList} />
      <Tab.Screen name="Squads" component={YourSquads} />
      <Tab.Screen name="Updates" component={NotificationsScreen} />
    </Tab.Navigator>
  );
};





const ForYouScreen = ({ searchQuery }) => {
  const [posts, setPosts] = useState([
    {
      title: "Mjue kura za 2027 zishaibiwa tayari",
      author: "Masaku",
      squad: "Kenya Ecogreen",
      date: "8h ago",
      likes: 450,
      comments: 296,
      moderated: false,
      imageUri: "https://example.com/image1.jpg", // Replace with actual image URL
    },
    {
      title: "Green Circular Economy",
      author: "Ashley Young",
      squad: "Eco Warriors",
      date: "Today",
      likes: 656,
      comments: 60,
      moderated: true,
      imageUri: "https://example.com/image2.jpg", // Replace with actual image URL
    },
  ]);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.squad.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLike = (index) => {
    const newPosts = [...posts];
    if (!newPosts[index].isLiked) {
      newPosts[index].likes += 1; // Increment likes
      newPosts[index].isLiked = true; // Set liked status
      Alert.alert(`${newPosts[index].author} liked your post!`);
    }
    setPosts(newPosts);
  };

  return (
    <View style={styles.content}>
      <ScrollView>
        {filteredPosts.map((post, index) => (
          <Post 
            key={index} 
            {...post} 
            onLike={() => handleLike(index)} 
          />
        ))}
      </ScrollView>
    </View>
  );
};

const Post = ({ title, author, squad, date, likes, comments, moderated, imageUri, onLike }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false); // State for options visibility

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike();
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleOptionsPress = () => {
    setOptionsVisible(!optionsVisible); // Toggle options visibility
  };

  return (
    <View style={styles.postCard}>
      <View style={styles.header}>
        <Image style={styles.profilePic} source={require('../assets/anotherWoman.avif')} />
        <View style={styles.authorInfo}>
          <Text style={styles.postAuthor}>
            {author} <TouchableOpacity>
              <Text style={styles.squadName}>• {squad}</Text>
            </TouchableOpacity>
          </Text>
          <Text style={styles.postDate}>{date}</Text>
          {moderated && <Text style={styles.moderatedIndicator}>Moderated</Text>}
        </View>
        <TouchableOpacity style={styles.optionsButton} onPress={handleOptionsPress}>
          <Ionicons name="ellipsis-vertical" size={20} color="gray" />
        </TouchableOpacity>
      </View>

      {optionsVisible && (
        <View style={styles.optionsMenu}>
          <TouchableOpacity style={styles.optionToggle}>
            <FontAwesome name="frown-o" size={17} color="green" />
            <Text style={{ marginLeft: 6}}>Not interested in this post</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionToggle}>
            <AntDesign name="adduser" size={17} color="green" />
            <Text style={{ marginLeft: 6}}>Follow @{squad}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionToggle}>
            <MaterialCommunityIcons name="playlist-remove" size={17} color="green" />
            <Text style={{ marginLeft: 6}}>Add/remove from Lists</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.optionToggle}>
          <Octicons name="mute" size={17} color="green" />
            <Text style={{ marginLeft: 6}}>Mute @{squad}</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionToggle}>
          <MaterialIcons name="report" size={17} color="green" />
            <Text style={{ marginLeft: 6}}>Report post</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionToggle}>
          <MaterialIcons name="speaker-notes" size={17} color="green" />
            <Text  style={{ marginLeft: 6}}>Request Community Note</Text></TouchableOpacity>
        </View>
      )}

      <Text style={styles.postTitle}>{title}</Text>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.postImage} />}
      <View style={styles.postStats}>
        <TouchableOpacity style={styles.statButton} onPress={handleLike}>
          <Ionicons name={isLiked ? "heart" : "heart-outline"} size={17} color={isLiked ? Color.colorLimegreen_200 : "black"} />
          <Text style={styles.statText}>{isLiked ? likes + 1 : likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statButton}>
          <Ionicons name="chatbubble-outline" size={17} color="black" />
          <Text style={styles.statText}>{comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statButton}>
         <Ionicons name="stats-chart" size={17} color="black" />
          <Text style={styles.statText}>129k</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statButton} onPress={handleSave}>
          <FontAwesome name={isSaved ? "bookmark" : "bookmark-o"} size={17} color={isSaved ? Color.colorLimegreen_200 : "black"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.statButton}>
          <Ionicons name="share-social-outline" size={17} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SearchBar = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.searchBarContainer}>
        <Text style={styles.greenTxt}>Green Squads Daily</Text>
        <TouchableOpacity>
          <Ionicons name="color-filter-outline" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ProfilePage')}>
          <Image style={styles.profile} source={require('../assets/anotherWoman.avif')} />
        </TouchableOpacity>
      </View>
      <Text style={styles.tagline}>Where technology meets all human kind!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    overflow: 'hidden',
    width: 404
    
  },
  content: {
    padding: 10,
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 3,
    elevation: 1,
    marginVertical: 10,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  optionToggle : {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  profile: {
    width: 40,
    height: 34,
    borderRadius: 12,
    left: -10,
    marginTop: 4,
  },
  authorInfo: {
    marginLeft: 10,
    flex: 1,
  },
  postAuthor: {
    fontWeight: 'bold',
  },
  squadName: {
    fontStyle: 'normal',
    color: Color.colorLimegreen_200,
  },
  postDate: {
    color: '#888',
  },
  moderatedIndicator: {
    color: 'red',
    fontSize: 12,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 10,
  },
  postImage: {
    width: '100%',
    height: 120,
    borderRadius: 14,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  postStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 8,
  },
  statButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 9,
    backgroundColor: '#f2f2f2', // Light background for buttons
    marginRight: 10,
    height: 25,
  },
  statText: {
    marginLeft: 5,
    color: Color.colorGray_200,
    fontWeight: '400',
    fontSize: 13,
  },
  optionsButton: {
    marginLeft: 10,
  },
  optionsMenu: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    position: 'absolute',
    right: 10,
    top: 50,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1000,
  },
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  greenTxt: {
    fontSize: 20,
    fontWeight: '700',
    color: Color.colorLimegreen_200,
    marginEnd: 50,
    left: 6,
  },
  tagline: {
    color: Color.colorGray_100,
    fontSize: 12,
    left: 8,
    marginTop: -14,
  },
});


export default GoodHome;
