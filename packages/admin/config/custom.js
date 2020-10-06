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

module.exports = { removePre, removeManifest }
