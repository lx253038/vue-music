'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api/getDiscList': { //全部歌单
        target: 'https://c.y.qq.com',
        headers: {
          referer: 'https://c.y.qq.com/',
          host: 'c.y.qq.com'
        },
        pathRewrite: {
          '^/api/getDiscList': '/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg',
        }
      },
      '/api/getcommonList': { //分类歌单
        target: 'https://u.y.qq.com',
        headers: {
          referer: 'https://u.y.qq.com/',
          host: 'u.y.qq.com'
        },
        pathRewrite: {
          '^/api/getcommonList': '/cgi-bin/musicu.fcg'
        }
      },
      '/api/getLyric': { //获取歌词
        target: 'https://c.y.qq.com',
        headers: {
          referer: 'https://c.y.qq.com/',
          host: 'c.y.qq.com'
        },
        pathRewrite: {
          '^/api/getLyric': '/lyric/fcgi-bin/fcg_query_lyric.fcg',
        }
      },
      '/api/getSongsByDiscId': { //歌单歌曲
        target: 'https://c.y.qq.com',
        headers: {
          referer: 'https://y.qq.com/n/yqq/playsquare/1141739290.html',
          host: 'y.qq.com'
        },
        pathRewrite: {
          '^/api/getSongsByDiscId': '/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
        }
      },
      '/api/getTopList': { //排行榜
        target: 'https://c.y.qq.com',
        headers: {
          referer: 'c.y.qq.com',
          host: 'c.y.qq.com'
        },
        pathRewrite: {
          '^/api/getTopList': '/v8/fcg-bin/fcg_myqq_toplist.fcg'
        }
      }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8088, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../../www/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../../www'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
