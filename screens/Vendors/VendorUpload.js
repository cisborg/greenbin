import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, Dimensions } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker'; // Updated importimport * as Yup from 'yup';
import FastImage from 'react-native-fast-image';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../redux/actions/products'; 
import Lottie from 'lottie-react-native'; // Import Lottie
import Animated from 'react-native-reanimated'; // Import Animated

const { width } = Dimensions.get('window');

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Product title is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().typeError('Price must be a number').positive('Price must be greater than zero').required('Price is required'),
  originalPrice: Yup.number().typeError('Original price must be a number').positive('Original price must be greater than zero').required('Original price is required'),
  brand: Yup.string().required('Brand is required'),
  rating: Yup.number().typeError('Rating must be a number').min(0, 'Rating must be at least 0').max(5, 'Rating must be at most 5').required('Rating is required'),
  reviewCount: Yup.number().typeError('Review count must be a number').min(0, 'Review count must be at least 0').required('Review count is required'),
  isBrandOfficial: Yup.boolean(),
  isLocalDispatch: Yup.boolean(),
  quantity: Yup.number().typeError('Quantity must be a number').integer('Quantity must be an integer').min(0, 'Quantity must be at least 0').required('Quantity is required'),
});

export default function ProductUpload() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setLoading(true);
    const productData = { ...data, images };
    await dispatch(createProduct(productData));
    setLoading(false);
    setModalVisible(true); // Show success modal
  };

  const pickImages = async () => {
    // Request permission to access the media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
    });

    if (!result.cancelled) {
      const selectedImages = result.selected.map(asset => asset.uri);
      setImages([...images, ...selectedImages]);
    }
  };

  useEffect(() => {
    // Any additional setup if needed
  }, []);

  return (
    <Animated.View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Upload Your Product</Text>

        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Product Title"
                onChangeText={onChange}
                value={value}
              />
              {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Description"
                onChangeText={onChange}
                value={value}
                multiline
              />
              {errors.description && <Text style={styles.error}>{errors.description.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          name="price"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Price"
                keyboardType="numeric"
                onChangeText={onChange}
                value={value}
              />
              {errors.price && <Text style={styles.error}>{errors.price.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          name="originalPrice"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Original Price"
                keyboardType="numeric"
                onChangeText={onChange}
                value={value}
              />
              {errors.originalPrice && <Text style={styles.error}>{errors.originalPrice.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          name="brand"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Brand"
                onChangeText={onChange}
                value={value}
              />
              {errors.brand && <Text style={styles.error}>{errors.brand.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          name="rating"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Rating (0-5)"
                keyboardType="numeric"
                onChangeText={onChange}
                value={value}
              />
              {errors.rating && <Text style={styles.error}>{errors.rating.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          name="reviewCount"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Review Count"
                keyboardType="numeric"
                onChangeText={onChange}
                value={value}
              />
              {errors.reviewCount && <Text style={styles.error}>{errors.reviewCount.message}</Text>}
            </>
          )}
        />

        <Controller
          control={control}
          name="isBrandOfficial"
          render={({ field: { onChange, value } }) => (
            <View style={styles.checkboxContainer}>
              <TouchableOpacity onPress={() => onChange(!value)}>
                <Text style={styles.checkboxText}>
                  {value ? '☑️ Official Brand' : '☐ Official Brand'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <Controller
          control={control}
          name="isLocalDispatch"
          render={({ field: { onChange, value } }) => (
            <View style={styles.checkboxContainer}>
              <TouchableOpacity onPress={() => onChange(!value)}>
                <Text style={styles.checkboxText}>
                  {value ? '☑️ Local Dispatch' : '☐ Local Dispatch'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <Controller
          control={control}
          name="quantity"
          render={({ field: { onChange, value } }) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Quantity"
                keyboardType="numeric"
                onChangeText={onChange}
                value={value}
              />
              {errors.quantity && <Text style={styles.error}>{errors.quantity.message}</Text>}
            </View>
          )}
        />

        <TouchableOpacity style={styles.uploadButton} onPress={pickImages}>
          <Text style={styles.uploadButtonText}>Upload Images</Text>
        </TouchableOpacity>

        <View style={styles.imagePreviewContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {images.map((uri, index) => (
                    <View key={index} style={styles.imagePreview}>
                        <FastImage
                            source={{
                                uri,
                                priority: FastImage.priority.normal, // Set priority if needed
                            }}
                            style={styles.image}
                            resizeMode={FastImage.resizeMode.cover} // Use FastImage's resizeMode
                        />
                    </View>
                ))}
            </ScrollView>
        </View>

        <TouchableOpacity 
          style={[styles.submit, loading && styles.disabledButton]} 
          onPress={loading ? null : handleSubmit(onSubmit)}
          disabled={loading} >
          {loading ? (
            <Lottie source={require('../../assets/lottie/bouncing_check.json')} autoPlay loop style={styles.loadingIndicator} />
          ) : (
            <Text style={styles.submitText}>Submit</Text>
          )}
        </TouchableOpacity>

        {/* Success Modal */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Product Created Successfully!</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
    width: width - 40,
  },
  textArea: {
    height: 100,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  uploadButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5,
    // Optional: Add background color or border
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
},
imagePreview: {
    width: width * 0.3, // 30% of the screen width
    height: width * 0.3, // Maintain square aspect ratio
    marginRight: 10, // Space between images
    borderRadius: 8, // Optional: rounded corners
    overflow: 'hidden', // Ensures images do not overflow
},
image: {
    width: '100%', // Make the image fill the container
    height: '100%', // Maintain aspect ratio
    resizeMode: 'cover', // Cover the area without distortion
},
  submit: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  loadingIndicator: {
    width: 50,
    height: 50,
  },
  submitText: {
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxText: {
    fontSize: 16,
  },
});
