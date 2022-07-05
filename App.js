import {View, StyleSheet, StatusBar} from 'react-native';
import React from 'react';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#222831" />
      <MusicPlayer />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
