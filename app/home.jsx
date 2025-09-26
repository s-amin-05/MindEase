import React, { useState } from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";
import BottomNavBar from "../components/BottomNavBar";


/* 🔹 Journal Card Component */
const JournalCard = ({ title, subtitle, img }) => (
  <View
    style={{
      flexDirection: "row",
      backgroundColor: "#FFFFFF",
      borderRadius: 12,
      padding: 16,
      marginHorizontal: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 6,
      elevation: 6,
    }}
  >
    <View style={{ flex: 1, paddingBottom: 13 }}>
      <Text style={{ color: "#111616", fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
        {title}
      </Text>
      <Text style={{ color: "#607C89", fontSize: 14, marginBottom: 1 }}>{subtitle}</Text>
    </View>
    {img && (
      <Image
        source={{ uri: img }}
        resizeMode="stretch"
        style={{ borderRadius: 12, width: 119, height: 58 }}
      />
    )}
  </View>
);

/* 🔹 Call Card Component (title only) */
const CallCard = ({ title, img }) => (
  <View
    style={{
      flexDirection: "row",
      backgroundColor: "#FFFFFF",
      borderRadius: 12,
      padding: 16,
      marginHorizontal: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 6,
      elevation: 6, 
    }}
  >
    <View style={{ flex: 1, paddingBottom: 13 }}>
      <Text style={{ color: "#111616", fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
        {title}
      </Text>
    </View>
    {img && (
      <Image
        source={{ uri: img }}
        resizeMode="stretch"
        style={{ borderRadius: 12, width: 119, height: 58 }}
      />
    )}
  </View>
);

export default () => {
  const [userName, setUserName] = useState("User");
  const [mood, setMood] = useState("Feeling lonely");
  const [journalEntry, setJournalEntry] = useState({
    title: "Title",
    date: "2024-07-26",
    img: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/K45S8MkOn3/4yiduu05_expires_30_days.png"
  });
  const [callEntry] = useState({
    title: "Call",
    img: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/K45S8MkOn3/gufjpzdo_expires_30_days.png"
  });
  const [selectedDay, setSelectedDay] = useState(null);

  const days = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <TopBar />
      <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <View style={{ backgroundColor: "#FFFFFF" }}>

          {/* Greeting */}
          <Text style={{ color: "#111616", fontSize: 22, fontWeight: "bold", marginVertical: 20, marginLeft: 16 }}>
            Hello, {userName}
          </Text>

          {/* Today’s Mood Card */}
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#DBE2E5",
              borderRadius: 12,
              borderWidth: 1,
              paddingTop: 19,
              marginVertical: 12,
              marginHorizontal: 16,
            }}
          >
            <View style={{ flexDirection: "row", marginBottom: 12, marginLeft: 21 }}>
              <View style={{ marginTop: 18, marginRight: 50 }}>
                <Text style={{ color: "#111616", fontSize: 22, fontWeight: "bold", marginBottom: 9 }}>
                  Today’s Mood
                </Text>
                <Text style={{ color: "#111616", fontSize: 16, fontWeight: "bold", marginLeft: 3, width: 106 }}>
                  {mood}
                </Text>
              </View>
              <TouchableOpacity
                style={{ backgroundColor: "#EFF2F4", borderRadius: 8, paddingVertical: 2, paddingHorizontal: 6 }}
                onPress={() => setMood("Feeling happy 😊")}
              >
                <Text style={{ color: "#000000", fontSize: 96, fontWeight: "bold", width: 96 }}>🔥</Text>
              </TouchableOpacity>
            </View>

            {/* Days of the Week */}
            <View style={{ flexDirection: "row", padding: 12, marginLeft: 22 }}>
              {days.map((day, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    alignItems: "center",
                    backgroundColor: selectedDay === index ? "#FFC107" : "#EFF2F4",
                    borderRadius: 12,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    marginRight: 12,
                  }}
                  onPress={() => setSelectedDay(index)}
                >
                  <Text style={{ color: "#000000", fontSize: 14, fontWeight: "bold" }}>{day}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Journal Section */}
          <Text style={{ color: "#111616", fontSize: 22, fontWeight: "bold", marginLeft: 16, marginBottom: 12 }}>
            Journal
          </Text>

          {/* Render Journal Entry */}
          <JournalCard title={journalEntry.title} subtitle={journalEntry.date} img={journalEntry.img} />

          {/* Call Section */}
          

          {/* Render Call Entry (title only) */}
          <CallCard title={callEntry.title} img={callEntry.img} />

        </View>
      </ScrollView>
      <BottomNavBar />
    </SafeAreaView>
  );
};
