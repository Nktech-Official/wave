import {View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Materialicons from 'react-native-vector-icons/MaterialIcons';
const {width, height} = Dimensions.get('window');

export default function NavigationButtons({navigation, home, play}) {
  return (
    <View style={styles.bottomContainer}>
      <View style={styles.bottomControls}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Ionicons
            name="home-outline"
            color={home ? '#FFD369' : '#777777'}
            size={30}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Play');
          }}>
          <Ionicons
            name="musical-notes-outline"
            color={play ? '#FFD369' : '#777777'}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Materialicons name="library-music" color="#777777" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    borderTopColor: '#393e46',
    borderTopWidth: 1,
    width: width,
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#222831',
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});
