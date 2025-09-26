import React, { useState } from "react";
import { SafeAreaView, View, Text, Image, TouchableOpacity } from "react-native";

const TopBar = () => {
  const [title, setTitle] = useState("Mood Tracker");

  return (
    <SafeAreaView
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: 16,
      }}
    >
      {/* Left: Menu Icon */}
      <TouchableOpacity onPress={() => alert("Menu pressed!")}>
        <Image
          source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
          resizeMode="stretch"
          style={{ width: 32, height: 32 }}
        />
      </TouchableOpacity>

      {/* Middle: Screen Title */}
      <Text
        style={{
          color: "#111616",
          fontSize: 22,
          fontWeight: "bold",
          textAlign: "center",
          flex: 1,
        }}
      >
        {title}
      </Text>

      {/* Right: Profile Icon */}
      <TouchableOpacity onPress={() => alert("Profile pressed!")}>
        <Image
          source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
          resizeMode="stretch"
          style={{ width: 32, height: 32 }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TopBar;
