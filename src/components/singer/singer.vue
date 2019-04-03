<template>
  <div>
    <list-view :singerList="singerList"></list-view>
  </div>
</template>

<script>
import { getSingerList } from '@/api/singer'
import { ERR_OK } from '@/api/config'
import ListView from './components/listview'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10
export default {
  name: 'Singer',
  components: {
    ListView
  },
  data () {
    return {
      singerList: []
    }
  },
  mounted () {
    this._getSingerList()
  },
  methods: {
    _getSingerList () {
      getSingerList().then(this.getSingerListSucc)
    },
    getSingerListSucc (res) {
      if (res.code === ERR_OK) {
        this.singerList = this._normalizeSinger(res.data.list)

        console.log(this.singerList)
      }
    },
    _normalizeSinger (list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push({
            id: item.Fsinger_id,
            name: item.Fsinger_name,
            avatar: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000' + item.Fsinger_mid + '.jpg?max_age=2592000'
          })
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push({
          id: item.Fsinger_id,
          name: item.Fsinger_name,
          avatar: 'http://y.gtimg.cn/music/photo_new/T001R150x150M000' + item.Fsinger_mid + '.jpg?max_age=2592000'
        })
      })
      // 为了得到有序列表，我们需要处理 map
      let ret = []
      let hot = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
