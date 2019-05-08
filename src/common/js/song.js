
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
    image: musicData.albummid ? `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000` : 'https://y.gtimg.cn/mediastyle/global/img/album_300.png?max_age=31536000',
    url: `http://isure.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=334034930&vkey=B3AEFFF78188056F49603C98E233B52B04D8BF014A3506F358596F5600DD9AE13E4AF07220B1B78D5708347BFA42E8864D5FEE50F63A578D&uin=0&fromtag=38`
  })
}

export function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
