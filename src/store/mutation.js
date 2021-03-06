
export default {
  changevkey (state, vkey) {
    state.vkey = vkey
    try {
      localStorage.setItem('vkey', vkey)
    } catch (e) { }
  },
  changeSinger (state, singer) {
    state.singer = singer
    try {
      localStorage.setItem('singer', JSON.stringify(singer))
    } catch (e) { }
  },
  changeDisc (state, disc) {
    state.disc = disc
    try {
      localStorage.setItem('disc', JSON.stringify(disc))
    } catch (e) { }
  },
  changeTopDisc (state, topdisc) {
    state.topdisc = topdisc
    try {
      localStorage.setItem('topdisc', JSON.stringify(topdisc))
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
  },
  addQueryHistory (state, history) {
    state.history = history
  }
}
