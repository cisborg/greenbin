import React, { useState, useRef } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, FlatList, Text } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const CommentBottomSheet = ({ isVisible, onClose, onCommentAdd, comments = [] }) => {
  const [comment, setComment] = useState('');
  const bottomSheetRef = useRef(null);
  const [loading, setLoading] = useState(false); // State for loading

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      setLoading(true);
      try {
        await onCommentAdd(comment); // Add the comment via the parent function
        setComment(''); // Clear the input
        bottomSheetRef.current?.close(); // Close the bottom sheet
      } catch (error) {
        Alert.alert("Error", "Could not submit comment. Please try again."); // Handle error
      } finally {
        setLoading(false); // Reset loading state
      }
    } else {
      Alert.alert("Wrong Entry", "Comment cannot be empty."); // Validate input
    }
  };

  // Snap points for the bottom sheet
  const snapPoints = [450];

  // Render each comment in the list
  const renderItem = ({ item }) => (
    <View style={styles.commentContainer}>
      <Text style={styles.commentText}>{item}</Text>
    </View>
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={onClose}
      index={isVisible ? 0 : -1} // Control visibility with index
    >
      <View style={styles.container}>
        {/* Comments List */}
        <FlatList
          data={comments} // Array of comments passed via props
          renderItem={renderItem} // Render each comment
          keyExtractor={(item, index) => index.toString()} // Key for each item
          contentContainerStyle={styles.commentList}
          ListEmptyComponent={<Text>No comments yet.</Text>} // Message when no comments exist
        />

        {/* Input for new comment */}
        <TextInput
          placeholder="Type your comment..."
          value={comment}
          onChangeText={setComment}
          style={styles.input}
          multiline
          returnKeyType="done"
          onSubmitEditing={handleCommentSubmit} // Handle submit on keyboard enter
        />
        <Button title={loading ? "Submitting..." : "Submit"} onPress={handleCommentSubmit} disabled={loading} />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    height: 450,
  },
  commentList: {
    flexGrow: 1, // Allow list to take available space and scroll
    marginBottom: 20,
  },
  commentContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  commentText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default CommentBottomSheet;
