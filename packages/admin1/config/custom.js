const { resolve } = require('path')

const removePre = () => config => {
  const updatedRules = config.module.rules.map(rule => {
    if (rule.enforce === 'pre') {
      return null
    }
    return rule
  }).filter(_ => !!_)

  if (!!process.env.IS_PRE) {
    config.module.rules = updatedRules
  }
  return config
}


const removeManifest = () => config => {
  /**
   * 禁用 ManifestPlugin
   */
  config.plugins = config.plugins.filter(
    p => p.constructor.name !== "ManifestPlugin"
  )
  return config
}




const addThread = () => (config) => {
  /**
   * thread-loader 会将后面的 loader 放置在一个 worker 池里面运行，以达到多线程构建
   */
  const updatedRules = config.module.rules.map(rule => {
    // console.log(rule)
    // console.log(String(rule.test))
    if (rule.oneOf) {
      const oneOf = rule.oneOf.map(r => {
        if (/(tsx)/g.test(String(r.test))) {

          // let use
          // if (r.use && Array.isArray(rule.use)) {
          //   use = r.use.unshift('thread-loader')
          // }else {
          //   use = [
          //     'thread-loader',
          //     r.loader
          //   ]
          // }
          // r.use = use
        }
        return r
      })

      // console.log(oneOf)

      rule.oneOf = oneOf

    }
    return rule
  })

  config.module.rules = updatedRules
  return config
}


const publicPathPlugin = () => config => {

  config.output = {
    ...config.output,
    path: resolve(__dirname, "../build"),
    publicPath: '/',
    filename: "[name].[hash:8].js",
    chunkFilename: "[name].[hash:8].async.js",
  }
  return config
}

module.exports = { removePre, removeManifest, addThread, publicPathPlugin }
