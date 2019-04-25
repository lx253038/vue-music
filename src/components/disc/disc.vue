<template>
  <transition name="slide">
    <music-list :songlist="songlist" :title="title" :bgImage="bgImage"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { mapState } from 'vuex'
import { getSongsByDiscId } from '@/api/recommend'
import { ERR_OK } from '@/api/config'
import { createSong } from '@/common/js/song'
export default {
  name: 'Disc',
  components: {
    MusicList
  },
  data () {
    return {
      songlist: []
    }
  },
  mounted () {
    this._getSongsByDiscId()
  },
  computed: {
    ...mapState(['disc']),
    title () {
      return this.disc.title
    },
    bgImage () {
      return this.disc.cover_url_big
    }
  },
  methods: {
    _getSongsByDiscId () {
      getSongsByDiscId(this.disc.tid).then((res) => {
        if (res.code === ERR_OK) {
          this.songlist = this._normalizeSongs(res.cdlist[0].songlist)
          console.log(this.songlist)
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
