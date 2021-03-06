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

// 获取vkey
export function getSongVkey (songmid) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  const data = Object.assign({}, commonParams, {
    callback: 'musicJsonCallback',
    loginUin: 3051522991,
    format: 'jsonp',
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    uin: 2530384598,
    guid: 9152999990,
    songmid: songmid,
    filename: `C400003mBrF72dILfK.m4a`
  })

  return jsonp(url, data)
}

export function getSongVkey2 (songmid) {
  const url = `https://u.y.qq.com/cgi-bin/musicu.fcg?data=%7B"req"%3A%7B"module"%3A"CDN.SrfCdnDispatchServer"%2C"method"%3A"GetCdnDispatch"%2C"param"%3A%7B"guid"%3A"4191963453"%2C"calltype"%3A0%2C"userip"%3A""%7D%7D%2C"req_0"%3A%7B"module"%3A"vkey.GetVkeyServer"%2C"method"%3A"CgiGetVkey"%2C"param"%3A%7B"guid"%3A"4191963453"%2C"songmid"%3A%5B"${songmid}"%5D%2C"songtype"%3A%5B0%5D%2C"uin"%3A"2530384598"%2C"loginflag"%3A1%2C"platform"%3A"20"%7D%7D%2C"comm"%3A%7B"uin"%3A2530384598%2C"format"%3A"json"%2C"ct"%3A24%2C"cv"%3A0%7D%7D`
  const data = Object.assign({}, commonParams, {
    '-': 'getplaysongvkey236822762818',
    g_tk: 1015932300,
    loginUin: 2530384598,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0
  })
  return jsonp(url, data)
}

// jsonp请求 推荐页个性电台歌单
export function getRadioList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_radiolist.fcg'
  const data = Object.assign({}, commonParams, {
    channel: 'radio',
    page: 'index',
    tpl: 'wk',
    new: 1,
    p: '0.1303012048555774',
    g_tk: '1904380003',
    loginUin: '2530384598',
    hostUin: 0,
    platform: 'yqq.json',
    needNewCode: 0
  })
  return jsonp(url, data, options)
}
// jsonp请求 个性电台歌曲获取
export function getRadioSongList (radioId) {
  const num = 30
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?loginUin=253038459&data=%7B%22songlist%22%3A%7B%22module%22%3A%22pf.radiosvr%22%2C%22method%22%3A%22GetRadiosonglist%22%2C%22param%22%3A%7B%22id%22%3A' + radioId + '%2C%22firstplay%22%3A1%2C%22num%22%3A' + num + '%7D%7D%2C%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A0%7D%7D'
  return jsonp(url, options)
}

// ajax请求 所有歌手list（此方法未使用）
export function getSingerList () {
  /* const url=https://c.y.qq.com/cgi-bin/musicu.fcg */
  const url = '/api/getcommonList'
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

// ajax 请求全部歌单(未使用)
export function getDiscList () {
  /*   const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'    */
  const url = '/api/getcommonList'
  const data = {
    g_tk: '5381',
    loginUin: '2530384598',
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: { 'comm': { 'ct': 24 }, 'playlist': { 'method': 'get_playlist_by_category', 'param': { 'id': 71, 'curPage': 1, 'size': 50, 'order': 5, 'titleid': 71 }, 'module': 'playlist.PlayListPlazaServer' } }
  }
  return axios.get(url, { params: data }).then(function (res) {
    return res.data.playlist
  })
}

// ajax 请求根据歌单Id获取歌单音乐（未使用）
export function getSongsByDiscId (discid) {
  /*   const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'    */
  const url = '/api/getSongsByDiscId'
  const data = {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    new_format: 1,
    disstid: discid,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0
  }
  return axios.get(url, { params: data }).then(function (res) {
    return res.data
  })
}

/* ajax请求全部歌单 */
/*
export function getDiscList () {
      url=https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg  //实际请求地址手机端请求需更改
    /api/getDiscList
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
} */
