
const addProxy = () => (config) => {
  /**
   * 添加代理
   */
  config.proxy = {
    '/api': {
      target: 'http://localhost:9999',
      changeOrigin: true,
      pathRewrite: { '^/api': '/api' },
    },
  }

  return config
}

module.exports = {
  addProxy
}