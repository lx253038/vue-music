<template>
  <transition name="slide">
    <music-list :songlist="songlist" :title="title" :bgImage="bgImage"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { mapState } from 'vuex'
import { getSongListById } from '@/api/singer'
import { getSongVkey2 } from '@/api/recommend'
import { ERR_OK } from '@/api/config'
import { createSong } from '@/common/js/song'
export default {
  name: 'SingerDetail',
  components: {
    MusicList
  },
  data () {
    return {
      songlist: []
    }
  },
  mounted () {
    this._getSongListById()
  },
  computed: {
    ...mapState(['singer']),
    title () {
      return this.singer.name
    },
    bgImage () {
      return this.singer.avatar
    }
  },
  methods: {
    _getSongListById () {
      getSongListById(this.singer.id).then(res => {
        if (res.code === ERR_OK) {
          this.songlist = this._normalizeSongs(res.data.list)
          console.log(this.songlist)
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach(item => {
        let musicData = item.musicData
        if (musicData.songid && musicData.albummid) {
          getSongVkey2(musicData.songmid).then((res) => {
            ret.push(createSong(musicData, res.req_0.data.midurlinfo[0].purl))
          })
        }
      })
      return ret
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>
