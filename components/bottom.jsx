import React from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const BottomNavBar = () => {
  return (
    <View style={styles.container}>
      {/* Left and Right Buttons */}
      <View style={styles.sideButtons}>
        {/* Home */}
        <TouchableOpacity style={styles.sideButton} onPress={() => alert("Home Pressed!")}>
          <Image
            source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
            style={styles.icon}
          />
          <Text style={styles.label}>Home</Text>
        </TouchableOpacity>

        {/* Mood Report */}
        <TouchableOpacity style={styles.sideButton} onPress={() => alert("Mood Report Pressed!")}>
          <Image
            source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
            style={styles.icon}
          />
          <Text style={styles.label}>Mood Report</Text>
        </TouchableOpacity>
      </View>

      {/* ChatBot Button in middle */}
      <TouchableOpacity
        style={styles.chatBotButton}
        onPress={() => alert("ChatBot Pressed!")}
      >
        <Image
          source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
          style={{ width: 36, height: 36 }}
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
 