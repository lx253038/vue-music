<template>
  <div ref="suggest" class="suggest">
    <ul class="suggest-list">
      <li
        @click="selectItem(item,index)"
        class="suggest-item"
        v-for="(item,index) in result"
        :key="index"
      >
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import Loading from '@/base/loading/loading'
import NoResult from '@/base/no-result/no-result'
import { mapState, mapMutations, mapActions } from 'vuex'
import { createSong } from '@/common/js/song'
import { searchByKeyWord } from '@/api/search'
import { ERR_OK } from '@/api/config'
const TYPE_SINGER = 'singer'
const perpage = 20
export default {
  name: 'Suggest',
  components: {
    Loading,
    NoResult
  },
  props: {
    showSinger: {
      type: Boolean,
      default: true
    },
    query: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      page: 1,
      result: [],
      songlist: [],
      hasSinger: false,
      hasMore: true
    }
  },
  computed: {
    ...mapState(['vkey'])
  },
  mounted () {
    this.scroll = new Bscroll(this.$refs.suggest, { click: true })
    this.scroll.on('scrollEnd', (pos) => {
      if (this.scroll.y <= this.scroll.maxScrollY + 50) {
        this.searchMore()
      }
    })
  },
  watch: {
    query (newQuery) {
      this.hasMore = true
      this.page = 1
      this.songlist = []
      if (newQuery !== '' && newQuery.trim() !== '') {
        console.log(newQuery)
        this.search()
      } else {
        this.result = []
      }
    }
  },
  methods: {
    ...mapMutations(['changeSinger']),
    ...mapActions(['selectPlay']),
    search () {
      this.hasMore = true
      searchByKeyWord(this.query, this.page, this.showSinger, perpage).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.data)
          this.result = this._genResult(res.data)
          this._checkHasMore(res.data)
          console.log(this.result)
        }
      })
    },
    searchMore () {
      if (!this.hasMore) {
        return
      }
      this.page++
      searchByKeyWord(this.query, this.page, this.showSinger, perpage).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.data)
          this.result = this.result.concat(this._genResult(res.data))
          this._checkHasMore(res.data)
          console.log(this.result)
        }
      })
    },
    _checkHasMore (data) {
      const song = data.song
      if (!song.list.length || (song.curpage * perpage) > song.totalnum) {
        this.hasMore = false
      }
      console.log(this.hasMore)
    },
    _genResult (data) {
      if (this.page === 1) {
        this.hasSinger = false
      }
      let ret = []
      if (data.zhida && data.zhida.zhida_singer && data.zhida.zhida_singer.singerMID && this.page === 1) {
        ret.push({ ...data.zhida.zhida_singer, ...{ type: TYPE_SINGER } })
        this.hasSinger = true
      }
      if (data.song) {
        ret = ret.concat(this._normalizeSongs(data.song.list))
      }
      return ret
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
        if (musicData.songid) {
          ret.push(createSong(musicData, this.vkey))
        }
      })
      this.songlist = this.songlist.concat(ret)
      return ret
    },
    selectItem (item, index) {
      if (this.hasSinger) {
        index = index - 1
      }
      this.$emit('selectQuery', this.query)
      if (item.type === TYPE_SINGER) {
        let singer = {
          id: item.singerMID,
          name: item.singerName,
          avatar: item.singerPic
        }
        this.changeSinger(singer)
        this.$router.push({
          path: `/search/${item.singerMID}`
        })
      } else {
        console.log(this.songlist)
        this.selectPlay({
          list: this.songlist,
          index: index
        })
      }
    },
    getIconCls (item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    getDisplayName (item) {
      if (item.type === TYPE_SINGER) {
        return `${item.singerName}`
      } else {
        return `${item.name}<font class="itemIcon"> ♥ </font>${item.singer}`
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.suggest
  height 100%
  overflow hidden
  .suggest-list
    .suggest-item
      padding 0 30px
      display flex
      align-items center
      height 35px
      width 100%
      // border-top solid 0.5px black
      .icon
        flex 0 0 30px
        width 30px
        margin-right 10px
        [class^='icon-']
          font-size 15px
          color $color-text-d
      .name
        flex 1
        font-size $font-size-medium
        color $color-text-d
        overflow hidden
        text-align left
        height 35px
        line-height 35px
        .text
          no-wrap()
          .itemIcon
            color $color-theme
            margin 0 5px
  .no-result-wrapper
    position absolute
    width 100%
    top 50%
    transform translateY(-50%)
</style>
