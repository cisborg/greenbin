import React, { useState, useRef } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const CommentBottomSheet = ({ isVisible, onClose, onCommentAdd }) => {
  const [comment, setComment] = useState('');
  const bottomSheetRef = useRef(null);
  const [loading, setLoading] = useState(false); // State for loading

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      setLoading(true);
      try {
        // Simulating a backend submission; replace with your actual submission logic
        await onCommentAdd(comment); 
        setComment(''); // Clear the input
        bottomSheetRef.current?.close(); // Close the bottom sheet
      } catch (error) {
        Alert.alert("Error", "Could not submit comment. Please try again."); // Handle error
      } finally {
        setLoading(false); // Reset loading state
      }
    } else {
      Alert.alert("Validation Error", "Comment cannot be empty."); // Validate input
    }
  };

  // Snap points for the bottom sheet
  const snapPoints = [250];

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={onClose}
      index={isVisible ? 0 : -1} // Control visibility with index
    >
      <View style={styles.container}>
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
  input: {
    height: 200,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default CommentBottomSheet;
