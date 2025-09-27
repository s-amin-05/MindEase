// ChatScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../../components/TopBar";

const API_URL = "http://10.245.65.172:8000/chat"; // ⚠️ change to your backend IP

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hi, I'm here to support you. How are you feeling today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now().toString(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const response = await axios.post(API_URL, {
        session_id: "random-session-123", // replace with real session later
        user_input: input,
      });

      const botReply = {
        id: Date.now().toString(),
        text: response.data.reply,
        sender: "bot",
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error("Chat API error:", error.message);
      const errMsg = {
        id: Date.now().toString(),
        text: "⚠️ Network error, please try again.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errMsg]);
    }
  };

  const renderMessage = ({ item }) => {
    const isUser = item.sender === "user";
    return (
      <View style={[styles.messageRow, isUser ? styles.userMessageRow : styles.botMessageRow]}>
        <Image
          source={{ uri: isUser ? "https://i.pravatar.cc/100?img=3" : "https://i.pravatar.cc/100?img=5" }}
          style={styles.avatar}
        />
        <View style={[styles.messageBubble, isUser ? styles.userMessageBubble : styles.botMessageBubble]}>
          <Text style={{ color: isUser ? "#fff" : "#111618" }}>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar title="Chat Agent"/>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "android" ? "padding" : "height"}
        keyboardVerticalOffset={0} // Adjust this value if you have a header
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messageListContent}
        />

        {/* Input bar */}
        <View style={styles.inputContainer}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            style={styles.textInput}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Added StyleSheet for better organization
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7f8",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messageListContent: {
    padding: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#13a4ec",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  // Message bubble styles
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 6,
  },
  userMessageRow: {
    flexDirection: 'row-reverse',
  },
  botMessageRow: {
    flexDirection: 'row',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    marginHorizontal: 8,
    borderRadius: 12,
  },
  userMessageBubble: {
    backgroundColor: '#13a4ec',
    borderBottomRightRadius: 0,
  },
  botMessageBubble: {
    backgroundColor: '#e9eff2',
    borderBottomLeftRadius: 0,
  }
});