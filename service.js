import TrackPlayer from 'react-native-track-player';

module.exports = async function () {
  try {
    TrackPlayer.addEventListener('remote-play', async () => {
      await TrackPlayer.play();
    });

    TrackPlayer.addEventListener('remote-pause', async () => {
      await TrackPlayer.pause();
    });

    TrackPlayer.addEventListener('remote-next', async () => {
      await TrackPlayer.skipToNext();
    });

    TrackPlayer.addEventListener('remote-previous', async () => {
      await TrackPlayer.skipToPrevious();
    });

    TrackPlayer.addEventListener('remote-stop', async () => {
      console.log('remote-stop');
      await TrackPlayer.stop();
    });
    TrackPlayer.addEventListener('remote-jump-forward', async () => {
      const posp = await TrackPlayer.getPosition();
      await TrackPlayer.seekTo(posp + 15);
    });
    TrackPlayer.addEventListener('remote-jump-backward', async () => {
      const posn = await TrackPlayer.getPosition();
      await TrackPlayer.seekTo(posn - 15);
    });
  } catch (error) {}
};
