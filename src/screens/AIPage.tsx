import React, { useState, useRef, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Animated,
  Easing
} from "react-native";
import { BarsIcon } from "../assets/icons/BarsIcon";
import { SaveIcon } from "../assets/icons/SaveIcon";
import { AIHeader } from "../AIHeader";
import { AISuggestionList } from "../AISuggestionList";
import { AISearchBar } from "../AISearchBar";
import { Message } from "../types";

type Conversation = {
  id: number;
  title: string;
  messages: Message[];
};

const AIPage: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [savedConversations, setSavedConversations] = useState<{ id: number; title: string; messages: Message[] }[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const scrollViewRef = useRef<ScrollView | null>(null);
  const inputRef = useRef<TextInput | null>(null);

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

  const saveConversation = () => {
    if (chatHistory.length > 0) {
      // Extract the first line of the first message as the title.
      // You can also add a fallback in case the message is very long.
      const firstMessage = chatHistory[0].text;
      const conversationTitle = firstMessage.split('\n')[0].slice(0, 50); // first line, max 50 characters
  
      setSavedConversations((prev) => [
        { id: prev.length + 1, title: conversationTitle, messages: chatHistory },
        ...prev,
      ]);
      setChatHistory([]);
    }
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

  const dismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Wrap only the scrollable area with TouchableWithoutFeedback */}
        <AIHeader />

        <View style={styles.topRow}>
        <TouchableOpacity style={styles.iconButton} onPress={handleMenuClick}>
          <BarsIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={saveConversation}>
          <SaveIcon name="save" size={30} color="#000" />
        </TouchableOpacity>
      </View>

        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.scrollContent}
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          >
            <AISuggestionList />
            {chatHistory.map((message, index) => (
              <View
                key={index}
                style={[
                  styles.messageBubble,
                  message.sender === "user" ? styles.userBubble : styles.aiBubble,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    message.sender === "user" ? styles.userText : styles.aiText,
                  ]}
                >
                  {message.text}
                </Text>
              </View>
            ))}
          </ScrollView>
        </TouchableWithoutFeedback>

        {/* Pinned container for AISearchBar (remains outside TouchableWithoutFeedback) */}
        <View style={styles.bottomContainer}>
          <AISearchBar onSubmit={handleNewSearch} />
        </View>
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
                <Text style={styles.modalItemText}>{item.title}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

export default AIPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between", // This spaces the icons at the left and right ends
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  iconButton: {
    padding: 2,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 180,
    paddingHorizontal: 16,
  },
  messageBubble: {
    maxWidth: "70%",
    padding: 12,
    marginVertical: 6,
    borderRadius: 15,
    backgroundColor: "#e0e0e0",
    alignSelf: "flex-start",
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
  bottomContainer: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 0 : 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  modalContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
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
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#4B5563",
    borderRadius: 30,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 18,
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
