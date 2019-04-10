<template>
  <div class="wrapper">
    <swiper :options="swiperOption" v-if="showSwiper">
      <!-- slides -->
      <swiper-slide v-for="item of swiperList" :key="item.id">
        <a :href="item.linkUrl">
          <img class="swiper-img" :src="item.picUrl">
        </a>
      </swiper-slide>

      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
      <!-- 向前箭头 -->
      <!-- <div class="swiper-button-prev" slot="button-prev"></div>  -->
      <!-- 向后箭头 -->
      <!-- <div class="swiper-button-next" slot="button-next"></div> -->
      <!-- 滚动条 -->
      <!-- <div class="swiper-scrollbar" slot="scrollbar"></div> -->
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'RecomSwiper',
  props: {
    swiperList: Array
  },
  data () {
    return {
      swiperOption: {

        pagination: '.swiper-pagination',
        loop: true,
        autoplay: 1500,
        autoplayDisableOnInteraction: false

      }
    }
  },
  mounted () {
    console.log(this.swiperList)
  },
  computed: {
    showSwiper () {
      return this.swiperList.length
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper >>> .swiper-pagination-bullet-active
  background #ffffff
.wrapper
  overflow hidden
  width 100%
  height 0
  padding-bottom 40%
  background #eeeeee
  .swiper-img
    width 100%
</style>
