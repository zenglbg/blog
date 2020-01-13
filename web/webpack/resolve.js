const path = require("path");

module.exports = {
  resolve: {
    modules: ["node_modules", "src"], // import时到哪些地方去寻找模块
    extensions: [
      ".web.js",
      ".mjs",
      ".js",
      ".vue",
      "scss",
      ".json",
      ".web.jsx",
      ".jsx",
      ".tsx"
    ], // require的时候可以直接使用require('file')，不用require('file.js')
    alias: {
      reducers: `${path.resolve(__dirname)}/src/common/reducers`
    } //别名
  },
  resolveLoader: {
    moduleExtensions: ["-loader"]
  }
};
