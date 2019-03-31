<template>
  <div id="app">
    <m-header></m-header>
  </div>
</template>

<script type="text/ecmascript-6">
import MHeader from 'components/m-header/m-header'

export default {
  components: {
    MHeader
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
