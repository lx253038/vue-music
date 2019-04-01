<template>
  <div class="recommend" ref="recommend">
    <div>
      <recom-swiper :swiperList="swiperList"></recom-swiper>
      <div class="recommend-content">
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li @click="selectItem(item)" v-for="item in discList" class="item" :key="item.dissid">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="loading-container" v-show="!discList.length">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import RecomSwiper from '@/base/swiper/Swiper'
import Loading from '@/base/loading/loading'
import { getRecommend, getDiscList } from '@/api/recommend'
import { ERR_OK } from '@/api/config'
export default {
  name: 'Recommend',
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
    this.scroll = new Bscroll(this.$refs.recommend)
  },

  methods: {
    /* 推荐页轮播图片 */
    _getRecommend () {
      getRecommend().then(this.getRecommendSucc)
    },
    getRecommendSucc (res) {
      if (res.code === ERR_OK) {
        this.swiperList = res.data.slider
        console.log(res.data.slider)
      }
    },
    /* 全部歌单 */
    _getDiscList () {
      getDiscList().then(this.getDiscListSucc)
    },
    getDiscListSucc (res) {
      if (res.code === ERR_OK) {
        this.discList = res.data.list
        console.log(res.data.list)
      }
    },
    // 点击某一歌单
    selectItem (_this) {

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
      .list-title
        height 65px
        line-height 65px
        text-align center
        font-size $font-size-medium
        color $color-theme
      .item
        display flex
        box-sizing border-box
        align-items center
        padding 0 20px 20px 20px
        .icon
          flex 0 0 60px
          width 60px
          padding-right 20px
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
