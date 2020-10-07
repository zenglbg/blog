
const {
  addLessLoader,
  fixBabelImports,
  adjustStyleLoaders
} = require('customize-cra')
const { resolve } = require('path')



const resources = () => {
  return adjustStyleLoaders(rule => {
    if (rule.test.toString().includes('scss')) {
      rule.use.push({
        loader: require.resolve('sass-resources-loader'),
        options: {
          resources: [
            resolve(__dirname, '../src/assets/style/var.scss')
          ]
        }
      })
    }
  })
}


const antd = () => {
  // antd 按需加载 && less-loader
  return [
    addLessLoader({
      // strictMath: true,
      // noIeCompat: true,
      // modifyVars: {
      //   "@primary-color": "#1DA57A", // for example, you use Ant Design to change theme color.
      // },
      // cssLoaderOptions: {}, // .less file used css-loader option, not all CSS file.
      // cssModules: {
      //   localIdentName: "[path][name]__[local]--[hash:base64:5]", // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
      // },
    }),
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
    }),
    fixBabelImports("lodash", {
      libraryDirectory: "",
      camel2DashComponentName: false
    }),
  ]


}

const antdMobile = () => {
  /**
   * antd-mobile PostCSS && rem 配置
   * 需要注意的是和 addLessLoader 一起使用时，addPostcssPlugins 要放在后面，这和直接使用 webpack 配置是一样的顺序。
   * */

  [addLessLoader(),
  addPostcssPlugins([require("postcss-px2rem-exclude")({
    remUnit: 16,
    propList: ['*'],
    exclude: ''
  }),
    // require('postcss-px-to-viewport')({
    //   unitToConvert: 'px',
    //   viewportWidth: 1024,
    //   viewportHeight: 768,
    //   unitPrecision: 5,
    //   propList: ['*'],
    //   viewportUnit: 'vh',
    //   fontViewportUnit: 'vh',
    //   selectorBlackList: [],
    //   minPixelValue: 1,
    //   mediaQuery: false,
    //   replace: true,
    //   exclude: [],
    //   landscape: false,
    //   landscapeUnit: 'vh',
    //   landscapeWidth: 568
    // })
  ]),
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
  }), fixBabelImports("lodash", {
    libraryDirectory: "",
    camel2DashComponentName: false
  })]

}

module.exports = {
  resources,
  antd,
  antdMobile
}