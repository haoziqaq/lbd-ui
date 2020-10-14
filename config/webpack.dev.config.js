/**
 * @fileOverview webpack.dev.config
 * @author 齐皓
 * @date 2020/10/9
 */
const path = require('path')
const argv = process.argv

function resolveComponentName() {
  const componentNameArg = argv.find((arg) => arg.startsWith('--componentName='))
  return componentNameArg
    ? componentNameArg.split('=')[1]
    : ''
}

module.exports = {
  entry: path.resolve(__dirname, `../src/${resolveComponentName()}/example/example.js`)
}