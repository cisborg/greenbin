import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { Color } from '../../GlobalStyles';

const availableTags = [
  'ai', 'architecture', 'cloud', 'crypto', 'database', 'devops',
  'elixir', 'gaming', 'golang', 'java', 'javascript', 'machine-learning',
  'mobile', 'open-source', 'python', 'react', 'ruby', 'rust',
  'security', 'tech-news', 'testing', 'tools', 'genetics', 'bioinformatics', 'robotics',
  'environment-IoT', 'environment-liquidity', 'financial-engineering', 'ecology-software',
   'biotechnology',
  'byte-carbon', 'blockchain-technology','quantum-technology', 
  'neuromorphic', 'design', 'animal-husbandry', 
  
];

const TagSelection = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [feedName, setFeedName] = useState('');

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Filter tags based on the feed name input
  const filteredTags = availableTags.filter(tag =>
    tag.toLowerCase().includes(feedName.toLowerCase())
  );

  const renderTag = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.tag,
        selectedTags.includes(item) && styles.selectedTag,
      ]}
      onPress={() => toggleTag(item)}
    >
      <Text style={styles.tagText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter feed name or search tags"
        placeholderTextColor="#B0B0B0"
        value={feedName}
        onChangeText={setFeedName}
      />
      <ScrollView contentContainerStyle={styles.tagList}>
        <FlatList
          data={filteredTags}
          renderItem={renderTag}
          keyExtractor={(item) => item}
          numColumns={3}
          scrollEnabled={false}
        />
      </ScrollView>
     
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
 
  input: {
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#000000',
    height: 30,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 10
  },
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  tag: {
    backgroundColor: '#F0F0F0',
    borderRadius: 17,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
  },
  selectedTag: {
    backgroundColor: 'white',
  },
  tagText: {
    color: 'green',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 15,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    margin: 15,
  },
  buttonText: {
    color: Color.colorLimegreen_200,
    fontWeight: 'bold',
  },
});

export default TagSelection;
