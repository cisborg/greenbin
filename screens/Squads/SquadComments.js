import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Dimensions,TouchableOpacity,FlatList, Text } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { postComment, getAllComments,deleteComment} from '../../redux/actions/Posts';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');


const CommentBottomSheet = ({ isVisible, onClose, postId }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const bottomSheetRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const comments  = useSelector((state) => state.posts.posts.comments,);
  const commentsLoading = useSelector((state) => state.posts?.comments?.loading || false);
  const  error  = useSelector((state) => state.posts.posts.error);


  useEffect(() => {
    if (isVisible) {
      dispatch(getAllComments(postId));
    }
  }, [isVisible, dispatch, postId]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      setLoading(true);
      try {
        await dispatch(postComment(postId, comment));
        setComment('');
        bottomSheetRef.current?.close();
      } catch (error) {
        Alert.alert("Error", "Could not submit comment. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert("Wrong Entry", "Comment cannot be empty.");
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await dispatch(deleteComment(postId, commentId));
    } catch (error) {
      Alert.alert("Could not delete comment. Please try again.");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.commentContainer}>
      <Text style={styles.commentText}>{item.text}</Text>
      <View style={styles.commentActions}>
        <Text style={styles.commentAuthor}>- {item.author}</Text>
        <TouchableOpacity  style={styles.deleteComment} onPress={() => handleCommentDelete(item.id)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const snapPoints = ['45%', '90%'];

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={onClose}
      index={isVisible ? 0 : -1}
    >
      <View style={styles.container}>
        {commentsLoading ? (
          <View style={styles.loadingContainer}>
            <LottieView
              source={require('../../assets/lottie/rotateLoad.json')} // Adjust the path to your Lottie file
              autoPlay
              loop
              style={styles.lottie}
            />
        </View>
        ) : (
          <FlatList
            data={comments}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.commentList}
            ListEmptyComponent={<Text>No comments yet.</Text>}
            refreshing={commentsLoading}
            onRefresh={() => dispatch(getAllComments(postId))}
          />
        )}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Type your comment..."
            value={comment}
            onChangeText={setComment}
            style={styles.input}
            multiline
            returnKeyType="done"
            onSubmitEditing={handleCommentSubmit}
          />
          <Button
            title={loading ? "Submitting..." : "Submit"}
            onPress={handleCommentSubmit}
            disabled={loading}
            style={styles.submitButton}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    height: 450,
  },
  commentList: {
    flexGrow: 1, // Allow list to take available space and scroll
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentContainer: {
    padding: 10,
    borderRadius: 12,
    elevation: 1,
    backgroundColor: '#fff',
  },
  commentText: {
    fontSize: 16,
    color: '#333',
  },
  deleteComment:{
    backgroundColor: 'green',
    borderRadius: 10,
    elevation: 1,
    alignItems: 'center',
    padding: 5
    
  },
  lottie: {
    width: width * 0.3, // Adjust size as needed
    height: height * 0.3,
  },
  
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default CommentBottomSheet;
