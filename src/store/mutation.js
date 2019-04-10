
export default {
  changeSinger (state, singer) {
    state.singer = singer
    try {
      localStorage.setItem('singer', JSON.stringify(singer))
    } catch (e) { }
  }
}
