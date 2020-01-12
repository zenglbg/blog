const path = require("path"),
  fs = require("path"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  process = require("process"),
  __DEV__ = (process.env.NODE_ENV || "development") === "development";

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

// const base_css = {
//   dev: [
//     "style-loader",
//     "css-loader",
//     {
//       loader: "postcss-loader",
//       options: {
//         config: {
//           path: path.join(__dirname, "./tools/postcss.config.js")
//         }
//       }
//     },
//     "sass-loader",
//     {
//       loader: "sass-resources-loader",
//       options: {
//         // 你也可以从一个文件读取，例如 `variables.scss`
//         resources: [
//           path.join(__dirname, "../src/common/scss/variable.scss"),
//           path.join(__dirname, "../src/common/scss/mixin.scss"),
//           path.join(__dirname, "../src/common/scss/functions.scss")
//         ]
//       }
//     }
//   ],
//   prod: ExtractTextPlugin.extract({
//     //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
//     fallback: "style-loader",
//     use: [
//       {
//         loader: "css-loader",
//         options: {
//           minimize: process.env.NODE_ENV === "production", //是否压缩css
//           modules: false, //开启将会吧选择器变成随机字符串
//           // localIdentName: "[path][name]__[local]--[hash:base64:5]",
//           // getLocalIdent: (
//           //   context,
//           //   localIdentName,
//           //   localName,
//           //   options
//           // ) => {
//           //   return "whatever_random_class_name";
//           // }
//           importLoaders: 1
//         }
//       },
//       {
//         loader: "postcss-loader",
//         options: {
//           config: {
//             path: path.join(__dirname, "./tools/postcss.config.js")
//           }
//         }
//       },
//       {
//         loader: "sass-loader",
//         options: {
//           // 你也可以从一个文件读取，例如 `variables.scss`
//           // data: path.join(__dirname, '../src/index.scss')
//         }
//       },
//       {
//         loader: "sass-resources-loader",
//         options: {
//           // 你也可以从一个文件读取，例如 `variables.scss`
//           resources: [
//             path.join(__dirname, "../src/common/scss/variable.scss"),
//             path.join(__dirname, "../src/common/scss/mixin.scss"),
//             path.join(__dirname, "../src/common/scss/functions.scss")
//           ]
//         }
//       }
//     ]
//   })
// };

const getCssRules = isDev => {
  return {
    test: /\.(scss|css)$/,
    use: [
      "style-loader",
      "css-loader",
      {
        loader: "postcss-loader",
        options: {
          config: {
            path: path.join(__dirname, "./tools/postcss.config.js")
          }
        }
      },
      "sass-loader",
      {
        loader: "sass-resources-loader",
        options: {
          // 你也可以从一个文件读取，例如 `variables.scss`
          resources: [
            path.join(__dirname, "../src/common/scss/variable.scss"),
            path.join(__dirname, "../src/common/scss/mixin.scss"),
            path.join(__dirname, "../src/common/scss/functions.scss")
          ]
        }
      },
      __DEV__
        ? {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === "development"
            }
          }
        : null
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
