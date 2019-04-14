
export default {
  selectPlay (ctx, { list, index }) {
    ctx.commit('changePlaying', true)
    ctx.commit('changeFullScreen', true)
    ctx.commit('changePlayList', list)
    ctx.commit('changeSequenceList', list)
    ctx.commit('changeCurrentIndex', index)
  }
}
