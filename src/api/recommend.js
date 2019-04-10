import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

// jsonp请求 推荐页轮播图
export function getRecommend () {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uni: 2530384598,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}
// jsonp请求 所有歌手list
export function getSingerList () {
  /*  url=https://c.y.qq.com/cgi-bin/musicu.fcg */
  const url = '/api/getSingerList'
  const data = {
    g_tk: '701595194',
    loginUin: '2530384598',
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: { 'comm': { 'ct': 24, 'cv': 0 }, 'singerList': { 'module': 'Music.SingerListServer', 'method': 'get_singer_list', 'param': { 'area': -100, 'sex': -100, 'genre': -100, 'index': -100, 'sin': 0, 'cur_page': 1 } } }
  }

  return axios.get(url, { params: data }).then(function (res) {
    return res.data
  })
}

/* ajax请求全部歌单 */
export function getDiscList () {
  /*     url=https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg  //实际请求地址手机端请求需更改 */
  /*   /api/getDiscList */
  const url = '/api/getDiscList'
  const data = {
    picmid: 1,
    rnd: 0.18756540854928794,
    g_tk: '1195332101',
    loginUin: '2530384598',
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 19
  }

  return axios.get(url, { params: data }).then(function (res) {
    return res.data
  })
}
