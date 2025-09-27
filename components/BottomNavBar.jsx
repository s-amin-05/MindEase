import { router } from "expo-router";
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
// Import the necessary icons from Expo's package
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const BottomNavBar = () => {
  return (
    <View style={styles.container}>
      {/* Left and Right Buttons */}
      <View style={styles.sideButtons}>
        {/* Home */}
        <TouchableOpacity style={styles.sideButton} onPress={() => router.replace('/home')}>
          <Ionicons
            name="home-outline" // Icon for Home
            size={28}
            color="#111616" // Match label color
          />
          <Text style={styles.label}>Home</Text>
        </TouchableOpacity>

        {/* Mood Report */}
        <TouchableOpacity style={styles.sideButton} onPress={() => router.push('/moodanalysis')}>
          <MaterialCommunityIcons
            name="chart-line-variant" // Icon for reporting/charts
            size={28}
            color="#111616" // Match label color
          />
          <Text style={styles.label}>Mood Report</Text>
        </TouchableOpacity>
      </View>

      {/* ChatBot Button in middle */}
      <TouchableOpacity
        style={styles.chatBotButton}
        onPress={() => router.push('/ChatScreen')}
      >
        <Ionicons
          name="chatbubble-ellipses-outline" // Icon for Chat/Bot
          size={36} 
          color="#111616" 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",   // fixed position
    bottom: 0,
    width: "100%",
    height: 70,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 4,
    elevation: 8,
    justifyContent: "center",
  },
  sideButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 60,
  },
  sideButton: {
    alignItems: "center",
  },
  icon: {
    width: 28,
    height: 28,
  },
  label: {
    fontSize: 12,
    color: "#111616",
    marginTop: 2,
  },
  chatBotButton: {
    position: "absolute",
    bottom: 20, // floating above the bar
    left: width / 2 - 30, // center horizontally (60 / 2 = 30)
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFC107",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 8,
  },
});

export default BottomNavBar;