import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert, // Import Alert
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../../context/AuthContext";
import { updateJournalEntry } from "../../../services/journalService";

// 1. Import the new service function

export default function NotePage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  // 2. Get the token from your context
  const { journalEntries, setJournalEntries, user } = useAuth();
  const userToken = user.token;

  const journalEntry = journalEntries.find(entry => entry._id === id);

  const [title, setTitle] = useState(journalEntry?.title || "");
  const [content, setContent] = useState(journalEntry?.note || "");
  const [audioUrl, setAudioUrl] = useState(journalEntry?.audioUrl || "");

  // 3. Make handleSave async and add the update logic
  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert("Missing Info", "Please provide both a title and a note.");
      return;
    }

    const updatedData = {
      title: title,
      note: content,
      audioUrl 
    };

    try {
      // Call the service to update the entry in the database
      const updatedEntryFromServer = await updateJournalEntry(journalEntry._id, updatedData, userToken);
      
      // Update the global state to reflect the change immediately
      const updatedEntries = journalEntries.map(entry => 
        entry._id === journalEntry._id ? updatedEntryFromServer : entry
      );
      setJournalEntries(updatedEntries);

      Alert.alert("Success", "Your journal has been updated.");
      router.back();

    } catch (error) {
      console.error("Failed to save entry:", error);
      Alert.alert("Error", "Could not save your changes. Please try again.");
    }
  };

  if (!journalEntry) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Journal entry not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={{ fontSize: 22 }}>⬅️</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>Edit Note</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
            placeholderTextColor="#888"
            style={styles.titleInput}
          />
          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder="Write your note..."
            placeholderTextColor="#aaa"
            multiline
            style={styles.contentInput}
          />
        </ScrollView>

        <SafeAreaView style={styles.saveArea}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>💾 Save Changes</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ... (Your styles remain exactly the same)
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fefefe" },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: { padding: 8 },
  topTitle: { flex: 1, textAlign: "center", fontSize: 20, fontWeight: "700", color: "#111" },
  container: { flexGrow: 1, padding: 20 },
  titleInput: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#111",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  contentInput: {
    fontSize: 18,
    flex: 1,
    minHeight: 250,
    textAlignVertical: "top",
    color: "#333",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 0.5,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  saveArea: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fefefe",
  },
  saveButton: {
    backgroundColor: "#4caf50",
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: "center",
    shadowColor: "#4caf50",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  saveText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    letterSpacing: 0.5,
  },
});