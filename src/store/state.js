
import { playMode } from '@/common/js/config'
import { loadSearch } from '@/common/js/cache'
let defaultsinger = {}
let defaultdisc = {}
let defaulttopdisc = {}
let defaultvkey = ''
try {
  if (localStorage.getItem('singer')) {
    defaultsinger = JSON.parse(localStorage.getItem('singer'))
  }
  if (localStorage.getItem('disc')) {
    defaultdisc = JSON.parse(localStorage.getItem('disc'))
  }
  if (localStorage.getItem('topdisc')) {
    defaulttopdisc = JSON.parse(localStorage.getItem('topdisc'))
  }
  if (localStorage.getItem('vkey')) {
    defaultvkey = localStorage.getItem('vkey')
  }
} catch (e) { }
export default {
  vkey: defaultvkey,
  singer: defaultsinger, // 歌手信息
  disc: defaultdisc, // 歌单显示
  topdisc: defaulttopdisc, // 排行榜歌单
  playing: false, // 播放中
  fullScreen: false, // 全屏显示
  playList: [], // 播放列表
  sequenceList: [], // 随机播放列表
  mode: playMode.sequence, // 播放模式
  currentIndex: -1, // 当前播放歌曲索引
  history: loadSearch()
}
