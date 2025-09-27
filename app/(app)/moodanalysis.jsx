import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomNavBar from "../../components/BottomNavBar";
import TopBar from "../../components/TopBar";

export default function MoodAnalysis() {
  const [trend, setTrend] = useState("7days");
  const [moodScore, setMoodScore] = useState(6);
  const [acousticCues, setAcousticCues] = useState([
    { label: "Pauses", status: "Frequent", icon: "pause-circle-outline" },
    { label: "Monotone", status: "Present", icon: "graphic-eq" }
  ]);
  const [textCues, setTextCues] = useState([
    { word: "Anxious", color: "red" },
    { word: "Overwhelmed", color: "amber" },
    { word: "Sad", color: "blue" }
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <TopBar title="Mood Analysis"/>
      <ScrollView contentContainerStyle={{ padding: 16, flex: 1 }}>
        {/* Header
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#13a4ec" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mood Analysis</Text>
          <View style={{ width: 40 }} />
        </View> */}

        {/* Mood Score */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardTitle}>Mood Score</Text>
            <Text style={styles.cardScore}>{moodScore}/10</Text>
          </View>
          <View style={styles.progressBackground}>
            <View style={[styles.progressFill, { width: `${moodScore * 10}%` }]} />
          </View>
          <Text style={styles.cardDesc}>
            Your mood score is based on your journal entries and voice analysis. A higher score indicates a more positive mood.
          </Text>
        </View>

        {/* Acoustic Cues */}
        <View>
          <Text style={styles.sectionTitle}>Acoustic Cues</Text>
          <View style={{ marginTop: 8 }}>
            {acousticCues.map((cue, idx) => (
              <View key={idx} style={styles.rowCard}>
                <View style={styles.iconCircle}>
                  <MaterialIcons name={cue.icon} size={24} color="#13a4ec" />
                </View>
                <Text style={styles.rowText}>{cue.label}</Text>
                <Text style={styles.rowSubText}>{cue.status}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Text Cues */}
        <View>
          <Text style={styles.sectionTitle}>Text Cues</Text>
          <View style={styles.card}>
            <Text style={styles.cardDesc}>Negative words detected in your journal entries:</Text>
            <View style={styles.tagContainer}>
              {textCues.map((cue, idx) => (
                <View
                  key={idx}
                  style={
                    cue.color === "red"
                      ? styles.tagRed
                      : cue.color === "amber"
                      ? styles.tagAmber
                      : styles.tagBlue
                  }
                >
                  <Text
                    style={
                      cue.color === "red"
                        ? styles.tagTextRed
                        : cue.color === "amber"
                        ? styles.tagTextAmber
                        : styles.tagTextBlue
                    }
                  >
                    {cue.word}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Mood Trend */}
        <View>
          <Text style={styles.sectionTitle}>Mood Trend</Text>
          <View style={styles.trendToggle}>
            <TouchableOpacity
              style={[styles.trendButton, trend === "7days" && styles.trendSelected]}
              onPress={() => setTrend("7days")}
            >
              <Text style={[styles.trendText, trend === "7days" && styles.trendTextSelected]}>7 Days</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.trendButton, trend === "30days" && styles.trendSelected]}
              onPress={() => setTrend("30days")}
            >
              <Text style={[styles.trendText, trend === "30days" && styles.trendTextSelected]}>30 Days</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", marginTop: 16 }}>
            <View style={{ width: 80 }}>
              <Text style={styles.avgLabel}>Avg. Score</Text>
              <Text style={styles.avgScore}>{moodScore}</Text>
              <Text style={styles.avgChange}>
                <Text style={{ color: "green", fontWeight: "600" }}>+2% </Text> vs last 7d
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Svg width="100%" height={150} viewBox="0 0 400 150">
                <Defs>
                  <LinearGradient id="gradient1" x1="0" y1="0" x2="400" y2="0">
                    <Stop offset="0" stopColor="#13a4ec" stopOpacity="1" />
                    <Stop offset="1" stopColor="#13a4ec" stopOpacity="0.5" />
                  </LinearGradient>
                  <LinearGradient id="gradient2" x1="0" y1="0" x2="0" y2="150">
                    <Stop offset="0" stopColor="#13a4ec" stopOpacity="0.2" />
                    <Stop offset="1" stopColor="#13a4ec" stopOpacity="0" />
                  </LinearGradient>
                </Defs>
                <Path
                  d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81"
                  stroke="url(#gradient1)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
                <Path
                  d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81V150H0V109Z"
                  fill="url(#gradient2)"
                />
              </Svg>
            </View>
          </View>

          <View style={styles.weekLabels}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <Text key={d} style={styles.weekLabel}>{d}</Text>
            ))}
          </View>
        </View>
      </ScrollView>
      <BottomNavBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f7f8" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  backButton: { padding: 8, borderRadius: 999, backgroundColor: "#e0f2fe" },
  headerTitle: { flex: 1, textAlign: "center", fontSize: 18, fontWeight: "700", color: "#111" },
  card: { backgroundColor: "#fff", borderRadius: 16, padding: 16, marginBottom: 16, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  cardTitle: { fontSize: 16, fontWeight: "600" },
  cardScore: { fontSize: 18, fontWeight: "700" },
  progressBackground: { height: 8, borderRadius: 8, backgroundColor: "#e0e0e0", marginBottom: 8 },
  progressFill: { height: 8, borderRadius: 8, backgroundColor: "#13a4ec" },
  cardDesc: { fontSize: 12, color: "#6b7280", marginTop: 8, textAlign: "center" },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  rowCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 12, padding: 12, marginBottom: 8, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  iconCircle: { backgroundColor: "#e0f2fe", padding: 8, borderRadius: 999, marginRight: 12 },
  rowText: { flex: 1, fontWeight: "500" },
  rowSubText: { color: "#6b7280" },
  tagContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 8, marginTop: 8 },
  tagRed: { backgroundColor: "#fee2e2", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999 },
  tagTextRed: { color: "#b91c1c" },
  tagAmber: { backgroundColor: "#fef3c7", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999 },
  tagTextAmber: { color: "#b45309" },
  tagBlue: { backgroundColor: "#dbeafe", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999 },
  tagTextBlue: { color: "#1e40af" },
  trendToggle: { flexDirection: "row", backgroundColor: "#e5e7eb", borderRadius: 12, marginBottom: 16 },
  trendButton: { flex: 1, paddingVertical: 8, borderRadius: 12, alignItems: "center" },
  trendSelected: { backgroundColor: "#13a4ec", shadowColor: "#13a4ec", shadowOpacity: 0.3, shadowRadius: 4, elevation: 2 },
  trendText: { color: "#6b7280", fontWeight: "500" },
  trendTextSelected: { color: "#fff" },
  avgLabel: { fontSize: 12, color: "#6b7280" },
  avgScore: { fontSize: 32, fontWeight: "700", color: "#13a4ec" },
  avgChange: { fontSize: 12, color: "#6b7280", marginTop: 4 },
  weekLabels: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  weekLabel: { fontSize: 10, color: "#6b7280" },
});
