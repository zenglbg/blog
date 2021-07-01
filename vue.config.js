const path = require("path");
const fs = require("fs");
const os = require("os");
const HappyPack = require("happypack");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const vueSrc = (str) => path.resolve(__dirname, `./src/${str}`);
const projectName = process.argv[3];

function readPages() {
  return fs.readdirSync(vueSrc("pages")).reduce((acc, curr) => {
    acc[curr] = {
      entry: fs.existsSync(
        path.resolve(__dirname, `./src/pages/${curr}/main.ts`)
      )
        ? `./src/pages/${curr}/main.ts`
        : `./src/pages/${curr}/main.tsx`,
      template: "public/index.html",
      title: curr,
      filename: `${curr}.html`,
      chunks: ["chunk-vendors", "chunk-common", curr],
    };
    return acc;
  }, {});
}
module.exports = {
  pages: projectName
    ? {
        index: {
          entry: `./src/pages/${projectName}/main.ts`,
          template: "public/index.html",
          title: projectName,
          filename: "index.html",
          chunks: ["chunk-vendors", "chunk-common", "index"],
        },
      }
    : readPages(),
  outputDir: projectName ? `dist/${projectName}` : "dist",
  css: {
    requireModuleExtension: true,
  },
  productionSourceMap: false, // 生产禁止显示源代码
  devServer: {
    port: 9020, // 端口
    open: false, // 启动后打开浏览器
    // lintOnSave: !IS_PROD,
    // productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    overlay: {
      //  当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
      warnings: false,
      errors: true,
    },
    proxy: {
      // 配置跨域
      "/api": {
        target: process.env.PROXY_TARGET,
        // ws:true,
        changOrigin: true,
        pathRewrite: function (path) {
          return path.replace("/api", "");
        },
      },
    },
  },
  chainWebpack: (config) => {
    config.plugins.store.delete("prefetch");
    config.plugins.store.delete("proload");

    const jsRule = config.module.rule("js");
    jsRule.uses.clear();
    jsRule
      .use("happypack/loader?id=babel")
      .loader("happypack/loader?id=babel")
      .end();
  },
  configureWebpack: {
    plugins: [
      new HappyPack({
        id: "babel",
        loaders: ["babel-loader?cacheDirectory=true"],
        threadPool: happyThreadPool,
      }),
    ],
    resolve: {
      extensions: [".js", ".ts", ".tsx", ".json", ".scss", ".vue"],
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@p": vueSrc("pc"),
        "@h": vueSrc("h5"),
      },
    },
  },

  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.resolve(__dirname, "./src/theme/*.scss")],
    },
  },
};
