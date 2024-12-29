import * as React from "react";
import { TextInput, Alert, TouchableOpacity, ActivityIndicator, Dimensions, Animated,Platform, View } from "react-native";
import { StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker"; 
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser,validateReferralCode  } from '../../redux/actions/authentication'; 
import { FontSize, Color, Border } from "../../GlobalStyles";
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from "react-native-toast-message";
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure to install react-native-vector-icons

const { width, height } = Dimensions.get('window');
const baseWidth = 375; 
const baseHeight = 667; 

const scale = (size) => (width / baseWidth) * size;
const verticalScale = (size) => (height / baseHeight) * size;

const countryCodes = [
  { code: '+254', name: 'Kenya' },
  { code: '+255', name: 'Tanzania' },
  { code: '+256', name: 'Uganda' },
  { code: '+250', name: 'Rwanda' },
];

// Custom Input Component
const CustomInput = ({ icon, placeholder, value, onChangeText, secureTextEntry }) => (
  <View style={styles.inputContainer}>
    <Icon name={icon} size={20} color='green' style={styles.icon} />
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={Color.colorGray_100}
      secureTextEntry={secureTextEntry}
      accessibilityLabel={`${placeholder} Input`}
      accessibilityHint={`Enter your ${placeholder.toLowerCase()}`}
    />
  </View>
);

const RegisterPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [selectedCountryCode, setSelectedCountryCode] = React.useState(countryCodes[0].code);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [promoCode, setPromoCode] = React.useState('');
  const [showPromoCodeInput, setShowPromoCodeInput] = React.useState(false);
  const [promoCodeError, setPromoCodeError] = React.useState('');
  
  const referralCode = useSelector((state) => state.auth.selectedUser?.referralCode);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
 
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  React.useEffect(() => {
    if (error) {
      setPromoCodeError('Invalid referral code.');
    }
  }, [error]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateContact = (number) => {
    const phoneRegex = /^[0-9]{9}$/; 
    return phoneRegex.test(number);
  };

  const handleRegister = async () => {
    setErrorMessage('');
    setPromoCodeError('');
    
    if (!validateEmail(email)) {
      setErrorMessage('Invalid email address. Please enter a valid email.');
      return;
    }

    if (!validateContact(contact)) {
      setErrorMessage('Invalid phone number. Please enter a valid phone number.');
      return;
    }

    if (showPromoCodeInput && promoCode) {
      try {
        await dispatch(validateReferralCode(promoCode));
        // No need to check error here, handled in useEffect
        if (referralCode) {
          Toast.show({
            type: 'success',
            text1: 'Referral Code Valid!',
            text2: 'You have been awarded 500 points! 🎉',
          });
        }
      } catch (err) {
        setPromoCodeError('Error validating referral code. Please try again.');
        Alert.alert('Referral code validation failed:', err.message || 'Unknown error');
        return;
      }
    }
  
    try {
      await dispatch(registerUser({ name, email, password, contact: selectedCountryCode + contact }));
      Alert.alert('Registration Successful!', 'You can now log in to your account.');
      navigation.navigate('SignInPage');
    } catch (error) {
      setErrorMessage('Failed to register. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.registerPage}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.welcomeHeader}>GreenBin</Text>
        <View style={styles.header}>
          <CustomInput
            icon="user"
            placeholder="Username"
            value={name}
            onChangeText={setName}
          />
          <CustomInput
            icon="envelope"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            secureTextEntry={false}
          />
          <CustomInput
            icon="lock"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <View style={styles.phoneInput}>
            <Picker
              selectedValue={selectedCountryCode}
              style={styles.countryCodePicker}
              onValueChange={(itemValue) => setSelectedCountryCode(itemValue)}
            >
              {countryCodes.map((item) => (
                <Picker.Item key={item.code} label={item.code} value={item.code} />  
              ))}
            </Picker>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={contact}
              onChangeText={setContact}
              secureTextEntry={false}
            />
          </View>

          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          <TouchableOpacity
            onPress={() => setShowPromoCodeInput(!showPromoCodeInput)}
            accessibilityLabel="Promo Code Input"
            accessibilityHint="Press to enter referral code"
          >
            <Text style={styles.promoCodeText}>Have a referral Code?</Text>
          </TouchableOpacity>

          {showPromoCodeInput && (
            <View style={styles.promoCodeContainer}>
              <CustomInput
                icon="tag"
                placeholder="Referral Code"
                value={promoCode}
                onChangeText={setPromoCode}
              />
              {promoCodeError ? <Text style={styles.errorText}>{promoCodeError}</Text> : null}
            </View>
          )}

          <TouchableOpacity
            style={styles.getStartedBtn}
            onPress={handleRegister}
            disabled={loading}
            accessibilityLabel="Register Button"
            accessibilityHint="Press to register your account"
          >
            {loading ? (
              <ActivityIndicator 
                size="small" 
                color="#fff" 
                accessibilityLabel="Loading Registration" 
                accessibilityHint="Please wait while we register your account"
              />
            ) : (
              <Text style={styles.cardText}>Register</Text>
            )}
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  registerPage: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    justifyContent: "center",
    padding: scale(15),
  },
 
  welcomeHeader: {
    fontSize: scale(35),
    fontWeight: '900',
    color: 'green',
    position: 'absolute',
    top: scale(5),
    right: scale(15),
    zIndex: 1,
  },
  header: {
    marginBottom: verticalScale(20),
    top: verticalScale(110)
  },
  inputContainer: {
    justifyContent: "center",
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.005,
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    marginBottom: height * 0.02,
    marginHorizontal: '0.5%',
    borderRadius: 13,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: height * 0.052,
  },
 
  phoneInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Border.br_base,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'lightgray',
    height: scale(40)
  },
  icon: {
    marginTop: '2%',
    marginRight: '2%'
  },
  countryCodePicker: {
    width: scale(109), 
    fontSize: scale(FontSize.size_base),
    color: 'green',
    borderRadius: 14,
    ...Platform.select({
      ios: {
        backgroundColor: '#f2f2f2',
      },
      android: {
        backgroundColor: '#f2f2f2',
      },
    }),
  },
  input: {
    height: verticalScale(30), 
    borderRadius: Border.br_base,
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000',
    shadowRadius: 3,
    shadowOpacity: 0.25,
    padding: scale(8),
    fontSize: scale(14),
    color: 'gray',
  },

  promoCodeContainer: {
    marginTop: verticalScale(5),
  },
 
  promoCodeText: {
    fontSize: scale(12),
    color: 'green',
    fontWeight: 'bold',
    marginTop: scale(10)
  },
  getStartedBtn: {
    backgroundColor: 'green',
    borderRadius: Border.br_base,
    paddingVertical: verticalScale(8),
    alignItems: 'center',
    marginTop: verticalScale(15),
  },
  errorText: {
    color: 'red',
    fontSize: scale(12),
    marginTop: verticalScale(5),
  },
 
  cardText: {
    color: Color.colorWhite,
    fontSize: scale(14),
    fontWeight: 'bold',
  },
  
});

export default RegisterPage;
