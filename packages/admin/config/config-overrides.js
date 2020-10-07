
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
const { removePre, removeManifest, addThread } = require('./custom')


module.exports = {
  webpack: override(
    ...addBabelPlugins("react-css-modules"),
    useEslintRc('.eslintrc.js'),
    ...antd(),
    resources(),

    addWebpackAlias({
      ["@"]: "src",
      ["@actions"]: "src/redux/actions",
      ["@reducer"]: "src/redux/reducer",
      ["@epics"]: "src/redux/epics",
      ["@utils"]: "src/utils",
      ["@routes"]: "src/routes",
      ["@providers"]: "src/providers"
    }),
    addThread(),
    removePre(),
    removeManifest(),
  ),
  devServer: overrideDevServer(
    addProxy()
  )
}
