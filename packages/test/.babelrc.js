module.exports = {
  "presets": ["next/babel"],
  "plugins": [
    ["babel-plugin-styled-components", { "ssr": true, "pure": true }],
    [
      "import",
      {
        "libraryName": "antd",
        "style": true
      }
    ]
    // [
    //   "babel-plugin-transform-imports",
    //   {
    //     "@material-ui/core": {
    //       "transform": "@material-ui/core/${member}",
    //       "preventFullImport": true
    //     },
    //     "@material-ui/lab": {
    //       "transform": "@material-ui/lab/${member}",
    //       "preventFullImport": true
    //     }
    //   }
    // ]
  ]
}
