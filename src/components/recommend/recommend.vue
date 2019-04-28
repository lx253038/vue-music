<template>
  <div class="recommend" ref="recommend">
    <div>
      <recom-swiper :swiperList="swiperList"></recom-swiper>
      <div class="recommend-content">
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <div v-for="disc in discList" :key="disc.type" class="discul">
            <h2 class="list-group-title">{{disc.name}}</h2>

            <div
              @click="selectItem(item)"
              v-for="item in disc.radioList"
              class="item"
              :key="item.radioId"
              v-show="item.radioId!=='99'"
            >
              <div class="icon">
                <img width="80" height="80" v-lazy="item.radioImg">
              </div>
              <div class="text">
                <h2 class="desc" v-html="item.radioName"></h2>
                <!--  <p class="desc" v-html="disc.name"></p> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="loading-container" v-show="!discList.length">
      <loading></loading>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import RecomSwiper from '@/base/swiper/Swiper'
import Loading from '@/base/loading/loading'
import { getRecommend, getRadioList } from '@/api/recommend'
import { ERR_OK } from '@/api/config'
import { playlistMixin } from '@/common/js/mixin'
import { mapMutations } from 'vuex'
export default {
  name: 'Recommend',
  mixins: [playlistMixin],
  data () {
    return {
      swiperList: [],
      discList: []
    }
  },
  components: {
    RecomSwiper,
    Loading
  },
  mounted () {
    this._getRecommend()
    this._getDiscList()
    this.scroll = new Bscroll(this.$refs.recommend, { click: true })
  },

  methods: {
    ...mapMutations(['changeDisc']),
    /* 推荐页轮播图片 */
    _getRecommend () {
      getRecommend().then(this.getRecommendSucc)
    },
    getRecommendSucc (res) {
      if (res.code === ERR_OK) {
        this.swiperList = res.data.slider
      }
    },
    /* 全部歌单 */
    _getDiscList () {
      getRadioList().then((res) => {
        console.log(res.data.data.groupList)
        if (res.code === ERR_OK) {
          this.discList = res.data.data.groupList
          console.log(this.discList)
        }
      })
    },
    formatList (list) {
      let resut = []
      list.forEach((item) => {
        resut.concat(item.radioList)
        console.log(resut)
      })
      return resut
    },
    handlePlaylist (playList) {
      const bottom = playList.length > 0 ? '60px' : ''
      this.$refs.recommend.style.bottom = bottom
      this.refresh()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    // 点击某一歌单
    selectItem (item) {
      this.$router.push({
        path: `/recommend/${item.radioId}`
      })
      this.changeDisc(item)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.recommend
  overflow hidden
  position fixed
  width 100%
  top 88px
  bottom 0
  .recommend-content
    height 100%
    overflow hidden
    .recommend-list
      .discul
        overflow hidden
      .list-group-title
        text-align left
        height 30px
        line-height 30px
        padding-left 20px
        font-size $font-size-small
        color $color-text-l
        background $color-highlight-background
        margin-bottom 20px
      .list-title
        height 65px
        line-height 65px
        text-align center
        font-size $font-size-medium
        color $color-theme
      .item
        width 50%
        display flex
        float left
        text-align center
        box-sizing border-box
        align-items center
        padding 0 10px 20px 20px
        .icon
          flex 0 0 80px
          width 60px
          padding-right 10px
        .text
          display flex
          flex-direction column
          justify-content center
          flex 1
          line-height 20px
          overflow hidden
          font-size $font-size-medium
          .name
            text-align left
            margin-bottom 10px
            color $color-text
          .desc
            text-align left
            color $color-text-d
  .loading-container
    position absolute
    width 100%
    top 50%
    transform translateY(50%)
</style>
