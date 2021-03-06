const path = require('path');
const pxtorem = require('postcss-pxtorem');

const svgSpriteDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''), // antd-mobile 内置svg
  path.resolve(__dirname, 'src/svg/'),  // 业务代码本地私有 svg 存放目录
];

export default {
  entry: 'src/index.js',
  svgSpriteLoaderDirs: svgSpriteDirs,
  "theme": "./theme.config.js",
  autoprefixer : {
    browsers : [
      "iOS >= 8" ,
      "Android >= 4"
    ]
  } ,
  env: {
    development: {
      extraBabelPlugins: [
        'dva-hmr',
        'transform-runtime',
        ['import', { 'libraryName': 'antd-mobile', 'libraryDirectory': 'lib', 'style': true }],
        ["module-resolver", {
          "root": ["./src"],
          "alias": {
            "NbComponent": "./src/components/",
            "utils": "./src/utils/index.js",
            "iScroll": "./src/lib/iscroll-probe.js",
            "iScrollRefresh": "./src/lib/iscroll-refresh.js",
            "iScrollRefreshStyles": "./src/lib/iscroll-refresh.less",
            "audioplayer": "./src/lib/audioplayer.js",
          }
        }]
      ],
      extraPostCSSPlugins: [
        pxtorem({
          rootValue: 100,
          propWhiteList: [],
        }),
      ],
    },
    production: {
      extraBabelPlugins: [
        'transform-runtime',
        ['import', { 'libraryName': 'antd-mobile', 'libraryDirectory': 'lib', 'style': true }],
        ["module-resolver", {
          "root": ["./src"],
          "alias": {
            "NbComponent": "./src/components/",
            "utils": "./src/utils/index.js",
            "iScroll": "./src/lib/iscroll-probe.js",
            "iScrollRefresh": "./src/lib/iscroll-refresh.js",
            "iScrollRefreshStyles": "./src/lib/iscroll-refresh.less",
            "audioplayer": "./src/lib/audioplayer.js",
          }
        }]
      ],
      extraPostCSSPlugins: [
        pxtorem({
          rootValue: 100,
          propWhiteList: [],
        }),
      ],
    }
  }
}
