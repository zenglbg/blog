const path = require("path"),
  fs = require("fs"),
  process = require("process"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  { CleanWebpackPlugin } = require("clean-webpack-plugin"),
  CopyPlugin = require("copy-webpack-plugin"),
  webpack = require("webpack"),
  __DEV__ = (process.env.NODE_ENV || "development") === "development";

exports.dev_plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  // new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new HtmlWebpackPlugin({
    /**
     * https://webpack.docschina.org/plugins/html-webpack-plugin/
     */
    template: path.resolve(__dirname, "../public/index.html"),
    alwaysWriteToDisk: false,
    inject: true,
    hash: false
  }),
  new webpack.LoaderOptionsPlugin({
    debug: true,
    minimize: false,
    options: {
      // eslint: {
      //   configFile: path.join(__dirname, '../tools/.eslintrc')
      // },
      context: "/"
    }
  })
  // new webpack.DllReferencePlugin({
  //     manifest: path.join(__dirname, '../../public/dll', 'manifest.json'),
  // }),
];

exports.prod_plugins = [
  new CleanWebpackPlugin(),
  new CopyPlugin([
    {
      from: path.join(__dirname, "../src/common/files"),
      to: path.join(process.cwd(), "./static"),
      toType: "dir"
    }
  ]),
  //   new webpack.optimize.CommonsChunkPlugin({
  //     names: ['vendor', 'manifest'],
  //     filename: 'vendor.bundle.js',
  //     minChunks: ({ resource }) =>
  //       resource &&
  //       resource.indexOf('node_modules') >= 0 &&
  //       resource.match(/\.(js|less|scss)$/)
  //   }),
  //   new webpack.optimize.ModuleConcatenationPlugin(),
  //   new webpack.LoaderOptionsPlugin({
  //     minimize: true,
  //     debug: false,
  //     quiet: true,
  //     options: {
  //       context: '/'
  //     }
  //   }),

  // new MiniCssExtractPlugin({
  //   // filename: '[name].css',
  //   filename: `static/css/bundle.css`,
  //   chunkFilename: "[id].css",
  //   publicPath: "/assets/"
  // }),
  new webpack.optimize.AggressiveMergingPlugin(),

  new MiniCssExtractPlugin({
    // 这里的配置和webpackOptions.output中的配置相似
    // 即可以通过在名字前加路径，来决定打包后的文件存在的路径
    filename: __DEV__
      ? "static/css/[name].css"
      : "static/css/[name].[hash].css",
    chunkFilename: __DEV__
      ? "static/css/[id].css"
      : "static/css/[id].[hash].css",
    ignoreOrder: false
  }),
  new webpack.HashedModuleIdsPlugin(),
  //   new WebpackChunkHash(),
  new HtmlWebpackPlugin({
    /**
     * https://webpack.docschina.org/plugins/html-webpack-plugin/
     */
    template: path.resolve(__dirname, "../public/index.html"),
    alwaysWriteToDisk: false,
    inject: true,
    hash: false,
    minify: {
      collapseWhitespace: true,
      decodeEntities: true,
      html5: true,
      processConditionalComments: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeOptionalTags: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeTagWhitespace: true,
      sortAttributes: true,
      sortClassName: true,
      useShortDoctype: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    }
  })
  //   new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
];
