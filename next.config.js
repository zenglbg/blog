const withPlugins = require("next-compose-plugins");

// const withTypescript = require("@zeit/next-typescript");
const withLess = require("@zeit/next-less");
// module.exports = withLess({
//   /* config options here */
// })
// module.exports = withTypescript({
//   webpack(config, options) {
//     return config;
//   }
// });
// module.exports = withTypescript(withLess({//可用的
//   webpack(config, options) {
//     // Further custom configuration here
//     return config
//   }
// }))

module.exports = withPlugins([
  //https://www.npmjs.com/package/next-compose-plugins
  // [withTypescript],
  [withLess]
]);
