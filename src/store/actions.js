import { playMode } from '@/common/js/config'
import { shuffle } from '@/common/js/util'
import { saveSearch, deleteSearch, clearSearch } from '@/common/js/cache'
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
  },
  saveHistory ({ commit }, query) {
    commit('addQueryHistory', saveSearch(query))
  },
  deleteHistory ({ commit }, query) {
    commit('addQueryHistory', deleteSearch(query))
  },
  clearSearch ({ commit }) {
    commit('addQueryHistory', clearSearch())
  }

}

function findIndex (list, song) {
  let index = list.findIndex((item) => {
    return item.id === song.id
  })
  return index
}
