import { playMode } from '@/common/js/config'
import { shuffle } from '@/common/js/util'

export default {
  selectPlay ({ commit, state }, { list, index }) {
    if (state.mode === playMode.random) {
      let randomList = shuffle(list)
      commit('changePlayList', randomList)
      index = findIndex(randomList, list[index])
    } else {
      commit('changePlayList', list)
    }
    commit('changePlaying', true)
    commit('changeFullScreen', true)
    commit('changeSequenceList', list)
    commit('changeCurrentIndex', index)
  },
  randomPlay ({ commit }, { list }) {
    commit('changeMode', playMode.random)
    commit('changeSequenceList', list)
    commit('changePlayList', shuffle(list))
    commit('changePlaying', true)
    commit('changeFullScreen', true)
    commit('changeCurrentIndex', 0)
  }
}

function findIndex (list, song) {
  let index = list.findIndex((item) => {
    return item.id === song.id
  })
  return index
}
