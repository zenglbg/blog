const fs = require("fs");
const util = require("util");
const path = require("path");
const withPlugins = require("next-compose-plugins");
const withLess = require("@zeit/next-less");
const lessToJS = require("less-vars-to-js");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin");
import { port, isDev } from "./app/config/config";

const themeVariables = lessToJS(
  fs.readFileSync(
    path.resolve(__dirname, "./src/assets/antd-custom.less"),
    "utf8"
  )
);
const devAntd = '@import "~antd/dist/antd.less";\n';
const stylesData = fs.readFileSync(
  path.resolve(__dirname, "./src/assets/_styles.less"),
  "utf-8"
);
fs.writeFileSync(
  path.resolve(__dirname, "./src/assets/self-styles.less"),
  isDev ? `${devAntd}${stylesData}` : stylesData,
  "utf-8"
);

const srcFolder = [
  path.resolve(__dirname, "./src/components"),
  path.resolve(__dirname, "./src/constants"),
  path.resolve(__dirname, "./src/containers"),
  path.resolve(__dirname, "./src/core"),
  path.resolve(__dirname, "./src/middlewares"),
  path.resolve(__dirname, "./src/pages"),
  path.resolve(__dirname, "./src/redux")
];

const nextConfig = {
  distDir: "build",
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    // modify the `config` here
    console.log(config.module.rules);
    if (isServer) {
      // deal antd style
      const antStyles = /antd\/.*?\/style.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === "function") {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === "function" ? [] : origExternals)
      ];
      config.module.rules.unshift({
        test: antStyles,
        use: "null-loader"
      });
    }
    if (!dev) {
      config.plugins.push(
        ...[
          new BundleAnalyzerPlugin({
            analyzerMode: "disabled",
            // For all options see https://github.com/th0r/webpack-bundle-analyzer#as-plugin
            generateStatsFile: true,
            // Will be available at `.next/stats.json`
            statsFilename: "stats.json"
          }),
          // 代替uglyJsPlugin
          new TerserPlugin({
            cache: true,
            terserOptions: {
              ecma: 6,
              warnings: false,
              extractComments: false, // remove comment
              output: {
                comments: false
              },
              compress: {
                drop_console: true // remove console
              },
              ie8: false
            }
          }),
          // optimize CSS
          new OptimizeCssPlugin({
            cssProcessor: require("cssnano"), //import cssnano option
            cssProcessorOptions: {
              discardComments: { removeAll: true }
            },
            canPrint: true // print info to console
          })
        ]
      );
      config.module.rules.push({
        test: /\.js$/,
        include: srcFolder,
        options: {
          workerParallelJobs: 50,
          // additional node.js arguments
          workerNodeArgs: ["--max-old-space-size=1024"]
        },
        loader: "thread-loader"
      });
      config.devtool = "source-map";
    } else {
      config.module.rules.push({
        test: /\.js$/,
        enforce: "pre",
        include: srcFolder
        // options: {
        //   configFile: path.resolve(".eslintrc"),
        //   eslint: {
        //     configFile: path.resolve(__dirname, ".eslintrc")
        //   }
        // },
        // loader: "eslint-loader"
      });
      config.devtool = "cheap-module-inline-source-map";
    }
    return config;
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config
    // console.log(config, '@@')
    // Important: return the modified config
    return config;
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    rootDir: path.join(__dirname, "./"),
    PORT: port
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: "/static",
    isDev // Pass through env variables
  }
};

module.exports = withPlugins(
  [
    //https://www.npmjs.com/package/next-compose-plugins
    withLess({
      lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: themeVariables,
        localIdentName: "[local]___[hash:base64:5]"
      }
    })
  ],
  nextConfig
);
