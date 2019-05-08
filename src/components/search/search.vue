<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" :querykey="querykey" @query="queryKey"></search-box>
    </div>
    <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
      <div :refreshDelay="refreshDelay" ref="shortcut" class="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li @click="addQuery(item.k)" class="item" v-for="item in hotKey" :key="item.n">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span @click="showConfirm" class="clear">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list @delete="deleteHistory" @select="addQuery" :searches="searchHistory"></search-list>
          </div>
        </div>
      </div>
    </div>
    <div class="search-result" v-show="query" ref="searchResult">
      <suggest ref="suggest" @selectQuery="saveHistory" :query="query"></suggest>
    </div>

    <confirm ref="confirm" @confirm="clearSearch" text="是否清空所有搜索历史" confirmBtnText="清空"></confirm>
    <router-view></router-view>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import SearchBox from '@/base/search-box/search-box'
import Suggest from 'components/suggest/suggest'
import { getSearchHotKey } from '@/api/search'
import { playlistMixin } from '@/common/js/mixin'
import { mapActions, mapState } from 'vuex'
import SearchList from '@/base/search-list/search-list'
import Confirm from '@/base/confirm/confirm'
export default {
  name: 'Search',
  mixins: [playlistMixin],
  components: {
    SearchBox,
    Suggest,
    SearchList,
    Confirm
  },
  data () {
    return {
      querykey: '',
      query: '',
      hotKey: []
    }
  },
  activated () {
    this.query = ''
    this.scroll = new Bscroll(this.$refs.shortcut, { click: true })
  },
  watch: {
    query (newQuery) {
      if (!newQuery) {
        setTimeout(() => {
          this.scroll.refresh()
        }, 200)
      }
    }
  },
  computed: {
    ...mapState(
      {
        'searchHistory': 'history'
      })
  },
  mounted () {
    this._getSearchHotKey()
  },
  methods: {
    ...mapActions(['saveHistory', 'deleteHistory', 'clearSearch']),
    queryKey (newQuery) {
      this.query = newQuery
      console.log(this.query)
    },
    addQuery (hotQuery) {
      this.querykey = hotQuery
    },
    _getSearchHotKey () {
      getSearchHotKey().then((res) => {
        this.hotKey = res.data.hotkey.slice(0, 11)
      })
    },
    refreshDelay () {

    },
    handlePlaylist (playList) {
      const bottom = playList.length > 0 ? '70px' : ''
      this.$refs.searchResult.style.bottom = bottom
      this.$refs.shortcutWrapper.style.bottom = bottom
      this.refresh()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    showConfirm () {
      this.$refs.confirm.show()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.search
  .search-box-wrapper
    margin 20px
  .shortcut-wrapper
    position fixed
    top 178px
    bottom 20px
    width 100%
    .shortcut
      height 100%
      overflow hidden
      .hot-key
        margin 0 20px 0px 20px
        .title
          color $color-theme
          text-align left
          margin-bottom 20px
          font-size $font-size-medium
        .item
          display inline-block
          padding 5px 10px
          margin 0 18px 10px 0
          border-radius 6px
          background $color-highlight-background
          font-size $font-size-medium
          color $color-text-d
      .search-history
        position relative
        margin 0 20px
        .title
          text-align left
          display flex
          align-items center
          height 40px
          font-size $font-size-medium
          color $color-theme
          .text
            flex 1
          .clear
            extend-click()
            .icon-clear
              font-size $font-size-medium
              color $color-text-d
  .search-result
    position fixed
    width 100%
    top 160px
    bottom 0
</style>
