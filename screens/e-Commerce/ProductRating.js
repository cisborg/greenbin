import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { rateProduct } from '../../redux/actions/ratingAction'; // Assume you have this action
import { useNavigation } from '@react-navigation/native';

const ProductRating = ({ productId, visible, onClose }) => {
  const [rating, setRating] = useState(0);
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Accessing state from Redux
  const { loading, productRatings } = useSelector(state => ({ productRatings: state.rating.ratings.product, loading: state.rating.loading}));

  useEffect(() => {
    // Reset state when modal is closed
    if (!visible) {
      setRating(0);
      setReason('');
      setSubmitted(false);
    }
  }, [visible]);

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert("Please select a rating!");
      return;
    }

    try {
      await dispatch(rateProduct(productId, rating, reason)); // Pass reason here
      Alert.alert("Thank you for your feedback!", `Rating: ${rating} stars\nReason: ${reason}`);
      setSubmitted(true);
    } catch (error) {
      Alert.alert(`${error}, Something went wrong. Please try again.`);
    }
  };

  const handleNavigate = () => {
    navigation.goBack();
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const getRatingMessage = (value) => {
    switch (value) {
      case 1:
        return { text: "Bad", emoji: "😞" };
      case 2:
        return { text: "Fair", emoji: "😐" };
      case 3:
        return { text: "Good", emoji: "🙂" };
      case 4:
        return { text: "Excellent", emoji: "😀" };
      case 5:
        return { text: "Satisfactory", emoji: "🌟" };
      default:
        return { text: "", emoji: "" };
    }
  };

  useEffect(() => {
    if (productRatings.productId === productId) {
      setRating(productRatings.stars);
      setReason(productRatings.reason);
    }
  }, [productRatings, productId]);

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={handleNavigate}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Rate this Product</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => handleRating(star)} style={styles.starContainer}>
                <Text style={rating >= star ? styles.activeStar : styles.inactiveStar}>★</Text>
                <Text style={styles.statusText}>{getRatingMessage(star).emoji} {getRatingMessage(star).text}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={styles.reasonInput}
            placeholder="Write your reason here..."
            value={reason}
            onChangeText={setReason}
            multiline
          />

          <TouchableOpacity
            onPress={loading || submitted ? null : handleSubmit}
            style={styles.button}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>{submitted ? "Submitted" : (rating > 0 ? "Submit" : "Select a rating")}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    width: '90%',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  starContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  activeStar: {
    fontSize: 20,
    color: '#FFD700', // Gold color for active stars
  },
  inactiveStar: {
    fontSize: 20,
    color: '#D3D3D3', // Light gray for inactive stars
  },
  statusText: {
    fontSize: 12,
    marginTop: 5,
  },
  reasonInput: {
    height: 100,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 14,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default ProductRating;
