import * as React from "react";
import { TextInput, Alert, Animated, StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color } from "../../GlobalStyles";

const { width } = Dimensions.get('window'); // Get screen width

const OTPConfirmScreen = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = React.useState(['', '', '', '', '', '']);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const dotAnimation = React.useRef(new Animated.Value(0)).current;

  // Create refs for each input
  const inputRefs = Array.from({ length: 6 }, () => React.useRef(null));

  const handleConfirmOTP = () => {
    const enteredOtp = otp.join('');
    
    if (enteredOtp.length === 6) {
      if (enteredOtp === '123456') { // Replace with actual OTP verification logic
        setLoading(true);
        const startAnimation = () => {
          dotAnimation.setValue(0);
          Animated.loop(
            Animated.sequence([
              Animated.timing(dotAnimation, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false,
              }),
              Animated.timing(dotAnimation, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false,
              }),
            ]),
            { iterations: 3 }
          ).start(() => {
            Alert.alert('OTP Confirmed', 'Your OTP has been verified successfully!');
            navigation.navigate("SignInPage"); // Navigate to the sign-in page after confirmation
          });
        };

        startAnimation();
      } else {
        setError('Incorrect OTP. Please try again.');
        setOtp(['', '', '', '', '', '']); // Clear the OTP input
      }
    } else {
      setError('Please enter a valid 6-digit OTP.');
    }
  };

  const handleResendOTP = () => {
    // Logic to generate and send a new OTP
    Alert.alert('Resend OTP', 'A new OTP has been sent to your registered phone number!');
    setOtp(['', '', '', '', '', '']); // Clear the OTP input
    setError('');
  };

  const renderDots = () => {
    const dotStyle = {
      opacity: dotAnimation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.5, 1, 0.5],
      }),
    };

    return (
      <View style={styles.dotsContainer}>
        <Animated.View style={[styles.dot, dotStyle]} />
        <Animated.View style={[styles.dot, { opacity: dotStyle.opacity }]} />
        <Animated.View style={[styles.dot, dotStyle]} />
      </View>
    );
  };

  const handleInputChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to the next input box
    if (text && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  return (
    <View style={styles.otpContainer}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>We sent a 6-digit OTP to your registered phone number.</Text>

      <View style={styles.otpInputContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            value={digit}
            onChangeText={(text) => handleInputChange(text, index)}
            keyboardType="numeric"
            maxLength={1}
            ref={inputRefs[index]} // Use ref here
          />
        ))}
      </View>

      {loading ? renderDots() : (
        <>
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOTP}>
            <Text style={styles.buttonText}>Confirm OTP</Text>
          </TouchableOpacity>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </>
      )}

      <TouchableOpacity style={styles.resendContainer} onPress={handleResendOTP}>
        <Text style={styles.resendText}>Resend OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: Color.colorWhite,
    width: '100%', // Responsive width
  },
  title: {
    fontSize: FontSize.size_29xl,
    fontFamily: FontFamily.poppinsBold,
    color: Color.colorLimegreen_200,
    marginBottom: 10,
    position: 'absolute',
    top: 40,
  },
  subtitle: {
    fontSize: FontSize.size_base,
    color: Color.colorGray_600,
    textAlign: 'center',
    marginBottom: 20,
  },
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  otpInput: {
    height: 50,
    width: '14%', // Responsive width
    backgroundColor: Color.colorWhite,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 14,
    textAlign: 'center',
    fontSize: FontSize.size_base,
  },
  confirmButton: {
    backgroundColor: Color.colorLimegreen_200,
    borderRadius: 18,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: '100%', // Responsive width
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontWeight: 'bold',
    fontSize: 18,
  },
  resendContainer: {
    marginTop: 20,
  },
  resendText: {
    fontSize: FontSize.size_base,
    color: Color.colorLimegreen_200,
    textDecorationLine: 'underline',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'orange',
    marginHorizontal: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default OTPConfirmScreen;
