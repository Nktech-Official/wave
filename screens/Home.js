import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {songs} from '../model/songs';
import SongListItem from '../components/SongListItem';
import NavigationButtons from '../components/NavigationButtons';
export default function Home({navigation}) {
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <FlatList
          data={songs}
          renderItem={SongListItem}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  height: 1,
                  width: '100%',
                  backgroundColor: '#343738',
                }}
              />
            );
          }}
          keyExtractor={item => {
            return item.id;
          }}
          Verticle
        />
      </View>
      <NavigationButtons home={true} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },
});
