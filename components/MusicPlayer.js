import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import {songs} from '../model/data';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Icon from '../assets/ICONS/notification.png';
const {width, height} = Dimensions.get('window');
const setupPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      backwardJumpInterval: 15,
      forwardJumpInterval: 15,

      icon: Icon,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.JumpForward,
        Capability.JumpBackward,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.JumpBackward,
      ],
      notificationCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.JumpForward,
        Capability.JumpBackward,
        Capability.SeekTo,
      ],
    });
    await TrackPlayer.add(songs);
  } catch (error) {
    console.log(error);
  }
};

const togglePlayback = async playbackState => {
  try {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack !== null) {
      if (playbackState == State.Paused || playbackState === 1) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  } catch {
    await setupPlayer();
    await togglePlayback();
  }
};
const skipTo = async id => {
  await TrackPlayer.skip(id);
};
export default function MusicPlayer() {
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null);
  const [repeatMode, setRepeatMode] = useState('off');
  const [songIndex, setSongIndex] = useState(0);
  const [trackArtwork, setTrackArtwork] = useState();
  const [trackTitle, setTrackTitle] = useState();
  const [trackArtist, setTrackArtist] = useState();
  useTrackPlayerEvents(
    [Event.PlaybackTrackChanged, Event.RemoteStop],
    async event => {
      if (
        event.type === Event.PlaybackTrackChanged &&
        event.nextTrack !== null
      ) {
        const track = await TrackPlayer.getTrack(event.nextTrack);
        const {title, artwork, artist} = track;
        setTrackArtist(artist);
        setTrackTitle(title);
        setTrackArtwork(artwork);
      } else if (event.type === Event.RemoteStop) {
      }
    },
  );

  useEffect(() => {
    setupPlayer();
    scrollX.addListener(({value}) => {
      const index = Math.round(value / width);
      skipTo(index);
      setSongIndex(index);
    });
    return () => {
      scrollX.removeAllListeners();
    };
  }, []);
  const repeatIcon = () => {
    if (repeatMode === 'off') {
      return 'repeat-off';
    } else if (repeatMode === 'track') {
      return 'repeat-once';
    } else if (repeatMode === 'repeat') {
      return 'repeat';
    }
  };

  const changeRepeatMode = () => {
    if (repeatMode == 'off') {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      setRepeatMode('track');
    } else if (repeatMode == 'track') {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);

      setRepeatMode('repeat');
    } else if (repeatMode == 'repeat') {
      TrackPlayer.setRepeatMode(RepeatMode.Off);

      setRepeatMode('off');
    }
  };
  const skipForward = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
    TrackPlayer.skipToNext();
  };
  const skipBackward = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
    TrackPlayer.skipToPrevious();
  };

  const renderSongs = ({index, item}) => {
    return (
      <Animated.View
        style={{
          width: width,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.artworkWrapper}>
          <Image source={trackArtwork} style={styles.artworkImage} />
        </View>
      </Animated.View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Maincontainer}>
        <View style={{width: width}}>
          <Animated.FlatList
            ref={songSlider}
            renderItem={renderSongs}
            data={songs}
            keyExtractor={item => {
              return item.id;
            }}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {x: scrollX},
                  },
                },
              ],
              {useNativeDriver: true},
            )}
          />
        </View>
        <View>
          <Text style={styles.title}>{trackTitle}</Text>
          <Text style={styles.artist}>{trackArtist}</Text>
        </View>
        <View style={styles.controlWrapper}>
          <Slider
            style={styles.progressContainer}
            value={progress.position}
            maximumValue={progress.duration}
            thumbTintColor="#FFD369"
            minimumTrackTintColor="#FFD369"
            maximumTrackTintColor="#FFF"
            onSlidingComplete={async value => {
              await TrackPlayer.seekTo(value);
            }}
          />
          <View style={styles.progressLableContainer}>
            <Text style={styles.ProgressLableTxt}>
              {new Date(progress.position * 1000).toISOString().substr(14, 5)}
            </Text>
            <Text style={styles.ProgressLableTxt}>
              {new Date((progress.duration - progress.position) * 1000)
                .toISOString()
                .substr(14, 5)}
            </Text>
          </View>
          <View style={styles.musicControlWrapper}>
            <View style={styles.musicControlls}>
              <TouchableOpacity onPress={skipBackward}>
                <Ionicons
                  name="play-skip-back-outline"
                  color="#FFD369"
                  size={35}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  togglePlayback(playbackState);
                }}>
                <Ionicons
                  name={
                    playbackState === State.Playing
                      ? 'ios-pause-circle'
                      : 'ios-play-circle'
                  }
                  color="#FFD369"
                  size={75}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={skipForward}>
                <Ionicons
                  name="play-skip-forward-outline"
                  color="#FFD369"
                  size={35}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomControls}>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="heart-outline" color="#777777" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={changeRepeatMode}>
            <MaterialCommunityIcons
              name={`${repeatIcon()}`}
              color={repeatMode !== 'off' ? '#FFD369' : '#777777'}
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="share-outline" color="#777777" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="ellipsis-horizontal" color="#777777" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },
  Maincontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artworkWrapper: {
    width: 300,
    height: 340,
    marginBottom: 25,
    elevation: 5,
    shadowColor: '#ccc',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  artworkImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#EEEEEE',
  },
  artist: {
    fontSize: 16,
    fontWeight: '200',
    textAlign: 'center',
    color: '#EEEEEE',
  },
  controlWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  progressContainer: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: 'row',
  },
  progressLableContainer: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexDirection: 'row',
  flexDirection: 'row',
  flexDirection: 'row',
  ProgressLableTxt: {
    color: '#fff',
  },
  musicControlWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  musicControlls: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
    marginTop: 15,
    alignItems: 'center',
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
