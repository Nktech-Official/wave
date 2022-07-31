/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
import {NavigationContainer} from '@react-navigation/native';

function Root() {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => Root);
TrackPlayer.registerPlaybackService(() => require('./service.js'));
