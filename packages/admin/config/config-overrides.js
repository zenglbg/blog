
const {
  override,
  addWebpackAlias,
  addLessLoader,
  addDecoratorsLegacy,
  useEslintRc,
  overrideDevServer,
  fixBabelImports,

} = require('customize-cra')
const { getLoader } = require("react-app-rewired")
const { merge } = require('webpack-merge')
const tsImportPluginFactory = require('ts-import-plugin')

// const { paths } = require('react-app-rewired')

// paths.dotenv = `${paths.appPath}/config/.env`

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
  return {
    addEntry,
    addEntryProxy
  }
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


const customize = () => (config) => {
  // 要自定义的配置内容

  // const tsLoader = getLoader(
  //   config.module.rules,
  //   rule =>
  //     rule.loader &&
  //     typeof rule.loader === 'string' &&
  //     rule.loader.includes('ts-loader')
  // );
  // tsLoader.options = {
  //   getCustomTransformers: () => ({
  //     before: [ tsImportPluginFactory({
  //       libraryDirectory: 'es',
  //       libraryName: 'antd',
  //       style: 'css',
  //     }) ]
  //   })
  // };
  return config
}

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

const antd = () => {
  // antd 按需加载 && less-loader
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  })
  addLessLoader({
    strictMath: true,
    noIeCompat: true,
    modifyVars: {
      "@primary-color": "#1DA57A", // for example, you use Ant Design to change theme color.
    },
    cssLoaderOptions: {}, // .less file used css-loader option, not all CSS file.
    cssModules: {
      localIdentName: "[path][name]__[local]--[hash:base64:5]", // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
    },
  })


}

const antdMobile = () => {
  /**
   * antd-mobile PostCSS && rem 配置
   * 需要注意的是和 addLessLoader 一起使用时，addPostcssPlugins 要放在后面，这和直接使用 webpack 配置是一样的顺序。
   * */

  addLessLoader()
  addPostcssPlugins([require("postcss-px2rem-exclude")({
    remUnit: 16,
    propList: ['*'],
    exclude: ''
  })])
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
  })

}


module.exports = {
  webpack: override(
    // addEntry(),
    antd(),
    // antdMobile(),

    addWebpackAlias({
      ["@"]: "src",
      ["@actions"]: "src/redux/actions",
      ["@reducer"]: "src/redux/reducer",
      ["@epics"]: "src/redux/epics",
      ["@utils"]: "src/utils",
      ["@routes"]: "src/routes",
      ["@providers"]: "src/providers"
    }),

    customize(),


  ),
  devServer: overrideDevServer(
    addProxy()
  )
}
