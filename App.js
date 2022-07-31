import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import MusicPlayer from './screens/MusicPlayer';
import Home from './screens/Home';
import SplashScreen from 'react-native-splash-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Materialicons from 'react-native-vector-icons/MaterialIcons';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const {width, height} = Dimensions.get('window');

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#222831" />
      {/* <MusicPlayer /> */}
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Play"
          options={{headerShown: false}}
          component={MusicPlayer}
        />
      </Stack.Navigator>
      {/* <View style={styles.bottomContainer}>
        <View style={styles.bottomControls}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Ionicons name="home-outline" color="#777777" size={30} />
          </TouchableOpacity>
         <TouchableOpacity onPress={() => {}}>
            <MaterialCommunityIcons
              name={`${repeatIcon()}`}
              color={repeatMode !== 'off' ? '#FFD369' : '#777777'}
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MusicPlayer');
            }}>
            <Ionicons name="musical-notes-outline" color="#777777" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Materialicons name="library-music" color="#777777" size={30} />
          </TouchableOpacity>
        </View> 
      </View> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },
  bottomContainer: {
    borderTopColor: '#393e46',
    borderTopWidth: 1,
    width: width,
    alignItems: 'center',
    paddingVertical: 15,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});
