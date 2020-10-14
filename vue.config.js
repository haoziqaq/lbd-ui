/**
 * @fileOverview vue.config.js
 * @author 齐皓
 * @date 2020/10/9
 */
const env = process.env.NODE_ENV

function createWebpackConfig() {
  return env === 'development'
    ? require('./config/webpack.dev.config')
    : require('./config/webpack.build.config')
}

module.exports = {
  publicPath: './',
  outputDir: 'lib',
  configureWebpack: createWebpackConfig()
}

