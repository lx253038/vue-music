<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="query" v-model="query" class="box" :placeholder="placeholder">
    <i @click="clear" v-show="query" class="icon-dismiss"></i>
  </div>
</template>

<script>
import { debounce } from 'common/js/util'

export default {
  name: 'SearchBox',
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    },
    querykey: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      query: ''
    }
  },
  activated () {
    this.query = ''
  },
  watch: {
    querykey (newQueryKey) {
      this.query = newQueryKey
    }
  },
  created () {
    this.$watch('query', debounce((newQuery) => {
      this.$emit('query', newQuery)
    }, 300))
  },
  methods: {
    clear () {
      this.query = ''
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
.search-box
  display flex
  align-items center
  box-sizing border-box
  width 100%
  padding 0 6px
  height 35px
  background $color-highlight-background
  border-radius 6px
  .icon-search
    font-size 24px
    color $color-theme
  .box
    flex 1
    margin 0 5px
    line-height 25px
    background $color-highlight-background
    border 0
    outline none
    color $color-text
    font-size $font-size-medium
    &::placeholder
      color $color-text-d
  .icon-dismiss
    font-size 16px
    color $color-text-d
</style>
