import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import TopBar from '../../../components/TopBar';

// --- Service and Context Imports ---
import { fetchJournalEntries, createJournalEntry } from '../../../services/journalService';
import { useAuth } from '../../../context/AuthContext';

// --- Global Colors & Mock Data ---
const primaryColor = '#6200EE';
const accentColor = '#03DAC6';

const initialJournalData = [
  {
    _id: '4',
    title: 'A New Beginning',
    note: 'Just setting up this new journal feature. Feels good to get organized and clear my thoughts.',
    audioUrl: "",
    createdAt: new Date('2025-09-26T09:00:00Z').toISOString(),
  },
  {
    _id: '3',
    title: 'Hackathon Deadline',
    audioUrl: "",
    note: 'Felt slightly overwhelmed by the hackathon deadline. Took a short break outside. The AI score today was 6/10.',
    createdAt: new Date('2025-09-25T18:30:00Z').toISOString(),
  },
  {
    _id: '2',
    title: 'Productive Day',
    audioUrl: "",
    note: 'A productive day! Finished the data preprocessing module. Energy levels were high. The AI score was 3/10.',
    createdAt: new Date('2025-09-24T15:00:00Z').toISOString(),
  },
  {
    _id: '1',
    title: 'Sleep Struggles',
    audioUrl: "",
    note: 'Struggled with sleep. Voice recording felt flat. Need to integrate more linguistic features. AI score 7/10.',
    createdAt: new Date('2025-09-23T23:00:00Z').toISOString(),
  },
];


const JournalListPage = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [newEntryTitle, setNewEntryTitle] = useState('');
  const [newEntryNote, setNewEntryNote] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user, journalEntries, setJournalEntries } = useAuth();
  const router = useRouter();
  
  // --- Fetch initial data on component mount ---
  useEffect(() => {
    const loadJournals = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedEntries = await fetchJournalEntries(user.token);

        // If API returns entries, use them; otherwise, fall back to mock data
        if (fetchedEntries && fetchedEntries.length > 0) {
          setJournalEntries(fetchedEntries);
        } else {
          setJournalEntries(initialJournalData);
        }

      } catch (err) {
        setError('Failed to load journals. Please try again.');
        setJournalEntries(initialJournalData); // Show mock data on error
      } finally {
        setIsLoading(false);
      }
    };

    // Only run if the user and token are available
    if (user?.token) {
      loadJournals();
    }
  }, [user]); // Re-run the effect if the user object changes

  // --- Handle creating a new entry via the modal ---
  const handleAddNewEntry = async () => {
    if (newEntryTitle.trim().length === 0 || newEntryNote.trim().length === 0) {
      Alert.alert('Incomplete Entry', 'Please provide both a title and a note.');
      return;
    }

    const entryData = {
      title: newEntryTitle,
      note: newEntryNote,
    };

    try {
      // Call service to create the entry in the DB
      const newEntryFromServer = await createJournalEntry(entryData, user.token);

      // Add the new entry from the server to the top of the list
      setJournalEntries([newEntryFromServer, ...journalEntries]);
      
      // Reset form and close modal
      setNewEntryTitle('');
      setNewEntryNote('');
      setModalVisible(false);
      Alert.alert('Success', 'Journal entry saved!');

    } catch (err) {
      console.error("Failed to save new entry:", err);
      Alert.alert('Error', 'Failed to save your entry. Please try again.');
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
  };

  const renderJournalEntry = ({ item, index }) => {
    const cardColor = index % 2 === 0 
        ? 'rgba(76, 175, 80, 0.1)'
        : 'rgba(98, 0, 238, 0.1)';

    return (
      <TouchableOpacity 
        style={[styles.card, { backgroundColor: cardColor }]}
        onPress={() => router.push(`/Journal/${item._id}`)}
      >
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDate}>{formatDate(item.createdAt)}</Text>
        <Text style={styles.cardNote} numberOfLines={6} ellipsizeMode="tail">
          {item.note}
        </Text>
      </TouchableOpacity>
    );
  };
 
  // --- Helper function to render content based on state ---
  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" color={primaryColor} style={styles.centered} />;
    }

    if (error) {
      return <Text style={[styles.centered, styles.errorText]}>{error}</Text>;
    }

    if (journalEntries.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>💡</Text>
          <Text style={styles.emptyText}>Notes you add appear here</Text>
        </View>
      );
    }
    
    return (
      <FlatList
        data={journalEntries}
        renderItem={renderJournalEntry}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
      />
    );
  };
 
  return (
    <SafeAreaView style={styles.container}>
      <TopBar title="My Journals"/>
      
      <TouchableOpacity 
        style={styles.searchBar} 
        onPress={() => Alert.alert('Search', 'Search functionality coming soon!')}
      >
        <Text style={styles.iconText}>🔍</Text>
        <Text style={styles.searchText}>Search notes...</Text>
      </TouchableOpacity>

      {renderContent()}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalCenteredView}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>New Journal Entry</Text>
            <TextInput
              style={styles.modalTextInput}
              placeholder="Title"
              value={newEntryTitle}
              onChangeText={setNewEntryTitle}
              autoFocus={true}
            />
            <TextInput
              style={[styles.modalTextInput, { minHeight: 120, textAlignVertical: 'top' }]}
              placeholder="What are your thoughts and feelings today?"
              multiline
              value={newEntryNote}
              onChangeText={setNewEntryNote}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleAddNewEntry}>
               <Text style={styles.saveButtonText}>💾 Save Entry</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  iconText: { fontSize: 22, color: '#5f6368' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F3F4',
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchText: { flex: 1, fontSize: 16, color: '#5f6368', marginLeft: 10 },
  gridContainer: { paddingHorizontal: 12, paddingTop: 6 },
  card: {
    flex: 1,
    margin: 6,
    padding: 12,
    borderRadius: 8,
    aspectRatio: 0.8,
  },
  cardTitle: { fontWeight: 'bold', fontSize: 15, color: '#202124', marginBottom: 4 },
  cardDate: { fontSize: 11, color: '#5f6368', marginBottom: 8},
  cardNote: { fontSize: 12, color: '#3c4043', lineHeight: 16 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyIcon: { fontSize: 60, color: '#bdc1c6' },
  emptyText: { marginTop: 16, fontSize: 18, color: '#80868b' },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: accentColor,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  fabIcon: { fontSize: 30, color: 'black' },
  modalCenteredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: primaryColor,
    marginBottom: 16,
  },
  modalTextInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: accentColor,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default JournalListPage;