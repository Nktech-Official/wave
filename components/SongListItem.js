import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';

export default function SongListItem({item}) {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.artworkWrapper}>
          <Image source={item.artwork} style={styles.artworkImage} />
        </View>
        <View style={styles.txtWrapper}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.artist}>{item.artist}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: '100%',
    // paddingVertical: 20,
    marginVertical: 5,
    marginLeft: 15,
    flexDirection: 'row',
  },
  artworkWrapper: {
    width: 60,
    height: 60,
  },
  artworkImage: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  txtWrapper: {
    height: '100%',
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    color: '#EEEEEE',
  },
  artist: {
    font: '500',
    color: '#929494',
  },
});
