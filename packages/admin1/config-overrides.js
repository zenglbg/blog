
const {
  override,
  addWebpackAlias,
  overrideDevServer,
  useEslintRc,
  addBabelPlugins,
} = require('customize-cra')
const { antd, resources } = require('./config/loader')
const { addProxy } = require('./config/proxy')
const { removePre, removeManifest, addThread, publicPathPlugin } = require('./config/custom')


module.exports = {
  webpack: override(
    // ...addBabelPlugins("react-css-modules"),
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // useEslintRc('.eslintrc.js'),
    ...antd(),
    resources(),

    addWebpackAlias({
      "@": "src",
      "@lib": "src/lib",
      '@api': "src/lib/api",
      "@actions": "src/lib/redux/actions",
      "@reducer": "src/lib/redux/reducer",
      "@epics": "src/lib/redux/epics",
    }),
    addThread(),
    removePre(),
    removeManifest(),
    publicPathPlugin()
  ),
  devServer: overrideDevServer(
    addProxy()
  )
}
