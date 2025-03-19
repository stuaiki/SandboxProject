import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  FlatList,
  Animated,
  Easing,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

// Define the type for the Icon component props
interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: object;
}

// Define the type for the Message in the chat history
interface Message {
  text: string;
  sender: "user" | "ai";
}

const Icon: React.FC<IconProps> = ({ name, size = 24, color = "#000", style = {} }) => {
  const iconMap: { [key: string]: string } = {
    "menu-2": "☰",
    bookmark: "🖤",
    search: "🔍",
    plus: "+",
    microphone: "🎤",
    "wave-square": "〰️",
  };

  return (
    <Text style={[{ fontSize: size, color, fontWeight: "bold" }, style]}>
      {iconMap[name] || "•"}
    </Text>
  );
};

export const AIScreen: React.FC = () => {
  const [inputText, setInputText] = useState<string>(""); // inputText is of type string
  const [chatHistory, setChatHistory] = useState<Message[]>([]); // chatHistory is an array of Message objects
  const [savedConversations, setSavedConversations] = useState<{ id: number; messages: Message[] }[]>([]); // savedConversations is an array of saved conversations
  const [showModal, setShowModal] = useState<boolean>(false); // showModal is of type boolean
  const inputRef = useRef<TextInput | null>(null); // inputRef is a ref to TextInput
  const scrollViewRef = useRef<ScrollView | null>(null); // scrollViewRef is a ref to ScrollView
  const slideAnim = useRef(new Animated.Value(-300)).current; // slideAnim is used for the modal animation

  // Function to handle a new search
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

  // Function to handle the menu click and open the modal
  const handleMenuClick = () => {
    setShowModal(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  // Function to close the modal
  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: -300,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => setShowModal(false));
  };

  // Function to save the conversation
  const saveConversation = () => {
    if (chatHistory.length > 0) {
      setSavedConversations((prev) => [
        { id: prev.length + 1, messages: chatHistory },
        ...prev,
      ]);
      setChatHistory([]);
    }
  };

  // Function to dismiss the keyboard
  const dismissKeyboard = useCallback(() => {
    Keyboard.dismiss(); // Dismiss keyboard when pressing outside input
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
                <Icon name="menu-2" size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={saveConversation}>
                <Icon name="bookmark" size={24} color="#000" />
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
                  <Icon name="search" size={20} color="#78716c" style={styles.searchIcon} />
                  <TextInput
                    ref={inputRef}
                    style={styles.input}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Ask me anything..."
                    onSubmitEditing={() => inputText && handleNewSearch(inputText)}
                  />
                  <TouchableOpacity style={styles.actionButton}>
                    <Icon name="microphone" size={20} color="#78716c" />
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
    backgroundColor: "#cbd5e1",
  },
  mainContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  iconButton: {
    padding: 5,
  },
  chatContainer: {
    flex: 1,
    marginBottom: 70,
  },
  messageBubble: {
    maxWidth: "70%",
    padding: 10,
    marginVertical: 5,
    borderRadius: 15,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#3b82f6",
  },
  aiBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#e5e7eb",
  },
  messageText: {
    fontSize: 16,
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
    paddingBottom: 40,
  },
  searchContainer: {
    backgroundColor: "#fff",
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
    color: "#000",
  },
  actionButton: {
    marginLeft: 16,
  },
  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: "80%",
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
    shadowRadius: 3.5,
    elevation: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalItem: {
    paddingVertical: 10,
  },
  modalItemText: {
    fontSize: 16,
    color: "#000",
  },
});
