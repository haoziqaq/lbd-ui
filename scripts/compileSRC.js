/**
 * @fileOverview compileSRC
 * @author 齐皓
 * @date 2020/10/9
 */
const fs = require('fs-extra')
const path = require('path')

const compile = async () => {
  const indexPath = path.resolve(__dirname, '../src/index.js')
  const indexTSPath = path.resolve(__dirname, '../src/index.d.ts')
  await fs.exists(indexPath) && await fs.unlink(indexPath)
  await fs.exists(indexTSPath) && await fs.unlink(indexTSPath)
  const srcDir = await fs.readdir(path.resolve(__dirname, '../src'))
  const template = `\
${srcDir.map(componentName => `import ${componentName} from './${componentName}'`).join('\r\n')}

export {
  ${srcDir.map(componentName => componentName).join(',\r\n  ')}
}

export default {
  install(Vue) {
${srcDir.map(componentName => `    Vue.component(${componentName}.name, ${componentName})`).join('\r\n')}
  }
}
`
  const dTemplate = `\
${srcDir.map(componentName => `export declare const ${componentName}: any`).join('\r\n')}  

declare const LbdUI: { install: (Vue: any) => void }
export default LbdUI
`
  await Promise.all([
    fs.writeFile(indexPath, template),
    fs.writeFile(indexTSPath, dTemplate)
  ])
}

compile().catch(console.log)






