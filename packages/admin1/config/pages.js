


function addPages () {
  /**
   * 多页面配置
   */

  const multipleEntry = require('react-app-rewire-multiple-entry')([{
    entry: 'src/index.tsx',
    template: 'public/index.html',
    outPath: '/index.html',
  }])

  const addEntry = () => config => {
    /**
     * 多页面配置
     */
    multipleEntry.addMultiEntry(config)
    return config
  }
  const addEntryProxy = () => (configFunction) => {
    /**
     * 多页面代理
     */
    multipleEntry.addEntryProxy(configFunction)
    return configFunction
  }
  return [
    addEntry(),
    addEntryProxy()
  ]
}

module.exports = { addPages }