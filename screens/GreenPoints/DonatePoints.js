import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Share,
  Switch,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Lottie from "lottie-react-native";
import { useDispatch, useSelector } from "react-redux";
import { createDonation } from "../../redux/actions/donations";
import { Color } from "../../GlobalStyles";

const { width, height } = Dimensions.get("window");

const donationCategories = [
  {
    id: "1",
    name: "Tree Planting",
    impact: "1000 points = 1 tree planted",
    pointsRequired: 1000,
  },
  {
    id: "2",
    name: "Waste Management",
    impact: "20000 points = 1 community clean-up",
    pointsRequired: 20000,
  },
  {
    id: "3",
    name: "Community Support",
    impact: "5500 points = support for 1 individual",
    pointsRequired: 5500,
  },
];

const DonatePoints = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    userPoints,
    totalAmountDonated,
    currentDonation,
    currentTier,
    loading,
  } = useSelector((state) => state.donation);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [donationAmount, setDonationAmount] = useState(100);
  const [isRecurring, setIsRecurring] = useState(false);
  const [donateLoading, setDonateLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const getTotalPointsRequired = () => {
    return selectedCategories.reduce(
      (total, category) => total + category.pointsRequired,
      0
    );
  };

  const handleDonation = () => {
    const totalPointsRequired = getTotalPointsRequired();

    if (selectedCategories.length === 0) {
      Alert.alert("Error", "Please select at least one donation category.");
      return;
    }

    if (donationAmount < totalPointsRequired) {
      Alert.alert(
        "Error",
        `Please donate at least ${totalPointsRequired} points for the selected categories.`
      );
      return;
    }

    setDonateLoading(true);
    const donationData = {
      amount: donationAmount,
      categories: selectedCategories,
    };

    dispatch(createDonation(donationData));
    setTimeout(() => {
      setDonateLoading(false);
      navigation.navigate("donationConfirmed");
    }, 2000);
  };

  const shareDonation = () => {
    const totalPointsRequired = getTotalPointsRequired();
    if (donationAmount < totalPointsRequired) {
      Alert.alert(
        "Error",
        `Please donate at least ${totalPointsRequired} points to share.`
      );
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const categories = selectedCategories.map((cat) => cat.name).join(", ");
      Share.share({
        message: `I just donated ${donationAmount} points for ${categories}! Join me in making a difference!`,
      });
    }, 2000);
  };

  const handleSelectCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat.id !== category.id)
      );
    } else {
      if (selectedCategories.length >= 3) {
        Alert.alert("Error", "You can donate to a maximum of 3 categories.");
      } else {
        setSelectedCategories([...selectedCategories, category]);
      }
    }
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategories.some((cat) => cat.id === item.id) &&
          styles.selectedCategory,
      ]}
      onPress={() => handleSelectCategory(item)}
    >
      <Text style={styles.categoryName}>{item.name}</Text>
      <Text style={styles.categoryImpact}>{item.impact}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Lottie
            source={require("../../assets/lottie/rotatingBalls.json")}
            autoPlay
            loop
            style={styles.loadingAnimation}
          />
        </View>
      ) : (
        <>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={22} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.header}>Donate Points</Text>
          </View>

          <Text style={styles.description}>
            Choose a category to donate your points and see the impact of your
            generosity.
          </Text>

          <FlatList
            data={donationCategories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            style={styles.categoryList}
          />

          <Text style={styles.sliderLabel}>
            Donation Amount: {donationAmount} points
          </Text>
          <Slider
            minimumValue={100}
            maximumValue={1000000}
            step={250}
            value={donationAmount}
            onValueChange={setDonationAmount}
            style={styles.slider}
          />

          <TouchableOpacity
            style={styles.donateButton}
            onPress={handleDonation}
            disabled={donateLoading}
          >
            {donateLoading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Donate Now</Text>
            )}
          </TouchableOpacity>

          {selectedCategories.length > 0 && (
            <View style={styles.impactVisualization}>
              <Text style={styles.impactText}>
                You are donating {donationAmount} points for{" "}
                {selectedCategories.map((cat) => cat.name).join(", ")}.
              </Text>
              <Text style={styles.impactText}>
                Total points required: {getTotalPointsRequired()}.
              </Text>
              <Text style={styles.impactText}>
                Total amount donated so far: {totalAmountDonated}.
              </Text>
              {currentTier && (
                <Text style={styles.impactText1}>
                  And you have been awarded {currentTier} Tier!
                </Text>
              )}
            </View>
          )}

          <TouchableOpacity style={styles.shareButton} onPress={shareDonation}>
            <Text style={styles.buttonText}>Share My Donation</Text>
          </TouchableOpacity>

          <View style={styles.recurringContainer}>
            <Text style={styles.recurringText}>Enable Recurring Donations</Text>
            <Switch
              value={isRecurring}
              onValueChange={() => setIsRecurring(!isRecurring)}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isRecurring ? "#f5dd4b" : "#f4f3f4"}
            />
          </View>

          {isRecurring && (
            <View style={styles.recurringInfo}>
              <Text style={styles.recurringText}>
                Recurring donations will be processed monthly.
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: width * 0.03, // Reduced padding
    justifyContent: "flex-start",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.015, // Reduced margin
    backgroundColor: "#4CAF50",
    padding: height * 0.015, // Reduced padding
    borderRadius: 10, // Reduced border radius
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingAnimation: {
    width: 100, // Adjust width as needed
    height: 100, // Adjust height as needed
  },
  header: {
    fontSize: width * 0.045, // Reduced font size
    fontWeight: "bold",
    marginLeft: 15, // Reduced margin
    color: "#FFF",
  },
  description: {
    fontSize: width * 0.035, // Reduced font size
    marginBottom: height * 0.015, // Reduced margin
    color: "#333",
  },
  categoryList: {
    marginBottom: height * 0.015, // Reduced margin
    maxHeight: height * 0.25,
  },
  categoryItem: {
    padding: height * 0.015, // Reduced padding
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 14, // Reduced border radius
    marginBottom: height * 0.005, // Reduced margin
    backgroundColor: "#fff",
  },
  selectedCategory: {
    borderColor: "#4CAF50",
    backgroundColor: "#e8f5e9",
  },
  categoryName: {
    fontSize: width * 0.04, // Reduced font size
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: width * 0.035, // Reduced font size
    fontWeight: "600",
    color: "black",
  },
  categoryImpact: {
    fontSize: width * 0.03, // Reduced font size
    color: "#555",
  },
  sliderLabel: {
    fontSize: width * 0.035, // Reduced font size
    marginVertical: height * 0.005, // Reduced margin
  },
  slider: {
    width: "100%",
    height: 30, // Reduced height
    marginBottom: height * 0.015, // Reduced margin
  },
  donateButton: {
    backgroundColor: "#4CAF50",
    padding: height * 0.01, // Reduced padding
    borderRadius: 14, // Reduced border radius
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * 0.005, // Reduced margin
  },
  shareButton: {
    backgroundColor: "#2196F3",
    padding: height * 0.01, // Reduced padding
    borderRadius: 14, // Reduced border radius
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * 0.005, // Reduced margin
    marginTop: height * 0.015, // Reduced margin
  },
  impactVisualization: {
    marginTop: height * 0.015, // Reduced margin
    padding: height * 0.015, // Reduced padding
    borderColor: "#4CAF50",
    borderWidth: 1,
    borderRadius: 12, // Reduced border radius
    backgroundColor: "#e8f5e9",
  },
  impactText: {
    fontSize: width * 0.035, // Reduced font size
    color: "#333",
  },
  impactText1: {
    fontSize: width * 0.03, // Reduced font size
    color: "orange",
  },
  recurringContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: height * 0.015, // Reduced margin
  },
  recurringText: {
    fontSize: width * 0.035, // Reduced font size
    color: "#333",
  },
  recurringInfo: {
    marginTop: height * 0.005, // Reduced margin
    padding: height * 0.015, // Reduced padding
    borderColor: "#FFC107",
    borderWidth: 1,
    borderRadius: 12, // Reduced border radius
    backgroundColor: "#fff3cd",
  },
  activityIndicator: {
    marginTop: height * 0.015, // Reduced margin
  },
});

export default DonatePoints;
