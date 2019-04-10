<template>
  <div class="listview" ref="listview">
    <div ref="scrollDiv">
      <div v-for="group in singerList" class="list-group" ref="listGroup" :key="group.title">
        <h2 class="list-group-title">{{group.title}}</h2>
        <div>
          <div
            @click="selectItem(item)"
            v-for="item in group.items"
            :key="item.id"
            class="list-group-item"
          >
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="list-shortcut"
      @touchstart="onCutTouchStart"
      @touchmove.stop.prevent="onCutTouchMove"
      @touchend="onCutTouchEnd"
    >
      <ul>
        <li
          v-for="(item, index) in singerList"
          :key="index"
          :data-index="index"
          class="item"
          ref="alItem"
          :class="{'current':currentIndex===index}"
        >{{item.title.substr(0,1)}}</li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>
    <div class="loading-container" v-show="!singerList.length">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import Loading from '@/base/loading/loading'
import { mapMutations } from 'vuex'
const TITLE_HEIGHT = 29

export default {
  name: 'ListView',
  components: {
    Loading
  },
  data () {
    return {
      startY: 0,
      touchStatus: false,
      touchIndex: 0,
      currentIndex: 0,
      scrollY: -1,
      listHeight: [],
      diff: -1
    }
  },
  props: {
    singerList: Array
  },
  mounted () {
    setTimeout(() => { this._initScroll() }, 20)
  },
  computed: {
    fixedTitle () {
      if (this.scrollY > 0) {
        return ''
      }
      return this.singerList[this.currentIndex] ? this.singerList[this.currentIndex].title : ''
    }
  },
  watch: {
    singerList () {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY (newY) {
      const listHeight = this.listHeight
      // 当滚动到顶部，newY>0
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 在中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          return
        }
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2
    },
    diff (newVal) {
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
    }
  },
  methods: {
    onCutTouchStart (e) {
      let startTouchIndex = e.target.getAttribute('data-index')
      if (startTouchIndex !== null) {
        this._scrollToIndex(startTouchIndex)
        this.touchStatus = true
        this.startY = e.touches[0].clientY
        this.touchIndex = startTouchIndex
      }
    },
    onCutTouchMove (e) {
      if (this.touchStatus) {
        const touchY = e.touches[0].clientY
        const index = Number(this.touchIndex) + (touchY - this.startY) / 18 | 0
        this._scrollToIndex(index)
      }
    },
    onCutTouchEnd () {
      this.touchStatus = false
    },
    _calculateHeight () {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    _initScroll () {
      this.scroll = new Bscroll(this.$refs.listview, {
        probeType: 3,
        click: true
      })
      this.scroll.on('scroll', (pos) => {
        this.scrollY = pos.y
      })
    },
    _scrollToIndex (index) {
      if (index >= 0 && index < this.singerList.length) {
        this.scrollY = -this.listHeight[index]
        this.scroll.scrollToElement(this.$refs.listGroup[index])
      }
    },
    selectItem (item) {
      this.changeSinger(item)
      this.$router.push({
        path: '/singer/' + item.id
      })
    },
    ...mapMutations(['changeSinger'])
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
.listview
  overflow hidden
  position fixed
  width 100%
  top 88px
  bottom 0
  background $color-background
  .list-group
    padding-bottom 30px
    .list-group-title
      text-align left
      height 30px
      line-height 30px
      padding-left 20px
      font-size $font-size-small
      color $color-text-l
      background $color-highlight-background
    .list-group-item
      display flex
      align-items center
      padding 20px 0 0 30px
      .avatar
        width 50px
        height 50px
        border-radius 50%
      .name
        margin-left 20px
        color $color-text-l
        font-size $font-size-medium
  .list-shortcut
    position absolute
    z-index 30
    right 0
    top 50%
    transform translateY(-50%)
    width 20px
    padding 20px 0
    border-radius 10px
    text-align center
    background $color-background-d
    font-family Helvetica
    .item
      padding 3px
      line-height 1
      color $color-text-l
      font-size $font-size-small
      &.current
        color $color-theme
  .list-fixed
    text-align left
    position absolute
    top -1px
    left 0
    width 100%
    .fixed-title
      height 30px
      line-height 30px
      padding-left 20px
      font-size $font-size-small
      color $color-text-l
      background $color-highlight-background
  .loading-container
    position fixed
    width 100%
    top 45%
    transform translateY(50%)
</style>
