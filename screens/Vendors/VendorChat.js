import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import EmojiSelector from 'react-native-emoji-selector';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import * as Audio from 'expo-av';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import {
    sendMessage as sendMessageAction,
    attachFile as attachFileAction,
    setOnlineStatus as setOnlineStatusAction,
    receiveMessage as receiveMessageAction, // If needed
} from '../../redux/actions/chats'; // Adjust the path as necessary

const ChatScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { userName } = route.params;
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.chat.messages); // Access messages from Redux state
    const currentUser = 'You';

    const [inputMessage, setInputMessage] = useState('');
    const [quotedMessage, setQuotedMessage] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [recording, setRecording] = useState(null);
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        dispatch(setOnlineStatusAction(currentUser, true)); // Set online status when component mounts

        return () => {
            dispatch(setOnlineStatusAction(currentUser, false)); // Set offline status when component unmounts
        };
    }, [dispatch, currentUser]);

    const sendMessage = () => {
        if (inputMessage.trim() !== '') {
            const newMessage = {
                id: Date.now(),
                text: inputMessage,
                timestamp: new Date(),
                sender: currentUser,
                read: false,
                dateSignature: new Date().toLocaleDateString(),
            };
            dispatch(sendMessageAction(newMessage)); // Dispatch the action
            setInputMessage('');
            setQuotedMessage(null);
        }
    };

    const handleFileAttachment = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({});
            if (result.type === 'success') {
                dispatch(attachFileAction(route.params.chatId, result)); // Dispatch attach file action
                alert(`File Selected: ${result.name}`);
            }
        } catch (err) {
            console.log('Error picking file:', err);
        }
    };

    const deleteMessage = (messageId) => {
        // Implement delete logic if needed
    };

    const forwardMessage = (message) => {
        Alert.alert(
            "Forward Message",
            `Forward "${message.text}" to other users?`,
            [
                { text: "Cancel", style: "cancel" },
                { text: "Forward", onPress: () => alert(`Message forwarded: "${message.text}"`) },
            ]
        );
    };

    const quoteMessage = (message) => {
        setQuotedMessage(message);
    };

    const renderRightActions = (message) => (
        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteMessage(message.id)}>
            <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
    );

    const renderLeftActions = (message) => (
        <TouchableOpacity style={styles.quoteButton} onPress={() => quoteMessage(message)}>
            <Text style={styles.quoteButtonText}>Quote</Text>
        </TouchableOpacity>
    );

    const renderMessageItem = ({ item, index }) => {
        const showDateSignature = index === 0 || 
            new Date(item.timestamp).toLocaleDateString() !== new Date(messages[index - 1].timestamp).toLocaleDateString();

        return (
            <View>
                {showDateSignature && (
                    <Text style={styles.dateSignature}>{item.dateSignature || new Date(item.timestamp).toLocaleDateString()}</Text>
                )}
                <Swipeable
                    renderRightActions={() => renderRightActions(item)}
                    renderLeftActions={() => renderLeftActions(item)}
                >
                    <View
                        style={[
                            styles.messageContainer,
                            item.sender === currentUser ? styles.myMessage : styles.otherMessage,
                        ]}
                    >
                        <Text style={styles.messageSender}>{item.sender}</Text>
                        
                        {item.quotedMessage && (
                            <View style={[
                                styles.quotedMessage,
                                { backgroundColor: item.sender === currentUser ? '#f0f0f0' : '#d5f5d2' },
                            ]}>
                                <Text style={styles.quotedMessageText}>
                                    {item.quotedMessage.sender}: {item.quotedMessage.text}
                                </Text>
                            </View>
                        )}

                        {item.voiceNoteUri ? (
                            <TouchableOpacity onPress={() => playVoiceNote(item.voiceNoteUri)}>
                                <Text style={styles.voiceNoteText}>🎤 Voice Note</Text>
                            </TouchableOpacity>
                        ) : (
                            <Text style={styles.messageText}>{item.text}</Text>
                        )}
                        
                        <Text style={styles.messageTimestamp}>
                            {item.timestamp.toLocaleTimeString()}
                            {item.sender === currentUser && (
                                <View style={styles.receiptContainer}>
                                    <Text style={styles.receiptText}>{item.read ? '✓✓' : '✓'}</Text>
                                </View>
                            )}
                        </Text>
                    </View>
                </Swipeable>
            </View>
        );
    };

    const playVoiceNote = async (uri) => {
        try {
            const { sound } = await Audio.Sound.createAsync({ uri });
            await sound.playAsync();
        } catch (error) {
            console.error("Error playing voice note:", error);
        }
    };

    const startRecording = async () => {
        try {
            const permission = await Audio.requestPermissionsAsync();
            if (permission.granted) {
                await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
                const { recording } = await Audio.Recording.createAsync(
                    Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
                );
                setRecording(recording);
            } else {
                alert('Permission to access microphone is required!');
            }
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    };

    const stopRecording = async () => {
        if (recording) {
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            const newMessage = {
                id: Date.now(),
                text: '',
                timestamp: new Date(),
                sender: currentUser,
                read: false,
                voiceNoteUri: uri,
                dateSignature: new Date().toLocaleDateString(),
            };
            dispatch(sendMessageAction(newMessage)); // Dispatch the action for voice note
            alert('Voice note recorded: ' + uri);
            setRecording(null);
        }
    };

    return (
        <GestureHandlerRootView style={styles.safeAreaView}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.headerInfo}>
                    <Text style={styles.headerTitle}>{userName}</Text>
                    <Text style={styles.headerSubtitle}>
                        {isOnline ? 'Online' : `Last seen: ${new Date().toLocaleTimeString()}`}
                    </Text>
                </View>
                <TouchableOpacity style={styles.voiceCallButton}>
                    <Ionicons name="call" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.moreButton}>
                    <MaterialIcons name="more-vert" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {quotedMessage && (
                <View style={styles.quotedMessageAboveInput}>
                    <Text style={styles.quotedMessageText}>
                        Replying to {quotedMessage.sender}: {quotedMessage.text}
                    </Text>
                </View>
            )}

            <FlashList
                data={messages}
                renderItem={renderMessageItem}
                keyExtractor={(item) => item.id.toString()}
                estimatedItemSize={50}
                style={styles.messagesList}
            />

            {showEmojiPicker && (
                <EmojiSelector
                    onEmojiSelected={(emoji) => setInputMessage((prev) => prev + emoji)}
                    columns={8}
                />
            )}

            <View style={styles.inputContainer}>
                <TouchableOpacity onPress={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <FontAwesome name="smile-o" size={24} color="gray" />
                </TouchableOpacity>

                <TextInput
                    style={styles.input}
                    placeholder="Type a message"
                    value={inputMessage}
                    onChangeText={setInputMessage}
                />

                <TouchableOpacity onPress={handleFileAttachment}>
                    <Ionicons name="attach" size={24} color="gray" />
                </TouchableOpacity>

                {inputMessage.trim() !== '' ? (
                    <TouchableOpacity onPress={sendMessage}>
                        <Ionicons name="send" size={24} color="#25D366" />
                    </TouchableOpacity>
                ) : recording ? (
                    <TouchableOpacity onPress={stopRecording}>
                        <Ionicons name="mic-off" size={24} color="red" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={startRecording}>
                        <Ionicons name="mic" size={24} color="gray" />
                    </TouchableOpacity>
                )}
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#075E54',
  },
  backButton: {
    marginLeft: 10,
  },
  quotedMessage: {
    padding: 8,
    borderRadius: 8,
    marginBottom: 5,
  },
  quotedMessageText: {
    color: '#555', // Adjust text color as needed
    fontStyle: 'italic',
  },
  headerInfo: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 10,
  },
  voiceNoteText: {
    color: '#007AFF',
    fontSize: 16,
    marginVertical: 5,
  },
  receiptText: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 5,
  },
  dateSignature: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
    marginVertical: 5,
  },
  headerTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'white',
  },
  voiceCallButton: {
    marginRight: 20,
  },
  moreButton: {
    marginRight: 10,
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageContainer: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
  },
  messageSender: {
    fontWeight: 'bold',
  },
  quotedMessage: {
    borderLeftColor: '#ccc',
    borderLeftWidth: 2,
    paddingLeft: 5,
    marginBottom: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  quotedMessageText: {
    fontStyle: 'italic',
  },
  messageText: {
    marginVertical: 5,
  },
  messageTimestamp: {
    fontSize: 10,
    color: '#999',
  },
  receiptContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'grey',
    marginLeft: 5,
  },
  greenDotsContainer: {
    flexDirection: 'row',
    marginLeft: 5,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'green',
    marginLeft: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
  quotedMessageAboveInput: {
    padding: 5,
    backgroundColor: '#e6e6e6',
    borderRadius: 5,
    marginBottom: 5,
  },
  quotedMessageText: {
    fontStyle: 'italic',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
  quoteButton: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderRadius: 5,
  },
  quoteButtonText: {
    color: 'white',
  },
});

export default ChatScreen;
