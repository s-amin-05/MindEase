import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Suggestions() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <MaterialIcons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Suggestions</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 80 }}>
        <Text style={styles.sectionTitle}>Based on your mood level</Text>

        {/* Lifestyle Tips Card */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Lifestyle Tips</Text>
          <View style={{ marginTop: 8, gap: 12 }}>
            <View style={styles.row}>
              <Image
                source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYonF5OPMi3g4mUMsnKwXmP9kt99CMgSosk0RtkZXGZcWq67Rhl-fKK-pmGFQS_xfEKkZMDD1MhyPvPnjtJLqDHNidGTllQDdgAS5YfUhVaJFhCwf5xCAe_MVIDJGHdmc39KBzVUG0DhIx6or8VX2D7cWVGzSTNtdSYJV16yDEeQx-x4BRfX710ZF4jDcZGhTWsvXqgMVLEERFL7o5wXsHXv5aFz-bode-GobbYir4dbX43Fn58Cst6Wr4YC6nozb07WqguoUSRj4" }}
                style={styles.cardImage}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>Better Sleep</Text>
                <Text style={styles.cardDesc}>Aim for 7-9 hours of quality sleep each night.</Text>
              </View>
              <TouchableOpacity style={styles.cardButton}>
                <Text style={styles.cardButtonText}>View</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <Image
                source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPp8_R31x30KosWLt9Y5bciRWc_X1-3Hj5wIVN9d3ssibFmvsQWC8q-K1o0w0AsZClvtDLGXRAIuHSqWc0HUnKmdX0zON4g_y6vzeuVZFCGGkaPeSs84_qdMQFzSqP36T4fhF0homoYSt4Oq3fcnv779ehBiloSiKi-fRTjwXTr6D7f8V-Ptg5q1ctTZlrm1tr2vM73sFbATvrf2PgMS1pjv8QGleP2H83pS7JF_7GXxO4PVhDwH22_E0FqOr6AjjKSndDUdkImKs" }}
                style={styles.cardImage}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>Regular Exercise</Text>
                <Text style={styles.cardDesc}>Engage in 30+ minutes of moderate activity.</Text>
              </View>
              <TouchableOpacity style={styles.cardButton}>
                <Text style={styles.cardButtonText}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* CBT & Journaling Card */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>CBT & Journaling</Text>

          <View style={{ marginTop: 8 }}>
            <Image
              source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAC42ebDjGtAGFaj_mqJ2nxKwyZXFpqVu6kUWc-zjItmWKj5Cg1k4e1ERkfNzxd2_wF7qgN1eg9-pa33CmLKX8xeUgdG6xVCZ34SjCG9XhJR4gVFH081MJsgLJBGpwU0DIMGahcrZs0Xl02txAMg3ZCeT4HdQ-6LHQ7S8VOWdsXdEc-nj66WurTZMpOerJB-wiuoCL1xaz0DJLxg_6HVVli0kPrzONCwAFk6ce5tmjrJDaOnoSFuuDJzJ-mNxD7OqFEDvLkjK86zbA" }}
              style={styles.largeImage}
            />
            <View style={styles.overlay}>
              <Text style={styles.overlayTitle}>Cognitive Restructuring</Text>
              <Text style={styles.overlayDesc}>Challenge negative thought patterns.</Text>
            </View>
            <TouchableOpacity style={styles.fullButton}>
              <Text style={styles.fullButtonText}>Try Exercise</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 16 }}>
            <Image
              source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1IRXF8Y3vKa80MKZDuMVVJAJA6Wj7DVWcBdjQpJmJGqzpOQZrwG-RgLaIW1cuQbMmJVIsvrObsPu3B7hxjJY5jUBA3WFEPnZchhoba743Fl9D38zMdZFUONT0xP9PAO9HUNs9rkMkIv8j-9obJrmKS76nWN7-d0PJmfZcpZmivhoCiMZj7d2ROu2vVzLFmr5xOhWnwgDyjKPFEjWxNS2Bv-Z0rrst2_tApOc0nzoNULFiBal5jgYNivwZ2Tk-8kSQlnFNYuNDVSM" }}
              style={styles.largeImage}
            />
            <View style={styles.overlay}>
              <Text style={styles.overlayTitle}>Gratitude Journal</Text>
              <Text style={styles.overlayDesc}>Focus on the positive aspects of your life.</Text>
            </View>
            <TouchableOpacity style={styles.fullButton}>
              <Text style={styles.fullButtonText}>Start Journaling</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Professional Help */}
        <View style={styles.card}>
          <Text style={[styles.cardLabel, { color: "red" }]}>Professional Help</Text>

          <View style={{ marginTop: 8, flexDirection: "row", gap: 12 }}>
            <Image
              source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnwOkvvnkVl5545zqgl-FAlsBcoIvjIVMCUES2OVDaC_JKI_E2yYDBX9Id4vS5bOT8zkV8VVBI2IRx7Pim3yCQyACQWUr7QDiKTVpqMKEByRe-1OOY3-7xrm2W6r3qXY6o2Pon3rg0ifGp5g6RX609hmIqOt_mDDc5jgTStTuslMNAAeX2rDhf5xAjf4Fnj9b3D2tgvruD_Ic-TRWV0XrALP47veD4-MVSYbO5RLNwRlNIgKB_WpW1lvjg_3dBSFTeNqMpR8fXU3o" }}
              style={styles.therapistImage}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Connect with a Therapist</Text>
              <Text style={styles.cardDesc}>Get matched with a licensed therapist who specializes in your needs.</Text>
              <TouchableOpacity style={styles.fullButton}>
                <Text style={styles.fullButtonText}>Find a Therapist</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginTop: 16, flexDirection: "row", gap: 12, alignItems: "center" }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Crisis Support</Text>
              <Text style={styles.cardDesc}>If you're in immediate distress, call for support. You're not alone.</Text>
            </View>
            <TouchableOpacity style={[styles.callButton]}>
              <MaterialIcons name="call" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        {[
          { icon: "home", label: "Home" },
          { icon: "book", label: "Journal" },
          { icon: "sentiment-satisfied", label: "Mood" },
          { icon: "groups", label: "Therapy", active: true },
          { icon: "chat_bubble", label: "Chat" },
        ].map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.navItem, item.active && { color: "#13a4ec" }]}
          >
            <MaterialIcons name={item.icon} size={24} color={item.active ? "#13a4ec" : "#666"} />
            <Text style={[styles.navLabel, item.active && { color: "#13a4ec", fontWeight: "700" }]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f7f8" },
  header: { flexDirection: "row", alignItems: "center", padding: 16, backgroundColor: "#f6f7f8" },
  headerButton: { padding: 8 },
  headerTitle: { flex: 1, textAlign: "center", fontSize: 18, fontWeight: "700", color: "#111" },
  sectionTitle: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  card: { backgroundColor: "#fff", borderRadius: 16, padding: 16, marginBottom: 16, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  cardLabel: { fontSize: 12, fontWeight: "600", color: "#13a4ec", textTransform: "uppercase", letterSpacing: 1 },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  cardImage: { width: 64, height: 64, borderRadius: 12 },
  largeImage: { width: "100%", height: 128, borderRadius: 12 },
  overlay: { position: "absolute", bottom: 8, left: 8 },
  overlayTitle: { fontSize: 16, fontWeight: "700", color: "#fff" },
  overlayDesc: { fontSize: 12, color: "#eee" },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#111" },
  cardDesc: { fontSize: 12, color: "#6b7280", marginTop: 4 },
  cardButton: { backgroundColor: "#13a4ec33", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 999 },
  cardButtonText: { color: "#13a4ec", fontWeight: "700" },
  fullButton: { backgroundColor: "#13a4ec", paddingVertical: 10, borderRadius: 12, marginTop: 8, alignItems: "center" },
  fullButtonText: { color: "#fff", fontWeight: "700" },
  therapistImage: { width: 96, height: 96, borderRadius: 12 },
  callButton: { backgroundColor: "red", padding: 12, borderRadius: 999 },
  footer: { flexDirection: "row", justifyContent: "space-around", padding: 8, borderTopWidth: 1, borderColor: "#e5e7eb", backgroundColor: "#f6f7f8" },
  navItem: { flex: 1, alignItems: "center" },
  navLabel: { fontSize: 10, color: "#666" },
});

