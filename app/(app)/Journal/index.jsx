// This is the full, corrected code for app/Journal/index.jsx

import React, { useState } from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import TopBar from '../../../components/TopBar';

// --- Global Colors ---
const primaryColor = '#6200EE';
const accentColor = '#03DAC6';

// --- Mock Data ---
const initialJournalData = [
  {
    _id: '4',
    title: 'A New Beginning',
    note: 'Just setting up this new journal feature. Feels good to get organized and clear my thoughts.',
    createdAt: new Date('2025-09-26T09:00:00Z').toISOString(),
  },
  {
    _id: '3',
    title: 'Hackathon Deadline',
    note: 'Felt slightly overwhelmed by the hackathon deadline. Took a short break outside. The AI score today was 6/10.',
    createdAt: new Date('2025-09-25T18:30:00Z').toISOString(),
  },
  {
    _id: '2',
    title: 'Productive Day',
    note: 'A productive day! Finished the data preprocessing module. Energy levels were high. The AI score was 3/10.',
    createdAt: new Date('2025-09-24T15:00:00Z').toISOString(),
  },
  {
    _id: '1',
    title: 'Sleep Struggles',
    note: 'Struggled with sleep. Voice recording felt flat. Need to integrate more linguistic features. AI score 7/10.',
    createdAt: new Date('2025-09-23T23:00:00Z').toISOString(),
  },
];


const JournalListPage = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [newEntryTitle, setNewEntryTitle] = useState('');
  const [newEntryNote, setNewEntryNote] = useState('');
  const [journalEntries, setJournalEntries] = useState(initialJournalData);
  const router = useRouter();

  const handleAddNewEntry = () => {
    if (newEntryTitle.trim().length === 0 || newEntryNote.trim().length === 0) {
      Alert.alert('Incomplete Entry', 'Please provide both a title and a note.');
      return;
    }
    const newEntry = {
      _id: Math.random().toString(),
      title: newEntryTitle,
      note: newEntryNote,
      createdAt: new Date().toISOString(),
    };
    setJournalEntries([newEntry, ...journalEntries]);
    setNewEntryTitle('');
    setNewEntryNote('');
    setModalVisible(false);
    Alert.alert('Success', 'Journal entry saved!');
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
        // ✅ THIS IS THE CORRECTED LINE
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
 
  return (
    <SafeAreaView style={styles.container}>
      {/* App Bar */}
      <TopBar title="My Journals"/>
      

      {/* Search Bar */}
      <TouchableOpacity 
        style={styles.searchBar} 
        onPress={() => Alert.alert('Search', 'Search functionality coming soon!')}
      >
        <Text style={styles.iconText}>🔍</Text>
        <Text style={styles.searchText}>Search notes...</Text>
      </TouchableOpacity>

      {/* Journal Entries Grid */}
      {journalEntries.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>💡</Text>
          <Text style={styles.emptyText}>Notes you add appear here</Text>
        </View>
      ) : (
        <FlatList
          data={journalEntries}
          renderItem={renderJournalEntry}
          keyExtractor={(item) => item._id}
          numColumns={2}
          contentContainerStyle={styles.gridContainer}
        />
      )}

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      {/* Add New Entry Modal */}
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
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  appBarTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  iconButton: { padding: 8 },
  iconText: { fontSize: 22, color: '#5f6368' },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(98, 0, 238, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: primaryColor, fontWeight: 'bold', fontSize: 16 },
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