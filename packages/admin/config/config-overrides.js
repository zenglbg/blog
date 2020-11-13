
const {
  override,
  addWebpackAlias,
  overrideDevServer,
  useEslintRc,
  addBabelPlugin,
  addBabelPlugins
} = require('customize-cra')

const { antd, resources } = require('./loader')

const { addProxy } = require('./proxy')
const { removePre, removeManifest, addThread, publicPathPlugin } = require('./custom')


module.exports = {
  webpack: override(
    ...addBabelPlugins("react-css-modules"),
    useEslintRc('.eslintrc.js'),
    ...antd(),
    resources(),

    addWebpackAlias({
      ["@"]: "src",
      ['@lib']: "src/lib",
      ["@redux"]: "src/lib/redux",
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
