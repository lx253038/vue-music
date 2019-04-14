<template>
  <div id="app">
    <m-header></m-header>
    <m-tab></m-tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <m-player></m-player>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import MTab from 'components/tab/tab'
import MPlayer from 'components/player/player'
export default {
  components: {
    MHeader,
    MTab,
    MPlayer
  }
}
</script>

<style lang="stylus" scoped>
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
</style>
