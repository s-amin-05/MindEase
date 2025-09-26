
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useLocalSearchParams } from 'expo-router';

const ViewEntryScreen = () => {
  const entry = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{entry.title}</Text>
      <Text style={styles.content}>{entry.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  content: {
    fontSize: 18,
  },
});

export default ViewEntryScreen;
