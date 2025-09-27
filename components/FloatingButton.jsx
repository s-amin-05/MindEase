import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import axios from 'axios';

export default function FloatingButton() {
  const [recording, setRecording] = useState(null);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        alert('Permission to access microphone is required!');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );

      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    setLoading(true);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    setRecording(null);
    console.log("hi");
    // Send audio to backend
    const formData = new FormData();
    formData.append('file', {
      uri,
      name: 'recording.wav',
      type: 'audio/wav',
    });
    console.log("hi");
    try {
      const res = await axios.post('http://10.245.65.172:8000/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log("hi")
      console.log('Response:', res.data);
      setReport(res.data);
    } catch (err) {
      console.error('Error uploading', err);
      alert('Upload failed. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="blue" />}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={recording ? stopRecording : startRecording}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {recording ? 'Stop' : 'Mic'}
        </Text>
      </TouchableOpacity>

      {report && (
        <View style={{ marginTop: 20 }}>
          <Text>Transcript: {report.transcript}</Text>
          <Text>Depression Score: {report.depression_score}</Text>
          <Text>Description: {report.description}</Text>
          <Text>Risks: {report.risks.join(', ')}</Text>
          <Text>Advice: {report.advice.join(', ')}</Text>
          <Text>Emotions:</Text>
          {report.emotions.map((e, idx) => (
            <Text key={idx}>{e.label}: {e.score}</Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', padding: 20 },
  floatingButton: {
    backgroundColor: 'blue',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});