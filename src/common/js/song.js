
import { ERR_OK } from '@/api/config'
import { getLyric } from '@/api/song'
export default class Song {
  // eslint-disable-next-line
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
  getLyric () {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.id).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = unescapeHTML(res.lyric)
          resolve(this.lyric)
        } else {
          reject(new Error('no lyric'))
        }
      })
    })
  }
}

var unescapeHTML = function (lrc) {
  var t = document.createElement('div')
  t.innerHTML = lrc + ''
  return t.innerHTML
}

export function createSong (musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=334034930&vkey=3B32BFE7CF0FA4CF8A222BC4340AE9BE3A0EE2CFF5E5ACEF5C1BC1E310CBD0447B216B5C24D27E36D915E9586719316B260B0338276F3E39&uin=0&fromtag=38`
  })
}

function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
