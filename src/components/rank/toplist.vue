<template>
  <transition name="slide">
    <music-list :rank="rank" :songlist="songlist" :title="title" :bgImage="bgImage"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { mapState } from 'vuex'
import { getTopSongJsonp } from '@/api/rank'
import { ERR_OK } from '@/api/config'
import { createSong } from '@/common/js/song'
export default {
  name: 'TopList',
  components: {
    MusicList
  },
  data () {
    return {
      songlist: [],
      rank: true
    }
  },
  mounted () {
    this._getTopSongJsonp()
  },
  computed: {
    ...mapState(['topdisc']),
    title () {
      return this.topdisc.topTitle
    },
    bgImage () {
      if (this.songlist.length) {
        return this.songlist[0].image
      }
      return ''
    }
  },
  methods: {
    _getTopSongJsonp () {
      getTopSongJsonp(this.topdisc.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songlist = this._normalizeSongs(res.detail.data.songInfoList)
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((item) => {
        let musicData = {}
        musicData.songid = item.id
        musicData.albummid = item.album.mid
        musicData.songmid = item.mid
        musicData.singer = item.singer
        musicData.songname = item.name
        musicData.albumname = item.album.name
        musicData.interval = item.interval
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
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
