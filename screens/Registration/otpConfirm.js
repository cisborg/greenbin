import * as React from "react";
import { TextInput, Alert, Animated, StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from 'react-redux';
import { verifyOtp } from '../../redux/actions/authActions'; // Adjust the import path as necessary
import { FontFamily, FontSize, Color } from "../../GlobalStyles";

const { width } = Dimensions.get('window');

const OTPConfirmScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch();
  const [otp, setOtp] = React.useState(['', '', '', '', '', '']);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [timer, setTimer] = React.useState(90); // 90 seconds for the timer
  const dotAnimation = React.useRef(new Animated.Value(0)).current;
  const inputRefs = Array.from({ length: 6 }, () => React.useRef(null));

  React.useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleConfirmOTP = async () => {
    const enteredOtp = otp.join('');
    
    if (enteredOtp.length === 6) {
      setLoading(true);
      try {
        const isVerified = await dispatch(verifyOtp(enteredOtp));
        
        if (isVerified) {
          Alert.alert('OTP Confirmed', 'Your OTP has been verified successfully!');
          navigation.navigate("Main");
        } else {
          setError('Incorrect OTP. Please try again.');
          setOtp(['', '', '', '', '', '']);
        }
      } catch (err) {
        setError('Failed to verify OTP. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      setError('Please enter a valid 6-digit OTP.');
    }
  };

  const handleResendOTP = () => {
    Alert.alert('Resend OTP', 'A new OTP has been sent to your registered phone number!');
    setOtp(['', '', '', '', '', '']);
    setError('');
    setTimer(90); // Reset the timer when resending OTP
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

    if (text && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  return (
    <View style={styles.otpContainer}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>We sent a 6-digit OTP to your registered phone number.</Text>
      <Text style={styles.timerText}>
        Your expiry token expires in {Math.floor(timer / 60)}m {timer % 60}s
      </Text>

      <View style={styles.otpInputContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            value={digit}
            onChangeText={(text) => handleInputChange(text, index)}
            keyboardType="numeric"
            maxLength={1}
            ref={inputRefs[index]}
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
    width: '100%',
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
  timerText: {
    fontSize: FontSize.size_base,
    color: 'red',
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
    width: '14%',
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
    width: '100%',
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
