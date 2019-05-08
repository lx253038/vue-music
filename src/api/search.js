
import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

// jsonp请求 搜索关键词
export function getSearchHotKey () {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  const data = Object.assign({}, commonParams, {
    _: '1556343514439',
    uin: 0,
    platform: 'h5',
    needNewCode: 1
  })
  return jsonp(url, data, options)
}

// jsonp请求 搜索数据
export function searchByKeyWord (query, page, zhida, perpage) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp'
  const data = Object.assign({}, commonParams, {
    w: query,
    p: page,
    catZhida: zhida ? 1 : 0,
    perpage,
    n: perpage,
    ct: 24,
    qqmusic_ver: '1298',
    new_json: 1,
    remoteplace: 'txt.yqq.center',
    searchid: '49151640171470543',
    t: 0,
    aggr: 1,
    cr: 1,
    lossless: 0,
    flag_qc: 0,
    g_tk: '1904380003',
    loginUin: '2530384598',
    hostUin: 0,
    platform: 'yqq.json',
    needNewCode: 0
  })
  return jsonp(url, data, options)
}
