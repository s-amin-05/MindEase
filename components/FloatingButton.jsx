import React, { useState } from 'react';
import { 
    View, 
    TouchableOpacity, 
    Text, 
    StyleSheet, 
    ActivityIndicator, 
    Alert,
    Modal,
    TextInput,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { Audio } from 'expo-av';

// --- 1. Import your final journal creation services and Auth context ---
import { createJournalFromAudio, createJournalFromText } from './services/journalService'; // Adjust path
import { useAuth } from './context/AuthContext'; // Adjust path

export default function FloatingButton() {
  const { user } = useAuth(); // Get the user/token for creating journals
  
  // State for audio recording
  const [recording, setRecording] = useState(null);
  
  // State for UI feedback
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  // --- 2. State for the text input modal ---
  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  const startRecording = async () => {
    // ... (This function remains the same as your original)
  };

  // --- 3. UPDATED: This function now creates a journal from the audio ---
  const stopRecording = async () => {
    if (!recording) return;
    setLoading(true);
    
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log('Recording stopped and stored at', uri);
      setRecording(null);

      // The service now handles both analysis and creation
      // We'll use the transcript as the note and create a generic title
      const newJournal = await createJournalFromAudio(
        `Audio Journal - ${new Date().toLocaleDateString()}`, 
        "Processing audio...", // Placeholder note
        uri, 
        user.token
      );

      // The full journal entry is the report
      setReport(newJournal); 
      Alert.alert("Success", "Audio journal created successfully!");

    } catch (err) {
      console.error('Error during audio journal creation', err);
      Alert.alert('Error', 'Could not create audio journal.');
    } finally {
      setLoading(false);
    }
  };

  // --- 4. NEW: This function handles creating a journal from text ---
  const handleSaveTextJournal = async () => {
    if (!title.trim() || !note.trim()) {
      Alert.alert("Incomplete", "Please provide a title and note.");
      return;
    }
    
    setLoading(true);
    setModalVisible(false);

    try {
        const newJournal = await createJournalFromText(title, note, user.token);
        setReport(newJournal); // Display the new journal
        Alert.alert("Success", "Text journal created successfully!");
    } catch(err) {
        Alert.alert("Error", "Could not create text journal.");
    } finally {
        setTitle('');
        setNote('');
        setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#007AFF" />}
      
      {/* --- 5. The button now has onPress and onLongPress --- */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => !recording && setModalVisible(true)} // Short press opens modal
        onLongPress={recording ? stopRecording : startRecording} // Long press handles recording
        delayLongPress={200}
      >
        <Text style={styles.iconText}>
          {recording ? '🛑' : '🎤'}
        </Text>
      </TouchableOpacity>

      {/* --- 6. The Modal for Text Input --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"} 
          style={styles.modalContainer}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>New Text Journal</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={[styles.input, styles.noteInput]}
              placeholder="What's on your mind?"
              value={note}
              onChangeText={setNote}
              multiline
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveTextJournal}>
              <Text style={styles.saveButtonText}>Save Journal</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Report display (works for both audio and text journals) */}
      {report && (
        <View style={styles.reportContainer}>
            <Text style={styles.reportTitle}>{report.title}</Text>
            <Text style={styles.reportText}>{report.note}</Text>
            {/* You can display analysis details if they exist on the report object */}
        </View>
      )}
    </View>
  );
}

// --- Styles (Updated for Modal) ---
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', padding: 20 },
  floatingButton: {
    backgroundColor: '#007AFF',
    width: 70, height: 70, borderRadius: 35,
    justifyContent: 'center', alignItems: 'center',
    elevation: 8, shadowColor: '#000', shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 }, shadowRadius: 4,
  },
  iconText: { fontSize: 30 },
  // Modal Styles
  modalContainer: { flex: 1, justifyContent: 'flex-end' },
  modalView: {
    backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20,
    padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25, shadowRadius: 4, elevation: 5,
  },
  modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    width: '100%', borderWidth: 1, borderColor: '#ddd', borderRadius: 10,
    padding: 12, fontSize: 16, marginBottom: 15,
  },
  noteInput: { minHeight: 120, textAlignVertical: 'top' },
  saveButton: {
    backgroundColor: '#007AFF', padding: 15, borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  // Report Styles
  reportContainer: {
    marginTop: 20, padding: 15, backgroundColor: '#f0f0f0',
    borderRadius: 10, width: '100%',
  },
  reportTitle: { fontSize: 18, fontWeight: 'bold' },
  reportText: { fontSize: 16, marginTop: 5 },
});