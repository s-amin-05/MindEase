import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopBar from '../components/TopBar';

// --- Mock Data ---
const initialUserProgress = { level: 1, xp: 0 };
const initialQuests = [
  { id: '1', text: 'Write a journal entry', xp: 20, completed: false },
  { id: '2', text: 'Meditate for 5 minutes', xp: 50, completed: false },
  { id: '3', text: 'Reframe a negative thought', xp: 30, completed: false },
];
const initialAchievements = [
  { name: 'First Step', icon: 'zap', unlocked: false },
  { name: 'Journalist', icon: 'edit', unlocked: false },
  { name: 'Mindful Breather', icon: 'wind', unlocked: false },
  { name: 'Positive Thinker', icon: 'sun', unlocked: false },
];
const negativeThoughts = [
  { id: 1, text: "I'll never be good enough.", affirmation: "I am growing and learning every day." },
  { id: 2, text: "I messed everything up.", affirmation: "Mistakes are opportunities to learn." },
  { id: 3, text: "No one cares about me.", affirmation: "I am valued and loved by those around me." },
];

const GamificationPage = () => {
  const [userProgress, setUserProgress] = useState(initialUserProgress);
  const [quests, setQuests] = useState(initialQuests);
  const [achievements, setAchievements] = useState(initialAchievements);

  // --- TIMER STATES ---
  const [timerModalVisible, setTimerModalVisible] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // --- REFRAME STATES ---
  const [reframeModalVisible, setReframeModalVisible] = useState(false);
  const [currentThought, setCurrentThought] = useState(negativeThoughts[0]);
  const [showAffirmation, setShowAffirmation] = useState(false);

  // --- LOAD & SAVE PROGRESS ---
  useEffect(() => {
    const loadProgress = async () => {
      const savedProgress = await AsyncStorage.getItem('userProgress');
      const savedQuests = await AsyncStorage.getItem('quests');
      const savedAchievements = await AsyncStorage.getItem('achievements');
      if (savedProgress) setUserProgress(JSON.parse(savedProgress));
      if (savedQuests) setQuests(JSON.parse(savedQuests));
      if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
    };
    loadProgress();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('userProgress', JSON.stringify(userProgress));
    AsyncStorage.setItem('quests', JSON.stringify(quests));
    AsyncStorage.setItem('achievements', JSON.stringify(achievements));
  }, [userProgress, quests, achievements]);

  // --- XP & LEVEL SYSTEM ---
  useEffect(() => {
    const xpToLevelUp = userProgress.level * 200;
    if (userProgress.xp >= xpToLevelUp) {
      setUserProgress(prev => ({
        level: prev.level + 1,
        xp: prev.xp - xpToLevelUp,
      }));
      Alert.alert("🎉 Level Up!", `You reached Level ${userProgress.level + 1}`);
    }
  }, [userProgress.xp]);

  // --- QUEST TOGGLE ---
  const toggleQuest = (id) => {
    setQuests(prev =>
      prev.map(q =>
        q.id === id ? { ...q, completed: !q.completed } : q
      )
    );
    const quest = quests.find(q => q.id === id);
    if (quest && !quest.completed) {
      addXP(quest.xp);
      unlockAchievement(quest.text);
    }
  };

  // --- ADD XP ---
  const addXP = (amount) => {
    setUserProgress(prev => ({ ...prev, xp: prev.xp + amount }));
  };

  // --- UNLOCK ACHIEVEMENTS ---
  const unlockAchievement = (trigger) => {
    let updated = [...achievements];
    if (trigger.includes("journal")) {
      updated[1].unlocked = true;
    } else if (trigger.includes("Meditate")) {
      updated[2].unlocked = true;
    } else if (trigger.includes("Reframe")) {
      updated[3].unlocked = true;
    }
    if (userProgress.level >= 1) {
      updated[0].unlocked = true;
    }
    setAchievements(updated);
  };

  // --- MEDITATION TIMER ---
  useEffect(() => {
    let interval;
    if (isTimerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (isTimerActive && timeRemaining === 0 && selectedDuration > 0) {
      setIsTimerActive(false);
      const points = Math.floor(selectedDuration / 60) * 10;
      addXP(points);
      unlockAchievement("Meditate");
      Alert.alert("✅ Meditation Complete!", `You earned ${points} XP!`);
      closeTimerModal();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeRemaining]);

  const startTimer = (minutes) => {
    const seconds = minutes * 60;
    setSelectedDuration(seconds);
    setTimeRemaining(seconds);
    setIsTimerActive(true);
  };

  const pauseTimer = () => setIsTimerActive(false);
  const resumeTimer = () => setIsTimerActive(true);

  const closeTimerModal = () => {
    setIsTimerActive(false);
    setTimerModalVisible(false);
    setTimeRemaining(0);
    setSelectedDuration(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // --- REFRAME ---
  const handleReframe = () => {
    setShowAffirmation(true);
    addXP(30);
    unlockAchievement("Reframe");
    setTimeout(() => {
      setShowAffirmation(false);
      setCurrentThought(prev => negativeThoughts[(prev.id % negativeThoughts.length)]);
    }, 2500);
  };

  const xpToLevelUp = userProgress.level * 200;
  const progressBar = (userProgress.xp / xpToLevelUp) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <TopBar title="Mindful Moments" />
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Progress */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Progress</Text>
          <View style={styles.progressContainer}>
            <Text style={styles.levelText}>Level {userProgress.level}</Text>
            <Text style={styles.xpText}>{userProgress.xp}/{xpToLevelUp} XP</Text>
          </View>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progressBar}%` }]} />
          </View>
        </View>

        {/* Daily Quests */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Daily Goals</Text>
          {quests.map(q => (
            <TouchableOpacity key={q.id} style={[styles.questItem, q.completed && styles.questItemCompleted]} onPress={() => toggleQuest(q.id)}>
              <Ionicons name={q.completed ? "checkmark-circle" : "ellipse-outline"} size={24} color={q.completed ? "#16A34A" : "#D1D5DB"} />
              <Text style={styles.questText}>{q.text}</Text>
              <Text style={styles.xpRewardText}>+{q.xp} XP</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Activities */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Mindful Activities</Text>
          <TouchableOpacity style={[styles.activityButton, { backgroundColor: '#F3E8FF' }]} onPress={() => setTimerModalVisible(true)}>
            <Ionicons name="timer-outline" size={24} color="#6200EE" />
            <Text style={[styles.activityButtonText, { color: '#581C87' }]}>Meditation Timer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.activityButton, { backgroundColor: '#EFF6FF', marginTop: 12 }]} onPress={() => setReframeModalVisible(true)}>
            <Ionicons name="bulb-outline" size={24} color="#3B82F6" />
            <Text style={[styles.activityButtonText, { color: '#1E40AF' }]}>Thought Reframing</Text>
          </TouchableOpacity>
        </View>

        {/* Achievements */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Achievements</Text>
          <View style={styles.achievementsGrid}>
            {achievements.map(ach => (
              <View key={ach.name} style={styles.achievementItem}>
                <View style={[styles.achievementIconContainer, !ach.unlocked && styles.lockedAchievement]}>
                  <Feather name={ach.icon} size={28} color={ach.unlocked ? '#6200EE' : '#A0A0A0'} />
                </View>
                <Text style={styles.achievementName}>{ach.name}</Text>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>

      {/* Meditation Timer Modal */}
      <Modal visible={timerModalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          {!isTimerActive && timeRemaining === 0 ? (
            <View style={styles.selectionContainer}>
              <Text style={styles.modalTitle}>Choose Duration</Text>
              <TouchableOpacity style={styles.durationButton} onPress={() => startTimer(5)}>
                <Text style={styles.durationButtonText}>5 Minutes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.durationButton} onPress={() => startTimer(10)}>
                <Text style={styles.durationButtonText}>10 Minutes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeModalButton} onPress={closeTimerModal}>
                <Text style={styles.closeModalText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.timerDisplayContainer}>
              <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
              {isTimerActive ? (
                <TouchableOpacity style={styles.pauseButton} onPress={pauseTimer}>
                  <Text style={styles.pauseButtonText}>Pause</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.pauseButton} onPress={resumeTimer}>
                  <Text style={styles.pauseButtonText}>Resume</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </Modal>

      {/* Thought Reframe Modal */}
      <Modal visible={reframeModalVisible} animationType="fade" transparent={true} onRequestClose={() => setReframeModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.reframeBox}>
            {!showAffirmation ? (
              <>
                <Text style={styles.negativeThought}>{currentThought.text}</Text>
                <TouchableOpacity style={styles.reframeButton} onPress={handleReframe}>
                  <Text style={styles.reframeButtonText}>Reframe</Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text style={styles.affirmationText}>{currentThought.affirmation}</Text>
            )}
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  scrollContent: { padding: 16 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 16, elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 12 },
  progressContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  levelText: { fontSize: 18, fontWeight: '600', color: '#6200EE' },
  xpText: { fontSize: 16, color: '#6B7280' },
  progressBarBackground: { height: 10, backgroundColor: '#E5E7EB', borderRadius: 8, marginTop: 8 },
  progressBarFill: { height: 10, backgroundColor: '#6200EE', borderRadius: 8 },
  questItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  questItemCompleted: { opacity: 0.6 },
  questText: { flex: 1, marginLeft: 12, fontSize: 16, color: '#374151' },
  xpRewardText: { fontSize: 14, fontWeight: 'bold', color: '#FBBF24' },
  activityButton: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12 },
  activityButtonText: { marginLeft: 12, fontSize: 16, fontWeight: '600' },
  achievementsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' },
  achievementItem: { width: '25%', alignItems: 'center', marginBottom: 16 },
  achievementIconContainer: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(98, 0, 238, 0.1)' },
  lockedAchievement: { backgroundColor: '#E5E7EB' },
  achievementName: { marginTop: 6, fontSize: 12, color: '#4B5563', textAlign: 'center' },
  modalContainer: { flex: 1, backgroundColor: 'rgba(17, 24, 39, 0.95)', justifyContent: 'center', alignItems: 'center' },
  selectionContainer: { alignItems: 'center', padding: 20, width: '100%' },
  modalTitle: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 40 },
  durationButton: { backgroundColor: 'rgba(255, 255, 255, 0.1)', paddingVertical: 16, borderRadius: 12, marginBottom: 20, width: '80%', alignItems: 'center' },
  durationButtonText: { fontSize: 18, color: '#FFFFFF', fontWeight: '600' },
  closeModalButton: { marginTop: 40 },
  closeModalText: { fontSize: 16, color: '#A0AEC0' },
  timerDisplayContainer: { justifyContent: 'center', alignItems: 'center' },
  timerText: { fontSize: 64, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 20 },
  pauseButton: { paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8, backgroundColor: '#60A5FA' },
  pauseButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  reframeBox: { backgroundColor: '#FFF', padding: 20, borderRadius: 12, width: '85%', alignItems: 'center' },
  negativeThought: { fontSize: 18, color: '#DC2626', marginBottom: 20, textAlign: 'center' },
  reframeButton: { backgroundColor: '#34D399', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8 },
  reframeButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  affirmationText: { fontSize: 18, color: '#2563EB', fontWeight: '600', textAlign: 'center' },
});

export default GamificationPage;
