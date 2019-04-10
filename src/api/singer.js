import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

// jsonp请求 歌手列表
export function getSingerList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    g_tk: '1928093487',
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })
  return jsonp(url, data, options)
}

// jsonp请求 根据歌手ID取歌曲列表
export function getSongListById (singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({}, commonParams, {
    g_tk: '701595194',
    loginUin: '2530384598',
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    ct: 24,
    singermid: singerId,
    order: 'listen',
    begin: 0,
    num: 30
  })
  return jsonp(url, data, options)
}
