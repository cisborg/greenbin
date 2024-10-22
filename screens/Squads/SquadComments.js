import React, { useState, useRef } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const CommentBottomSheet = ({ isVisible, onClose, onCommentAdd }) => {
  const [comment, setComment] = useState('');
  const bottomSheetRef = useRef(null);

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      onCommentAdd(comment); // Pass the comment back to the parent
      setComment(''); // Clear the input
      bottomSheetRef.current?.close(); // Close the bottom sheet
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
        />
        <Button title="Submit" onPress={handleCommentSubmit} />
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
