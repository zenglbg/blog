const path = require("path"),
  fs = require("path"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  process = require("process"),
  __DEV__ = (process.env.NODE_ENV || "development") === "development";
const darkTheme = require("@ant-design/dark-theme");

const getTsRule = configFile => ({
  // 传入tsconfig配置文件返回rule
  test: /\.tsx?$/,
  use: [
    {
      // loader: 'awesome-typescript-loader',
      loader: "ts-loader",
      options: {
        transpileOnly: true,
        configFile // 指定at-loader使用的tsconfig文件
      }
    }
  ]
});
 
const getCssRules = isDev => {
  return {
    test: /\.(less|css)$/,
    use: [
      isDev
        ? "style-loader"
        : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 这里可以指定一个 publicPath
              // 默认使用 webpackOptions.output中的publicPath
              // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
              // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
              publicPath: "./",
              // publicPath: devMode ? './' : '../',   // 根据不同环境指定不同的publicPath
              hmr: isDev // 仅dev环境启用HMR功能
            }
          },
      "css-loader",
      {
        loader: "postcss-loader",
        options: {
          config: {
            path: path.join(__dirname, "./tools/postcss.config.js")
          }
        }
      },
      {
        loader: "less-loader",
        options: {
          modifyVars: darkTheme,
          javascriptEnabled: true
        }
      },

      {
        loader: "sass-resources-loader",
        options: {
          // 你也可以从一个文件读取，例如 `variables.scss`
          resources: [
            path.join(__dirname, "../src/assets/scss/variable.less")
            // path.join(__dirname, "../src/common/scss/variable.scss"),
            // path.join(__dirname, "../src/common/scss/mixin.scss"),
            // path.join(__dirname, "../src/common/scss/functions.scss")
          ]
        }
      }
    ]
  };
};

const baseConfig = [
  getTsRule(path.resolve(__dirname, "./tsconfig.client.json")),
  getCssRules(__DEV__),

  {
    test: /\.(png|jpg|jpeg)$/,
    loader: "url-loader",
    options: {
      name: "images/[name].[ext]",
      limit: 1024 * 10,
      outputPath: "static",
      fallback: "file-loader"
    }
  },
  {
    test: /\.(eot|woff|svg|ttf|woff2|appcache)(\?|$)/,
    exclude: /^node_modules$/,
    use: [
      {
        loader: "file-loader",
        options: {
          name: "fonts/[name].[ext]",
          outputPath: "static",
          emitFile: false //默认情况下会生成文件，可以通过将此项设置为 false 来禁用（例如使用了服务端的 packages）。
          //useRelativePath: process.env.NODE_ENV === "production" //如果你希望为每个文件生成一个相对 URL 的 context 时，应该将 useRelativePath 设置为 true。
        }
      }
    ]
  },
  {
    test: /\.(gif|mp4|mov|avi)/i,
    use: {
      loader: "file-loader",
      options: {
        name: "videos/[name].[ext]",
        outputPath: "static",
        emitFile: false
      }
    }
  },
  {
    test: /\.(ogg|mp3|wav|mpe?g)$/i,
    use: {
      loader: "file-loader",
      options: {
        name: "static/[name].[ext]",
        emitFile: false
      }
    }
  }
];

module.exports = baseConfig;
