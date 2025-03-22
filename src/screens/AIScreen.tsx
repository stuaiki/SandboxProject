import React, { useState, useRef, useCallback } from "react";
import { Animated, Easing } from 'react-native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { MicrophoneIcon } from '../assets/icons/Microphone';  // Import the MicrophoneIcon component
import { SaveIcon } from '../assets/icons/SaveIcon';  // Import the MicrophoneIcon component
import { SearchIcon } from "../assets/icons/SearchIcon";
import { BarsIcon } from "../assets/icons/BarsIcon";

export const AIScreen: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [savedConversations, setSavedConversations] = useState<{ id: number; messages: Message[] }[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const inputRef = useRef<TextInput | null>(null);
  const scrollViewRef = useRef<ScrollView | null>(null);
  const slideAnim = useRef(new Animated.Value(-300)).current;

  const handleNewSearch = (newSearch: string) => {
    setInputText("");
    setChatHistory((prevChat) => [
      ...prevChat,
      { text: newSearch, sender: "user" },
      { text: "AI is thinking...", sender: "ai" },
    ]);
    setTimeout(() => {
      setChatHistory((prevChat) =>
        prevChat.map((msg, index) =>
          index === prevChat.length - 1
            ? { ...msg, text: `Here's a response to: "${newSearch}"` }
            : msg
        )
      );
    }, 1000);
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const handleMenuClick = () => {
    setShowModal(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: -300,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => setShowModal(false));
  };

  const saveConversation = () => {
    if (chatHistory.length > 0) {
      setSavedConversations((prev) => [
        { id: prev.length + 1, messages: chatHistory },
        ...prev,
      ]);
      setChatHistory([]);
    }
  };

  const dismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.mainContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.mainContainer}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.iconButton} onPress={handleMenuClick}>
                <BarsIcon />  {/* Use the custom MicrophoneIcon here */}
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={saveConversation}>
                <SaveIcon name="plus" size={30} color="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.chatContainer}
              ref={scrollViewRef}
              onContentSizeChange={() =>
                scrollViewRef.current?.scrollToEnd({ animated: true })
              }
            >
              {chatHistory.map((message, index) => (
                <View
                  key={index}
                  style={[
                    styles.messageBubble,
                    message.sender === "user"
                      ? styles.userBubble
                      : styles.aiBubble,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      message.sender === "user"
                        ? styles.userText
                        : styles.aiText,
                    ]}
                  >
                    {message.text}
                  </Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.bottomSection}>
              <View style={styles.searchContainer}>
                <View style={styles.inputRow}>
                  <SearchIcon name="search" size={2} color="#aaa" style={styles.searchIcon} />
                  <TextInput
                    ref={inputRef}
                    style={styles.input}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Ask me anything..."
                    onSubmitEditing={() => inputText && handleNewSearch(inputText)}
                  />
                  <TouchableOpacity style={styles.actionButton}>
                    <MicrophoneIcon name="microphone" size={25} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {showModal && (
        <Animated.View style={[styles.modalContainer, { transform: [{ translateX: slideAnim }] }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Saved Conversations</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>✖</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={savedConversations}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  setChatHistory(item.messages);
                  closeModal();
                }}
              >
                <Text style={styles.modalItemText}>Conversation {item.id}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  mainContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  iconButton: {
    padding: 10,
  },
  chatContainer: {
    flex: 1,
    marginBottom: 80,
  },
  messageBubble: {
    maxWidth: "70%",
    padding: 12,
    marginVertical: 6,
    borderRadius: 15,
    backgroundColor: "#e0e0e0",
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#3b82f6",
  },
  aiBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#f1f1f1",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: "#fff",
  },
  aiText: {
    color: "#000",
  },
  bottomSection: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 30 : 20,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  searchContainer: {
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  inputRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  actionButton: {
    marginLeft: 16,
  },
  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: "75%",
    backgroundColor: "#fff",
    padding: 20,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    paddingTop: 50,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#4B5563",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
  },
  modalItemText: {
    fontSize: 16,
  },
});

export default AIScreen;
