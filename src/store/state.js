
import { playMode } from '@/common/js/config'
let defaultsinger = {}
try {
  if (localStorage.getItem('singer')) {
    defaultsinger = JSON.parse(localStorage.getItem('singer'))
  }
} catch (e) { }
export default {
  singer: defaultsinger, // 歌手信息
  playing: false, // 播放中
  fullScreen: false, // 全屏显示
  playList: [], // 播放列表
  sequenceList: [], // 随机播放列表
  mode: playMode.sequence, // 播放模式
  currentIndex: -1 // 当前播放歌曲索引
}
