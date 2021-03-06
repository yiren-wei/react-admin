const {
  override,
  fixBabelImports,
  addWebpackAlias,
  addDecoratorsLegacy,
} = require('customize-cra')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 去除debugger和console
const myPlugin = [
  new UglifyJsPlugin({
    uglifyOptions: {
      warnings: false,
      compress: {
        drop_debugger: true,
        drop_console: true,
      },
    },
  }),
]
module.exports = function override(config) {
  // do stuff with the webpack config...
  return config
}
module.exports = override(
  fixBabelImports('antd', {
    libraryDirectory: 'es',
    style: 'css',
  }),
  addWebpackAlias({ '@': path.resolve(__dirname, 'src') }),
  (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins = [...config.plugins, ...myPlugin]
    }

    return config
  },
  // 装饰器语法支持
  addDecoratorsLegacy(),
)
