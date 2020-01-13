const path = require("path"),
  host = "0.0.0.0",
  port = 9999;

module.exports = {
  apps: {
    entry: {
      dev: [path.resolve(__dirname, "../src/index.tsx")], // 'webpack-hot-middleware/client?noInfo=true&reload=true'  如果没有使用koa-webpack的话 这个是刷新页面的关键
      prod: {
        index: [path.resolve(__dirname, "../src/index.tsx")]
      }
    },
    output: {
      path: path.resolve(__dirname, "../dist"),
      // chunkFilename: '[name].[chunkhash:6].chunk.js',
      //     sourceMapFilename: '[name].bundle.map',
      publicPath: "/", //如果react-router 在多级路由下找不到css 或者js 资源的话配置这个可以解决
      filename: "static/js/bundle.js"
    },
    devtool: {
      dev: "eval-cheap-module-source-map",
      prod: "hidden-source-map"
    }
  },
  dev_server: {
    host,
    port,
    //https://webpack.js.org/configuration/dev-server/#src/components/Sidebar/Sidebar.jsx
    historyApiFallback: true,
    disableHostCheck: true,
    contentBase: path.resolve(__dirname, "../public"),
    compress: true, //gzip 亚索
    inline: true, //实时刷新
    hot: true,
    open: true,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: true,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true
        }
      }
    }
  }
};
