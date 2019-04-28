
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
