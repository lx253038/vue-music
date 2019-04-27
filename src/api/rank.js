
import axios from 'axios'
import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
// ajax 请求排行榜
export function getTopList () {
  /*   const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'    */
  const url = '/api/getTopList'
  const data = {
    _: '1556252134777',
    g_tk: 5381,
    uin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1
  }
  return axios.get(url, { params: data }).then(function (res) {
    return res.data
  })
}

// jsonp请求 歌手列表
export function getTopListJsonp () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  const data = Object.assign({}, commonParams, {
    _: '1556252134777',
    g_tk: 5381,
    uin: 0,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1
  })
  return jsonp(url, data, options)
}
// jsonp请求 排行榜包含歌曲
export function getTopSongJsonp (topid) {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22detail%22%3A%7B%22module%22%3A%22musicToplist.ToplistInfoServer%22%2C%22method%22%3A%22GetDetail%22%2C%22param%22%3A%7B%22topId%22%3A' + topid + '%2C%22offset%22%3A0%2C%22num%22%3A50%2C%22period%22%3A%22%22%7D%7D%2C%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A0%7D%7D'
  return jsonp(url, options)
}
