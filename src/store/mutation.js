
export default {
  changeSinger (state, singer) {
    state.singer = singer
    try {
      localStorage.setItem('singer', JSON.stringify(singer))
    } catch (e) { }
  },
  changePlaying (state, flag) {
    state.playing = flag
  },
  changeFullScreen (state, flag) {
    state.fullScreen = flag
  },
  changePlayList (state, playlist) {
    state.playList = playlist
  },
  changeSequenceList (state, sequenceList) {
    state.sequenceList = sequenceList
  },
  changeMode (state, mode) {
    state.mode = mode
  },
  changeCurrentIndex (state, currentIndex) {
    state.currentIndex = currentIndex
  }
}
