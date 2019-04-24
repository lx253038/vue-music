
import axios from 'axios'

// ajax 请求获取歌词
export function getLyric (musicid) {
  /*   const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg'    */
  const url = '/api/getLyric'
  const data = {
    g_tk: '5381',
    uin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    nobase64: 1,
    musicid: musicid,
    songtype: 0,
    _: '1555929003344'
  }
  return axios.get(url, { params: data }).then(function (res) {
    var ret = res.data
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/
      var matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    return ret
  })
}
