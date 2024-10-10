import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity,Platform, StyleSheet, ScrollView, Animated, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const FAQScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [selectedTab, setSelectedTab] = useState('Squads');
  const [expandedIndex, setExpandedIndex] = useState(null);
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const renderFAQDescription = (index) => {
    const answers = {
      Squads: [
        "You can join a squad through the app by selecting 'Join Squad' in the Squad section.",
        "Yes, you can create your own squad by going to the 'Create Squad' section.",
        "Benefits include exclusive offers and rewards ,including ranking and actvities procurement for squad members.",
        "You can leave a squad by selecting 'Leave Squad' in your squad settings.",
        "Yes, you can switch squads, but it may affect your accumulated points.",
        "Squad points are calculated based on participation and activity and purchases of each user within the squad."
      ],
      Greenpoints: [
        "Greenpoints are rewards you earn for eco-friendly actions i.e purchase,activities and donations}.",
        "You can earn Greenpoints by making sustainable purchases,donations(donation bonus) and participating in events.",
        "Yes, you can convert Greenpoints to cash through the app's withdrawal section.",
        "Greenpoints expire after  2 months of inactivity on your account.",
        "Yes, you can transfer Greenpoints to another user through the app and outside the app by going to send points/transfer .",
        "You can redeem Greenpoints by  exchanging to cash -- go to GreenBank section and select withdraw/transfer or you can redeem more products.",
        "Yes, there is a little fees on deposits 10% for saving to your greenBank and 2% for each deposit  for using Greenpoints.",
        "You can earn Greenpoints by referring friends who sign up for the app.",
        "You can use Greenpoints for discounts, vouchers and donation bonuses  on eco-friendly products and services even outside the app!",
        "You can check your Greenpoints balance in your GCPs profile section."
      ],
     
      'Bundle Packages': [
        "Bundle packages are pre-defined green health/Ecogreen plans offered at discounted/voucher rates.",
        "You can subscribe to bundle packages in the app under 'Bundle Packages' and smartHealth section",
        "Yes, you can customize your bundle package based on your needs.",
        "Yes, we offer discounts for long-term bundle subscriptions narrowing down on green health plans",
        "You can change your bundle once per billing cycle.",
        "If you exceed your bundle limit, additional charges may apply.",
        "You can check your bundle status in your GCPs account settings.",
        "Yes, bundle packages are available for all users."
      ],
      'GCP Calculator': [
        "GCP stands for Green Carbon Points, a measure of your eco-friendly actions tokenization.",
        "GCP calculator logs output percentage threshold of average activities , donations bonuses and average points on  purchases and generates leaderboard.",
        "The GCP calculator uses algorithms  based on your activities, donations and logs of purchases that it uses to track and monitor in realtime to provide an estimate percentage per month quota.",
        "Yes, the GCP calculations are tracked and stored in bar-graph monthly for future reference.",
        "Factors include consistency in purchases , donations and  frequency of eco-friendly actions you take.",
        "You can compare your GCP score with friends through the leaderboards section.",
        "To improve your GCP score, increase your participation in eco-friendly activities,donations, and purchases.",
        "Yes, we offer rewards for achieving high GCP scores during monthly promotional periods."
      ],
      'Eco-Friendly Practices': [
        "Tips include reducing waste, recycling, and using sustainable products.",
        "To reduce your carbon footprint, consider walking, biking, or using public transport.",
        "You can find eco-friendly products in our marketplace section of the app.",
        "Recycle correctly by following local guidelines and separating materials.",
        "Using eco-friendly products helps reduce environmental impact and promotes sustainability.",
        "Support local businesses by shopping at farmer's markets and eco-friendly stores.",
        "Reducing plastic use helps protect marine life and reduces landfill waste.",
        "Participate in local events by checking our community section for updates.",
        "Easy habits include using reusable bags, conserving water, and composting.",
        "Educate others by sharing information and leading by example in your community."
      ],
      'App Features': [
        "The app offers features like data tracking,product and services, maturated token bundles, rewards, and community engagement.",
        "You can navigate the app using the bottom navigation menu.Workflow from registration, to squads to purchases and environmental participation to withdrawal of points as cash",
        "Yes, you can customize your profile by adding your interests and goals.",
        "You will receive notifications for events and new offers in the app.",
        "Yes, there are squad hubspots for discussions, sharing experiences, ecofriendly workshops and innovations oriented! You'll love it.",
        "To report a problem, go to the support section and submit a ticket report to either gmail, calls, or whatsapp and other socials.",
        "You can reset your password by selecting 'Forgot Password' on the login screen.",
        "Yes, there are tutorials available in the help section of the app though the app navigations are seamless and easy-go-through",
        "You can provide feedback in the green connect section settings under 'Rate Us'.",
        "Yes, your data is secure and encrypted within the app. We recommend you enable two authentication strategy for more security of your funds and your reputation.Read our app developer policies on matters of data infringement!"
      ],
      'Rewards and Incentives': [
        "You can earn rewards(ecogreen tiers ) for completing eco-friendly actions and participating in events donation bonuses/tiers and aggregated tiers on purchases.",
        "Donation  bonuses are given in credit category based modules  which you earn bronze, diamond, gold, silver.",
        "Yes, we have seasonal promotions that offer extra rewards.",
        "Yes, you can donate your rewards to partnered environmental charities.",
        "Eligibility criteria include active participation in eco-friendly actions,number of donation bonuses and aggregate points on purchases",
        "To redeem rewards, nature diversity will give you a call you go pick your packaged reward(s).",
        "Yes, there may be limits on how many rewards you can redeem at once.",
        "You can combine rewards with other offers during special promotions.",
        "If you don’t use your rewards in time, they may expire based on our policy."
      ]
    };

    return answers[selectedTab][index];
  };

  const faqData = {
    Squads: [
      'How do I join a squad?',
      'Can I create my own squad?',
      'What are the benefits of being in a squad?',
      'How do I leave a squad?',
      'Can I switch squads?',
      'How are squad points calculated?'
    ],
    Greenpoints: [
      'What are Greenpoints?',
      'How to earn Greenpoints?',
      'Can I convert Greenpoints to cash?',
      'Do Greenpoints expire?',
      'Can I transfer Greenpoints to another user?',
      'How do I redeem Greenpoints?',
      'Are there any fees for using Greenpoints?',
      'Can I earn Greenpoints through referrals?',
      'What can I buy with Greenpoints?',
      'How do I check my Greenpoints balance?'
    ],
    
    'Bundle Packages': [
      'What are bundle packages?',
      'How to subscribe to bundle packages?',
      'Can I customize my bundle package?',
      'Are there any discounts for bundle packages?',
      'How often can I change my bundle?',
      'What happens if I exceed my bundle limit?',
      'How do I check my bundle status?',
      'Are bundle packages available for all users?'
    ],
    'GCP Calculator': [
      'What is GCP?',
      'How does the GCP calculator work?',
      'How accurate is the GCP calculator?',
      'Can we save  GCP calculations?',
      'What factors influence our GCP Calculator percentage score?',
      'Can I compare my GCP score with others?',
      'How do We improve our GCP score?',
      'Are there any rewards for achieving a high GCP score?'
    ],
    'Eco-Friendly Practices': [
      'What are some tips for living sustainably?',
      'How can I reduce my carbon footprint?',
      'What types of eco-friendly products can I find?',
      'How do I recycle correctly?',
      'What are the benefits of using eco-friendly products?',
      'How can I support local eco-friendly businesses?',
      'What is the importance of reducing plastic use?',
      'How can I participate in local environmental events?',
      'What are some easy eco-friendly habits to adopt?',
      'How can I educate others about sustainability?'
    ],
    'App Features': [
      'What features does the app offer?',
      'How do I navigate the app?',
      'Can I customize my user profile?',
      'How do I receive notifications about eco-friendly events?',
      'Is there a community section in the app?',
      'How do I report a problem with the app?',
      'What should I do if I forget my password?',
      'Are there tutorials available for using the app?',
      'How can I provide feedback about the app?',
      'Is my data secure within the app?'
    ],
    'Rewards and Incentives': [
      'What rewards can I earn for eco-friendly actions?',
      'How do donation bonuses work?',
      'Are there seasonal promotions for rewards?',
      'Can I donate my rewards to charity?',
      'What are the eligibility criteria for rewards?',
      'How do I redeem my rewards?',
      'Are there any limits on rewards redemption?',
      'Can I combine rewards with other offers?',
      'What happens if I don’t use my rewards in time?'
    ],
  };

  const scrollTo = (direction) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: direction === 'right' ? 100 : -100,
        animated: true,
      });
    }
  };

  return (
    <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQ</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => scrollTo('left')}>
          <Ionicons name="chevron-back" size={22} color="#00FF00" />
        </TouchableOpacity>

        <ScrollView
          horizontal
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
        >
          {Object.keys(faqData).map((tab, index) => (
            <TouchableOpacity key={index} onPress={() => setSelectedTab(tab)} style={styles.tab}>
              <Text style={styles.tabText}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity onPress={() => scrollTo('right')}>
          <Ionicons name="chevron-forward" size={22} color="#00FF00" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.faqContainer}>
        {faqData[selectedTab].map((question, index) => (
          <View key={index} style={styles.faqItem}>
            <TouchableOpacity onPress={() => toggleExpand(index)} style={styles.questionContainer}>
              <Text style={styles.question}>{question}</Text>
              <Ionicons 
                name={expandedIndex === index ? "remove" : "add"} 
                size={20} 
                color="#4CAF50" 
              />
            </TouchableOpacity>
            {expandedIndex === index && (
              <Text style={styles.answer}>{renderFAQDescription(index)}</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android'? StatusBar.currentHeight : 0,

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    margin:10
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  scrollView: {
    flexGrow: 0,
  },
  tab: {
    padding: 10,
  },
  tabText: {
    fontSize: 16,
    color: '#4CAF50',
  },
  faqContainer: {
    padding: 16,
  },
  faqItem: {
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    elevation: 1,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
  },
  answer: {
    marginTop: 5,
    fontSize: 14,
    color: '#555',
  },
});

export default FAQScreen;
