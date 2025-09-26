import React, { useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { AuthContext } from '../../context/AuthContext';

const HomeScreen = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  // Placeholder data
  const entries = [
    { id: '1', title: 'First Entry', content: 'Today was a good day.' },
    { id: '2', title: 'Second Entry', content: 'Feeling a bit tired.' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MindEase Journal</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.entryContainer}>
            <Text style={styles.entryTitle}>{item.title}</Text>
            <Link href={{ pathname: '/(tabs)/[id]', params: { id: item.id, title: item.title, content: item.content } }} asChild><Button title="View" /></Link>
          </View>
        )}
      />
      <Link href="/(tabs)/new" asChild><Button title="Add New Entry" /></Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
  },
  entryContainer: {
    padding: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  entryTitle: {
    fontSize: 18,
  },
});

export default HomeScreen;