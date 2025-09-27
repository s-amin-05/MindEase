import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

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

const JournalDetailPage = () => {
  const { id } = useLocalSearchParams();
  const entry = initialJournalData.find((item) => item._id === id);

  if (!entry) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.errorText}>Journal entry not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{entry.title}</Text>
        <Text style={styles.date}>{formatDate(entry.createdAt)}</Text>
        <Text style={styles.note}>{entry.note}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#D32F2F',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  note: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
});

export default JournalDetailPage;
