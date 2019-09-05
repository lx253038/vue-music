<template>
  <transition name="list-fade">
    <div class="playlist" @click="hide" v-show="showFlag">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon" :class="iconMode" @click="_changeMode"></i>
            <span class="text">{{modeText}}</span>
            <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
          </h1>
        </div>
        <div ref="listContent" class="list-content">
          <transition-group name="list" tag="ul">
            <li
              :key="item.id"
              class="item"
              :id="item.id"
              v-for="(item,index) in sequenceList"
              @click="selectItem(item,index)"
            >
              <i class="current" :class="currentSong.id===item.id?'icon-play':''"></i>
              <span class="text">{{item.name}}</span>
              <span @click.stop="toggleFavorite(item)" class="like">
                <i :class="getFavoriteIcon(item)"></i>
              </span>
              <span @click.stop="deleteOne(item,index)" class="delete">
                <i class="icon-delete"></i>
              </span>
            </li>
          </transition-group>
        </div>
        <div class="list-operate">
          <!--        <div @click="addSong" class="add">
            <i class="icon-add"></i>
            <span class="text">添加歌曲到队列</span>
          </div>-->
        </div>
        <div @click="hide" class="list-close">
          <span>关闭</span>
        </div>
      </div>
      <confirm ref="confirm" @confirm="confirmClear" text="是否清空播放列表" confirmBtnText="清空"></confirm>
    </div>
  </transition>
</template>

<script >
import Confirm from '@/base/confirm/confirm'
import { mapState, mapMutations } from 'vuex'
import Bscroll from 'better-scroll'
import { playerMixin } from '@/common/js/mixin'
import { playMode } from '@/common/js/config'
export default {
  mixins: [playerMixin],
  name: 'PlayList',
  components: {
    Confirm
  },
  data () {
    return {
      showFlag: false,
      refreshDelay: 120
    }
  },
  mounted () {
    this.scroll = new Bscroll(this.$refs.listContent, { click: true, probeType: 3 })
  },
  computed: {
    ...mapState(['sequenceList', 'currentIndex', 'playList', 'mode', 'Playing']),
    currentSong () {
      return this.playList[this.currentIndex]
    },
    modeText () {
      return this.mode === playMode.random ? '随机播放' : this.mode === playMode.sequence ? '顺序播放' : '单曲循环'
    },
    iconMode () {
      if (this.mode === playMode.random) {
        return 'icon-random'
      } else if (this.mode === playMode.sequence) {
        return 'icon-sequence'
      } else {
        return 'icon-loop'
      }
    }
  },
  watch: {
    currentSong (newSong, oldSong) {
      if (oldSong && newSong && newSong.id !== oldSong.id) {
        setTimeout(() => {
          this.scroll.refresh()
          this.scrollToCurrent(newSong)
        }, 100)
      }
    }
  },
  methods: {
    ...mapMutations(['changeCurrentIndex', 'changePlaying', 'changeSequenceList', 'changeMode', 'changePlayList']),
    show () {
      this.showFlag = true
      setTimeout(() => {
        this.scroll.refresh()
        this.scrollToCurrent(this.currentSong)
      }, 20)
    },
    hide () {
      this.showFlag = false
    },
    showConfirm () {
      this.$refs.confirm.show()
    },
    addSong () {

    },
    confirmClear () {
      this.changePlaying(false)
      setTimeout(() => {
        this.changePlayList([])
        this.changeSequenceList([])
        this.changeCurrentIndex(-1)
      }, 20)
    },
    selectItem (item, index) {
      if (this.mode === playMode.random) {
        index = this.playList.findIndex((song) => {
          return song.id === item.id
        })
      }
      this.changeCurrentIndex(index)
      if (!this.Playing) {
        this.changePlaying(true)
      }
    },
    getFavoriteIcon (item, index) {
      return 'icon-favorite'
    },
    scrollToCurrent () {
      this.scroll.scrollToElement(document.getElementById(`${this.currentSong.id}`), 500)
    },
    deleteOne (item) {
      this.changeSequenceList(this.delArrayBySong(item, this.sequenceList))
      let index = this.playList.findIndex((song) => {
        return song.id === item.id
      })
      this.changePlayList(this.delArrayBySong(item, this.playList))
      if (index < this.currentIndex || this.currentIndex === this.playList.length) {
        this.changeCurrentIndex(this.currentIndex - 1)
      }
      if (!this.Playing) {
        this.changePlaying(true)
      }
    },
    delArrayBySong (song, songList) {
      let list = []
      songList.forEach((item, index) => {
        if (item.id !== song.id) {
          list.push(item)
        }
      })
      return list
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.playlist
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  z-index 200
  background-color $color-background-d
  &.list-fade-enter-active, &.list-fade-leave-active
    transition opacity 0.3s
    .list-wrapper
      transition all 0.3s
  &.list-fade-enter, &.list-fade-leave-to
    opacity 0
    .list-wrapper
      transform translate3d(0, 100%, 0)
  &.list-fade-enter, .list-wrapper
    position absolute
    left 0
    bottom 0
    width 100%
    background-color $color-highlight-background
    .list-header
      position relative
      padding 20px 30px 10px 20px
      .title
        display flex
        align-items center
        .icon
          margin-right 10px
          font-size 30px
          color $color-theme-d
        .text
          text-align left
          flex 1
          font-size $font-size-medium
          color $color-text-l
        .clear
          extend-click()
          .icon-clear
            font-size $font-size-medium
            color $color-text-d
    .list-content
      max-height 265px
      overflow hidden
      .item
        text-align left
        display flex
        align-items center
        height 40px
        padding 0 30px 0 20px
        overflow hidden
        &.list-enter-active, &.list-leave-active
          transition all 0.1s
        &.list-enter, &.list-leave-to
          height 0
        .current
          flex 0 0 20px
          width 20px
          font-size $font-size-small
          color $color-theme-d
        .text
          flex 1
          no-wrap()
          font-size $font-size-medium
          color $color-text-d
        .like
          extend-click()
          margin-right 15px
          font-size $font-size-small
          color $color-theme
          .icon-favorite
            color $color-sub-theme
        .delete
          extend-click()
          font-size $font-size-small
          color $color-theme
    .list-operate
      width 140px
      margin 20px auto 30px auto
      .add
        display flex
        align-items center
        padding 8px 16px
        border 1px solid $color-text-l
        border-radius 100px
        color $color-text-l
        .icon-add
          margin-right 5px
          font-size $font-size-small-s
        .text
          font-size $font-size-small
    .list-close
      text-align center
      line-height 50px
      background $color-background
      font-size $font-size-medium-x
      color $color-text-l
</style>
