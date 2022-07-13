import {View, StyleSheet, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import MusicPlayer from './components/MusicPlayer';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

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
