import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
  FlatList,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

const primaryColor = '#6200EE';

const ProfilePage = () => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const [contacts, setContacts] = useState([
    { id: '1', name: 'Police', number: '100' },
    { id: '2', name: 'Ambulance', number: '108' },
    { id: '3', name: 'Fire Brigade', number: '101' },
  ]);

  const [formName, setFormName] = useState('');
  const [formNumber, setFormNumber] = useState('');

  const {user} = useAuth()
  
  const streak = 15;

  const logout = () => {
    Alert.alert("Logged Out", "You have been successfully logged out.");
    router.replace('/(auth)/login'); 
  };

  const handleAddOrEditContact = () => {
    if (!formName.trim() || !formNumber.trim()) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (editingContact) {
      // Edit existing
      setContacts((prev) =>
        prev.map((c) =>
          c.id === editingContact.id ? { ...c, name: formName, number: formNumber } : c
        )
      );
      setEditingContact(null);
    } else {
      // Add new
      setContacts((prev) => [
        ...prev,
        { id: Date.now().toString(), name: formName, number: formNumber },
      ]);
    }

    setFormName('');
    setFormNumber('');
    setIsFormVisible(false);
  };

  const handleDeleteContact = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const openEditForm = (contact) => {
    setEditingContact(contact);
    setFormName(contact.name);
    setFormNumber(contact.number);
    setIsFormVisible(true);
  };

  const openAddForm = () => {
    setEditingContact(null);
    setFormName('');
    setFormNumber('');
    setIsFormVisible(true);
  };

  const menuOptions = [
    { icon: 'edit', text: 'Edit Profile', action: () => Alert.alert('Edit Profile', 'Opening profile editor...') },
    { icon: 'phone', text: 'Emergency Contacts', action: () => setIsModalVisible(true) },
    { icon: 'help-circle', text: 'Help & Support', action: () => Alert.alert('Help', 'Contacting support...') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Feather name="arrow-left" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name?.charAt(0)}</Text>
          </View>
          <Text style={styles.profileName}>{user?.name || "Amin"}</Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>
        </View>

        {/* Streak */}
        <View style={styles.streakSection}>
          <Feather name="zap" size={24} color="#FFC107" />
          <Text style={styles.streakText}>You're on a {streak}-day streak!</Text>
        </View>

        {/* Menu */}
        <View style={styles.menuContainer}>
          {menuOptions.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={item.action}>
              <Feather name={item.icon} size={22} color="#555" />
              <Text style={styles.menuItemText}>{item.text}</Text>
              <Feather name="chevron-right" size={22} color="#AAA" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Contacts Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Emergency Contacts</Text>

            <FlatList
              data={contacts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.contactRow}>
                  <TouchableOpacity style={styles.contactInfo} onPress={() => Alert.alert("Calling", `${item.name} (${item.number})`)}>
                    <Feather name="phone-call" size={20} color={primaryColor} />
                    <Text style={styles.contactText}>{item.name} ({item.number})</Text>
                  </TouchableOpacity>
                  <View style={styles.contactActions}>
                    <TouchableOpacity onPress={() => openEditForm(item)} style={{ marginRight: 12 }}>
                      <Feather name="edit" size={20} color="#FFA000" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteContact(item.id)}>
                      <Feather name="trash-2" size={20} color="#D32F2F" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />

            <TouchableOpacity style={styles.addButton} onPress={openAddForm}>
              <Feather name="plus-circle" size={20} color="white" />
              <Text style={styles.addButtonText}>Add Contact</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Add/Edit Form Modal */}
      <Modal
        visible={isFormVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsFormVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {editingContact ? 'Edit Contact' : 'Add Contact'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Name"
              value={formName}
              onChangeText={setFormName}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={formNumber}
              keyboardType="phone-pad"
              onChangeText={setFormNumber}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleAddOrEditContact}>
              <Text style={styles.saveButtonText}>
                {editingContact ? 'Save Changes' : 'Add Contact'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsFormVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9FC' },
  scrollContent: { paddingBottom: 40 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8'
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  backButton: { padding: 4 },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 2,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: { color: 'white', fontSize: 48, fontWeight: 'bold' },
  profileName: { fontSize: 26, fontWeight: 'bold', color: '#333' },
  profileEmail: { fontSize: 16, color: '#777', marginTop: 4 },
  streakSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEA',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    justifyContent: 'center'
  },
  streakText: { marginLeft: 12, fontSize: 16, fontWeight: '600', color: '#D97706' },
  menuContainer: {
    marginTop: 30,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  menuItemText: { flex: 1, marginLeft: 20, fontSize: 17, color: '#333' },
  logoutButton: {
    marginTop: 30,
    marginHorizontal: 20,
    backgroundColor: '#FFEBEE',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoutButtonText: { color: '#D32F2F', fontSize: 17, fontWeight: 'bold' },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    elevation: 10,
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  contactInfo: { flexDirection: 'row', alignItems: 'center' },
  contactText: { marginLeft: 12, fontSize: 16, color: '#333' },
  contactActions: { flexDirection: 'row', alignItems: 'center' },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: primaryColor,
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 16,
  },
  addButtonText: { color: 'white', fontWeight: '600', marginLeft: 8 },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#999',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center'
  },
  closeButtonText: { color: 'white', fontWeight: '600', fontSize: 16 },

  // Input form styles
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
  saveButton: {
    marginTop: 12,
    backgroundColor: primaryColor,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center'
  },
  saveButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
});

export default ProfilePage;
