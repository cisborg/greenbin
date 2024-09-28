import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, SafeAreaView,Platform, StatusBar } from 'react-native';
import { Color } from '../../GlobalStyles';
import { useNavigation } from '@react-navigation/core';

const LegalScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.header}>Terms and Conditions</Text>
                
                <Text style={styles.sectionTitle}>1. Introduction</Text>
                <Text style={styles.sectionText}>
                    Welcome to <Text style={{color: Color.colorLimegreen_200}}>GreenBin</Text>, a platform dedicated to promoting eco-friendly practices and community engagement in the green circular economy.
                </Text>

                <Text style={styles.sectionTitle}>2. User Eligibility</Text>
                <Text style={styles.sectionText}>
                    Users must be at least 13 years old to use this app. By using our services, you confirm that you meet this age requirement.
                </Text>

                <Text style={styles.sectionTitle}>3. User Accounts</Text>
                <Text style={styles.sectionText}>
                    Users are required to create an account to access certain features. You are responsible for maintaining the confidentiality of your account information.
                </Text>

                <Text style={styles.sectionTitle}>4. User Conduct</Text>
                <Text style={styles.sectionText}>
                    Users must engage respectfully and constructively. Harassment, hate speech, or any form of abusive behavior is prohibited.
                </Text>

                <Text style={styles.sectionTitle}>5. Content Ownership</Text>
                <Text style={styles.sectionText}>
                    You retain ownership of the content you create but grant us a non-exclusive license to use it for promotional purposes.
                </Text>

                <Text style={styles.sectionTitle}>6. Intellectual Property</Text>
                <Text style={styles.sectionText}>
                    All content, logos, and trademarks associated with GreenBin are protected by intellectual property laws.
                </Text>

                <Text style={styles.sectionTitle}>7. Dispute Resolution</Text>
                <Text style={styles.sectionText}>
                    Any disputes will be resolved through binding arbitration in accordance with the laws of Nature Diversity Jurisdiction.
                </Text>

                <Text style={styles.sectionTitle}>8. Limitation of Liability</Text>
                <Text style={styles.sectionText}>
                    GreenBin is not liable for any indirect, incidental, or consequential damages arising from your use of the app.
                </Text>

                <Text style={styles.sectionTitle}>9. Changes to Terms</Text>
                <Text style={styles.sectionText}>
                    We reserve the right to modify these terms at any time. Users will be notified of significant changes.
                </Text>

                <Text style={styles.sectionTitle}>10. Governing Law</Text>
                <Text style={styles.sectionText}>
                    These terms are governed by the laws of Nature Diversity Jurisdiction.
                </Text>

                <View style={styles.divider} />

                <Text style={styles.header}>Privacy Policy</Text>
                
                <Text style={styles.sectionTitle}>1. Information Collection</Text>
                <Text style={styles.sectionText}>
                    We collect personal information such as your name, email address, and location when you register or participate in activities.
                </Text>

                <Text style={styles.sectionTitle}>2. Use of Information</Text>
                <Text style={styles.sectionText}>
                    Your information is used to enhance user experience, send notifications, and improve our services.
                </Text>

                <Text style={styles.sectionTitle}>3. Data Sharing</Text>
                <Text style={styles.sectionText}>
                    We may share your information with trusted third parties for analytics and service improvement, but we do not sell your data.
                </Text>

                <Text style={styles.sectionTitle}>4. Data Security</Text>
                <Text style={styles.sectionText}>
                    We implement industry-standard security measures to protect your personal information.
                </Text>

                <Text style={styles.sectionTitle}>5. User Rights</Text>
                <Text style={styles.sectionText}>
                    You have the right to access, correct, or delete your personal information at any time.
                </Text>

                <Text style={styles.sectionTitle}>6. Cookies and Tracking Technologies</Text>
                <Text style={styles.sectionText}>
                    We use cookies to enhance your experience and analyze app usage.
                </Text>

                <Text style={styles.sectionTitle}>7. Children’s Privacy</Text>
                <Text style={styles.sectionText}>
                    We do not knowingly collect information from children under 13. If we discover such information, we will delete it promptly.
                </Text>

                <Text style={styles.sectionTitle}>8. Changes to Privacy Policy</Text>
                <Text style={styles.sectionText}>
                    Users will be notified of any changes to this policy.
                </Text>

                <View style={styles.divider} />

                <Text style={styles.header}>Review Guidelines</Text>
                
                <Text style={styles.sectionTitle}>1. Purpose of Reviews</Text>
                <Text style={styles.sectionText}>
                    Reviews help foster community engagement and provide valuable feedback on eco-friendly practices.
                </Text>

                <Text style={styles.sectionTitle}>2. Review Submission</Text>
                <Text style={styles.sectionText}>
                    Users can submit reviews through the app, including a title, content, and rating.
                </Text>

                <Text style={styles.sectionTitle}>3. Content Guidelines</Text>
                <Text style={styles.sectionText}>
                    Reviews must be respectful, constructive, and relevant. Offensive language, spam, or irrelevant content will not be tolerated.
                </Text>

                <Text style={styles.sectionTitle}>4. Moderation Policy</Text>
                <Text style={styles.sectionText}>
                    All reviews are subject to moderation. We reserve the right to remove any review that violates our guidelines.
                </Text>

                <Text style={styles.sectionTitle}>5. User Responsibility</Text>
                <Text style={styles.sectionText}>
                    Users are responsible for the content they submit and should only post honest feedback.
                </Text>

                <Text style={styles.sectionTitle}>6. Incentives for Reviews</Text>
                <Text style={styles.sectionText}>
                    Users may receive points or badges for submitting reviews, encouraging community participation.
                </Text>

                <Text style={styles.sectionTitle}>7. Dispute Resolution</Text>
                <Text style={styles.sectionText}>
                    Users can report inappropriate reviews or disputes through the app's reporting feature.
                </Text>

                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Agree and Continue</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.colorWhite,
        paddingTop: Platform.OS === 'android'? StatusBar.currentHeight : 0,
        padding: 20,
        overflow: 'hidden',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 15,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#34495e',
        marginTop: 15,
    },
    sectionText: {
        fontSize: 16,
        color: '#7f8c8d',
        lineHeight: 24,
        marginVertical: 5,
    },
    divider: {
        height: 1,
        backgroundColor: '#bdc3c7',
        marginVertical: 20,
    },
    button: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 10,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 4,
        margin: 10,
        marginTop: 15,
        width: 220,
        maxHeight: 40,
        left: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: Color.colorLimegreen_200,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default LegalScreen;
